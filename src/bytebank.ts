let balance = 3000;

alert("HELLO");

const showBalance = document.querySelector(".valor") as HTMLElement;
showBalance.textContent = balance.toString();

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

  let transaction: string = transactionInput.value;
  let value: number = valueInput.valueAsNumber;
  let date: Date = new Date(dateInput.value);

  const newTransaction = {
    transaction: transaction,
    value: value,
    date: date,
  };

  if (transaction === "Depósito") {
    balance += value;
  } else if (
    transaction === "Transferência" ||
    transaction === "Pagamento de Boleto"
  ) {
    balance -= value;
  } else {
    alert("Transação inválida");
    return;
  }

  showBalance.textContent = balance.toString();

  console.log(newTransaction);
  form.reset();
});
