<script lang="ts">
    export let href: string;
</script>

<a class="link" href={href}>
    <span>./</span>
    <span><slot /></span>
</a>

<style lang="scss">
    .link {
        display: flex;
        text-decoration: none;
        color: gray;

        span:nth-child(2) {
            color: rgba(255, 255, 255, 0.8);    
        }

        &:hover {
            text-decoration: underline;
        }

        &:hover span:nth-child(2) {
            color: white;
        }
    }
</style>