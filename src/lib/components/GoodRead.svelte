<script lang="ts">
    import InfoIcon from "svelte-feather-icons/src/icons/InfoIcon.svelte";

    type GoodRead = { url: string, post: string, author: string, invisibleFavicon?: boolean };

    const reads: GoodRead[] = [
        {
            post: "Rethinking how technology uses our personal data",
            url: "https://thecloudfall.com/",
            author: "Lennart Ziburski"
        },
        {
            post: "Figuring out round, floor and ceil with integer division",
            url: "http://blog.pkh.me/p/36-figuring-out-round%2C-floor-and-ceil-with-integer-division.html",
            author: "twitter/@insouris"
        },
        {
            post: "Fleet Below Deck, Part III — State Management",
            url: "https://blog.jetbrains.com/fleet/2022/06/fleet-below-deck-part-iii-state-management/",
            author: "Vitaly Bragilevsky"
        },
        {
            post: "Why we at $FAMOUS_COMPANY Switched to $HYPED_TECHNOLOGY",
            url: "https://saagarjha.com/blog/2020/05/10/why-we-at-famous-company-switched-to-hyped-technology/",
            author: "Saagar Jha",
            invisibleFavicon: true
        },
        {
            post: "Software disenchantment",
            url: "https://tonsky.me/blog/disenchantment/",
            author: "Niki Tonsky"
        }
    ]
</script>

<div class="content-container">
    <span class="title">
        A good read
        <div class="info">
            <InfoIcon size="1x" class="info-icon" />
            <div class="info-tooltip">A collection of blog posts and articles that peaked my interest.</div>
        </div>
    </span>
    {#each reads as read (read.url)}
        <div class="read-content">
            {#if !read.invisibleFavicon}
                <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=32&url=${read.url}`} alt="">
            {:else}
                <div class="fallback">
                    <span> => </span>
                </div>
            {/if}
            <div class="read-title">
                <a href={read.url} target="_blank">{read.post}</a>
                <span>{read.author}</span>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .content-container {
        display: flex;
        flex-direction: column;
        width: 360px;
        border-radius: 2px;
        margin: 0 2rem;
        
        span, a {
            font-family: 'JetBrains Mono', monospace;
        }

        @media (max-width: 1800px) {
            width: auto;
            margin: 0 4rem;
        }

        @media (max-width: 900px) {
            margin: 0 1rem;
        }

        @media print {
            display: none;
        }
    }

    .title {
        border-bottom: 1px solid #282C32;
        padding: 0.6rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;

        :global(.info-icon) {
            color: rgba($color: white, $alpha: 0.6);
            cursor: pointer;
        }
    }

    .info {
        position: relative;
        display: flex;
        align-items: center;

        &:hover > .info-tooltip {
            display: block;
        }
    }

    .info-tooltip {
        display: none;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -80px;
        background-color: rgba($color: #282C32, $alpha: 0.6);
        padding: 0.4rem;
        border-radius: 4px;
        border: 1px solid gray;
        width: 200px;
        text-align: center;
        font-size: 0.9rem;
    }

    .read-content {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.4rem 0 0.4rem 0.8rem;
        margin: 0.2rem 0.2rem;
        border-bottom: 1px solid #282C32;

        img {
            height: 1.4rem;
            border-radius: 2px;
        }

        .fallback {
            text-align: center;

            span {
                display: inline-block;
                width: 1.4rem;
            }
        }
    }

    .read-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        a {
            color: white;
            text-decoration: none;
            
            &:hover {
                text-decoration: underline;
            }
        }

        span:nth-child(2) {
            opacity: 0.6;
            font-size: 0.9rem;
        }
    }
</style>