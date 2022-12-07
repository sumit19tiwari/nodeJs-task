import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

export const getStock = async (req: Request, res: Response, next: NextFunction) => {
    const sku = req.params?.sku;
    getCurrentStock(sku).then((data)=>{
        res.json(data);
    });
};


// function to read the data from stock and transaction file
 export const getCurrentStock = function(sku: string){
    const createStockRead = fs.createReadStream("stock.json");
    const createTransactionRead = fs.createReadStream("transactions.json");
    return new Promise((resolve, reject) =>{
        var quantity = {};
        createStockRead.on('data',(data)=>{
            var stockdata = data.toString();
            createTransactionRead.on('data',(transdata: any)=>{
            var transdata =  transdata.toString();
            quantity = calculateCurrentStock(sku, JSON.parse(stockdata), JSON.parse(transdata));
            resolve(quantity);
           
        });
    });
    });
 }

 //Logic to create current quantity
 const calculateCurrentStock = function (sku: string, stockdata: Record<string, any>, transdata: Record<string, any>){
    const stock = stockdata.find((x: any) => x.sku == sku);
    const transaction = transdata.filter((x: any) => x.sku == sku);
    let currentStock: number = 0;
    if(stock){
        for(var i =0; i< transaction.length; i++){
            if(transaction[i].type == 'order'){
                currentStock = Number(currentStock) - Number(transaction[i].qty);
            } else {
                currentStock = Number(currentStock) + Number(transaction[i].qty);
            }
        }
        let quantity = stock.stock + currentStock;
        return {
            qty: quantity,
            sku: sku
        }
    } else {
        return {
            msg: 'No sku found'
        }
    }
 }

 export default { getStock };
