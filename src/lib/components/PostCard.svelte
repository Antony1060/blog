<script lang="ts">
    import type { PostWithMeta } from "../../routes/posts/Post.type";

    export let post: PostWithMeta;

    const meta = post.metadata;
</script>

<div>
    <a href={`posts/${post.route}`}>{meta.title}</a>
</div>

<style lang="scss">
    a {
        color: white;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
</style>