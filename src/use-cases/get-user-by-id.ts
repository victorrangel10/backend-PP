import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserByIdUseCaseRequest {
    userId: string;
}

interface GetUserByIdUseCaseResponse {
    user: User;
}

export class GetUserByIdUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        userId,
    }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}