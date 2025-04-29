import { FastifyInstance } from "fastify";

import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middleware/verify-jwt";
import { upload } from "./controllers/upload";
import { deletePost } from "./controllers/delete-post";
import { makePost } from "./controllers/make-post";
import { updatePost } from "./controllers/update-post";

export async function appRoutes(app: FastifyInstance) {

    app.post('/users', register)

    app.post('/sessions', authenticate)

    //tenho que pegar o make-post e colocar no lugar de uploa
    app.post('/upload', { onRequest: [verifyJWT] }, makePost)

    app.get('/me', { onRequest: [verifyJWT] }, profile)

    app.delete('/posts/:id', { onRequest: [verifyJWT] }, deletePost)


    app.patch('/update/:id', { onRequest : [verifyJWT] }, updatePost)




}