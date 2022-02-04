---
title: FTP Sucks
description: Ugh, FTP. A rant about the world's most popular file transfer protocol
author: Antony
created: 2022-02-04 23:17:28
modified: 2022-02-04 22:17:28
tags: [rant, networking]
lang: []
hidden: true
---

<script>
    import Profile from "$lib/components/Profile.svelte"
</script>

I'm sure all of you have already heard about FTP or SFTP. It's everywhere... and it sucks.
I would even say it's the worst protocol idea to exist since the beginning of the internet.

## So why am I complaining?
We have all use FTP, one way of another. But not everyone knows how it actually works.

FTP will open a new TCP connection for each and every action that it does... sequentially. If you don't already see why this is soo terrible.
Well, imagine you need to upload something(duh..), but let's say it's a directory with ~1000 other subdirectories and files all totaling to around 15MB. Not a lot, you might thing, this should take a few seconds to upload at most.

Well, hehe, no.

Depending on your internet speed, this will take a couple of minutes, if not tens of minutes. There will be 1000, if not more TCP connections open. And this is the one of it's biggest bottlenecks.
The other problem is the way it handles mass data. It doesn't. If you ever wanted to delete a directory, you would have to recursiveley go through every subdirectory and delete each file individially, making more TCP connections along the way.
Yeah, FTP does not have a method for that, ***why***?!?!?

### A real world example
You might think that this is not such a big issue since you most likely won't have a file structure as I described it above.
But I had to deal with this a lot more than I should've in the past. If you've ever worked on setting up Minecraft servers, you probably know what I'm talking about.
See, Minecraft worlds are structured almost exactly how I described it above. They're made up of a lot of small files which, when you add them up, are not big at all. ...
And it still takes FTP multiple minutes to delete it, aaargh. And it's even worse if you want to upload a new world later.
If you're wondering why I'm complaining about a couple of minutes, go and read [Software Disenchantment](https://tonsky.me/blog/disenchantment/). It's a really entertaining blog post by <Profile name="nikitonsky" />.

## Benchmarks

## Alternatives