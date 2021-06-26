import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayLoad {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    // REceber o token
    const authToken = request.headers.authorization
    

    // validar se token esta preenchido
    if(!authToken) {
        return response.status(401).end()
    }

    const [,token] = authToken.split(" ")

    try {
        // validar se token é valido
        const { sub } = verify(token, "ee45afbab1454bc19313fc08ce6c6d36") as IPayLoad
        
        // recuperar informacoes do usuario
        request.user_id = sub

        return next()
    }catch(err) {
        return response.status(401).end()
    }


}