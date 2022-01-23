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
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap');
        
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

<style>
    :global(.code-block-name) {
        display: block;
        font-family: 'JetBrains Mono', monospace;
        background-color: #1c2129;
        width: 100%;
    }
</style>