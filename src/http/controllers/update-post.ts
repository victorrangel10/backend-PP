
import { FastifyRequest , FastifyReply } from "fastify";
import {prisma } from "@/lib/prisma"
import {makeIssue, z} from 'zod';
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { PostsRepository } from "@/repositories/posts-repository";
import { makeUpdatePostUseCase } from "@/use-cases/factories/make-update-post";
export async function updatePost(request: FastifyRequest, reply:FastifyReply){

    const registerBodySchema  = z.object({
        description: z.string(),
    })

    const { id } = request.params as { id: string }
    const { description } = registerBodySchema.parse(request.body)

    try{
        const updatePostUseCase =  makeUpdatePostUseCase()
        const updated = await updatePostUseCase.execute({
            id: id, 
            content: description,
        })

    } catch(err) {
        if (err instanceof Error) {
            return reply.status(400).send({ message: err.message })
        }
    }

}