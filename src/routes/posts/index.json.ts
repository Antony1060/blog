import { parse } from "path";
import { dev } from "$app/env";

import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
    const posts = import.meta.glob("./*.{md,svx,svelte.md}");

    const resolved = await Promise.all(
        Object.entries(posts)
            .map(([path, resolver]) => resolver().then(post => ({
                post: parse(path).name,
                metadata: post.metadata
            })))
    )

    return { body: dev ? resolved : resolved.filter(it => !it.metadata.hidden) }
}