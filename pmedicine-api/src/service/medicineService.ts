import getHtmlFrom from '../client/httpClient'
import extractFrom from '../crawler/crawlerService'
import Medicine from '../model/medicine'
import ExternalPharmacyExtractConfig from '../model/extractConfig'
import { drograsilCrawlerConfig } from '../config/config'

async function getMedicineData(url: string): Promise<Medicine> {
    const pharmacyExtractConfig = getExtractConfig(url)
    return getHtmlFrom(url).then((htmlData) => {
        return extractFrom(htmlData, pharmacyExtractConfig)
    })
}

function getExtractConfig(url: string): ExternalPharmacyExtractConfig {
    if(url.includes("drogasil")) {
        return drograsilCrawlerConfig
    } else {
        throw Error("External pharmacy provider does not have any configuration " + url)
    }
}

export default getMedicineData;