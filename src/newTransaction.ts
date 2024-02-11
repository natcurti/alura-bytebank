const form = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!form.checkValidity()) {
    alert("Preencha todos os campos do formulário.");
    return;
  }

  const transactionInput = document.getElementById(
    "tipoTransacao"
  ) as HTMLSelectElement;
  const valueInput = document.getElementById("valor") as HTMLInputElement;
  const dateInput = document.getElementById("data") as HTMLInputElement;

  let transaction: TransactionType = transactionInput.value as TransactionType;
  let value: number = valueInput.valueAsNumber;
  let date: Date = new Date(dateInput.value);

  const newTransaction: Transaction = {
    transactionType: transaction,
    value: value,
    date: date,
  };

  if (transaction === TransactionType.DEPOSITO) {
    balance += value;
  } else if (
    transaction === TransactionType.TRANSFERENCIA ||
    transaction === TransactionType.PAGAMENTO_BOLETO
  ) {
    balance -= value;
  } else {
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
