<svelte:head>
    <title>Index</title>
</svelte:head>

<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import type { Post } from "./posts/Post.type";

    export const load: Load = async ({ fetch }) => {
        const posts = await fetch("/posts.json").then(res => res.json());

        return { props: { posts } }
    }
</script>

<script lang="ts">
    export let posts: { post: string, metadata: Post }[];

</script>

{#each posts as { post, metadata: { title, description, author, created, modified } } (post)}
    <div>
        <a href={`posts/${post}`}>{title}</a>
    </div>
{/each}