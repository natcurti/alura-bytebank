import { formatCurrency, formatDate } from "../utils/formatters.js";
import { FormatDate } from "../types/FormatDate.js";
let balance = 3000;
const showBalance = document.querySelector(".valor");
const showDate = document.querySelector(".block-saldo time");
if (showDate !== null) {
    const accessDate = new Date();
    showDate.textContent = formatDate(accessDate, FormatDate.DIA_SEMANA_DIA_MES_ANO);
}
export function getBalance() {
    return balance;
}
updateBalance(balance);
export function updateBalance(value) {
    balance = value;
    if (showBalance !== null) {
        showBalance.textContent = formatCurrency(balance);
    }
}
