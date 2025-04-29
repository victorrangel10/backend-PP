import fastify from "fastify";


import { z } from 'zod'
import { prisma } from "./lib/prisma";
import { appRoutes } from "./http/routes";
import fastifyJwt from "@fastify/jwt";
import cors from '@fastify/cors'
import Multipart from "@fastify/multipart";

export const app = fastify()


app.register(Multipart, { limits: { fileSize: 5_000_000 } })

app.register(fastifyJwt, {
  secret: 'abcs',
})

app.register(cors, {
  origin: 'http://127.0.0.1:5173',  // ou um array de origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})

app.register(appRoutes)