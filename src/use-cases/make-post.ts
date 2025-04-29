import { UsersRepository } from "@/repositories/users-repository"
import { PostsRepository } from "@/repositories/posts-repository"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { compare } from "bcryptjs"
import { Post, User } from "@prisma/client"
import  fs  from "node:fs"
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { datetimeRegex } from "zod"



interface MakePostUseCaseRequest{
    userId: string
    imageUrl: string
}                   

interface MakePostUseCaseResponse{
    post: Post
}

export class MakePostUseCase {
    constructor(private postsRepository: PostsRepository){}

    async execute({ 
        userId,
        imageUrl,
    }: MakePostUseCaseRequest): Promise<MakePostUseCaseResponse> {
       

        const post = await this.postsRepository.create({
            user: { connect: { id: userId } },
            postImage: imageUrl,
            date: new Date(), // Convert the timestamp to a Date object
        })

        return{
          post  
        }
    }
}
