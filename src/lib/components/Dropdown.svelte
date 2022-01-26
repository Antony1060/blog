<script lang="ts">
    export let title: string;
    export let preTitle: string = "";
    export let roundedBorders: boolean = false;
    export let closeOnClick: boolean = false;

    let div: HTMLDivElement;
    let dropped = false;

    const handleClick = (e: MouseEvent) => {
        if(e.target === e.currentTarget || closeOnClick)
            dropped = !dropped
    }

    const handleBodyClick = (e: MouseEvent) => {
        if(e.target instanceof Node && !div.contains(e.target))
            dropped = false;
    }
</script>

<svelte:body on:click={handleBodyClick} />

<div class={`dropdown-container ${dropped ? 'dropped' : ''} ${roundedBorders ? 'round-borders' : ''}`} on:click={handleClick} bind:this={div}>
    {#if preTitle}
        <span class="pre-title" on:click={!closeOnClick ? handleClick : undefined}>{preTitle}</span>
    {/if}
    <span on:click={!closeOnClick ? handleClick : undefined}>{title}</span>
    {#if dropped}
        <div class="content-container">
            <slot />
        </div>
    {/if}
</div>

<style lang="scss">
    .dropdown-container {
        height: 100%;
        background-color: #272b33;
        cursor: pointer;
        width: 160px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.4rem;
        padding: 0.6rem;
        position: relative;
        user-select: none;

        &.round-borders {
            border-radius: 0 4px 4px 0;

            &.dropped {
                border-radius: 0 4px 0 0;
            }
        }
    }
    
    span {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
    }

    .pre-title {
        opacity: 0.6;
    }

    .content-container {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 10;
        background-color: #272b33;
        width: 160px;
        border-radius: 0 0 4px 4px;
    }
</style>