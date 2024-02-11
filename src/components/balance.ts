import { formatCurrency, formatDate } from "../utils/formatters.js";
import { FormatDate } from "../types/FormatDate.js";

let balance: number = 3000;

const showBalance = document.querySelector(".valor") as HTMLElement;

const showDate = document.querySelector(".block-saldo time") as HTMLElement;
if (showDate !== null) {
  const accessDate: Date = new Date();
  showDate.textContent = formatDate(
    accessDate,
    FormatDate.DIA_SEMANA_DIA_MES_ANO
  );
}

export function getBalance(): number {
  return balance;
}

updateBalance(balance);

export function updateBalance(value: number): void {
  balance = value;
  if (showBalance !== null) {
    showBalance.textContent = formatCurrency(balance);
  }
}
