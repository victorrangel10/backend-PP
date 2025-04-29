import { PostsRepository } from "@/repositories/posts-repository";

import { MakePostUseCase } from "../make-post";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";


export function makeMakePostUseCase() {
    const postsRepository = new PrismaPostsRepository()
    const makePostUseCase = new MakePostUseCase(postsRepository)

    return makePostUseCase
}

