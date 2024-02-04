import { ExtractConfigType } from "./extractConfigType"

export type ExtractConfigDetails = {
    type: ExtractConfigType,
    selector: string,
    extraInfo?: ExtraInfoTable | ExtraInfoScript
}

export type ExtraInfoTable = {
    headerText: string
}

export type ExtraInfoScript =  {
    path: string
}