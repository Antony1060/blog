---
title: WebAuthn with React and Node
description: A simple introduction to WebAuthN and how it can be implemented with NodeJS and React
author: Antony
created: 2022-02-21 10:57:26
modified: 2022-02-21 10:57:26
tags: [full-stack, react, node, auth]
lang: []
hidden: true
---

<script>
    import Profile from "$lib/components/Profile.svelte"
</script>

Everyone knows the normal one or two factor authentication process we all had to go through.
Let's be real, it's boring and takes a long time to complete, especially if you have 2FA set up via SMS or E-Mail. In that case, sometimes it takes even longer because you won't get that sms/mail for the next 30 minutes (looking at you Microsoft).

This guide should help you understand how WebAuthn can help us here, how it works and hopefully how it can be implemented.

## WebAuthn to the rescue
So, what's WebAuthn? Well, it's a web standard that makes it very east to simplify this process. Instead of having an app on your phone or an E-Mail account, you usually have some sort of a physical device like a [YubiKey](https://www.yubico.com/products/) that you can use for authentication.

So, there's generally two ways authenticating with WebAuthn can go. I will explain both ways and then show how they can be [implemented](#).

#### The basics

In both cases, the following applies:
    - there are three parties involved in the process
        - The Relying Party, or RP for short (server)
        - The Browser (client)
        - The authenticator (e.g. YubiKey)
    <br />
    <br />
    - it's a two step process
        - Attestation `=>` Setting up the authenticator with the RP
        - Assertion `=>` Authenticating with the set up authenticator

The whole process works using [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). The gist of it is that the RP sends the client a challenge, the client signs the challenge and returns it back to the RP.
The RP can then check if the challange was signed correctly using the user's public key.

### 2FA and/or passwordless
One of the scenarios of how it can be used is where you know the user's username or any other identifiable information and then you can authenticate as that user with your YubiKey.
This is usually used as 2nd Factor method, but it can also be used for passwordless, but not usernameless login.

#### Attestation flow
1. RP sends the challenge to the client
2. Authenticator signs the challenge
    - optionally, the authenticator will confirm with the user about signing (this is usually just pressing a button on the key)
3. Client sends the signed challenge along with it's public key and the credential id back to the RP
4. RP stores the information which it can then use later for authentication

#### Assertion flow
1. RP sends the challenge to the client
2. Authenticator signs the challenge
    - optional confirmation
3. Client sends the signed challenge back to the RP
3. RP uses the previously stored public key to check if the challenge was signed correctly

Here's a simple diagram of how everything works.
<img src="https://media.antony.red/webauthn_2fa_dark.png" alt="WebAuthn diagram" style="max-width: 600px" />

### Usernameless
Ok, this is what everyone is excided about, passwordless ***and*** usernameless login. Yes, you can log in without even a username!
In this case, the authenticator will store a small piece of information called a `userHandle` which will be the user you want your authenticator to log you in as.
So here, instead of already knowing who we want to log in as, the authenticator tells the RP who it want's to log in as.

The flow is pretty similar to the one stated above, but let's repeat and fill in some gaps.

#### Attestation flow
1. RP sends the challenge to the client along with the user id of the user
2. Authenticator signs the challenge and stores the user id in it's memory
    - optional confirmation
3. Client sends the signed challenge along with it's public key and the credential id back to the RP
4. RP stores the information which it can then use later for authentication

#### Assertion flow
1. RP sends the challenge to the client, but this time it's not linked to any user
2. Authenticator signs the challenge
    - optional confirmation
3. Client sends the signed challenge back to the RP along with the `userHandle`
4. RP uses the previously stored public key to check if the challenge was signed correctly

A thing to note about the `userHandle`:
    - it should be a pseudo-random value
    - it should not contain any personally identifyable information
    - it must be a maximum of 64 bytes long (in JS, this is a 16 letter string)
        - if the string is longer, the authenticator will cut it off, so keep that in mind

Here's another diagram, very similar to the one above, but again with a few changes. Also this diagram describes the assertion process only because the attestation process the same as the one above.
<img src="https://media.antony.red/webauthn_usernameless_dark.png" alt="WebAuthn diagram" style="max-width: 600px" />