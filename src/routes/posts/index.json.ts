import { parse } from "path";

import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
    const posts = import.meta.glob("../../posts/*.{md,svx,svelte.md}");

    const resolved = await Promise.all(
        Object.entries(posts)
            .map(([path, resolver]) => resolver().then(post => ({
                post: parse(path).name,
                metadata: post.metadata
            })))
    )

    return { body: resolved }
}