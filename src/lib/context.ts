import { setContext, getContext } from 'svelte';
import { AptosWalletAdapter } from '$lib/wallet.svelte';


const CONTEXT_KEY = Symbol('wallet');
//const CONTEXT_KEY = 'wallet';

export function setWalletContext(wallet: AptosWalletAdapter) {
	setContext(CONTEXT_KEY, wallet);
}

export function getWalletContext(): AptosWalletAdapter {
	return getContext<AptosWalletAdapter>(CONTEXT_KEY);
}

