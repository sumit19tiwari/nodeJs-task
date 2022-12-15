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
    it("should subtract the quantity when the transaction type is ORDER", async()=>{
      const stockData = [{"sku":"CLQ274846/07/46","stock":8414}];
      const transactionData = [{"sku":"CLQ274846/07/46","type":"order","qty":6},{"sku":"CLQ274846/07/46","type":"order","qty":10}];
      const currentStock = stockController.calculateCurrentStock("CLQ274846/07/46", stockData, transactionData);
      expect(currentStock).toEqual({qty: 8398, sku: "CLQ274846/07/46"});
    })
    it("should add the quantity when the transaction type is REFUND", async()=>{
      const stockData = [{"sku":"CLQ274846/07/46","stock":8414}];
      const transactionData = [{"sku":"CLQ274846/07/46","type":"refund","qty":6},{"sku":"CLQ274846/07/46","type":"refund","qty":10}];
      const currentStock = stockController.calculateCurrentStock("CLQ274846/07/46", stockData, transactionData);
      expect(currentStock).toEqual({qty: 8430, sku: "CLQ274846/07/46"});
    })
  });
