import fs from "node:fs"
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { any } from "zod";

export async function upload(req: any, reply: any) {
    // process a single file
    // also, consider that if you allow to upload multiple files
    // you must consume all files otherwise the promise will never fulfill
    const parts = req.parts()
    let txt = any;
    const uploadDir = path.resolve('uploads')
    for await (const part of parts) {
        if (part.type === 'file') {
            const filename = `${Date.now()}-${part.filename}`
            const filePath = path.join(uploadDir, filename)
            console.log("tem arq")
            await pipeline(part.file, fs.createWriteStream(filePath))
        } else {
            // part.type === 'field
            console.log("tem texto")
            txt = part.value
            console.log(part)
        }
    }





    
    reply.send()





}

