
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
        pfp: "https://yt3.ggpht.com/VOR9jHwWFrCIhO9SH5OjCp62ABB1UMs1vaiUHgdYf3IVQHzR2I67BUM2wZ8Y41Dqifz2XZymN80=s88-c-k-c0x00ffffff-no-rj",
        alias: "Lego Maestro",
        links: {
            youtube: "https://media.antony.red/lego.png",
            twitter: "https://twitter.com/Lego_Maestro",
            email: "LegoMBusiness@gmail.com"
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
    }
}