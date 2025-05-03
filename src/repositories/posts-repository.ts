import { Prisma,Post } from "@prisma/client";

export interface PostsRepository {
    create(data: Prisma.PostCreateInput): Promise<Post>;
    findById(id: string): Promise<Post | null>;
    searchByUser(userId: string): Promise<Post[]>;
    delete(id: string): Promise<void>;
    update(id: string, data: Prisma.PostUpdateInput): Promise<Post>;
    getAllPosts(): Promise<Post[]>;
}