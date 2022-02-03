import { parse, dirname, basename } from "path";
import { dev } from "$app/env";

import type { RequestHandler } from "@sveltejs/kit";

export const i18nLang = ["hr"] as const;

export const get: RequestHandler = async () => {
    const posts = import.meta.glob("./en/*.md");
    const allPosts = import.meta.glob("./**/*.md");

    const resolved = await Promise.all(
        Object.entries(posts)
            .map(([path, resolver]) => resolver().then(post => ({
                route: parse(path).name,
                metadata: post.metadata,
                languages: [
                    "en",
                    ...i18nLang.filter(lang => Object.keys(allPosts).find(post => basename(dirname(post)) === lang && parse(post).name === parse(path).name))
                ]
            })))
    )

    return { body: dev ? resolved : resolved.filter(it => !it.metadata.hidden) }
}