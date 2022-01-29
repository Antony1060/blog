<script lang=ts>
    import { page } from "$app/stores";
    import { GithubIcon } from "svelte-feather-icons";

    import "../../../static/prism-material-mine.css"
    import type { Post } from "../../routes/posts/Post.type";
    import { format } from "../util/date";

    export let post: Post;

    const createdFormatted = format(new Date(post.created));
    const modifiedFormatted = format(new Date(post.modified));

    let langPaths: { lang: string, path: string }[] = (post.lang ?? []).map(it => ({ lang: it, path: `/posts/${it}/${$page.url.pathname.split("/").filter(it => it).at(-1)}` }));
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
    <meta property="og:url" content="https://antony.cloud/{$page}">
    <meta property="og:title" content="Antony | Blog - {post.title}">
    <meta property="og:description" content={post.description}>
    <meta property="og:image">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://antony.cloud/{$page}">
    <meta property="twitter:title" content="Antony | Blog - {post.title}">
    <meta property="twitter:description" content={post.description}>
    <meta property="twitter:image">
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
            <p>
                - Antony
                <a href="https://antony.contact">Contact</a>
            </p>
        </section>
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

    .md-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        :global(section) {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        :global(:is(h1, h2, h3))::before {
            color: gray;
            content: "# ";
        }

        :global(h1) {
            font-size: 2em;

            &::before {
                content: "# ";
            }
        }

        :global(h2) {
            font-size: 1.66em;
        }

        :global(h3) {
            font-size: 1.33em;
        }

        :global(pre) {
            border: 1px solid white;
            border-radius: 4px;
        }

        :global(blockquote) {
            border-left: 3px solid #424752;
            padding: 0.6rem 1rem;
            background-color: #16191f;
        }

        :global(p) {
            line-height: 1.5rem;
            font-size: 1.1rem;
            color: rgba($color: white, $alpha: 0.9);
        }

        :global(p code) {
            background-color: #0d1117;
            padding: 0.2rem 0.4rem;
            border-radius: 2px;
            font-size: 1rem;
            border: 1px solid white;
        }

        :global(:is(ul, ol)) {
            list-style-position: inside;
            margin-left: 2rem;

            &::marker {
                color: gray;
            }
        }

        :global(a):not(.md-style-reset) {
            text-decoration: none;
            color: #5b91fc;

            &:hover {
                text-decoration: underline;
                color: #7aa7ff;
            }

            &::before, &::after {
                content: "[";
                color: gray;
                margin-right: 0.1rem;
            }

            &::after {
                content: "]";
                color: gray;
                margin-left: 0.1rem;
            }
        }

        :global(table) {
            border: 1px solid white;
            border-collapse: collapse;
            width: max-content;
        }

        :global(th) {
            border: 1px solid white;
            border-collapse: collapse;
            padding: 0.4rem;
            background-color: #16191f;
            background-color: rgba($color: white, $alpha: 0.05);
        }

        :global(td) {
            border: 1px solid white;
            border-collapse: collapse;
            padding: 0.4rem 1rem;
            text-align: center;
            background-color: #0d1117;
        }

        :global(img) {
            max-width: 100%;
        }
    }

    .content-container {
        width: 900px;
        max-width: calc(100% - 2rem);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0 1rem;
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
</style>