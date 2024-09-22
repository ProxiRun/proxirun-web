import type { AuctionEntry } from "$lib/ContractTypes/StateTypes";


export interface IProvider {
    get_auction(request_id: number): Promise<AuctionEntry>
}