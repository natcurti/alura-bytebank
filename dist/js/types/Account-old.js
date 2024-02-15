import { TransactionType } from "./TransactionType.js";
let balance = JSON.parse(localStorage.getItem("balance")) || 0;
const transactions = JSON.parse(localStorage.getItem("transactions"), (key, value) => {
    if (key === "date") {
        return new Date(value);
    }
    return value;
}) || [];
function deposit(value) {
    if (value <= 0) {
        throw new Error("O valor a ser depositado na conta deve ser maior que zero.");
    }
    balance += value;
    localStorage.setItem("balance", JSON.stringify(balance));
}
function withdraw(value) {
    if (value <= 0) {
        throw new Error("O valor a ser debitado da conta deve ser maior que zero.");
    }
    else if (value >= balance) {
        throw new Error("Saldo insuficiente.");
    }
    balance -= value;
    localStorage.setItem("balance", JSON.stringify(balance));
}
const Account = {
    getBalance() {
        return balance;
    },
    getDate() {
        return new Date();
    },
    getTransactionGroup() {
        const transactionGroups = [];
        const transactionList = structuredClone(transactions);
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
    },
    registerTransaction(newTransaction) {
        if (newTransaction.transactionType === TransactionType.DEPOSITO) {
            deposit(newTransaction.value);
        }
        else if (newTransaction.transactionType === TransactionType.TRANSFERENCIA ||
            newTransaction.transactionType === TransactionType.PAGAMENTO_BOLETO) {
            withdraw(newTransaction.value);
            newTransaction.value *= -1;
        }
        else {
            throw new Error("Operação inválida");
        }
        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    },
};
export default Account;
