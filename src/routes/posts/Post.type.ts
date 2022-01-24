export type Post = {
    title: string,
    author: string,
    created: Date,
    modified: Date,
    hidden: boolean
}

export type PostWithMeta = { route: string, metadata: Post };