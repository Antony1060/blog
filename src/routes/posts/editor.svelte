<script lang="ts">
    import { page } from "$app/stores";

    import { marked } from "marked";
    import { onMount, tick } from "svelte";

    let editorTextArea: HTMLTextAreaElement;
    let editorParsed: HTMLDivElement;

    const removeFrontmatter = (str: string) => {
        if(!str.startsWith("---")) return str;
        if(str.split("---").filter(it => it).length < 2) return str;
        
        str = str.slice("---".length);
        str = str.slice(str.indexOf("---") + 3);
        return str.trim();
    }

    const handleEditorChange = async () => {
        editorTextArea.value = removeFrontmatter(editorTextArea.value);
        const compiled = marked.parse(editorTextArea.value);
        editorParsed.innerHTML = compiled;
    }

    let pageStatus: true | string = "Loading..."

    onMount(async () => {
        if(!$page.url.searchParams.has("post") || !$page.url.searchParams.has("lang")) {
            pageStatus = "Post undefined";
            return;
        }

        const post = $page.url.searchParams.get("post");
        const lang = $page.url.searchParams.get("lang");

        const resp: Record<string, string> = await fetch("/allRaw.json").then(res => res.json());
        const content = resp[`${lang}/${post}.md`];
        if(!content) {
            pageStatus = "Post unknown";
            return;
        }

        pageStatus = true;
        await tick();
        editorTextArea.value = content;
        handleEditorChange();
    })
</script>

<div class="content-container" style="flex-direction: row; width: calc(1800px + 2rem); gap: 2rem;">
    {#if pageStatus === true}
        <textarea class="editor-area" on:input={handleEditorChange} bind:this={editorTextArea} />
        <div class="md-container" style="max-width: 50%; width: 900px;" bind:this={editorParsed}></div>
    {:else}
        <h2 style="width: 100%; text-align: center;">{pageStatus}</h2>
    {/if}
</div>

<style lang="scss">
    @import "../../lib/layouts/blogStyle.scss";

    .editor-area {
        width: 900px;
        max-width: 50%;
        border-radius: 4px;
        border: 1px solid white;
        background-color: #0d1117;
        color: white;
        padding: 1rem;
    }
</style>