<script lang=ts>
    import "../../../static/prism-material-gh.css"
    import type { Post } from "../../routes/posts/Post.type";

    export let post: Post;
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
    <slot />
    <hr>
    <h1>footer</h1>
</div>