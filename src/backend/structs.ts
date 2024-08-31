import { Browser, Page } from "puppeteer-core";
import * as Yup from "yup";

export interface Chapter {
    title: string;
    url: string;
    hasBeenScraped: boolean;
    hasBeenParsed: boolean;
    content: string;
}

export type Webnovel = {
    title: string;
    author: string;
    coverImageURL: string;
    chapters: Chapter[];
};

export type ConnectionInfo = {
    page: Page;
    browser: Browser;
    setTarget: (value: { status: boolean }) => void;
};

export type ScrapingOptions = {
    concurrency: number;
    timeout: number;
};

export type ImageOptions = {
    quality: number;
    shouldResize: boolean;
    maxWidth: number;
    maxHeight: number;
};

export type FileSystemOptions = {
    path: string;
};

export const SerializableWebnovelSchema = Yup.object().shape({
    title: Yup.string().required(),
    author: Yup.string().required(),
    coverImageURL: Yup.string().url().required(),
    chapters: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required(),
            url: Yup.string().url().required(),
            content: Yup.string().required(),
            hasBeenParsed: Yup.boolean().required(),
            hasBeenScraped: Yup.boolean().required(),
        })
    ),
});

export enum ParsingType {
    WithImage,
    WithFormat,
    TextOnly,
}
