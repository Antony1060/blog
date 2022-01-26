<script lang="ts">
    import type { PostWithMeta } from "../../routes/posts/Post.type";
    import { format } from "../util/date";

    export let post: PostWithMeta;

    const meta = post.metadata;

    const createdFormatted = format(new Date(meta.created));
</script>

<div class="post-container">
    <div class="top">
        <a href={`posts/en/${post.route}`}>
            {meta.title}
        </a>
        <span>{createdFormatted}</span>
    </div>
    <div class="tag-container">
        {#each (meta.tags ?? []).sort() as tag}
            <div class="tag">{tag}</div>
        {/each}
    </div>
</div>

<style lang="scss">
    * {
        font-family: 'JetBrains Mono', monospace;
    }

    a {
        $color: #e0e0e0;
        color: $color;
        font-weight: 600;
        transition: 60ms linear;
        text-decoration: underline;
        text-decoration-color: #00000000;

        &:hover {
            transition: 60ms linear;
            text-decoration-color: $color;
        }
    }

    .post-container {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        border-bottom: 1px solid #282C32;
        padding: 0.6rem;
    }

    .top {
        display: flex;
        justify-content: space-between;
        gap: 10px;

        span:nth-child(2) {
            opacity: 0.6;
            flex-shrink: 0;
        }
    }
    .tag-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        text-align: center;
        opacity: 0.8;
        pointer-events: none;
    }

    .tag {
        background-color: #282C32bb;
        padding: 0.3rem 1rem;
        font-size: 0.8rem;
        border-radius: 4px;
        text-transform: uppercase;
        min-width: 80px;
    }
</style>