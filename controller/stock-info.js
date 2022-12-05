const fs = require('fs');
module.exports.getStock = function(req, res) {
    const sku = req.params.sku;
    getCurrentStock(sku).then((data)=>{
        res.json(data);
    });
}

// function to read the data from stock and transaction file
 function getCurrentStock(sku){
    const createStockRead = fs.createReadStream("stock.json");
    const createTransactionRead = fs.createReadStream("transactions.json");
    return new Promise((resolve, reject) =>{
        var quantity = {};
        createStockRead.on('data',(data)=>{
            var stockdata = data.toString();
            createTransactionRead.on('data',(transdata)=>{
            var transdata =  transdata.toString();
            quantity = calculateCurrentStock(sku, JSON.parse(stockdata), JSON.parse(transdata));
            resolve(quantity);
           
        });
    });
    });
 }

 //Logic to create current quantity
 function calculateCurrentStock(sku, stockdata, transdata){
    const stock = stockdata.find(x => x.sku == sku);
    const transaction = transdata.filter(x => x.sku == sku);
    let currentStock = 0;
    if(stock){
        for(var i =0; i< transaction.length; i++){
            if(transaction[i].type == 'order'){
                currentStock = parseInt(currentStock) - parseInt(transaction[i].qty);
            } else {
                currentStock = parseInt(currentStock) + parseInt(transaction[i].qty);
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
