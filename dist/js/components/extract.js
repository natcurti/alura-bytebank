import Account from "../types/Account.js";
import { FormatDate } from "../types/FormatDate.js";
import { formatCurrency, formatDate } from "../utils/formatters.js";
const elementExtract = document.querySelector(".extrato .registro-transacoes");
renderExtract();
function renderExtract() {
    const groupTransactions = Account.getTransactionGroup();
    elementExtract.innerHTML = "";
    let htmlRegisterTransactions = "";
    for (let group of groupTransactions) {
        let htmlTransactionItem = "";
        for (let transaction of group.transactions) {
            htmlTransactionItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transaction.transactionType}</span>
                        <strong class="valor">${formatCurrency(transaction.value)}</strong>
                    </div>
                    <time class="data">${formatDate(transaction.date, FormatDate.DIA_MES)}</time>
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
    update() {
        renderExtract();
    },
};
export default ExtractComponent;
