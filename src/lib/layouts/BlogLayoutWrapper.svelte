<script>
    // @ts-nocheck
    
    import Blog from "$lib/layouts/Blog.svelte";
</script>

<Blog post={$$props}>
    <slot />
</Blog>
