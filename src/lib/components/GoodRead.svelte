<div class="content-container">
    <span class="title">A good read</span>
</div>

<style lang="scss">
    .content-container {
        display: flex;
        flex-direction: column;
        background-color: hotpink;
        width: 360px;
        
        span {
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
</style>