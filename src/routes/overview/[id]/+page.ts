// +page.ts
import { MockProvider } from '$lib/DataProviders/MockProvider';
import type { PageLoad } from './$types';

import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

import { AUCTION_ABI } from '$lib/auction_abi';
import { createSurfClient } from '@thalalabs/surf';

import { auction_entry_from_raw, type AuctionEntry, type AuctionEntryRaw } from '$lib/ContractTypes/StateTypes.js';


const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

const client = createSurfClient(aptos);

export const load: PageLoad = async (event) => {
  const { id } = event.params;

  let auction_data: AuctionEntry | null;
  try {
    const [temp] = await client.useABI(AUCTION_ABI).view.get_auction({
      functionArguments: [Number(id)],
      typeArguments: [],
      //ledgerVersion: '562606728', // ledger_version is optional
    });

    auction_data = auction_entry_from_raw(temp as AuctionEntryRaw);
  } catch (e) {
    console.log(e)
    auction_data = null;
  }

  let url = `/api/payload?id=${id}`
  const response_db = await event.fetch(url, {
    method: 'GET',

    headers: {
      'content-type': 'application/json'
    }
  });
  const payload_data = (await response_db.json())[0];

  return {
    id, // return id to the page component
    auction_data,
    payload_data
    // post // optionally return other data
  };
};
