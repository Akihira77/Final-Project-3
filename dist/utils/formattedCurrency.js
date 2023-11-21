export function formatCurrency(value) {
    const formattedBalance = new Intl.NumberFormat("id-ID").format(value);
    return `Rp ${formattedBalance}`;
}
//# sourceMappingURL=formattedCurrency.js.map