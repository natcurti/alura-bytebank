import { Storage } from "../utils/Storage.js";
import { TransactionType } from "./TransactionType.js";
export class Account {
    name;
    balance = Storage.getData("balance") || 0;
    transactions = Storage.getData("transactions", (key, value) => {
        if (key === "date") {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(name) {
        this.name = name;
    }
    getOwner() {
        return this.name;
    }
    getBalance() {
        return this.balance;
    }
    getDate() {
        return new Date();
    }
    deposit(value) {
        if (value <= 0) {
            throw new Error("O valor a ser depositado na conta deve ser maior que zero.");
        }
        this.balance += value;
        Storage.saveData("balance", JSON.stringify(this.balance));
    }
    withdraw(value) {
        if (value <= 0) {
            throw new Error("O valor a ser debitado da conta deve ser maior que zero.");
        }
        else if (value >= this.balance) {
            throw new Error("Saldo insuficiente.");
        }
        this.balance -= value;
        Storage.saveData("balance", JSON.stringify(this.balance));
    }
    getTransactionGroup() {
        const transactionGroups = [];
        const transactionList = structuredClone(this.transactions);
        const ordenedTransactions = transactionList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let labelActualGroup = "";
        for (let transaction of ordenedTransactions) {
            let labelGroup = transaction.date.toLocaleDateString("pt-br", {
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
    registerTransaction(newTransaction) {
        if (newTransaction.transactionType === TransactionType.DEPOSITO) {
            this.deposit(newTransaction.value);
        }
        else if (newTransaction.transactionType === TransactionType.TRANSFERENCIA ||
            newTransaction.transactionType === TransactionType.PAGAMENTO_BOLETO) {
            this.withdraw(newTransaction.value);
            newTransaction.value *= -1;
        }
        else {
            throw new Error("Operação inválida");
        }
        this.transactions.push(newTransaction);
        Storage.saveData("transactions", JSON.stringify(this.transactions));
    }
}
export class PremiumAccount extends Account {
    registerTransaction(newTransaction) {
        if (newTransaction.transactionType === TransactionType.DEPOSITO) {
            console.log("Você ganhou um bônus de 0.50 centavos!");
            newTransaction.value += 0.5;
        }
        super.registerTransaction(newTransaction);
    }
}
const account = new Account("Natalia Julia Curti");
export default account;
