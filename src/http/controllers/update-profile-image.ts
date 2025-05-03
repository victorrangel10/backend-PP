import { FastifyRequest, FastifyReply } from "fastify";
import { makeUpdateProfileImageUseCase } from "@/use-cases/factories/make-update-profile-image";

import fs from "node:fs"
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { userInfo } from "node:os";



export async function updateProfileImage(req: FastifyRequest, reply: FastifyReply) {
    const data = await req.file(); // Recebe o arquivo enviado
    const userId = req.user.sub; // ID do usuário autenticado

    if (!data) {
        return reply.status(400).send({ error: "No file uploaded" });
    }

    const filePath = path.join("uploads", data.filename); // Caminho do arquivo salvo

    await pipeline(data.file, fs.createWriteStream(filePath))
    const updateProfileImageUseCase = makeUpdateProfileImageUseCase();

    const { user } = await updateProfileImageUseCase.execute({
        userId,
        profileImage: filePath,
    });

    return reply.status(200).send({ user });
}