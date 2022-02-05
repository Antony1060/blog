<script lang=ts>
    import { page } from "$app/stores";

    import "../../../static/prism-material-mine.css"
    import type { Post } from "../../routes/posts/Post.type";
    import { format } from "../util/date";
    import ArrowUpIcon from "svelte-feather-icons/src/icons/ArrowUpIcon.svelte";
    import DownloadIcon from "svelte-feather-icons/src/icons/DownloadIcon.svelte";

    export let post: Post;

    const createdFormatted = format(new Date(post.created));
    const modifiedFormatted = format(new Date(post.modified));

    let langPaths: { lang: string, path: string }[] = (post.lang ?? []).map(it => ({ lang: it, path: `/posts/${it}/${$page.url.pathname.split("/").filter(it => it).at(-1)}` }));

    let upVisible = false;
    let lastScroll = 0;

    const handleScroll = () => {
        upVisible = window.scrollY >= 300 && lastScroll < window.scrollY;

        lastScroll = window.scrollY;
    }

    let fetchingRaw = false;

    const downloadRaw = () => {
        fetchingRaw = true;
        (async () => {
            const resp: Record<string, string> = await fetch("/allRaw.json").then(res => res.json())
            const [ lang, name ] = $page.url.pathname.slice("/posts/".length).split("/");
            const postContent = resp[`${lang}/${name}.md`] ?? ""
            
            const blob = new Blob([postContent], { type: "text/markdown; charset=UTF-8; variant=GFM" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${name}-${lang}.md`;
            console.log("Downloding", link.download);
            link.click();
        })().finally(() => fetchingRaw = false);
    }
</script>

<svelte:head>
    <style>
        code, code * {
            font-family: 'JetBrains Mono', monospace !important;
        }
    </style>

    <!-- General meta -->
    <title>Antony | Blog - {post.title}</title>
    <meta name="title" content="Antony | Blog - {post.title}">
    <meta name="description" content={post.description}>

    <!-- OG, Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://antony.cloud{$page.url.pathname}">
    <meta property="og:title" content="Antony | Blog - {post.title}">
    <meta property="og:description" content={post.description}>
    <meta property="og:image" content="https://cards.antony.cloud/post?title={post.title}&description={post.description}&type=png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://antony.cloud{$page.url.pathname}">
    <meta property="twitter:title" content="Antony | Blog - {post.title}">
    <meta property="twitter:description" content={post.description}>
    <meta property="twitter:image" content="https://cards.antony.cloud/post?title={post.title}&description={post.description}&type=png">
</svelte:head>

<svelte:window on:scroll={handleScroll} />

<div class="content-container">
    <div class="header-container">
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
    </div>
    <div class="md-container">
        <slot />
        <section>
            <hr>
            <p class="footer-signature">
                - Antony
                <a href="https://antony.contact" target="_blank">Contact</a>
            </p>
        </section>
    </div>
    <div class="js-disabled-hidden download-button-container">
        <button class="download-button" on:click={downloadRaw} disabled={fetchingRaw}>
            <DownloadIcon size="1x" />
            { fetchingRaw ? "Loading..." : "Download raw" }
        </button>
    </div>
    <div class="up-icon {upVisible ? "up-visible" : ""}" on:click={() => window.scroll({ top: 0, behavior: "smooth" })}>
        <ArrowUpIcon size="1.5x" />
    </div>
</div>

<style lang="scss">
    @import "./blogStyle.scss";

    .footer-signature {
        display: flex;
        justify-content: space-between;
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
        max-width: 100%;
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

    .download-button-container {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    .download-button {
        color: white;
        padding: 1rem;
        border-radius: 4px;
        background-color: #272b33;
        width: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        cursor: pointer;
        border: none;
        font-size: 1rem;

        &:hover, &[disabled] {
            background-color: #16191f;
        }
    }

    .up-icon {
        position: fixed;
        right: 2rem;
        bottom: 2rem;
        background-color: #272b33;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: 200ms linear;
        width: 56px;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        &.up-visible {
            opacity: 1;
            pointer-events: all;
            transition: 200ms linear;
        }
    }
</style>