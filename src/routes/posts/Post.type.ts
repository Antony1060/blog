type Credits = { role: string, name: string }[];

export type Post = {
    title: string,
    description?: string,
    author: string,
    tags?: string[],
    lang?: string[],
    credits?: Credits,
    created: Date,
    modified: Date,
    hidden: boolean
}

export type PostWithMeta = {
    route: string,
    metadata: Post,
    languages: string[]
};