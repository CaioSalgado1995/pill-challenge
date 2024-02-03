import { html } from '../__fixtures__/fixtures.js';
import getHtmlFrom from './httpClient.js';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";


describe('httpClient', () => {
    describe('getHtmlFrom', () => {
        it('should get html when make the call', async() => {
            const url = "some_url"
            
            const mockAxios = new MockAdapter(axios)
            mockAxios.onGet(url).reply(200, html)

            const result = await getHtmlFrom(url)

            expect(result).toStrictEqual(html)
        });
        it('should throw error when receives not found from axios', async() => {
            const url = "some_url"
            
            const mockAxios = new MockAdapter(axios)
            mockAxios.onGet(url).reply(404)

            try {
                await getHtmlFrom(url)
            } catch(e) {
                expect(e).toBeInstanceOf(Error)
                expect((e as Error).message).toBe("resource_not_found")
            }
        });
        it('should throw error when receives generic error from axios', async() => {
            const url = "some_url"
            
            const mockAxios = new MockAdapter(axios)
            mockAxios.onGet(url).reply(500)

            try {
                await getHtmlFrom(url)
            } catch(e) {
                expect(e).toBeInstanceOf(Error)
                expect((e as Error).message).toBe("generic_error")
            }
        });
    });
});