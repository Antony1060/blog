export type Post = {
    title: string,
    author: string,
    tags?: string[],
    created: Date,
    modified: Date,
    hidden: boolean
}

export type PostWithMeta = { route: string, metadata: Post };