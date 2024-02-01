"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicineService_1 = __importDefault(require("../service/medicineService"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const url = req.query['url'];
    console.debug("Url data: " + url);
    (0, medicineService_1.default)(url).then((medicine) => {
        console.debug("Medicine result: " + medicine);
        res.json(medicine);
    }).catch((err) => {
        console.log("Error", err);
        res.status(500).send();
    });
});
exports.default = router;
