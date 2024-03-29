import { Storage } from "../utils/Storage.js";
import { ValidateDebit, ValidateDeposit } from "./Decorators.js";
import { Transaction } from "./Transaction.js";
import { TransactionGroup } from "./TransactionGroup.js";
import { TransactionType } from "./TransactionType.js";

export class Account {
  protected name: string;
  protected balance: number = Storage.getData<number>("balance") || 0;
  protected transactions: Transaction[] =
    Storage.getData<Transaction[]>(
      "transactions",
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

  public getOwner() {
    return this.name;
  }

  public getBalance() {
    return this.balance;
  }

  public getDate(): Date {
    return new Date();
  }

  @ValidateDeposit
  private deposit(value: number): void {
    this.balance += value;
    Storage.saveData("balance", this.balance);
  }

  @ValidateDebit
  private withdraw(value: number): void {
    this.balance -= value;
    Storage.saveData("balance", JSON.stringify(this.balance));
  }

  public getTransactionGroup(): TransactionGroup[] {
    const transactionGroups: TransactionGroup[] = [];
    const transactionList: Transaction[] = structuredClone(this.transactions);
    const local = localStorage.getItem("transactions");
    console.log(local);
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
    Storage.saveData("transactions", this.transactions);
  }
}

export class PremiumAccount extends Account {
  registerTransaction(newTransaction: Transaction): void {
    if (newTransaction.transactionType === TransactionType.DEPOSITO) {
      console.log("Você ganhou um bônus de 0.50 centavos!");
      newTransaction.value += 0.5;
    }
    super.registerTransaction(newTransaction);
  }
}

const account = new Account("Natalia Julia Curti");

export default account;
