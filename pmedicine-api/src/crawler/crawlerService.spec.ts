import { html, htmlWithoutTable } from '../__fixtures__/fixtures.js';
import { drograsilCrawlerConfig } from '../config/config.js';
import { ExtractConfigType } from '../model/extractConfigType.js';
import extractFrom from './crawlerService.js';


describe('crawlerService', () => {
    describe('extractFrom', () => {
        it('should extract all data from html', () => {
            const expected = {
                name: "Medicine",
                brand: "Brand",
                image: "some_url",
                price: 32.7,
                description: "Quantity",
                barcode: "7896094999992"
            }

            const result = extractFrom(html, drograsilCrawlerConfig)

            expect(result).toStrictEqual(expected)
        });
        it('should extract from html without image', () => {
            const drograsilCrawlerConfig = {
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
                    selector: ".small-img-2"
                }
            }

            const expected = {
                name: "Medicine",
                brand: "Brand",
                image: undefined,
                price: 32.7,
                description: "Quantity",
                barcode: "7896094999992"
            }

            const result = extractFrom(html, drograsilCrawlerConfig)

            expect(result).toStrictEqual(expected)
        });
        it('should extract without barcode', () => {
            const expected = {
                name: "Medicine",
                brand: "Brand",
                image: "some_url",
                price: 32.7,
                description: "Quantity",
                barcode: ""
            }

            const result = extractFrom(htmlWithoutTable, drograsilCrawlerConfig)

            expect(result).toStrictEqual(expected)
        });
    });
});