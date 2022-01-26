<script lang=ts>
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import "../../../static/prism-material-mine.css"
    import type { Post } from "../../routes/posts/Post.type";
    import { format } from "../util/date";

    export let post: Post;

    const createdFormatted = format(new Date(post.created));
    const modifiedFormatted = format(new Date(post.modified));

    let mdContainer: HTMLDivElement;
    
    let langPaths: { lang: string, path: string }[] = (post.lang ?? []).map(it => ({ lang: it, path: `/posts/${it}/${$page.url.pathname.split("/").filter(it => it).at(-1)}` }));

    const modifiyCodeBlock = () => {
        const codeBlocks = Array.from(mdContainer.querySelectorAll('pre[class*="language-"]'))
                                .filter(it => it.className.startsWith("language-"));

        for(const block of codeBlocks) {
            const span = document.createElement("span");
            span.innerText = block.className.slice("language-".length);
            span.classList.add("code-block-name");
            block.prepend(span);
        }
    }

    onMount(() => {
        modifiyCodeBlock();
    });
</script>

<svelte:head>
    <title>Antony | Blog - {post.title}</title>
    <style>
        code, code * {
            font-family: 'JetBrains Mono', monospace !important;
        }
    </style>
</svelte:head>

<div class="content-container">
    <div class="header-container">
        {#if post.lang}
            <div class="header-part">
                <span class="title">{post.title}</span>
                <span class="dimmed">Created {createdFormatted}</span>
                {#if createdFormatted !== modifiedFormatted}
                    <span class="dimmed">Modified {modifiedFormatted}</span>
                {/if}
            </div>
            {#each langPaths as { path, lang }}
                <a href={path} class="lang-button">
                    <img src={`https://flagcdn.com/${lang === "en" ? "gb" : lang}.svg`} alt={`${lang}-flag`}>
                    {lang}
                </a>
            {/each}
        {:else}
            <span class="title">{post.title}</span>
            <div class="header-part">
                <span class="dimmed">Created {createdFormatted}</span>
                {#if createdFormatted !== modifiedFormatted}
                    <span class="dimmed">Modified {modifiedFormatted}</span>
                {/if}
            </div>
        {/if}
    </div>
    <div bind:this={mdContainer}>
        <slot />
    </div>
</div>

<style lang="scss">
    :global(.code-block-name) {
        display: block;
        font-family: 'JetBrains Mono', monospace;
        padding: 0 0 0.4rem 0.6rem;
        margin-bottom: 0.4rem;
        border-bottom: 1px solid #16a21c66;
    }

    .content-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0 2rem;
    }

    .header-container {
        padding: 1rem;
        border-bottom: 1px solid #16191f;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        span.dimmed {
            opacity: 0.6;
        }
    }

    .title {
        font-size: 1.1rem;
    }
    .header-part {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        justify-content: center;
        align-items: flex-start;
        flex-shrink: 0;
    }
    
    .lang-button {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        text-decoration: none;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        background-color: #272b33;
        min-width: 6rem;

        &:hover {
            background-color: #16191f;
        }

        img {
            height: 0.8rem;
        }
    }
</style>