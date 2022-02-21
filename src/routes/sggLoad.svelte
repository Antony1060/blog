<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";

    export const load: Load = async ({ fetch }) => {
        await fetch("/rss.xml"); // literally just a fucking filler, because svelte doesn't want to parse rss.xml without it being called in a component, fuck this, wasted 40 minutes on this
        await fetch("/allRaw.json")

        return {}
    }
</script>

<div>
    Hi
</div>