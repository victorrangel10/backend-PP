import { makeDeletePostUseCase } from "@/use-cases/factories/make-delete-post-use-case";
import { FastifyRequest, FastifyReply } from "fastify";


export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const deletePostUseCase = makeDeletePostUseCase()

    try {
        const { id } = request.params as { id: string }

        await deletePostUseCase.execute({
            postId: id,
        })

        return reply.status(203).send({ message: "post excluido" })
    }
    catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }
    }
}