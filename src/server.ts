import express from "express"

// @types/express
const app = express()

/**
 * GET => BUSCAR UMA INFORMAÇÃO
 * POST => INSERIR (CRIAR) UMA INFORMAÇÃO
 * PUT => ALTERAR UMA INFORMAÇÃO
 * DELETE => REMOVER UM DADO
 * PATCH => ALTERAR UMA INFORMAÇÃO ESPECIFICA
 */

app.get("/test", (request, response) => {
    // Request => Entrando
    // Response => Saindo
    return response.send("Oláa")
})

app.post("/test-post", (request, response) => {
    return response.send("Olá POST")
})

//http://localhost:3000
app.listen(3000, () => console.log("Server is running"))