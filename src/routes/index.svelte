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

    let sorting: "newest" | "oldest" = "newest";
    let tagFilter: string[] = [];

    const updatePosts = () => {
        console.log("updating")
        posts = posts.sort((a, b) => new Date((sorting === "newest" ? b : a).metadata.created).getTime() - new Date((sorting === "newest" ? a : b).metadata.created).getTime())
        console.log(posts)
    }
</script>

<div class="posts-container">
    <div class="header-container">
        <span>total {posts.length}</span>
        <div class="mod-container">
            <select bind:value={sorting} on:change={() => updatePosts()}>
                <option value="newest">newest first</option>
                <option value="olderst">oldest first</option>
            </select>
        </div>
    </div>
    {#each posts as post (post.route)}
        <PostCard post={post} />
    {/each}
</div>

<style lang="scss">
    .posts-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0 2rem;
    }

    .header-container {
        span {
            font-family: 'JetBrainsMono', monospace;
        }
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        background-color: #282C3266;
        padding: 0.6rem;
        border-radius: 4px;
    }
</style>