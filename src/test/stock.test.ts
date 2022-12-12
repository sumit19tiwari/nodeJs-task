import router from '../index';
import request from "supertest";
import stockController from '../controller/stock-info';

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

 
  describe("Find current stock", () => {
    it("should return current stock", async()=>{
      const expectResult = { qty: 8517, sku: "LTV719449/39/39"};
      expect(stockController.getCurrentStock("LTV719449/39/39")).resolves.toEqual(expectResult);
    });
    it("should return no sku found", async()=>{
      const expectResult = {msg: 'No sku found'};
      expect(stockController.getCurrentStock("LTV719449/39/391")).resolves.toEqual(expectResult);
    });
  });
