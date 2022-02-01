---
title: The Journey
description: The making of this blog and my first time using SvelteKit
author: Antony
created: 2022-01-31 22:44:46
modified: 2022-01-31 22:44:46
tags: [frontend, svelte, markdown, svg]
lang: []
hidden: false
---

<script>
    import Profile from "$lib/components/Profile.svelte"

    // difference in years but also accounts for leap years
    const selfAge = () => {
        const birth = new Date("2004-10-22");
        const now = new Date();
        const primitiveYears = now.getFullYear() - birth.getFullYear();
        now.setDate(now.getDate() - Math.floor(primitiveYears / 4));
        const y = (now.getTime() - birth.getTime()) / 1000 / 60 / 60 / 24 / 365;
        return Math.floor(y);
    }
</script>

And so it begins! Alright, I guess I should first start with a question you're all probably wondering, who even am I?

## Who?
I'm a <span>{ selfAge() }</span> year old :sparkles: **aspiring** :sparkles: full stack dev sort of gravitating towards the backend part of fullstack.
Currently I've done a few commission type jobs for a few people, out of which I'd like to give a shoutout to one of the best people I've ever worked with, <Profile name="lego" /> and <Profile name="isaac" />. These people provided me with soo many opportunities and I definetely wouldn't be where I am today without them.

I'm currently still open for comissions, but I'm really starting to love open source development so I'm doing a bit of that too.

Alright, enough about me, let's get into [why](#why), [what](#what), [where](#where), and [how](#how) this blog came into existance.

## Why?
So, why did I make this blog?

I felt like writing my random thoughts and giving them to the world,
also I feel like having a blog would help with my reputation as a developer.
It was also a really good excuse to try doing something with [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/), which, so far, has been really amazing.

## What?

## How?

## Where?

## SVGs :heart:

