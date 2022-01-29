<script>
    import Navbar from "$lib/components/navbar/Navbar.svelte";
</script>
<svelte:head>
    <style>
        * {
            font-family: Roboto, Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
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
    <div class="content-container">
        <Navbar />
    </div>
    <slot />
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

    .content-container {
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
</style>
