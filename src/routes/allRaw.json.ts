import type { RequestHandler } from "@sveltejs/kit";
import { readdir, readFile, stat } from "fs/promises";

const BASE_PATH = "./src/routes/posts";

const sortObjByKey = <T>(obj: T): T =>
    Object.assign({}, ...Object.keys(obj).sort().map(it => ({ [it]: obj[it] })))

export const get: RequestHandler = async () => {
    const postsDir = await readdir(BASE_PATH)
    const posts: Record<string, string> = {};
    for(const file of postsDir) {
        const fileStat = await stat(`${BASE_PATH}/${file}`);
        if(!fileStat.isDirectory()) continue;
        const names = (await readdir(`${BASE_PATH}/${file}`))
                        .filter(it => /\.(md|svx)$/g.test(it))
                        .map(it => `${file}/${it}`);
        Object.assign(posts, ...(await Promise.all(names.map(async it => ({ [it]: await readFile(`${BASE_PATH}/${it}`, { encoding: "utf-8" }) })))))
    }
    
    return {
        status: 200,
        body: sortObjByKey(posts)
    }
}