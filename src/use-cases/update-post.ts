import { prisma } from "@/lib/prisma"
import { Post } from "@prisma/client";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
interface UpdatePostUseCaseRequest {
    id: string
    content: string
}

interface UpdatePostUseCaseResponse {
    post: Post
}


export class UpdatePostUseCase {

    constructor(private postsRepository: PrismaPostsRepository) { }

    async execute({
        id,
        content,
    }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
        const post = await this.postsRepository.update(id, {
            description: content,
        })

        return {
            post,
        }
    }
}

