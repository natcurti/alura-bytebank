function formatCurrency(value: number): string {
  return value.toLocaleString("pt-br", {
    currency: "BRL",
    style: "currency",
  });
}

function formatDate(
  value: Date,
  format: FormatDate = FormatDate.PADRAO
): string {
  if (format === FormatDate.DIA_SEMANA_DIA_MES_ANO) {
    return value.toLocaleDateString("pt-br", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } else if (format === FormatDate.DIA_MES) {
    return value.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  return value.toLocaleDateString("pt-br");
}
