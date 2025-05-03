import { PostsRepository } from "@/repositories/posts-repository";
import { GetAllPostsUseCase } from "../get-all-posts";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { error } from "console";



export function makeGetAllPostsUseCase() {
    const postsRepository = new PrismaPostsRepository()
    const deletePostUseCase = new GetAllPostsUseCase(postsRepository)
    return deletePostUseCase
}