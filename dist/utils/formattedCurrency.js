export function formatCurrency(value) {
    const formattedBalance = new Intl.NumberFormat("id-ID").format(value);
    return `Rp ${formattedBalance}`;
}
