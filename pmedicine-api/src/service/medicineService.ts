import getHtmlFrom from '../client/httpClient'
import extractFrom from '../crawler/crawlerService'
import Medicine from '../model/medicine'
import ExternalPharmacyExtractConfig from '../model/extractConfig'

async function getMedicineData(url: string): Promise<Medicine> {
    const pharmacyExtractConfig = getExtractConfig(url)
    return getHtmlFrom(url).then((htmlData) => {
        return extractFrom(htmlData, pharmacyExtractConfig)
    })
}

function getExtractConfig(url: string): ExternalPharmacyExtractConfig {
    if(url.includes("drogasil")) {
        return {
            name: ".product-name > h1",
            brand: ".brand",
            barcode: ".ProductAttributestyles__ProductAttributeStyles-sc-1smttju-0 > table",
            price: "script[type=application/ld+json]",
            description: ".quantity",
            image: ".small-img"
        }
    } else {
        throw Error("External pharmacy provider does not have any configuration " + url)
    }
}

export default getMedicineData;