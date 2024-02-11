import Account from "../types/Account.js";
import BalanceComponent from "./balance.js";
const form = document.querySelector(".block-nova-transacao form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
        if (!form.checkValidity()) {
            alert("Preencha todos os campos do formulário.");
            return;
        }
        const transactionInput = document.getElementById("tipoTransacao");
        const valueInput = document.getElementById("valor");
        const dateInput = document.getElementById("data");
        let transaction = transactionInput.value;
        let value = valueInput.valueAsNumber;
        let date = new Date(dateInput.value);
        const newTransaction = {
            transactionType: transaction,
            value: value,
            date: date,
        };
        Account.registerTransaction(newTransaction);
        BalanceComponent.update();
        form.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
