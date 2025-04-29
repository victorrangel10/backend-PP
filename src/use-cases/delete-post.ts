import { PostsRepository } from "@/repositories/posts-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { PostNotFoundError } from "./errors/post-not-found-error";
import { promises as fs } from 'fs'
import path from 'path'

interface DeletePostUseCaseRequest {
    postId: string
}


export class DeletePostUseCase{
    constructor(private postsRepository: PostsRepository){}

    async execute({ postId }: DeletePostUseCaseRequest){
        const post = await this.postsRepository.findById(postId)

        if(!post){
            throw new PostNotFoundError()
        }

        const filePath = path.join(process.cwd(), post.postImage)
        try {
          await fs.unlink(filePath)
        } catch (err: any) {
          // Se o arquivo já não existir, apenas logue
          if (err.code !== 'ENOENT') throw err
        }

        await this.postsRepository.delete(postId)

        return
    }
}
