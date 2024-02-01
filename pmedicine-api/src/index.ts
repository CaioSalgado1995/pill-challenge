import express from 'express'
import cors from 'cors'
import router from './router/router'

// Porta do servidor
const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

const app = express()

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use('/api/medicines', router)
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})