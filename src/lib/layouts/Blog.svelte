<script lang=ts>
    import { page } from "$app/stores";

    import "../../../static/prism-material-mine.css"
    import type { Post } from "../../routes/posts/Post.type";
    import { format } from "../util/date";
    import ArrowUpIcon from "svelte-feather-icons/src/icons/ArrowUpIcon.svelte";

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
    <div class="up-icon {upVisible ? "up-visible" : ""}" on:click={() => window.scroll({ top: 0, behavior: "smooth" })}>
        <ArrowUpIcon size="1.5x" />
    </div>
</div>

<svelte:window on:scroll={handleScroll} />

<style lang="scss">
    @import "./blogStyle.scss";
</style>