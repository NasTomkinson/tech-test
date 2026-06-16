const gbpCurrencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function formatCurrency(value: number): string {
  return gbpCurrencyFormatter.format(value);
}
