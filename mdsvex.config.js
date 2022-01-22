import rehypeSlug from "rehype-slug"

// eww, no typings
export const config = {
    extensions: [".md", ".svx"],
    smartypants: {
        quotes: false,
        ellipses: true,
        backticks: false,
        dashes: "oldschool"
    },
    layout: false, // we use the sveltekit __layout tihgy
    rehypePlugins: [
        rehypeSlug
    ]
}