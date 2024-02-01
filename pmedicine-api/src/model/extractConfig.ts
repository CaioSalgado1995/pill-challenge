type ExternalPharmacyExtractConfig = {
    name: string,
    brand: string,
    barcode: string,
    price: string,
    description: string,
    image: string
}

type ExtractConfigDetails = {
    type: ExtractConfigType,
    selector: string
}

export default ExternalPharmacyExtractConfig