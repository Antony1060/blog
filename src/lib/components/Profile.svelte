<script context="module" lang="ts">
    import { Profiles, Link } from "$lib/Profiles";
    import GithubIcon from "svelte-feather-icons/src/icons/GithubIcon.svelte"
    import LinkedinIcon from "svelte-feather-icons/src/icons/LinkedinIcon.svelte"
    import InstagramIcon from "svelte-feather-icons/src/icons/InstagramIcon.svelte"
    import TwitterIcon from "svelte-feather-icons/src/icons/TwitterIcon.svelte"
    import YoutubeIcon from "svelte-feather-icons/src/icons/YoutubeIcon.svelte"
    import MailIcon from "svelte-feather-icons/src/icons/MailIcon.svelte"
    import GlobeIcon from "svelte-feather-icons/src/icons/GlobeIcon.svelte"
    
    export const linkNameToIcon: Record<Link, typeof GithubIcon> = {
        "github": GithubIcon,
        "linkedin": LinkedinIcon,
        "instagram": InstagramIcon,
        "twitter": TwitterIcon,
        "youtube": YoutubeIcon,
        "email": MailIcon,
        "website": GlobeIcon
    }
</script>

<script lang="ts">
    import { onMount, tick } from "svelte";

    export let name: keyof typeof Profiles;

    const profile = Profiles[name];

    let profileCard: HTMLDivElement;

    const adjustCardPosition = () => {
        const overflow = (profileCard.parentElement.getBoundingClientRect().x + 300) - window.innerWidth;
        profileCard.style["left"] = Math.min(0, -(overflow + 20)) + "px";
    }

    let pc = false;

    onMount(async () => {
        pc = true;
        await tick();

        adjustCardPosition()
    })
</script>

<svelte:window on:resize={adjustCardPosition} />

<svelte:head>
    <noscript>
        <style>
            .display-name {
                cursor: default !important;
            }
        </style>
    </noscript>
</svelte:head>

<span class="profile-container">
    <span class="display-name">{profile.displayAlias ? profile.alias : profile.display}</span>
    {#if pc}
        <div class="profile-card" bind:this={profileCard}>
            <div class="profile-part">
                <img src={profile.pfp} alt={profile.alias} class="pfp md-style-reset">
                <div class="profile-id">
                    <span class="display">{profile.display}</span>
                    {#if profile.alias}
                        <span><span class="dimmed">A.K.A</span> {profile.alias}</span>
                    {/if}
                </div>
            </div>
            <div class="profile-part" style="justify-content: space-around;">
                {#each Object.keys(profile.links) as name}
                    <a href={profile.links[name]} target="_blank" class="md-style-reset icon">
                        <svelte:component this={linkNameToIcon[name]} />
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</span>

<style lang="scss">
    .profile-container {
        position: relative;
        display: inline-block;

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
        white-space: nowrap;
    }

    .profile-card {
        position: absolute;
        padding: 1rem;
        background-color: #0d1117;
        border: 1px solid white;
        top: calc(100% - 1px);
        left: 0;
        display: none;
        flex-direction: column;
        gap: 1rem;
        width: 300px;
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