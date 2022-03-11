---
title: Avantura
description: Uvod i avantura iza ovog bloga
author: Antony
created: 2022-02-02 20:50:42
modified: 2022-02-02 20:50:42
credits:
    - role: Translating & spell check
      name: Vice Limov
tags: [frontend, svelte, markdown, svg]
lang: [en]
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

I tako to počinje! U redu, trebao bih početi pitanjem koje se svi vjerojatno pitate: tko sam uopće ja?

## Tko?
Ja sam <span>{ selfAge() }</span> godišnjak koji :sparkles: **stremi** :sparkles: postati full stack developer koji većinom gravitira prema backend dijelu full stacka.
Trenutno sam napravio nekoliko honorarnih poslova  za par ljudi, od kojih bih htio istaknuti neke od najbolih ljudi s kojima sam ikada radio: <Profile name="lego" /> te <Profile name="isaac" />. Ovi su mi ljudi pružili tooliko prilika i definitivno ne bih bio tamo gdje sam danas bez njih.

Trenutno primam honorarne poslove, ali mi se stvarno počinje sviđati open source development pa trenutno radim malo i na tome.

U redu, dosta o meni, uđimo u razloge [zbog čega](#zbog-čega), [što  je](#što) i [gdje](#gdje) postoji ovaj blog.

## Zbog čega?
Dakle, zbog čega sam napravio ovaj blog?

Pisalo mi se o vlastitim nasumičnim mislima te sam ih htio podijeliti s svijetom,
također mislim da bi blog pomogao mom vlastitom ugledu na internetu.
To je također bila odlična izlika da pokušam nešto sa [Svelte-om](https://svelte.dev/), koji je, dosad, doista bio odličan.

## Što?
Neću ulaziti u previše detalja o izradi ovog bloga zato što je jednostavno statički [SvelteKit](https://kit.svelte.dev) projekt koji obrađuje markdown datoteke (objave), ali mislim da ćete uživati čitajući o mojoj boli i patnji tijekom procesa. :wink:

#### Zašto Svelte?
Pa, htio sam naučiti Svelte... aaali sam također trebao dobar način baratanja SSG-om (Server side generation) i za to sam načelno imao 2 opcije: [Astro](https://astro.build/) i... Svelte.
Ovo su jedine dvije opcije za koje sam znao da dobro odrađuju taj SSG dio.
Par je mojih kolega koristilo Astro za [svoje](https://luc.computer) [blogove](https://helgesson.dev/p) i čuo sam da Astro još uvijek nema dobru poršku za IDE-ove. Nište čudno za mene: nisam mu ni dao priliku te sam odmah ušao u Svelte.

I moram reći, nisam bio razočaran. Svelte ima par mana (svaki framework ih ima) ali je stvarno intuitivan i dobar.
Otišao bih toliko daleko i rekao da postoji šansa da bude moj drugi najdraži framework nakon Reacta.

#### Tech stack (tj. tehnološki stog, wtf)
Trenutni tech stack izgleda ovako:
- Svelte(Kit)
    - web framework
    - barata SSG-om, kompresijom i ostalim optimizacijama
- MDsveX
    - Svelte verzija MDX-a
    - prerađuje Markdown <span style="opacity: 0;">; također, ponekad ima stvarno j*beno lošu podršku za typescript</span>
    - prilagođeno s nekoliko [Remark](https://github.com/remarkjs/remark) i [Rehype](https://github.com/rehypejs/rehype) plugina
- OpenGraph Images
    - Rješenje za brzo generiranje bannera
- Fontovi
    - JetBrains Mono
    - Roboto

Wow, taj popis je kratak. Dok sam pisao ovo, uistinu sam očekivao da će biti malo dulji... Nadam se da ovo pokazuje da napraviti blog stvarno nije toliko komplicirano. (ipak, nemojte koristiti Wordpress, molim vas).

## Gdje?
Ooo, ovo je uzbudljivo! Sada malo o tome kako postavljam ovu stvar. :truck:

Isprva, dok sam još radio na ovome, koristio sam [Netlify](https://netlify.com). U početku sam planirao koristiti ovo za posluživanje stranice.
Ali to je dosadno, *samo funkcionira*, to nije zabavno.

Ali ozbiljno, nemam ništa protiv Netlify-a, to je stvarno platforma koja "samo funkcionira".
Ali to ne znači da je bez mana. Jedna od stvari koje su malo frustrirajuće su odvratno duga vremena učitavanja ovdje u Europi (ali to može biti i do mog lošeg interneta :shrug:).

#### Signal :eyes:
Trenutno, rješenje koje sam odabrao je Signal. I ne, ne **taj** [Signal](https://signal.org).
Vidite, moj dobar prijatelj <Profile name="luc" /> je započeo osobni projekt u kojem radi..\..\..\..

![Discord DM](https://media.antony.red/CjunME.png)

..., ok štogod, on više-manje postavlja vašu web-stranicu i poslužuje ju, ovdje je [GitHub repo](https://github.com/lvkdotsh/signal-edge/). Uglavnom, to sam odabrao da poslužuje moju web-stranicu.
I dosad je bilo odlično. Vremena postavljanja su izrazito brza, CD je bilo jednostavno namjestiti i vremena učitavanja su ⚡ munjevito brza.

Dok ovo pišem, postoji jedna njegova instanca postavljena na našem dijeljenom Kubernetes clusteru bez ikakvog javnog sučelja.

## SVGevi :heart:

Znate za [OpenGraph](https://ogp.me/)? Taj protokol "that enables any web page to become a rich object in a social graph". (bilj. prev. Najbliže kako ovo mogu prevesti je: *"koji omogućava bilo kojoj web stranici da postane obogaćeni objekt u društvenom grafu".*)
Ako ovo ne zvuči poznato, razmišljate o tome kao specifikacija za te lijepe Discord/Slack/Twitter/Facebook embedove koji se generiraju kada pošaljete/primite poveznicu za neku stranicu.
I ako već niste primjetili, ovaj blog ih ima i oni se mijenjanju za svaku objavu. Primjer za ovu objavu: 

![OpenGraph card](https://cards.antony.cloud/post?title={title}&description={description}&type=png)

Kao što možete vidjeti, u samoj slici je naslov i opis.

Pa kako sam ovo postigao?<br/>***SVG-ovi***

Još uvijek sam fasciniran time što mogu generirati slike samo koristeći tekst, bez ikakve komputacije.

Ako pogledate URL te slike:
```
https://cards.antony.cloud/post?title={title}&description={description}&type=png
```
možete vidjeti da ide do [servisa kojeg sam napisao](https://github.com/Antony1060/svg-gen) i daje mu naslov i opis te dinamički generira sliku.
Ovime barata SSG pa će ih izgrađene HTML stranice već imati popunjenima.
Imajte na umu da su slike u zadanom, SVG formatu i OpenGraph ne podržava korištenje SVG-ova kao slike.... shit.
Mislio sam da će pretvaranje SVG-ova u PNG-ove ne bi bilo teško. I bio sam u pravu, nije bilo teško. No, budući da sam u početku ovo napisao kao serverless funkciju na Netlifyu (to je bio pakao, nikad više), u okruženju je nedostajao font koji sam trebao pa su završne PNG slike izgledale grozno. Na kraju sam napisao jednostvan API u [Fastifyu](https://www.npmjs.com/package/fastify) da poslužuje slike

**Što smo naučili iz ovoga?** <br/>
SVG-ovi :heart:, Serverless :poop:

## Zaključak
U redu ljudi, to je to. Ako ste došli ovako daleko, htio bih vam zahvaliti što ste pročitali ovu objavu, nadam ste da ste uživali. Ugodan vam ostatak dana! :smile: