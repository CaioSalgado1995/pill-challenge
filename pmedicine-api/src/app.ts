import express from 'express'
import cors from 'cors'
import router from './router/router'

const app = express()

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use('/api/medicines', router)
app.use(express.json())

export default app