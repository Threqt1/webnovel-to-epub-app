import { createNewPage, downloadImagesLocally } from "./scraper.js";
import { sanitizeFilename } from "./strings.js";
import { join } from "path";
import {
    ConnectionInfo,
    FileSystemOptions,
    ImageOptions,
    ScrapingOptions,
    Webnovel,
} from "./structs.js";

export async function writeWebnovelToEpub(
    webnovel: Webnovel,
    connectionInfo: ConnectionInfo,
    fsOps: FileSystemOptions,
    scrapingOps: ScrapingOptions,
    imageOps: ImageOptions
): Promise<void> {
    const Epub = (await import("epub-gen")).default;

    let page = await createNewPage(connectionInfo, true);

    let coverImagePath = (
        await downloadImagesLocally(
            page,
            webnovel.coverImageURL,
            [webnovel.coverImageURL],
            scrapingOps,
            imageOps
        )
    )[webnovel.coverImageURL];

    const epubOptions = {
        title: webnovel.title,
        author: webnovel.author,
        cover: coverImagePath !== "" ? coverImagePath : undefined,
        content: webnovel.chapters.map((chapter) => {
            return {
                title: chapter.title,
                data: chapter.content,
            };
        }),
        tocTitle: "Table of Contents",
    };

    await new Epub(
        epubOptions,
        join(fsOps.path, `${sanitizeFilename(webnovel.title)}.epub`)
    ).promise;
}
