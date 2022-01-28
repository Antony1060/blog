import type { RequestHandler } from "@sveltejs/kit";
import type { PostWithMeta } from "./posts/Post.type";
import { parse } from "path"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const padNumber = (number: number) => (number + "").padStart(2, "0")

export const get: RequestHandler = async ({ url }) => {
    const posts: Omit<PostWithMeta, "languages">[] = await Promise.all(Object.entries(import.meta.glob("./posts/en/*.{md,svx}"))
            .map(([path, resolver]) => resolver().then(post => ({
                route: parse(path).name,
                metadata: post.metadata,
            }))))

    return {
        status: 200,
        headers: {
            "Cache-Control": "max-age=60",
            "Content-Type": "application/xml"
        },
        body: `
        <rss version="2.0">
            <channel>
                <title>antony.cloud</title>
                <description>A blog! 🥵 // yes I know, I'm very creative with descriptions...</description>
                <link>${url.origin}${url.pathname}</link>
                <language>en-us</language>
                ${posts.filter(it => !it.metadata.hidden).map(({ route, metadata: post }) => `
                <item>
                    <title>${post.title}</title>
                    <link>${url.origin}/posts/en/${route}</link>
                    ${post.description ? `<description>${post.description}</description>` : ""}
                    <pubDate>${((date: Date) => 
                        `${dayNames[date.getDay()]}, ${padNumber(date.getDate())} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())} GMT`
                    )(new Date(post.created))}</pubDate>
                </item>
                `).join("")}
            </channel>
        </rss>
        `
    }
}