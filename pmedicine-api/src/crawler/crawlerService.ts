import cheerio from 'cheerio'
import Medicine from '../model/medicine'
import ExternalPharmacyExtractConfig from '../model/extractConfig'

/**
 * Issue to get the price information since it is loaded after by a script
 * https://stackoverflow.com/questions/71723592/scraping-dynamically-rendered-content-with-cheerio
 * Try later: https://github.com/puppeteer/puppeteer
 * After search the DOM, I found a script containing all the values, including the price
 * @param htmlData 
 * @param extractConfig a configuration that indicates how to extract the data from the html information
 * @returns a medicine model with all information
 */
function extractFrom(
    htmlData: string, 
    extractConfig: ExternalPharmacyExtractConfig
): Medicine {
    const $ = cheerio.load(htmlData)
    const medicineName = $(extractConfig.name).text()

    console.debug("Crawling ... Medicine info - name: " + medicineName)

    const medicineDescription = $(extractConfig.description).text()
    const medicineBrand = $(extractConfig.brand).text()
    const medicineImage = $(extractConfig.image).prop('src') as string
    const medicinePrice = parseFloat(JSON.parse($(extractConfig.price).text())["offers"]["price"])
    const medicineBarcode = getBarcode($, extractConfig)

    return {
        name: medicineName,
        brand: medicineBrand,
        barcode: medicineBarcode,
        price: medicinePrice,
        description: medicineDescription,
        image: medicineImage
    }
}

/**
 * Extracting the barcode from a DOM table
 * @param root the DOM root node
 * @param extractConfig a configuration that indicates how to extract the data from the html information
 * @returns 
 */
function getBarcode(root: cheerio.Root, extractConfig: ExternalPharmacyExtractConfig) {
    return root(extractConfig.barcode)
        .find("tr")
        .filter((_, row) => {
            console.debug("Crawling ... Table <hr> " + root(row).children("th").text())
            return root(row).children("th").text() == "EAN"
        })
        .children("td")
        .text()
}

export default extractFrom