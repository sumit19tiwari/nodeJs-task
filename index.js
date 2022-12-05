const express = require('express');

const app = express();
const stockController = require('./controller/stock-info');



app.get('/get-stock/:sku(*)',[stockController.getStock]);

app.listen(3000,()=>{
    console.log('server is running at port 3000');
})