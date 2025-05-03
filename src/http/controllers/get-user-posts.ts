import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetUserPostsUseCase } from "@/use-cases/get-user-posts";

export async function getUserPosts(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as { userId: string };

    const postsRepository = new PrismaPostsRepository();
    const getUserPostsUseCase = new GetUserPostsUseCase(postsRepository);

    const { posts } = await getUserPostsUseCase.execute({ userId });

    return reply.status(200).send(posts);
}