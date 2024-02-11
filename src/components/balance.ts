import { formatCurrency } from "../utils/formatters.js";
import Account from "../types/Account.js";

const showBalance = document.querySelector(".valor") as HTMLElement;

function renderBalance(): void {
  if (showBalance !== null) {
    showBalance.textContent = formatCurrency(Account.getBalance());
  }
}

const BalanceComponent = {
  update() {
    renderBalance();
  },
};

export default BalanceComponent;
