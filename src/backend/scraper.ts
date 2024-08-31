import puppeteer, { Page } from "puppeteer-core";
import { PUPPETEER_REVISIONS } from "puppeteer-core/lib/cjs/puppeteer/revisions.js";
import { join } from "path";
import {
    ConnectionInfo,
    ImageOptions,
    ParsingType,
    ScrapingOptions,
    Webnovel,
} from "./structs";
import sharp from "sharp";
import { processImage } from "./image";
import { getFilePathFromURL, TEMP_FILE_PATH } from "./strings";
import { PromisePool } from "@supercharge/promise-pool";
import { findCorrectScraper } from "./scrapers/scaperBucket";

const MAX_TRIES = 3;

export async function makeNewConnection(): Promise<ConnectionInfo> {
    const { connect } = await import("puppeteer-real-browser");
    const { findChrome } = await import("find-chrome-bin");
    let chromePath = (
        await findChrome({
            min: 110,
            download: {
                puppeteer,
                path: join(TEMP_FILE_PATH, "chrome"),
                revision: PUPPETEER_REVISIONS.chrome,
            },
        })
    ).executablePath;
    const connectionInfo: ConnectionInfo = await connect({
        headless: "auto",
        turnstile: true,
        fingerprint: false,
        customConfig: {
            executablePath: chromePath,
        },
    });
    await setupPage(connectionInfo.page);
    return connectionInfo;
}

export async function createNewPage(
    connectionInfo: ConnectionInfo,
    allowImg: boolean = true
): Promise<Page> {
    connectionInfo.setTarget({ status: false });
    let newPage = await connectionInfo.browser.newPage();
    await setupPage(newPage, allowImg);
    connectionInfo.setTarget({ status: true });
    return newPage;
}

async function setupPage(page: Page, allowImg: boolean = true): Promise<void> {
    await page.setRequestInterception(true);
    page.on("request", async (req) => {
        if (
            req.resourceType() === "stylesheet" ||
            req.resourceType() === "font" ||
            (!allowImg && req.resourceType() === "media")
        ) {
            req.abort();
        } else {
            req.continue();
        }
    });
}

export async function downloadImagesLocally(
    page: Page,
    pageURL: string,
    fileURLs: string[],
    scrapingOps: ScrapingOptions,
    imageOptions: ImageOptions
): Promise<{ [key: string]: string }> {
    let tries = 0;
    let success = false;
    let filePaths: { [key: string]: string } = {};

    const promise: Promise<boolean> = new Promise((resolve) => {
        let timeoutResolve = setTimeout(
            () => resolve(true),
            scrapingOps.timeout
        );

        page.on("response", async (response) => {
            if (fileURLs.length === 0) {
                clearTimeout(timeoutResolve);
                resolve(true);
            }
            if (fileURLs.includes(response.url())) {
                let path = getFilePathFromURL(response.url());
                try {
                    let buffer = await response.buffer();
                    let image = await processImage(sharp(buffer), imageOptions);
                    await image.toFile(path);
                    filePaths[response.url()] = path;
                    fileURLs = fileURLs.filter((r) => r != response.url());
                } catch (e) {}
            }
        });
    });

    while (!success && tries < MAX_TRIES) {
        try {
            page.goto(pageURL);
            success = await promise;
            tries++;
        } catch (e) {}
    }

    return filePaths;
}

export async function getInitializedScraper(
    url: string,
    connectionInfo: ConnectionInfo,
    scrapingOps: ScrapingOptions
) {
    let parser = findCorrectScraper(url);
    if (!parser) throw new Error("parser not found");

    await parser.initialize(url, connectionInfo, scrapingOps);

    return parser;
}

export async function checkPageExistence(
    url: string,
    connectionInfo: ConnectionInfo
) {}

export async function scrapeWebnovel(
    url: string,
    connectionInfo: ConnectionInfo,
    parsingType: ParsingType,
    scrapingOps: ScrapingOptions
): Promise<Webnovel> {
    let scraper = await getInitializedScraper(url, connectionInfo, scrapingOps);

    let title = await scraper.getTitle();
    let author = await scraper.getAuthor();
    let coverImageURL = await scraper.getCoverImage();

    let chapters = await scraper.getAllChapters();

    let pages: Page[] = [];
    for (let i = 0; i < scrapingOps.concurrency; i++) {
        let newPage = await createNewPage(connectionInfo, false);
        pages.push(newPage);
    }

    await PromisePool.withConcurrency(scrapingOps.concurrency)
        .for(chapters)
        .process(async (chapter) => {
            if (chapter.hasBeenScraped) return chapter;
            let page = pages.pop();
            let tries = 0;
            while (!chapter.hasBeenScraped && tries < MAX_TRIES) {
                try {
                    await scraper.scrapeChapter(page, chapter, parsingType);
                } catch (e) {
                    tries++;
                }
            }

            pages.push(page);

            return true;
        });

    for (let page of pages) {
        await page.close();
    }

    return {
        title,
        author,
        coverImageURL,
        chapters,
    };
}
