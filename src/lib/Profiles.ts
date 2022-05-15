
export type Link = "github" | "linkedin" | "instagram" | "twitter" | "youtube" | "email" | "website"

type ProfileInfo = {
    display: string,
    pfp: string,
    alias?: string,
    displayAlias?: boolean,
    links: Partial<Record<Link, string>>
}

export const Profiles: { [k: string]: ProfileInfo } = {
    "antony": {
        display: "Antonio F. Š.",
        pfp: "https://media.antony.red/logoTransparent.png",
        alias: "Antony",
        displayAlias: true,
        links: {
            website: "https://antony.contact",
            github: "https://github.com/Antony1060",
            linkedin: "https://linkedin.com/in/antony1060",
            email: "mailto:antony@antony.red"
        }
    },
    "luc": {
        display: "Luc van Kampen",
        pfp: "https://avatars.githubusercontent.com/u/10339043?v=4",
        alias: "Lucemans",
        links: {
            website: "https://luc.computer",
            github: "https://github.com/lucemans",
            linkedin: "https://linkedin.com/in/lucemans",
            twitter: "https://twitter.com/@LucemansNL"
        }
    },
    "lego": {
        display: "Grant Imler",
        pfp: "https://media.antony.red/lego.png",
        alias: "Lego Maestro",
        links: {
            youtube: "https://youtube.com/c/LegoMaestro",
            twitter: "https://twitter.com/Lego_Maestro",
            email: "mailto:LegoMBusiness@gmail.com"
        }
    },
    "isaac": {
        display: "Isaac Halverson",
        pfp: "https://media.antony.red/isaac.png",
        alias: "Isaac H",
        displayAlias: true,
        links: {
            github: "https://github.com/Hitman4123",
            linkedin: "https://www.linkedin.com/in/isaac-halverson-6b58b3170/"
        }
    },
    "nikitonsky": {
        display: "Niki Tonsky",
        pfp: "https://media.antony.red/tonsky.jpg",
        links: {
            website: "https://tonsky.me/",
            github: "https://github.com/tonsky",
            twitter: "https://twitter.com/nikitonsky"
        }

    },
    "josgerards": {
        display: "Jos Gerards",
        pfp: "https://media.antony.red/josgerards.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/josgerards",
            twitter: "https://twitter.com/josgerards88",
            email: "mailto:josgerards@outlook.com"
        }
    }
}