import router from '../index';
import request from "supertest";

describe("GET /get-stock/:sku(*)'", () => {
    it("should return current quantity based on sku", async () => {
      const result = await request(router).get("/get-stock/IQZ340003/37/30");
      expect(result.statusCode).toEqual(200);
      expect(result.text).toEqual("{\"qty\":1775,\"sku\":\"IQZ340003/37/30\"}");
    });
    it("should return no sku found when there is no SKU", async () => {
      const result = await request(router).get("/get-stock/IQZ340003/37/31");
      expect(result.statusCode).toEqual(200);
      expect(result.text).toEqual("{\"msg\":\"No sku found\"}");
    });
  });