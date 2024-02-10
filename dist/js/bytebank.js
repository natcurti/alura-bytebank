let balance = 3000;
alert("HELLO");
const showBalance = document.querySelector(".valor");
showBalance.textContent = balance.toString();
const form = document.querySelector(".block-nova-transacao form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
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
        transaction: transaction,
        value: value,
        date: date,
    };
    if (transaction === "Depósito") {
        balance += value;
    }
    else if (transaction === "Transferência" ||
        transaction === "Pagamento de Boleto") {
        balance -= value;
    }
    else {
        alert("Transação inválida");
        return;
    }
    showBalance.textContent = balance.toString();
    console.log(newTransaction);
    form.reset();
});
