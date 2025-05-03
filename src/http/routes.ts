import { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import path from "node:path";

import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middleware/verify-jwt";
import { upload } from "./controllers/upload";
import { deletePost } from "./controllers/delete-post";
import { makePost } from "./controllers/make-post";
import { updatePost } from "./controllers/update-post";
import { getAllPosts } from "./controllers/get-all-posts";
import { getUserById } from "./controllers/get-user-by-id";
import { updateProfileImage } from "./controllers/update-profile-image";
import { getUserPosts } from "./controllers/get-user-posts";

export async function appRoutes(app: FastifyInstance) {
    // Configurar o diretório de uploads como estático
    app.register(fastifyStatic, {
        root: path.resolve("uploads"), // Caminho para o diretório de uploads
        prefix: "/uploads/", // Prefixo para acessar os arquivos
    });

    app.post('/users', register);

    app.post('/sessions', authenticate);

    app.post('/upload', { onRequest: [verifyJWT] }, makePost);

    app.get('/me', { onRequest: [verifyJWT] }, profile);

    app.delete('/posts/:id', { onRequest: [verifyJWT] }, deletePost);

    app.patch('/update/:id', { onRequest: [verifyJWT] }, updatePost);

    app.get('/posts', { onRequest: [verifyJWT] }, getAllPosts);

    app.get('/allusers/:id', { onRequest: [verifyJWT] }, getUserById);

    app.post('/users/profile-image', { onRequest: [verifyJWT] }, updateProfileImage); // Nova rota

    app.get('/users/:userId/posts', { onRequest: [verifyJWT] }, getUserPosts); // Nova rota
}