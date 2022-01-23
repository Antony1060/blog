<script lang=ts>
import { onMount } from "svelte";

    import "../../../static/prism-material-mine.css"
    import type { Post } from "../../routes/posts/Post.type";

    export let post: Post;

    let mdContainer: HTMLDivElement;

    onMount(() => {
        const codeBlocks = Array.from(mdContainer.querySelectorAll('pre[class*="language-"]'))
                                .filter(it => it.className.startsWith("language-"));

        for(const block of codeBlocks) {
            const span = document.createElement("span");
            span.innerText = block.className.slice("language-".length);
            span.classList.add("code-block-name");
            block.prepend(span);
        }
    })
</script>

<svelte:head>
    <title>Antony | Blog - {post.title}</title>
    <style>
        code, code * {
            font-family: 'JetBrains Mono', monospace !important;
        }
    </style>
</svelte:head>

<div>
    <h1>{post.title}</h1>
    <h4>{post.description}</h4>
    <h4>{post.author}</h4>
    <h4>{post.created}</h4>
    <h4>{post.modified}</h4>
    <hr>
    <div bind:this={mdContainer}>
        <slot />
    </div>
    <hr>
    <h1>footer</h1>
</div>

<style lang="scss">
    :global(.code-block-name) {
        display: block;
        font-family: 'JetBrains Mono', monospace;
        padding: 0 0 0.4rem 0.6rem;
        margin-bottom: 0.4rem;
        border-bottom: 1px solid #16a21c66;
    }
</style>