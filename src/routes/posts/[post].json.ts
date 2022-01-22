import { parse } from "path";

import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params: { post } }) => {
    const posts = import.meta.glob("../../posts/*.{md,svx,svelte.md}");

    const found = Object.entries(posts)
        .find(([path]) => parse(path).name === post);
    
    if(!found) return { status: 404 };

    const processed = await found[1]();

    return {
        body: {
            metadata: processed.metadata,
            content: processed.default.render()
        }
    }
}