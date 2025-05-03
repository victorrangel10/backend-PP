import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateProfileImageUseCase } from "../update-profile-image";

export function makeUpdateProfileImageUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const updateProfileImageUseCase = new UpdateProfileImageUseCase(usersRepository);

    return updateProfileImageUseCase;
}