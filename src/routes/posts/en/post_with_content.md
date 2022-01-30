---
title: Post with content
description: Post with actual content so I can test
author: Antony
created: 2022-01-28 21:31:20
modified: 2022-01-28 21:31:20
tags: [react, networking]
lang: []
hidden: false
---

<script>
    import Profile from "$lib/components/Profile.svelte"
</script>

# Post with content
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Implementation
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <Profile name="luc" />, eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Instalalation
Lorem _ipsum_ dolor *sit* **amet**, ~~consectetur~~ adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. :weary:

> yarn add jsonwebtoken

```ts
export const useAuth = () => {
    const token = useLocalStorage("auth-token");

    return {
        token,
        valid: token && isJwt(token)
    }
}
```

Notice the `isJwt(token)` part, very important.

`poop`

## Final words
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. https://antony.domains

So, shit:

| Var | Value |
| -- | ---- |
| DEBUG | boolean |
| PORT | number |

```env
DEBUG=true
PORT=8080
```