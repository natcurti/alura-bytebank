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
        transactionType: transaction,
        value: value,
        date: date,
    };
    if (transaction === TransactionType.DEPOSITO) {
        balance += value;
    }
    else if (transaction === TransactionType.TRANSFERENCIA ||
        transaction === TransactionType.PAGAMENTO_BOLETO) {
        balance -= value;
    }
    else {
        alert("Transação inválida");
        return;
    }
    showBalance.textContent = balance.toLocaleString("pt-br", {
        currency: "BRL",
        style: "currency",
    });
    console.log(newTransaction);
    form.reset();
});