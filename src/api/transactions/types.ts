export interface ITransaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  transactionType: string;
  transactionFlow: string;
  sum: 0;
  paymentIntentId: string;
}
