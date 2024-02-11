let balance: number = 3000;

const showBalance = document.querySelector(".valor") as HTMLElement;
if (showBalance !== null) {
  showBalance.textContent = formatCurrency(balance);
}

const showDate = document.querySelector(".block-saldo time") as HTMLElement;
if (showDate !== null) {
  const accessDate: Date = new Date();
  showDate.textContent = formatDate(
    accessDate,
    FormatDate.DIA_SEMANA_DIA_MES_ANO
  );
}
