
export type Link = "github" | "linkedin" | "instagram" | "twitter" | "youtube" | "email" | "website"

type ProfileInfo = {
    display: string,
    pfp: string,
    alias?: string,
    links: Partial<Record<Link, string>>
}

export const Profiles: { [k: string]: ProfileInfo } = {
    "antony": {
        display: "Antonio F. Š.",
        pfp: "https://media.antony.red/logoTransparent.png",
        alias: "Antony",
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
    }
}