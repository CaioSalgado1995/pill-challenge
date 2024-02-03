import { html, htmlWithoutTable, drogasilConfig } from '../__fixtures__/fixtures.js';
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

            const result = extractFrom(html, drogasilConfig)

            expect(result).toStrictEqual(expected)
        });
        it('should extract from html without image', () => {
            const config = {
                name: ".product-name > h1",
                brand: ".brand",
                barcode: ".ProductAttributestyles__ProductAttributeStyles-sc-1smttju-0 > table",
                price: "script[type=application/ld+json]",
                description: ".quantity",
                image: ".small-img-2"
            }

            const expected = {
                name: "Medicine",
                brand: "Brand",
                image: undefined,
                price: 32.7,
                description: "Quantity",
                barcode: "7896094999992"
            }

            const result = extractFrom(html, config)

            expect(result).toStrictEqual(expected)
        });
        it('should extract without barcode', () => {
            const config = {
                name: ".product-name > h1",
                brand: ".brand",
                barcode: ".ProductAttributestyles__ProductAttributeStyles-sc-1smttju-0 > table",
                price: "script[type=application/ld+json]",
                description: ".quantity",
                image: ".small-img-2"
            }

            const expected = {
                name: "Medicine",
                brand: "Brand",
                image: undefined,
                price: 32.7,
                description: "Quantity",
                barcode: ""
            }

            const result = extractFrom(htmlWithoutTable, config)

            expect(result).toStrictEqual(expected)
        });
    });
});