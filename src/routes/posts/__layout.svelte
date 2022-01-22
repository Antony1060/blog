<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";

    export const load: Load = async ({ url, fetch }) => {
        const post = await fetch(`${url.pathname}.json`).then(res => res.json());

        if(!post)
            return {
                status: 404,
                error: new Error("Post not found")
            }

        return { props: { post } }
    }
</script>

<script lang="ts">
    import type { Post } from "./Post.type";

    export let post: Post;
</script>

<div>
    <h1>{post.title}</h1>
    <h6>{post.description}</h6>
    <h6>{post.author}</h6>
    <h6>{post.created}</h6>
    <h6>{post.modified}</h6>
    <hr>
    <slot />
    <hr>
    <h1>footer</h1>
</div>