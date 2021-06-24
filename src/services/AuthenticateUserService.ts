import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"


interface iAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: iAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)
        
        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        })

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        // Verificar se senha está correta

        // comparar senha com senhaHash
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        // Gerar TOKEN
        const token = sign({
            email: user.email
        },
        "ee45afbab1454bc19313fc08ce6c6d36", 
        {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }