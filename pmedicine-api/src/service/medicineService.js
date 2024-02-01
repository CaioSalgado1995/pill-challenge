"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("../client/httpClient"));
const crawlerService_1 = __importDefault(require("../crawler/crawlerService"));
function getMedicineData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, httpClient_1.default)(url).then((htmlData) => {
            const pharmacyExtractConfig = getExtractConfig(url);
            return (0, crawlerService_1.default)(htmlData, pharmacyExtractConfig);
        });
    });
}
function getExtractConfig(url) {
    if (url.includes("drogasil")) {
        return {
            name: ".product-name > h1",
            brand: ".brand",
            barcode: ".ProductAttributestyles__ProductAttributeStyles-sc-1smttju-0 > table",
            price: "script[type=application/ld+json]",
            description: ".quantity",
            image: ".small-img"
        };
    }
    else {
        throw Error('External pharmacy provider does not have any configuration' + url);
    }
}
exports.default = getMedicineData;
