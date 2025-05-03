import { PostsRepository } from "@/repositories/posts-repository";
import { Post } from "@prisma/client";

interface GetUserPostsUseCaseRequest {
    userId: string;
}

interface GetUserPostsUseCaseResponse {
    posts: Post[];
}

export class GetUserPostsUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({
        userId,
    }: GetUserPostsUseCaseRequest): Promise<GetUserPostsUseCaseResponse> {
        const posts = await this.postsRepository.searchByUser(userId);

        return { posts };
    }
}