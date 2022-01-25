<script lang="ts">
    import type { PostWithMeta } from "../../routes/posts/Post.type";

    export let post: PostWithMeta;

    const meta = post.metadata;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
    meta.created = new Date(meta.created);
    const createdFormatted = `${monthNames[meta.created.getMonth()]} ${(meta.created.getDate() + "").padStart(2, "0")} ${meta.created.getFullYear()}`;
</script>

<div>
    <div class="post-container">
        <a href={`posts/${post.route}`}>
            {meta.title}
        </a>
        <span>{createdFormatted}</span>
    </div>
</div>

<style lang="scss">
    a {
        color: white;
        text-decoration: none;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }

    .post-container {
        display: flex;
        justify-content: space-between;
        /* background-color: #282C32; */
        padding: 0.6rem;
        /* border-radius: 4px; */
        border-bottom: 1px solid #282C32;

        span:nth-child(2) {
            opacity: 0.6;
        }
    }
</style>