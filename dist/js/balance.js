let balance = 3000;
const showBalance = document.querySelector(".valor");
if (showBalance !== null) {
    showBalance.textContent = formatCurrency(balance);
}
const showDate = document.querySelector(".block-saldo time");
if (showDate !== null) {
    const accessDate = new Date();
    showDate.textContent = formatDate(accessDate, FormatDate.DIA_SEMANA_DIA_MES_ANO);
}
