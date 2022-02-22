---
title: WebAuthn with React and Node
description: A simple introduction to WebAuthN and how it can be implemented with NodeJS and React
author: Antony
created: 2022-02-21 10:57:26
modified: 2022-02-21 10:57:26
tags: [full-stack, react, node, auth]
lang: []
hidden: false
---

<script>
    import Profile from "$lib/components/Profile.svelte"
</script>

Everyone knows the normal one or two factor authentication process we all had to go through.
Let's be real, it's boring and takes a long time to complete, especially if you have 2FA set up via SMS or E-Mail. In that case, sometimes it takes even longer because you won't get that sms/mail for the next 30 minutes (looking at you Microsoft).

This guide should help you understand how WebAuthn can help us here, how it works and hopefully how it can be implemented.

## WebAuthn to the rescue
So, what's WebAuthn? Well, it's a web standard that makes it very east to simplify this process. Instead of having an app on your phone or an E-Mail account, you usually have some sort of a physical device like a [YubiKey](https://www.yubico.com/products/) that you can use for authentication.

There's generally two ways authenticating with WebAuthn can go. I will explain both ways and then show how they can be [implemented](#).

#### The basics

In both cases, the following applies:
    - there are three parties involved in the process
        - The Relying Party, or RP for short (server)
        - The browser (client)
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
So here, instead of already knowing who we want to log in as, the authenticator tells the RP who it wants to log in as.

This process is usually referred to as [Resident Key](https://developers.yubico.com/WebAuthn/WebAuthn_Developer_Guide/Resident_Keys.html) authentication. And I will refer to it as that from now on.

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

Also, another popular way of doing usernameless + passwordless login today is via ✨***blockchain*** ✨. A colleague of mine, <Profile name="luc" /> wrote a nice [post](https://luc.computer/p/web3-auth) about it.

## Implementation with Node and React
Alright, time for the fun part(sometimes), the code! Note that I will assume you have or know how to set up a login system.

- **[Second Factor](#as-a-second-factor)**
- **[Usernameless + Passwordless](#usernameless--passwordless)**

### Installing dependencies
There's basically only one dependency we really need, that being [fido2-lib](https://www.npmjs.com/package/fido2-lib).

Obvious note: if you're using NPM, use `npm install` isntead of yarn... duh

```bash
yarn add fido2-lib base64-arraybuffer
```
We'll use `fido2-lib` handles all cryptography and makes our lives a lot easier.
And `base64-arraybuffer` which ... webauthn really loves [ArrayBuffers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) ... and we need a way of transferring them over the network. This will lead to some very painful typescript soon enough.

**Important disclaimer:** fido2-lib sadly doesn't have webauthn extension support which is necessary for Resident Keys to work.
Luckily, there is a [fork](https://github.com/efabris/fido2-lib/tree/extension_support) of the project that is relatively in sync with the original. If you're getting build errors with it though, first thing you should check is your not version, because this does **not** work with Node 17. Trust me, I learned the hard way.

Installation is as follows:
```bash
yarn add "https://github.com/efabris/fido2-lib#extension_support"
```

<br />

Also, before I begin, if you wish to check out how this whole flow works, I built a simple [full-stack example](https://webauthn.antony.cloud) for it. **[Git](https://github.com/antony1060/webauthn-demo)**


### Initializing the library
Before anything we must set up our Fido2 instance on the server.
```ts
const fido2 = new Fido2Lib({
    timeout: 30 * 1000,
    rpId: "localhost",
    rpName: "antony-cloud",
    rpIcon: "https://media.antony.red/logoTransparent.png",
    challengeSize: 128,
    attestation: "direct",
    cryptoParams: [-7, -257],
    authenticatorAttachment: "cross-platform",
    authenticatorUserVerification: "discouraged",
    authenticatorRequireResidentKey: false
});
```
Ok, let me explain what some of these options mean now.
- `timeout`
    - the amount of time the browser will wait for the authenticator to respond
- `rpId`
    - identifier of the Relying Party, this is usually set to the hostname of your website
- `attestation`
    - can be "direct", "indirect" or "none", you usually want to stick with "direct" [Docs](https://developers.yubico.com/WebAuthn/WebAuthn_Developer_Guide/WebAuthn_Client_Registration.html)
- `cryptoParams`
    - an array of allowed cryptographic algorithms, a full list can be found [here](https://www.iana.org/assignments/cose/cose.xhtml#algorithms); we use ES256 and RS256
- `authenticatorRequireResidentKey`
    - wether you want to support resident keys or not, set this to `true` if you're going with the usernameless approach

### Attestation
Ok, setting up the keys. Simple stuff, though there's gonna be a lot of TypeScript shinanigans so prepare yourself.

Let's assume the user is logged in, they pressed the button to set up their authenticator and a function gets triggered.

#### Requesting a challenge
First thing we do is hit up the server and ask it to give us a challenge. Pretty simple stuff.
```ts
const attestation = await http.get("/webauthn/attestate/begin")
                            .then(res => res.data as PublicKeyCredentialCreationOptions);
```
Something like this, we wait for the server, and the returned data gets casted to `PublicKeyCredentialCreationOptions`. These names are insanely long, but hey, that's what IntelliSense is for.

The server response can be generated by simply invoking a function provided by fido2-lib. But it's not as easy as that, as I mentioned before, WebAuthn looooves ArrayBuffers. Get ready for encoding/decoding madness.
```ts
const options = await fido2.attestationOptions();
options.user = { id: user.id, name: user.username, displayName: user.username };

const encoded = { ...options, challenge: encode(options.challenge) }

// store the challenge to db
challenges[user.id] = encoded.challenge;
```
We first generate what's called `attestationOptions` that contain a challenge. Next step is to set the user we're setting up the key for.
Keep in mind that `user.id` here is the `userHandle` used in the resident key process. The challenge is also given as an ArrayBuffer so we need to convert it to base64.
Make sure to store the generated challenge in some database, we'll use it later for verification.

And now back in the browser we must decode it back to ArrayBuffers, aaaargh.

```ts
// cast to unknown because types, safe in this case
attestation.challenge = decode(attestation.challenge as unknown as string);
attestation.user.id = decode(attestation.user.id as unknown as string);
```

#### Authenticating
We can then pass our attestation options to [CredentialsContainer](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer) (navigator.credentials).
Since we're setting up the key, we call `create`, this will store the needed information on the authenticator.
This will return a promise of type Credential, which my be null ... or might error, so make sure to catch all that.
```ts
const credential: Credential | null | false = await navigator.credentials.create({ publicKey: attestation }).catch(() => false);
if(!credential)
    return;
```

#### Back to RP
Our credential now has everything needed for the server to know who we are. Simply pass it back
```ts
await http.post("/webauthn/attestate/end", encodeAttestationResponse(credential as PublicKeyCredential));
```
`encodeAttestationResponse` is simply a function that encodes `rawId`, `response.attestationObject` and `response.clientDataJSON` as base64.
I'll let you have fun with this.

On the server side, we need to store the credential id and the public key in the database. We'll need it soon while doing assertion.
```ts
const result = await (resident ? fido2Resident : fido2).attestationResult({
    ...attestation,
    rawId: decode(attestation.rawId)
}, {
    rpId: opts.rpId,
    challenge: challenges[user.id], // get the previously stored challenge
    origin: "http://localhost:3000",
    factor: "either"
});
```
We of course need to decode the rawId back to ArrayBuffers.

If result succeeds, the two things you'll need to store. `result.clientData.get("rawId")` containing the credential ID and `result.authnrData.get("credentialPublicKeyPem")` containing the public key in [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) format.

### Assertion
Wheen, this is where it gets fun ... ***not***.

## The takeaway
Well, I kinda have mixed feelings about WebAuthn. I really love the result and how quickly and easily I can authenticate.
But, on the other hand, it has shown to be a pain to get working how I wanted it to. Adding to that, there's a huge lack of good documentation, tutorials and libraries.
That's one of the reasons I wrote this, hopefully I'll make someone's life at least a bit easier.

But to sum up, I personally feel like the tradeoff is worth it. The simplicity of login process is uncomparable and at the end of the day, you do learn some things while going through all the pain of getting it working.