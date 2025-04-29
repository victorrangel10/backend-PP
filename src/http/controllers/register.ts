

import { FastifyRequest , FastifyReply } from "fastify";

import { hash} from 'bcryptjs';
import {prisma } from "@/lib/prisma"
import { RegisterUseCase,} from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import {makeIssue, z} from 'zod';
import { Prisma } from "generated/prisma";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply:FastifyReply){ 
    const registerBodySchema  = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6), 
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            password,
        })

    } catch (err) {
        if(err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({message: err.message})
        }
        
    }

    return reply.status(201).send()
}