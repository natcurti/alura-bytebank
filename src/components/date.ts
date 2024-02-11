import { FormatDate } from "../types/FormatDate.js";
import { formatDate } from "../utils/formatters.js";
import Account from "../types/Account.js";

const showDate = document.querySelector(".block-saldo time") as HTMLElement;

function renderDate(): void {
  if (showDate !== null) {
    showDate.textContent = formatDate(
      Account.getDate(),
      FormatDate.DIA_SEMANA_DIA_MES_ANO
    );
  }
}

const DataComponent = {
  update() {
    renderDate();
  },
};

export default DataComponent;
