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
    import Dropdown from "../lib/components/Dropdown.svelte";
    import PostCard from "../lib/components/PostCard.svelte";

    export let posts: PostWithMeta[];

    let sorting: "newest" | "oldest" = "newest";
    let tagFilter: string[] = [];

    const updatePosts = (newMode: "newest" | "oldest") => {
        sorting = newMode;
        posts = posts.sort((a, b) => new Date((sorting === "newest" ? b : a).metadata.created).getTime() - new Date((sorting === "newest" ? a : b).metadata.created).getTime())
    }
</script>

<div class="posts-container">
    <div class="header-container">
        <span>total {posts.length}</span>
        <div class="mod-container">
            <Dropdown title={sorting} preTitle="Order by:" closeOnClick={true}>
                <div class="sorting-dropdown">
                    <span on:click={() => updatePosts("newest")}>newest first</span>
                    <span on:click={() => updatePosts("oldest")}>oldest first</span>
                </div>
            </Dropdown>
            <Dropdown title={`${tagFilter.length} tags`} preTitle="Filter:" roundedBorders={true}>
                <div class="tags-dropdown">
                    {#each posts.reduce((acc, curr) => [...acc, ...(curr.metadata.tags ?? [])], []).sort() as tag}
                        <label>
                            <input type="checkbox" bind:group={tagFilter} name="tags" value={tag} />
                            {tag}
                        </label>
                    {/each}
                </div>
            </Dropdown>
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
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        background-color: #282C3266;
        border-radius: 4px;

        span {
            padding: 0.6rem;
            font-family: 'JetBrains Mono', monospace;
        }
    }

    .mod-container {
        display: flex;
    }

    .sorting-dropdown {
        display: flex;
        flex-direction: column;

        span:hover {
            background-color: #16191f;
        }
    }

    .tags-dropdown {
        display: flex;
        flex-direction: column;

        label {
            padding: 0.6rem;
            font-size: 0.9rem;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
        }
    }
</style>