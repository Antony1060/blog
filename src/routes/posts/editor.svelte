<script lang="ts">
    import "../../../static/prism-material-mine.css";
    import "../../../static/prism-live.css";

    import { page } from "$app/stores";

    import { marked } from "marked";
    import { onMount, tick } from "svelte";
    import DownloadIcon from "svelte-feather-icons/src/icons/DownloadIcon.svelte";
    import UploadIcon from "svelte-feather-icons/src/icons/UploadIcon.svelte";

    let editorTextArea: HTMLTextAreaElement;
    let editorParsed: HTMLDivElement;

    let frontmatter: string;

    const extractFrontmatter = (str: string): { frontmattter: string, content: string } => {
        if(!str.startsWith("---")) return { frontmattter: "", content: str };
        if(str.split("---").filter(it => it).length < 2) return { frontmattter: "", content: str };
        
        let extracted = str;
        extracted = extracted.slice("---".length);
        extracted = extracted.slice(extracted.indexOf("---") + 3);
        return { frontmattter: str.slice(0, str.length - extracted.length), content: extracted.trim() };
    }

    const handleEditorChange = async () => {
        const compiled = marked.parse(editorTextArea.value);
        editorParsed.innerHTML = compiled;

        // @ts-ignore
        Prism.highlightAll();
    }

    const injectScript = (src: string) => {
        const script = document.createElement("script");
        script.src = src;
        document.body.append(script);
    }

    const injectHighligher = () => {
        injectScript("/js/prism-live.js");
    }

    let pageStatus: true | string = "Loading..."


    const downloadMarkdown = () => {
        const post = $page.url.searchParams.get("post");
        const lang = $page.url.searchParams.get("lang");

        const content = editorTextArea.value;

        const blob = new Blob([`${frontmatter}\n\n${content}`], { type: "text/markdown; charset=UTF-8; variant=GFM" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${post}-${lang}.md`;
        console.log("Downloding", link.download);
        link.click();
    }

    const readFileAsText = async (file: File) =>
        new Promise<string>(resolve => {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                resolve(reader.result as string);
            });

            reader.readAsText(file);
        })

    const loadMarkdown = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files[0];
        if(!file) return;

        const content = await readFileAsText(file);

        const mdParts = extractFrontmatter(content);
        editorTextArea.value = mdParts.content;
        frontmatter = mdParts.frontmattter;

        editorTextArea.dispatchEvent(new InputEvent("input", {
            bubbles: true,
            cancelable: true
        }));

        handleEditorChange();
    }

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

        const mdParts = extractFrontmatter(editorTextArea.value);;
        editorTextArea.value = mdParts.content;
        frontmatter = mdParts.frontmattter;
        
        handleEditorChange();

        injectHighligher();
    })
</script>

<svelte:head>
    <script src="https://blissfuljs.com/bliss.shy.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/components/prism-markdown.min.js"></script>
</svelte:head>

<span class="disclaimer">
    <span><b>NOTE:</b> This is a very primitive editor, there is a high probability the render here will be displayed differently in the actual post.</span> <br>
    <span>e.g. emojis like `:weary:` will be converted, anything in `{"{}"}` will be automatically filled etc.</span>
</span>
<div class="content-container" style="flex-direction: row; width: calc(1800px + 2rem); gap: 2rem;">
    {#if pageStatus === true}
        <div style="width: 900px; max-width: 50%;">
            <div class="js-disabled-hidden download-button-container" style="justify-content: flex-start; margin: 1rem;">
                <button class="download-button" style="width: 220px;" on:click={downloadMarkdown} disabled={false}> <!-- the disabled false is just here to silence the svelte warnings -->
                    <DownloadIcon size="1x" />
                    Download Markdown
                </button>
                <div>
                    <label for="upload-markdown" style="width: 180px;" class="download-button">
                        <UploadIcon size="1x" />
                        Load Markdown
                    </label>
                    <input id="upload-markdown" type="file" accept="text/markdown,.md" style="display: none;" on:change={loadMarkdown} />
                </div>
            </div>
            <textarea class="editor prism-live language-markdown" spellcheck={false} on:input={handleEditorChange} bind:this={editorTextArea} />
        </div>
        <div class="md-container" style="max-width: 50%; width: 900px;" bind:this={editorParsed}></div>
    {:else}
        <h2 style="width: 100%; text-align: center;">{pageStatus}</h2>
    {/if}
</div>

<style lang="scss">
    @import "../../lib/layouts/blogStyle.scss";

    .disclaimer {
        margin-bottom: 2rem;
        padding: 0 2rem;
        font-size: 1.3rem;
        width: 100%;
        text-align: center;
        color: #FE5454;
    }

    .editor {
        border-radius: 4px;
        padding: 1rem;
        font-family: "JetBrains Mono", monospace;
        max-width: 100%;
        height: 100%;
        overflow-y: hidden;
    }

    :global(code, code *) {
        font-family: "JetBrains Mono", monospace;
    }
</style>