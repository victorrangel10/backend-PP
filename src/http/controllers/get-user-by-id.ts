import { makeGetUserByIdUseCase } from "@/use-cases/factories/make-get-user-by-id";
import { FastifyRequest, FastifyReply } from "fastify";

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const getUserByIdUseCase = makeGetUserByIdUseCase();

    try {
        const { user } = await getUserByIdUseCase.execute({ userId: id });

        console.log('found');
        return reply.status(200).send({
            user: {
                ...user,
                password_hash: undefined, // Remove o hash da senha antes de retornar
            },
        });
    } catch (error) {
        console.log('not found');
        return reply.status(404).send({ error: "User not found" });
    }
}