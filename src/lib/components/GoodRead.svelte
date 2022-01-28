<script lang="ts">
    type GoodRead = { url: string, post: string, author: string };

    // TODO: type profiles
    const reads: GoodRead[] = [{
        post: "Software disenchantment",
        url: "https://tonsky.me/blog/disenchantment/",
        author: "Niki Tonsky"
    },
    {
        post: "Web3 Authentication",
        url: "https://luc.computer/p/web3-auth",
        author: "Luc van Kampen"
    }]
</script>

<div class="content-container">
    <span class="title">A good read</span>
    {#each reads as read (read.url)}
        <div class="read-content">
            <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=32&url=${read.url}`} alt="">
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
    }

    .title {
        border-bottom: 1px solid #282C32;
        padding: 0.6rem;
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