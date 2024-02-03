import getMedicineData from './medicineService.js';
import * as httpClient from '../client/httpClient'
import * as crawlerService from '../crawler/crawlerService.js';
import { html, drogasilConfig, defaultMedicine } from '../__fixtures__/fixtures.js';

describe('medicineService', () => {
    describe('getMedicineData', () => {
        it('should get all medicine data properly', async () => {

            const url = "https://drogasil.com.br/remedio.html"

            const mockHttpClient = jest.spyOn(httpClient, "default").mockImplementation(async () => html)
            const mockCrawler = jest.spyOn(crawlerService, "default").mockImplementation(() => defaultMedicine)

            const result = await getMedicineData(url)

            expect(result).toStrictEqual(defaultMedicine)
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