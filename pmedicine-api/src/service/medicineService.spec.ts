import getMedicineData from './medicineService.js';
import * as httpClient from '../client/httpClient'
import * as crawlerService from '../crawler/crawlerService.js';
import { html, drogasilConfig } from '../__fixtures__/fixtures.js';

describe('medicineService', () => {
    describe('getMedicineData', () => {
        it('should get all medicine data properly', async () => {

            const url = "https://drogasil.com.br/remedio.html"
            const medicine = {
                name: "Medicine",
                brand: "Brand",
                image: "some_url",
                price: 32.7,
                description: "Quantity",
                barcode: "7896094999992"
            }

            const mockHttpClient = jest.spyOn(httpClient, "default").mockImplementation(async () => html)
            const mockCrawler = jest.spyOn(crawlerService, "default").mockImplementation(() => medicine)

            const result = await getMedicineData(url)

            expect(result).toStrictEqual(medicine)
            expect(mockHttpClient).toHaveBeenCalledWith(url)
            expect(mockCrawler).toHaveBeenCalledWith(html, drogasilConfig)
        });

        it('should throw error for unconfigured pharmacy', async () => {
            const url = "https://nissei.com.br/remedio.html"

            try {
                await getMedicineData(url)
            } catch (e) {
                expect(e).toBeInstanceOf(Error)
                expect((e as Error).message).toBe("External pharmacy provider does not have any configuration https://nissei.com.br/remedio.html")
            }
        });
    });
});