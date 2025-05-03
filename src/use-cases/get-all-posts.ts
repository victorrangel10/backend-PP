import { PostsRepository } from "@/repositories/posts-repository";
import { Post } from "@prisma/client";

interface GetAllPostsUseCaseResponse {
    posts: Post[];
}

export class GetAllPostsUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute(): Promise<GetAllPostsUseCaseResponse> {
        const posts = await this.postsRepository.getAllPosts();

        return { posts };
    }
}