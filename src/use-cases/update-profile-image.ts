import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface UpdateProfileImageUseCaseRequest {
    userId: string;
    profileImage: string;
}

interface UpdateProfileImageUseCaseResponse {
    user: User;
}

export class UpdateProfileImageUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        userId,
        profileImage,
    }: UpdateProfileImageUseCaseRequest): Promise<UpdateProfileImageUseCaseResponse> {
        const user = await this.usersRepository.updateProfileImage(userId, profileImage);

        return { user };
    }
}