import app from "./app"

// Porta do servidor
const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})