<svelte:head>
    <title>Index</title>
</svelte:head>

<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import type { Post } from "./posts/Post.type";

    type PostResponse = { post: string, metadata: Post };

    export const load: Load = async ({ fetch }) => {
        const posts: PostResponse[] = await fetch("/posts.json").then(res => res.clone().json());

        posts
            .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title))
            .sort((a, b) => new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime());

        return { props: { posts } }
    }
</script>

<script lang="ts">
    export let posts: PostResponse[];
</script>

{#each posts as { post, metadata: { title, description, author, created, modified } } (post)}
    <div>
        <a href={`posts/${post}`}>{title}</a>
    </div>
{/each}