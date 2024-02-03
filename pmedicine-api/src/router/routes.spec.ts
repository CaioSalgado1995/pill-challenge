import request from "supertest"
import app from "../app";
import * as medicineService from "../service/medicineService"
import { defaultMedicine } from '../__fixtures__/fixtures.js';

describe("routes", () => {
  test("should hit api and get response properly", async() => {

    const url = "some_url"

    const mockService = jest.spyOn(medicineService, "default").mockImplementation(async () => defaultMedicine)

    const response = await request(app).get("/api/medicines?url=" + url)
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(defaultMedicine)
    expect(mockService).toHaveBeenCalledWith(url)
  });
  test("should hit api and respond with not found", async() => {

    const url = "some_url"

    const mockService = jest.spyOn(medicineService, "default").mockImplementation(async () => { throw Error("resource_not_found")})

    const response = await request(app).get("/api/medicines?url=" + url)
    expect(response.statusCode).toBe(404)
    expect(mockService).toHaveBeenCalledWith(url)
  });
  test("should hit api and respond with not found", async() => {

    const url = "some_url"

    const mockService = jest.spyOn(medicineService, "default").mockImplementation(async () => { throw Error("generic_error")})

    const response = await request(app).get("/api/medicines?url=" + url)
    expect(response.statusCode).toBe(500)
    expect(mockService).toHaveBeenCalledWith(url)
  });
});