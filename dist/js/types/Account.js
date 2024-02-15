var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Storage } from "../utils/Storage.js";
import { ValidateDebit, ValidateDeposit } from "./Decorators.js";
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
        this.balance += value;
        Storage.saveData("balance", JSON.stringify(this.balance));
    }
    withdraw(value) {
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
__decorate([
    ValidateDeposit
], Account.prototype, "deposit", null);
__decorate([
    ValidateDebit
], Account.prototype, "withdraw", null);
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
