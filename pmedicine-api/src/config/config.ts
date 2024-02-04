import { ExtractConfigType } from "../model/extractConfigType";

export const drograsilCrawlerConfig = {
    name: {
        type: ExtractConfigType.TEXT,
        selector: ".product-name > h1"
    },
    brand: {
        type: ExtractConfigType.TEXT,
        selector: ".brand",
    },
    barcode: {
        type: ExtractConfigType.TABLE,
        selector: ".ProductAttributestyles__ProductAttributeStyles-sc-1smttju-0 > table",
        extraInfo: {
            headerText: "EAN"
        }
    },
    price: {
        type: ExtractConfigType.SCRIPT,
        selector: "script[type=application/ld+json]",
        extraInfo : {
            path: "offers.price"
        }
    },
    description: {
        type: ExtractConfigType.TEXT,
        selector: ".quantity"
    },
    image: {
        type: ExtractConfigType.IMAGE,
        selector: ".small-img"
    }
}