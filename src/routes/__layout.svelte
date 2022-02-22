<script>
    import { navigating } from "$app/stores";

    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import NProgress from "nprogress";
    import RssIcon from "svelte-feather-icons/src/icons/RssIcon.svelte";

    import "nprogress/nprogress.css";

    NProgress.configure({
        showSpinner: false
    });

    $: {
        $navigating ?
            NProgress.start()
        :
            NProgress.done()
    }
</script>

<svelte:head>
    <style>
        * {
            font-family: Roboto, Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        *::-webkit-scrollbar {
            background-color: #151a22;
        }
        
        *::-webkit-scrollbar-thumb {
            background-color: #272b33;
        }

        body {
            background-color: #0A0D13;
            color: white;
        }
    </style>

    <noscript>
        <style>
            .js-disabled-hidden {
                display: none !important;
            }
        </style>
    </noscript>
</svelte:head>

<div class="page-container">
    <div class="navbar-container">
        <Navbar />
    </div>
    <slot />
    <div class="bottom-container">
        <a class="rss" href="/rss.xml" target="_blank"><RssIcon size="1.5x" /> RSS</a>
        <a class="git-version" href="https://github.com/Antony1060/blog" target="_blank">Version {import.meta.env.VITE_COMMIT_REF ?? ""}</a>
    </div>
</div>

<style lang="scss">
    .page-container {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 2rem;
    }

    .navbar-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 1000px;
        max-width: 100%;
        gap: 2rem;
        padding: 2rem;
        text-align: start;
    }

    .bottom-container {
        display: flex;
        margin-top: 2rem;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }

    .git-version {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        
        &:hover {
            color: white;
            text-decoration: underline;
        }

        @media print {
            display: none;
        }
    }

    .rss {
        color: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        gap: 0.4rem;
        text-decoration: none;

        &:hover {
            color: white;
            text-decoration: underline;
        }
    }

    :global(#nprogress .bar) {
        background-color: #e4e4e466;
    }

    :global(#nprogress .peg) {
        box-shadow: 0px 0px 10px #e4e4e488, 0px 0px 5px #e4e4e488;
    }
</style>
