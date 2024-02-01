import express from 'express'
import getMedicineData from '../service/medicineService'

const router = express.Router()

router.get('/', (req, res) => {
    const url = req.query['url'] as string
    console.debug("Url data: " + url)
    
    getMedicineData(url).then((medicine) => {
        console.debug("Medicine result: " + medicine)

        res.json(medicine)
    }).catch((err) => {
        console.log("Error", err)
        res.status(500).send()
    })
})

export default router