import { makeMakePostUseCase } from "@/use-cases/factories/make-make-post";
import { FastifyRequest, FastifyReply } from "fastify";


import fs from "node:fs"
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { userInfo } from "node:os";


export async function makePost(req: any, reply: any) {

    const parts = req.parts()
    let txt: string = '';
    let filePath: string = '';

    const uploadDir = './uploads'

    const makePost = makeMakePostUseCase()


    for await (const part of parts) {
        if (part.type === 'file') {
            const filename = `${Date.now()}-${part.filename}`
            filePath = path.join(uploadDir, filename)
            await pipeline(part.file, fs.createWriteStream(filePath))
        } else {
            // part.type === 'field
            console.log("tem texto")
            txt = part.value
            console.log(part)
        }
    }

    const post = await makePost.execute({
        userId: txt,
        imageUrl: filePath,
    })

    reply.status(201).send(post)
}