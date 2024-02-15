import { Transaction } from "./Transaction";
import { TransactionGroup } from "./TransactionGroup";
import { TransactionType } from "./TransactionType";

export class Account {
  name: string;
  balance: number = JSON.parse(localStorage.getItem("balance")) || 0;
  transactions: Transaction[] =
    JSON.parse(
      localStorage.getItem("transactions"),
      (key: string, value: string) => {
        if (key === "date") {
          return new Date(value);
        }

        return value;
      }
    ) || [];

  constructor(name: string) {
    this.name = name;
  }

  getBalance() {
    return this.balance;
  }

  getDate(): Date {
    return new Date();
  }

  deposit(value: number): void {
    if (value <= 0) {
      throw new Error(
        "O valor a ser depositado na conta deve ser maior que zero."
      );
    }
    this.balance += value;
    localStorage.setItem("balance", JSON.stringify(this.balance));
  }

  withdraw(value: number): void {
    if (value <= 0) {
      throw new Error(
        "O valor a ser debitado da conta deve ser maior que zero."
      );
    } else if (value >= this.balance) {
      throw new Error("Saldo insuficiente.");
    }
    this.balance -= value;
    localStorage.setItem("balance", JSON.stringify(this.balance));
  }

  getTransactionGroup(): TransactionGroup[] {
    const transactionGroups: TransactionGroup[] = [];
    const transactionList: Transaction[] = structuredClone(this.transactions);
    const ordenedTransactions: Transaction[] = transactionList.sort(
      (t1, t2) => t2.date.getTime() - t1.date.getTime()
    );
    let labelActualGroup: string = "";

    for (let transaction of ordenedTransactions) {
      let labelGroup: string = transaction.date.toLocaleDateString("pt-br", {
        month: "long",
        year: "numeric",
      });
      if (labelActualGroup !== labelGroup) {
        transactionGroups.push({
          label: labelGroup,
          transactions: [],
        });
      }
      transactionGroups.at(-1).transactions.push(transaction);
    }

    return transactionGroups;
  }

  registerTransaction(newTransaction: Transaction): void {
    if (newTransaction.transactionType === TransactionType.DEPOSITO) {
      this.deposit(newTransaction.value);
    } else if (
      newTransaction.transactionType === TransactionType.TRANSFERENCIA ||
      newTransaction.transactionType === TransactionType.PAGAMENTO_BOLETO
    ) {
      this.withdraw(newTransaction.value);
      newTransaction.value *= -1;
    } else {
      throw new Error("Operação inválida");
    }

    this.transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }
}

const account = new Account("Natalia Julia Curti");

export default account;
