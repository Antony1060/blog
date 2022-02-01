<script>
    import Link from "./Link.svelte";
</script>

<div class="navbar-container">
    <div class="navbar-content">
        <div class="logo">
            <img style="width: 2rem;" src="https://media.antony.red/logoTransparent.png" alt="Logo">
            <a class="home-link" href="/">~/blog</a>
        </div>
        <div class="links">
            <Link href="https://antony.red">Home</Link>
            <Link href="https://antony.cloud" hideOnMobileMore>Blog</Link>
            <Link href="https://antony.contact">Contact</Link>
            <Link href="https://antony.domains" hideOnMobile>Domains</Link>
            <Link href="https://antony.cash" hideOnMobile>Donate</Link>
        </div>
    </div>
    <div class="divider"></div>
</div>

<style lang="scss">
    .navbar-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        @media print {
            display: none;
        }
    }

    .navbar-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 1rem;
        gap: 1rem;
    }

    .home-link {
        color: white;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .logo {
        font-size: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.2rem;
    }

    .links {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .divider {
        width: 100%;
        height: 2px;
        background: linear-gradient(0.25turn, #0A0D13, #f0f0f0 10%, #f0f0f0 90%, #0A0D13);
    }
</style>