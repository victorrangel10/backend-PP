import { prisma } from '@/lib/prisma'

import { Post, Prisma } from '@prisma/client'
import { PostsRepository } from '../posts-repository'



export class PrismaPostsRepository implements PostsRepository {
 
    
    // nao sei se vai funcionar
    async searchByUser(userId: string) {
        const posts = await prisma.post.findMany({
            where: {
                USER_ID: userId,
            },
        })

        return posts
    }

    async findById(id: string) {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        })

        return post
    }

    async create(data: Prisma.PostCreateInput){
        const user = await prisma.post.create({
            data,
        })

        return user
    }

    async delete(id:string){
        const post = await prisma.post.delete({
            where: {
                id,
            },          
    })}

    async update(id: string, data: Prisma.PostUpdateInput) {
        const post = await prisma.post.update({
            where: {
                id,
            },
            data,
        })

        return post
    }
}