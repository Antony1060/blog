<script lang="ts">
    import { linkNameToIcon, Profiles } from "$lib/Profiles";

    export let name: keyof typeof Profiles;

    const profile = Profiles[name];
</script>

<span class="profile-container">
    <span class="display-name">{profile.display}</span>
    <div class="profile-card">
        <div class="profile-part">
            <img src={profile.pfp} alt={profile.alias} class="pfp">
            <div class="profile-id">
                <span class="display">{profile.display}</span>
                <span><span class="dimmed">A.K.A</span> {profile.alias}</span>
            </div>
        </div>
        <div class="profile-part" style="justify-content: space-between;">
            {#each Object.keys(profile.links) as name}
                <a href={profile.links[name]} class="md-style-reset icon">
                    <svelte:component this={linkNameToIcon[name]} />
                </a>
            {/each}
        </div>
    </div>
</span>

<style lang="scss">
    .profile-container {
        position: relative;

        .display-name:hover + .profile-card {
            display: flex;
        }
    }

    .display-name {
        color: #299bfd;
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
    }

    .profile-card {
        position: absolute;
        padding: 1rem;
        background-color: #0d1117;
        border: 1px solid white;
        top: 100%;
        left: 0;
        display: none;
        flex-direction: column;
        gap: 1rem;
        min-width: 300px;
        max-width: 400px;
        flex-wrap: wrap;
        border-radius: 4px;
        z-index: 20;

        span {
            font-family: 'JetBrains Mono', monospace;
        }

        &:hover {
            display: flex;
        }
    }

    .profile-part {
        display: flex;
        gap: 1rem;
        justify-content: flex-start;
        align-items: center;
    }

    .profile-id {
        display: flex;
        flex-direction: column;

        .display {
            font-size: 1.2rem;
        }
    }

    .dimmed {
        color: #808080;
        font-size: 0.9rem;
    }

    .pfp {
        width: 3rem;
        height: auto;
        border-radius: 50%;
    }

    .icon {
        width: 2rem;
        color: hotpink;
        transition: 50ms linear;

        &:hover {
            padding: 0.1rem;
            transition: 50ms linear;
        }
    }
</style>