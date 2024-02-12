import { Transaction } from "./Transaction";

export type TransactionGroup = {
  label: string;
  transactions: Transaction[];
};
