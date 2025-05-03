import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { makeGetAllPostsUseCase } from "@/use-cases/factories/make-get-all-posts-use-case";
import { GetAllPostsUseCase } from "@/use-cases/get-all-posts";


export async function getAllPosts(req: FastifyRequest, reply: FastifyReply) {
    
    const getAllPostsUseCase = makeGetAllPostsUseCase() 

    const { posts } = await getAllPostsUseCase.execute();

    reply.status(200).send(posts);
}