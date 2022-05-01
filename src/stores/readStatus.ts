import { browser } from "$app/env";
import { writable } from "svelte/store";

const KEY = "@cloud/read";

const def = browser && localStorage.getItem(KEY) && JSON.parse(localStorage.getItem(KEY));

export const readStatuses = writable<string[]>(Array.isArray(def) ? def : [])

if(browser)
    readStatuses.subscribe(value => localStorage.setItem(KEY, JSON.stringify(value)));