---
title: The File Transfer Protocol...
description: Ugh, FTP. A rant about the world's most popular file transfer protocol
author: Antony
created: 2022-02-04 23:17:28
modified: 2022-02-04 23:17:28
tags: [rant, networking]
lang: []
hidden: false
---

<script>
    import Profile from "$lib/components/Profile.svelte"
</script>

I'm sure all of you have already heard about FTP or SFTP. It's everywhere... and it sucks.
I would even say it's the worst protocol idea to exist since the beginning of the internet.

## So why am I complaining?
We have all used FTP, one way of another. But not everyone knows how it actually works.

FTP will open a new TCP connection for each and every transfer that it does... sequentially. If you don't already see why this is soo terrible.
Well, imagine you need to upload something(duh..), but let's say it's a directory with ~1000 other sub-directories and files all totaling to around 15MiB. Not a lot, you might think, this should take a few seconds to upload at most.

> Well, hehe, ***no***.

Depending on your internet speed, this will take a couple of minutes, if not tens of minutes. There will be 1000, if not more TCP connections open. And this is the one of it's biggest bottlenecks.
The other problem is the way it handles deleting directories. It doesn't. If you ever wanted to delete a directory, you would have to recursiveley go through every sub-directory and delete each file individially, making more TCP connections along the way.
Yeah, FTP does not have a method for that, ***why?!?!?***

### A real world example
You might think that this is not such a big issue since you most likely won't have a file structure as I described above.
But I had to deal with this a lot more than I should've in the past. If you've ever worked on setting up Minecraft servers, you probably know what I'm talking about.
See, Minecraft worlds are structured almost exactly how I described it above. They're made up of a lot of small files which, when you add them up, are not big at all. ...
And it still takes FTP multiple minutes to delete them, aaargh. And it's even worse if you want to upload a new world later.

Same thing happens with larger codebases consisting of hundreds of files. Of course, if you still have any sanity left in you, you would use Git or some other VCS to move around your code.
But sadly that's not always the case, which I got to learn the hard way. So ***FTP to the rescue*** I guess.

If you're wondering why I'm complaining about a couple of minutes, go and read [Software Disenchantment](https://tonsky.me/blog/disenchantment/). It's a really entertaining blog post by <Profile name="nikitonsky" />.

### BuT Antony, SfTp ExIsTs
Yes, SFTP does exist. And it is better than FTP... sometimes. SFTP is a lot more secure, thanks to one of the best protocols out there [SSH](https://en.wikipedia.org/wiki/Secure_Shell).
But additional security, doesn't eliminate the speed issues. I've experienced SFTP to be slower than FTP in the real world, but for some reason, it showed to be a bit faster while I was doing testing for this post.

## Alternatives
Ok, do this post doesn't end up me just ranting and being useless, I'll give you a few amazing alternatives to FTP. I won't get into too much detail here, I would just like to mention they exist.

#### RSYNC [Man](https://linux.die.net/man/1/rsync) [Wiki](https://en.wikipedia.org/wiki/Rsync)
This is probably one of the most versitile utilities for transfering files. While not being a protocol itself, it does work over SSH, and we all love SSH.
It's fast, it's simple and it works. Hell, you can even copy files while keeping their permissions, groups, links, modification times etc.

Performing a basic file copy is as simple as:
```bash
rsync -avP /source username@host:/destination
```

You can also add an optional `--delete` flag to delete extra files from destination

#### SCP [Man](https://linux.die.net/man/1/scp) [Wiki](https://en.wikipedia.org/wiki/Secure_copy_protocol)
Secure copy protocol is also a very nice thing if you want to perform a very easy and basic copy to a remote location. It also works via SSH.
It's a bit more easy to use than RSYNC but not nearly as versitile.

A file copy can be done with:
```bash
scp -r /source username@host:/destination
```

#### Good ol' HTTPS
Well, HTTPS, as you probably know, is not a protocol for transfering files. But it can do it. And from my usage in the real world I saw it performed amazingly.
[Pterodactyl](https://pterodactyl.io/) has an absolutely amazing file manager working over just HTTP(S) and it has been nothing but joy to work with.

In my testing I just set up a very simple Express app that is just grabbing files and writing them to disk.

Here's the relevant code:
```ts
app.post("/upload", multer().any(), async (req, res) => {
    const files = req.files;
    if(!files || !files.length || !Array.isArray(files))
        return res.status(400);

    for(const file of files) {
        const destination = `./upload/${file.originalname}`;
        const dir = dirname(destination);
        fs.mkdir(dir, { recursive: true });
        fs.writeFile(destination, file.buffer);
    }
    
    logger.info("Uploaded " + files.length + " files (" + files.reduce((acc, curr) => acc + curr.size, 0) + " bytes)")
    res.status(201).end();
});
```

And to upload, I made a small shell script to collect all the files and make a request to the server
```bash
#!/bin/bash

FILES=$(find world/ -type f -exec printf " -F files[]=@{}" \\;)

curl $FILES http://host:port/upload
```

## Benchmarks
And to finish off all this, I did some very basic and very primitive benchmarks.
I just grabbed a random Minecraft world I had on my computer and uploaded it using each one of these protocols.
Note that the point of the benchmarks isn't accuracy but just to show the difference between the speeds.
Since these speed differences are kind of big, I didn't really bother performing an actual benchmark.

<div class="table-container" style="white-space: nowrap;">

| File | FTP :poop: | SFTP | RSYNC | SCP | HTTPS :crown: |
| ---- | ---------- | ---- | ----- | --- | ------------- |
| 15.1MiB <br /> 26 files <br /> 7 sub-folders | 38816.23ms | 21432.61ms | 6162.22ms | 12516.86ms | 5320.15ms |

</div>

These speeds can vary, so take ~2 seconds as a margin of error.

As we can see, FTP performed absolutely terrible. ~7x slower than HTTPS. This is actually a lot slower than I expected before I started writing.
SFTP did perform a bit better but it's still a lot slower than the other 3 options.

## Final words
All being said, I don't actually "hate" FTP, it's an easy solution. I do still believe that it should start getting replaced.
In the current day and age, there's really no place for such an old and slow protocol. This doesn't mean it should be completely eliminated, but users should have an option to use FTP or some other better solution.