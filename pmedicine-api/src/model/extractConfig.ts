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
    selector: string,
    extraInfo: ExtraInfoTable | ExtraInfoScript | undefined
}

type ExtraInfoTable = {
    searchHeader: string
}

type ExtraInfoScript =  {
    path: string
}

export default ExternalPharmacyExtractConfig