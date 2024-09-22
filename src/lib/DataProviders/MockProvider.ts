
import { AuctionStatus } from "$lib/ContractTypes/ContractEnums";
import type { AuctionEntry } from "$lib/ContractTypes/StateTypes";
import type { IProvider } from "./IProvider";



export class MockProvider implements IProvider {
    async get_auction(request_id: number): Promise<AuctionEntry> {
        const mod_value = request_id % 4;

        if (mod_value == 0) {
            return {
                status: AuctionStatus.InAuction,
                work_request: {
                    requester: "0x6ec484a256fd74bf2c36beb31f41178c339ff9b2886646321e654fdbe747db38",
                    max_price: 15000,
                    submission_time: 1726089843000 // in microseconds
                },
                bids: [
                    {
                        bidder: "0xe749f949c1547d63e31ece7855cbae76ce7e2214ef7e6676de8e1ae261e5821d",
                        price: 420
                    },
                    {
                        bidder: "0x67b297058d9578865b46f2912bb7c0d27711db8066d16aed7ebac1c3174190c4",
                        price: 840
                    }
                ],
                winner: null
            }
        }

        if (mod_value == 1) {
            return {
                status: AuctionStatus.Processing,
                work_request: {
                    requester: "0x6ec484a256fd74bf2c36beb31f41178c339ff9b2886646321e654fdbe747db38",
                    max_price: 15000,
                    submission_time: 1726089843000 // in microseconds
                },
                bids: [
                    {
                        bidder: "0xe749f949c1547d63e31ece7855cbae76ce7e2214ef7e6676de8e1ae261e5821d",
                        price: 420
                    },
                    {
                        bidder: "0x67b297058d9578865b46f2912bb7c0d27711db8066d16aed7ebac1c3174190c4",
                        price: 840
                    }
                ],
                winner: {
                    bidder: "0xe749f949c1547d63e31ece7855cbae76ce7e2214ef7e6676de8e1ae261e5821d",
                    price: 420
                },
            }
        }

        // successful auction
        if (mod_value == 2) {
            return {
                status: AuctionStatus.Success,
                work_request: {
                    requester: "0x6ec484a256fd74bf2c36beb31f41178c339ff9b2886646321e654fdbe747db38",
                    max_price: 15000,
                    submission_time: 1726089843000 // in microseconds
                },
                bids: [
                    {
                        bidder: "0xe749f949c1547d63e31ece7855cbae76ce7e2214ef7e6676de8e1ae261e5821d",
                        price: 420
                    },
                    {
                        bidder: "0x67b297058d9578865b46f2912bb7c0d27711db8066d16aed7ebac1c3174190c4",
                        price: 840
                    }
                ],
                winner: {
                    bidder: "0xe749f949c1547d63e31ece7855cbae76ce7e2214ef7e6676de8e1ae261e5821d",
                    price: 420
                }
            }
        }

        // auction failure 
        if (mod_value == 3) {
            return {
                status: AuctionStatus.Fail,
                work_request: {
                    requester: "0x6ec484a256fd74bf2c36beb31f41178c339ff9b2886646321e654fdbe747db38",
                    max_price: 200,
                    submission_time: 1726089843000 // in microseconds
                },
                bids: [

                ],
                winner: null
            }
        }
    }
}