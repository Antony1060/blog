---
title: Putovanje
description: Uvod i avantura iza ovog bloga
author: Antony
created: 2022-02-02 20:50:42
modified: 2022-02-02 20:50:42
tags: [frontend, svelte, markdown, svg]
lang: [en]
hidden: true
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
Currently I've done a few commission type jobs for a few people, out of which I'd like to give a shoutout to some of the best people I've ever worked with, <Profile name="lego" /> and <Profile name="isaac" />. These people provided me with soo many opportunities and I definetely wouldn't be where I am today without them.

I'm currently still open for comissions, but I'm really starting to love open source development so I'm doing a bit of that too.

Alright, enough about me, let's get into [why](#why), [what](#what) and [where](#where) this blog came into existance.

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
A couple of my colleagues used Astro for building [their](https://luc.computer) [blogs](https://helgesson.dev/p) and I've heard that Astro still doesn't have good IDE support. So me being me, I didn't even give it a chance and went straight into Svelte.

And I have to say, I was not disappointed, Svelte has a few of it's quirks (but so does every other framework) but it's a really nice and intuitive framework.
I would even go as far as to say it stands a chance to be my second favourite framework, right next to React.

#### The tech stack
Currently the tech stack looks like this:
- Svelte(Kit)
    - the actual web framework
    - handles SSG, compression and other optimizations
- MDsveX
    - the Svelte version of MDX
    - does Markdown preprocessing <span style="opacity: 0;">; also, has really sometimes poor fu*king typescript support</span>
    - customized with a few [Remark](https://github.com/remarkjs/remark) and [Rehype](https://github.com/rehypejs/rehype) plugins
- OpenGraph Images
    - Custom built solution for generating banners on the fly
- Fonts
    - JetBrains Mono
    - Roboto

Wow, that list is short. At the time of writing this, I genuinely expected this to be longer...Well I hope this shows that making a blog is really not that complicated. (don't use wordpress though, please).

## Where?
Ooo, this is exciting! Time to talk about how I deploy this thing. :truck:

At first, while I was still developing this, I used [Netlify](https://netlify.com). And I originally planned to use this to serve the production site.
But that's boring, *it just works*, that's not fun.

Seriously though, I have nothing against netlify, it really is a *just works* platform.
But that doesn't mean it's flawless. One of the things I find slightly frustrating about it is that it has obnoxiously long load times here in Europe (that might just be my bad internet tho :shrug:).

#### Signal :eyes:
My current solution of choice is Signal. And no, not **that** [Signal](https://signal.org).
See, a good friend of mine <Profile name="luc" /> took on a personal project of making a..\..\..\..

![Discord DM](https://media.antony.red/CjunME.png)

..., ok whatever, basically it deploys your website and serves it, here's the [GitHub repo](https://github.com/lvkdotsh/signal-edge/). Anyways so I chose that to host my website.
And so far, it's been amazing. Deploy times are extremely quick, autodeployment was really simple to set up and the loading times are ⚡ blazing fast.

At the time of writing, there's one instance of it deployed on a shared k8s cluster of ours so there's no public interface for it.

## SVGs :heart:

So, you know [OpenGraph](https://ogp.me/)? That protocol "that enables any web page to become a rich object in a social graph".
If this doesn't sound familiar, think of it as a spec for those nice looking Discord/Slack/Twitter/Facebook embeds that get generated once you paste a link to some site.
And if you haven't already noticed, this blog has those, and they change for every blog post. Example for this specific post: 

![OpenGraph card](https://cards.antony.cloud/post?title={title}&description={description}&type=png)

As you can see, it has the title and the description in the image itself.

So how did I achieve this?<br/>***SVGs***

I'm still a bit fascinated how you can generate images just using text, no actual computation needed.

If you take a look at the url of that image:
```
https://cards.antony.cloud/post?title={title}&description={description}&type=png
```
you can see that it goes to a [service that I wrote](https://github.com/Antony1060/svg-gen) and provides it with a title and a description and it dynamically generates the image.
This is handled by SSG so built html pages will have them already filled in.
Keep in mind that images are in SVG format by default, and OpenGraph does not support using SVGs as an image.... crap.
I figured converting an SVG to a PNG would not be hard, and I was right, it was not hard. But since I originally wrote this as a serverless function on Netlify (which was hell, I'm never doing that again), the environment was missing a font I needed so the final PNG images were looking terribly broken. In the end I ended up just writing a fastify app to serve the images.

**What did we learn from this?** <br/>
SVGs :heart:, Serverless :poop:

## Final words
Alright folks, that's it. If you made it this far, I'd just like to thank you for reading this post, hopefully you enjoyed it. Have a nice rest of your day :smile: