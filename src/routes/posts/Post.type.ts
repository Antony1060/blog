export type Post = {
    title: string,
    author: string,
    tags?: string[],
    created: Date | string,
    modified: Date | string,
    hidden: boolean
}

export type PostWithMeta = { route: string, metadata: Post };