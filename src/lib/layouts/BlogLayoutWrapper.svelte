<script>
    import Blog from "$lib/layouts/Blog.svelte";

    export let title;
    export let description;
    export let author;
    export let created;
    export let modified;
    export let hidden;
</script>

<Blog post={{ title, description, author, created, modified, hidden }}>
    <slot />
</Blog>
