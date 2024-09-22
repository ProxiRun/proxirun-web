
export const APTOS_DECIMALS = 8;


export function aptos_price_to_decimal(value: number): number {
	return value / 10 ** APTOS_DECIMALS
}

export function decimal_to_aptos_price(value: number): number {
	return Math.round(value * 10**APTOS_DECIMALS)
}

export function normalize_address(address: string): string {
	const temp = address.replace("0x", "")
	return "0x" + temp.padStart(64, "0")

}