<svelte:head>
    <title>Antony | Blog</title>
</svelte:head>

<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import type { PostWithMeta } from "./posts/Post.type";

    export const load: Load = async ({ fetch }) => {
        const posts: PostWithMeta[] = await fetch("/posts.json").then(res => res.clone().json());

        posts
            .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title))
            .sort((a, b) => new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime());

        return { props: { posts } }
    }
</script>

<script lang="ts">
    import PostCard from "../lib/components/PostCard.svelte";

    export let posts: PostWithMeta[];
</script>

<div class="posts-container">
    {#each posts as post}
        <PostCard post={post} />
    {/each}
</div>

<style lang="scss">
    .posts-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }
</style>