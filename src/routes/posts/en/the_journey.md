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
It was also a really good excuse to try doing something with [Svelte](https://svelte.dev/), which, so far, has been really amazing.

## What?
I won't get too much into detail about how this was made since it's literally just a static [SvelteKit](https://kit.svelte.dev) project that parses markdown files(the posts), but I do think you'll enjoy reading about my pain and suffering durign the process. :wink:

#### So why Svelte?
Well, I wanted to learn Svelte... buuut I also needed a good way of handling SSG (Server side generation) and for that I basically had 2 options: [Astro](https://astro.build/) and well... Svelte.
These were the only two options that I knew could handle SSG well.
A couple of my colleagues used astro for building [their](https://luc.computer) [blogs](https://helgesson.dev/p) and I've heard that Astro still doesn't have good IDE support.So me being me, I didn't even give it a change and went straight into Svelte.

And I have to say, I was not disappointed, Svelte has a few of it's quirks(but so does every other framework) but it's a really nice and intuitive framework.
I would even go as far as to say it stands a chance to be my second favourite framework, right next to React.

#### The tech stack
Currently the tech stack looks like this:
- Svelte(Kit)
    - the actual web framework
    - handles SSG, compression and other optimization
- MDsveX
    - the Svelte version of MDX
    - does Markdown preprocessing <span style="opacity: 0;">; also, has really sometimes poor fu*king typescript support</span>
    - customized with a few [Remark](https://github.com/remarkjs/remark) and [Rehype](https://github.com/rehypejs/rehype) plugins
- Fonts
    - JetBrains Mono
    - Roboto

Wow, that list is short. At the time of writing this, I genuinely expected this to be longer...Well I hope this shows that making a blog is really not that complicated. (don't use wordpress though, please).

## How?


## Where?
Ooo, this is exciting! Time to talk about how I deploy this thing. :truck:

At first, while I was still developing this, I used [Netlify](https://netlify.com). And I originally planned to use this to serve the poroduction site.
But that's boring, *it just works*, that's not fun.

Seriously though, I have nothing against netlify, it really is a just works platform.
But that doens't mean it's flawless. One of the things I find slightly frustrating about it is that it has obnoxiously long load times here in Europe (that might just be my bad internet tho :shrug:).

#### Signal :eyes:
My current solution of choice is Signal. And no, not **that** [Signal](https://signal.org).
See, a good friend of mine <Profile name="luc" /> took on a personal project of making a........

<img src="https://media.antony.red/CjunME.png" alt="Discord DM" style="width: 400px; height: auto;" />

..., ok whatever, basically it deploys your websate and servies it, here's the [GitHub repo](https://github.com/lvkdotsh/signal-edge/). Anyways so I chose that to host my website.
And so far, it's been amazing. Deploy times are extremely quick, autodeployment was really simple to set up and the loading speeds are ⚡ blazing fast.

At the time of writing, there's one instance of it deployed on a shared k8s cluster of ours so there's no public interface for it.

## SVGs :heart:

