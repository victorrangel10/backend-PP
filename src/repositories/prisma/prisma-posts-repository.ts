import { prisma } from '@/lib/prisma'

import { Post, Prisma } from '@prisma/client'
import { PostsRepository } from '../posts-repository'



export class PrismaPostsRepository implements PostsRepository {
 
    
    async searchByUser(userId: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                USER_ID: userId,
            },
            orderBy: {
                date: 'desc', // Ordena pela data de criação em ordem decrescente
            },
        });

        return posts;
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


    async getAllPosts(): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            orderBy: {
                date: 'desc', // Ordena pela data de criação em ordem decrescente
            },
        });

        return posts;
    }
}