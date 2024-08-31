import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { sanitizeFilename } from "./strings.js";
import {
    FileSystemOptions,
    SerializableWebnovelSchema,
    Webnovel,
} from "./structs.js";

export async function writeWebnovelToJSON(
    webnovel: Webnovel,
    fsOps: FileSystemOptions
): Promise<void> {
    let webnovelString = JSON.stringify(webnovel);

    return writeFile(
        join(fsOps.path, `${sanitizeFilename(webnovel.title)}.json`),
        webnovelString
    );
}

export async function readWebnovelFromJSON(
    fsOps: FileSystemOptions
): Promise<Webnovel> {
    let webnovelString: string = "";

    webnovelString = await readFile(fsOps.path, { encoding: "utf8" });

    let webnovel: Webnovel = JSON.parse(webnovelString);

    await SerializableWebnovelSchema.validate(webnovel);

    return webnovel;
}

export function combineWebnovels(
    webnovels: Webnovel[],
    indexToKeepData: number
): Webnovel {
    let newWebnovel: Webnovel = {
        title: "",
        author: "",
        coverImageURL: "",
        chapters: [],
    };

    if (indexToKeepData >= webnovels.length || indexToKeepData < 0)
        indexToKeepData = 0;

    let dataKeptWebnovel = webnovels[indexToKeepData];
    newWebnovel.title = dataKeptWebnovel.title;
    newWebnovel.author = dataKeptWebnovel.author;
    newWebnovel.coverImageURL = dataKeptWebnovel.coverImageURL;

    for (let webnovel of webnovels) {
        newWebnovel.chapters = newWebnovel.chapters.concat(webnovel.chapters);
    }

    return newWebnovel;
}
