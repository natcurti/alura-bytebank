import { TransactionType } from "./TransactionType.js";
let balance = 3000;
function deposit(value) {
    if (value <= 0) {
        throw new Error("O valor a ser depositado na conta deve ser maior que zero.");
    }
    balance += value;
}
function withdraw(value) {
    if (value <= 0) {
        throw new Error("O valor a ser debitado da conta deve ser maior que zero.");
    }
    else if (value >= balance) {
        throw new Error("Saldo insuficiente.");
    }
    balance -= value;
}
const Account = {
    getBalance() {
        return balance;
    },
    getDate() {
        return new Date();
    },
    registerTransaction(newTransaction) {
        if (newTransaction.transactionType === TransactionType.DEPOSITO) {
            deposit(newTransaction.value);
        }
        else if (newTransaction.transactionType === TransactionType.TRANSFERENCIA ||
            newTransaction.transactionType === TransactionType.PAGAMENTO_BOLETO) {
            withdraw(newTransaction.value);
        }
        else {
            throw new Error("Operação inválida");
        }
    },
};
export default Account;
