<svelte:head>
    <!-- General meta -->
    <title>Antony | Blog</title>
    <meta name="title" content="Antony | Blog">
    <meta name="description" content="My thoughts">

    <!-- OG, Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://antony.cloud">
    <meta property="og:title" content="Antony | Blog">
    <meta property="og:description" content="My thoughts">
    <meta property="og:image">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://antony.cloud">
    <meta property="twitter:title" content="Antony | Blog">
    <meta property="twitter:description" content="My thoughts">
    <meta property="twitter:image">
</svelte:head>

<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import type { PostWithMeta } from "./posts/Post.type";

    export const load: Load = async ({ fetch }) => {
        const posts: PostWithMeta[] = await fetch("/posts.json").then(res => res.clone().json());
        await fetch("/rss.xml"); // literally just a fucking filler, because svelte doesn't want to parse rss.xml without it being called in a component, fuck this, wasted 40 minutes on this

        posts
            .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title))
            .sort((a, b) => new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime());

        return { props: { posts } }
    }
</script>

<script lang="ts">
    import Dropdown from "../lib/components/Dropdown.svelte";
    import PostCard from "../lib/components/PostCard.svelte";
    import GoodRead from "../lib/components/GoodRead.svelte";

    export let posts: PostWithMeta[];
    const tags = posts.reduce((acc, curr) => [...acc, ...(curr.metadata.tags ?? [])], []).filter((v, i, arr) => arr.indexOf(v) === i).sort();

    let sorting: "newest" | "oldest" = "newest";
    let tagFilter: string[] = [];

    const updateSorting = (newSorting: "newest" | "oldest") => {
        sorting = newSorting;
        posts = posts.sort((a, b) => new Date((sorting === "newest" ? b : a).metadata.created).getTime() - new Date((sorting === "newest" ? a : b).metadata.created).getTime())
    }
</script>

<div class="content-container">
    <div class="flex-helper"></div> <!-- filler for flex -->
    <div class="posts-container">
        <div class="header-container">
            <span>total {posts.length}</span>
            <div class="mod-container">
                <Dropdown title={sorting} preTitle="Order by:" closeOnClick={true}>
                    <div class="sorting-dropdown">
                        <span on:click={() => updateSorting("newest")}>newest first</span>
                        <span on:click={() => updateSorting("oldest")}>oldest first</span>
                    </div>
                </Dropdown>
                <Dropdown title={`${tagFilter.length} tags`} preTitle="Filter:" roundedBorders={true}>
                    <div class="tags-dropdown">
                        {#each tags as tag}
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
            {#if !tagFilter.length || post.metadata.tags.find(tag => tagFilter.includes(tag))}
                <PostCard post={post} />
            {/if}
        {/each}
    </div>
    <div class="flex-helper">
        <GoodRead />
    </div>
</div>

<style lang="scss">

    .flex-helper {
        flex-grow: 1;
        flex-shrink: 1;
    }

    .content-container {
        display: grid;
        grid-template-columns: 1fr 900px 1fr;
        width: 100%;

        @media (max-width: 1800px) {
            // luc big brain strats
            grid-template-columns: 1fr;
            gap: 2rem;
            width: 900px;
            max-width: 100%;
            margin: 0 auto;

            .flex-helper:first-child {
                display: none;
            }
        }
    }

    .posts-container {
        width: calc(100% - 2rem);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0 1rem;
    }

    .header-container {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: stretch;
        background-color: #282C3266;
        border-radius: 4px;

        span {
            padding: 0.6rem;
            font-family: 'JetBrains Mono', monospace;
        }

        @media (max-width: 600px) {
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
            gap: 0;
        }
    }

    .mod-container {
        display: flex;
    }

    .sorting-dropdown {
        display: flex;
        flex-direction: column;

        span {
            font-size: 0.9rem;
        }

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