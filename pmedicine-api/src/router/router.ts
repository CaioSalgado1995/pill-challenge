import express from 'express'
import getMedicineData from '../service/medicineService'
import ErrorResponse from '../model/errorResponse'

const router = express.Router()

router.get('/', (req, res) => {
    const url = req.query['url'] as string
    console.debug("Url data: " + url)
    
    getMedicineData(url).then((medicine) => {
        res.json(medicine)
    }).catch((err) => {
        if(err.message == "resource_not_found") {
            res.status(404).send(
                {
                    code: err.message,
                    message: "Recurso não encontrado"
                } as ErrorResponse
            )
        } else {
            res.status(500).send(
                {
                    code: err.message,
                    message: "Erro genérico"
                } as ErrorResponse
            )
        }
    })
})

export default router