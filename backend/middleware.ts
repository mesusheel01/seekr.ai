import type { NextFunction, Request, Response } from "express";
import { createSupabaseClient } from "./client";
import { prisma } from "./db";

const client = createSupabaseClient()
interface Reques extends Request {
    userId: string
}

export default async function Middleware(req: Reques, res: Response, next: NextFunction) {

    const token = req.headers.authorization

    const data = await client.auth.getUser(token)
    const user = data.data.user

    if (user) {
        try {
            console.log(user);
            await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email!,
                    provider: user.app_metadata.provider === 'google' ? "Google" : "Github",
                    supabaseId: user.id
                }
            })
        } catch (e) {
            console.log(e)
        }
        req.userId = user?.id
        next()
    }
    else {
        res.send(403).json({
            message: "Incorrect Inputs!"
        })
    }

}