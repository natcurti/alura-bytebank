import Account from "../types/Account.js";
import { FormatDate } from "../types/FormatDate.js";
import { TransactionGroup } from "../types/TransactionGroup.js";
import { formatCurrency, formatDate } from "../utils/formatters.js";

const elementExtract: HTMLElement = document.querySelector(
  ".extrato .registro-transacoes"
);

renderExtract();

function renderExtract(): void {
  const groupTransactions: TransactionGroup[] = Account.getTransactionGroup();
  elementExtract.innerHTML = "";
  let htmlRegisterTransactions: string = "";

  for (let group of groupTransactions) {
    let htmlTransactionItem: string = "";
    for (let transaction of group.transactions) {
      htmlTransactionItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transaction.transactionType}</span>
                        <strong class="valor">${formatCurrency(
                          transaction.value
                        )}</strong>
                    </div>
                    <time class="data">${formatDate(
                      transaction.date,
                      FormatDate.DIA_MES
                    )}</time>
                </div>
            `;
    }

    htmlRegisterTransactions += `
            <div class="transacoes-group">
                <strong class="mes-group">${group.label}</strong>
                ${htmlTransactionItem}
            </div>
        `;
  }

  if (htmlRegisterTransactions === "") {
    htmlRegisterTransactions = "<div>Não há transações registradas.</div>";
  }

  elementExtract.innerHTML = htmlRegisterTransactions;
}

const ExtractComponent = {
  update(): void {
    renderExtract();
  },
};

export default ExtractComponent;
