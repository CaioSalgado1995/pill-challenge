import cheerio from 'cheerio'
import Medicine from '../model/medicine'
import ExternalPharmacyExtractConfig from '../model/extractConfig'
import { ExtraInfoScript, ExtraInfoTable, ExtractConfigDetails } from '../model/extractConfigDetails'
import { ExtractConfigType } from '../model/extractConfigType'
import lodash from "lodash"

/**
 * Extract information from html based in extractConfig parameter
 * @param htmlData 
 * @param extractConfig a configuration that indicates how to extract the data from the html information
 * @returns a medicine model with all information
 */
function extractFrom(
    htmlData: string, 
    extractConfig: ExternalPharmacyExtractConfig
): Medicine {
    const $ = cheerio.load(htmlData)
    
    return {
        name: evaluate($, extractConfig.name),
        brand: evaluate($, extractConfig.brand),
        barcode: evaluate($, extractConfig.barcode),
        price: parseFloat(evaluate($, extractConfig.price)),
        description: evaluate($, extractConfig.description),
        image: evaluate($, extractConfig.image)
    }
}

/**
 * Evaluate the config to be extracted, executing the properly code to extract
 * @param root the DOM root node
 * @param extractConfigDetails details for each property, contaning the type and the custom properties if necessary
 * @returns the value extracted
 */
function evaluate(root: cheerio.Root, extractConfigDetails: ExtractConfigDetails): string {
    switch(extractConfigDetails.type){
        case ExtractConfigType.TEXT:
            return root(extractConfigDetails.selector).text()
        case ExtractConfigType.IMAGE:
            return root(extractConfigDetails.selector).prop('src') as string
        case ExtractConfigType.TABLE:
            return getFromTable(root, extractConfigDetails)
        case ExtractConfigType.SCRIPT:
            return getFromScript(root, extractConfigDetails)
        default:
            return ""
    }
}

/**
 * Extracting the barcode from a DOM table
 * @param root the DOM root node
 * @param extractConfigDetails a configuration that indicates how to extract the data from the html information
 * @returns 
 */
function getFromTable(root: cheerio.Root, extractConfigDetails: ExtractConfigDetails) {
    const customData = (extractConfigDetails.extraInfo as ExtraInfoTable)
    return root(extractConfigDetails.selector)
        .find("tr")
        .filter((_, row) => {
            console.debug("Crawling ... Table header <th> " + root(row).children("th").text())
            return root(row).children("th").text() == customData.headerText
        })
        .children("td")
        .text()
}

/**
 * Extracting the price from a DOM script
 * @param root the DOM root node
 * @param extractConfigDetails a configuration that indicates how to extract the data from the html information
 * @returns 
 */
function getFromScript(root: cheerio.Root, extractConfigDetails: ExtractConfigDetails) {
    const customData = (extractConfigDetails.extraInfo as ExtraInfoScript)
    return lodash.get(JSON.parse(root(extractConfigDetails.selector).text()), customData.path)
}

export default extractFrom