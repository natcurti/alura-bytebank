import { Transaction } from "./Transaction.js";
import { TransactionType } from "./TransactionType.js";

let balance: number = 3000;

const Account = {
  getBalance() {
    return balance;
  },

  getDate(): Date {
    return new Date();
  },

  registerTransaction(newTransaction: Transaction): void {
    if (newTransaction.transactionType === TransactionType.DEPOSITO) {
      balance += newTransaction.value;
    } else if (
      newTransaction.transactionType === TransactionType.TRANSFERENCIA ||
      newTransaction.transactionType === TransactionType.PAGAMENTO_BOLETO
    ) {
      balance -= newTransaction.value;
    } else {
      alert("Transação inválida");
      return;
    }
  },
};

export default Account;
