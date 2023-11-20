export function formatCurrency(value: number) {
	const formattedBalance = new Intl.NumberFormat("id-ID").format(value);

	return `Rp ${formattedBalance}`;
}
