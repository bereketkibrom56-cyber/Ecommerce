export const formatCurrency = value =>
  "$"+Number(value).toLocaleString(undefined,{maximumFractionDigits:2})
  // new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD"
  // }).format(value);
