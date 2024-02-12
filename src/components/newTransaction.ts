import { TransactionType } from "../types/TransactionType.js";
import { Transaction } from "../types/Transaction.js";
import Account from "../types/Account.js";
import BalanceComponent from "./balance.js";
import ExtractComponent from "./extract.js";

const form = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;
form.addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    if (!form.checkValidity()) {
      alert("Preencha todos os campos do formulário.");
      return;
    }

    const transactionInput = document.getElementById(
      "tipoTransacao"
    ) as HTMLSelectElement;
    const valueInput = document.getElementById("valor") as HTMLInputElement;
    const dateInput = document.getElementById("data") as HTMLInputElement;

    let transaction: TransactionType =
      transactionInput.value as TransactionType;
    let value: number = valueInput.valueAsNumber;
    let date: Date = new Date(dateInput.value + " 00:00:00");

    const newTransaction: Transaction = {
      transactionType: transaction,
      value: value,
      date: date,
    };

    Account.registerTransaction(newTransaction);
    BalanceComponent.update();
    form.reset();
    ExtractComponent.update();
  } catch (error) {
    alert(error.message);
  }
});
