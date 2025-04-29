import { PostsRepository } from "@/repositories/posts-repository";
import { DeletePostUseCase } from "../delete-post";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { error } from "console";



export function makeDeletePostUseCase() {
    const postsRepository = new PrismaPostsRepository()
    const deletePostUseCase = new DeletePostUseCase(postsRepository)
    return deletePostUseCase
}