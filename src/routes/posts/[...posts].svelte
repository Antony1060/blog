<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";

    export const load: Load = async ({ url, fetch }) => {
        if(url.pathname === "/posts")
            return {
                status: 301,
                redirect: "/"
            }

        const post = await fetch(`${url.pathname}.json`).then(res => res.status !== 200 ? null : res.json());

        if(!post)
            return {
                status: 404,
                error: new Error("Post not found")
            }

        return { props: { post: post.metadata, content: post.content } }
    }
</script>

<script lang="ts">
    import type { Post } from "./Post.type";

    export let post: Post;
    export let content: { html: string, css: { code: string }, head: string }

    const css = atob("PHN0eWxlPg==") + content.css.code + atob("PC9zdHlsZT4=");
</script>

<svelte:head>
    {@html content.head}
</svelte:head>

<div>
    <h1>{post.title}</h1>
    <h6>{post.description}</h6>
    <h6>{post.author}</h6>
    <h6>{post.created}</h6>
    <h6>{post.modified}</h6>
    <hr>
    {@html css}
    {@html content.html}
    <hr>
    <h1>footer</h1>
</div>