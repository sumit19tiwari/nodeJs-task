# nodeJS-Task

You are given two json files:
 - stock.json: contains objects which represent the starting stock levels for given SKUS
 - transactions.json: contains an array of transactions since the stock levels were recorded in `stock.json`

The objective is to create a function which is able to return the current stock levels for a given SKU by combining the data in these two files. These are the requirements.

- The function must match the following signature: `(sku: string) => Promise<{ sku: string, qty: number }>`.
- The function must read from the `stock` and `transactions` files on each invocation (totals cannot be precomputed)
- The function must throw an error where the SKU does not exist in the `transactions.json` and `stock.json` file
- All code must be adequately tested

Notes:
- Transactions may exist for SKUs which are not present in `stock.json`. It should be assumed that the starting quantity for these is 0.
- Functionality can be split into many files to help keep the project clear and organised


Approach:
Create a GET endpoint(/get-stock/:sku(*)) that will accept the sku, based on that it will return the result in JSOn format
{
 "qty":23,
 "sku": "some-sku"
}

It will return the below JSON if SKU is not found.
{
 "msg": "No sku found"
}

You can test the result by cloning this repo and do the npm install and after that start the server with npm run dev and pass the sku on below url
localhost:3000/get-stock/{sku_name}
