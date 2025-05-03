import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserByIdUseCase } from "../get-user-by-id";

export function makeGetUserByIdUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository);

    return getUserByIdUseCase;
}