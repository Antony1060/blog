import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkSectionize from "remark-sectionize"
import remarkEmoji from "remark-emoji"

// eww, no typings
export const config = {
    extensions: [".md", ".svx"],
    smartypants: {
        quotes: false,
        ellipses: true,
        backticks: false,
        dashes: "oldschool"
    },
    layout: "./src/lib/layouts/BlogLayoutWrapper.svelte", // we use the sveltekit __layout tihgy
    remarkPlugins: [
        remarkGfm,
        remarkSectionize,
        remarkEmoji
    ],
    rehypePlugins: [
        rehypeSlug
    ]
}