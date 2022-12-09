export interface IStockInfo {
    sku: string,
    stock: number
  }
  
export interface ITransactionInfo {
      sku: string,
      type: string,
      qty: number
  }
  
export enum ETransactionType {
      ORDER = 'order',
      REFUND = 'refund'
  }