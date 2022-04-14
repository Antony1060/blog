---
title: The Moonlander philosophy
description: The beauty of optimizing your software
author: Antony
created: 2022-03-24 21:44:58
modified: 2022-03-24 21:44:58
tags: ["software", "random"]
lang: []
hidden: true
---

<script>
    import Profile from "$lib/components/Profile.svelte"
</script>

Alright, let me preface this by saying this is not attacking anyone in any way, this is just me putting out an idea.

## The beginnings
At it's core, ***Moonlander*** is an idea of optimizing almost everything possible in some task.

Once, a few months ago. <Profile name="luc" /> and I found ourselves writing a small platform for food shops to use to make their online delivery process easier. This idea was later scraped but it's kinda important to the story.

### Temporary disappointment // Change this please
One of the endpoints in the prototype had to reach out to the database multiple times at once, 6 to be percise.
As you might have expected, this was tediously slow and made our development slower and would eventually make UX worse.
The average request response time was around 7 seconds...

So we hopped in a VC, and after a few hours of tinkering we managed to bring those times down to around 10ms (yes, those are milliseconds). Remember, these were 6 database requests.
And some requests even reached 5ms on a locally hosted DB.

#### Helpful stuff
Some of the tools we used to achieve this were [Scylla](https://www.scylladb.com/) as a database, something like MySQL would have never been able to get those times.
And we used [Sentry](https://sentry.io/) for logging and tracking. It's a very useful piece of software when set up correctly.

## The name
Ok, but why the name?

## The idea
