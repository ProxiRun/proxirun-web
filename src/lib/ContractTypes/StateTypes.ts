import { AuctionStatusUtils, type AuctionStatus } from "./ContractEnums";


export interface AuctionEntry {
    status: AuctionStatus;
    work_request: WorkRequest;
    bids: Bid[];
    winner: Bid | null
}

export interface WorkRequest {
    requester: string;
    submission_time: number;
    max_price: number;
}

export interface Bid {
    bidder: string;
    price: number;
}

export function auction_entry_from_raw(raw: AuctionEntryRaw): AuctionEntry {
    const bids: Bid[] = []
    raw.bids.forEach((b) => bids.push(
        bid_from_raw(b)
    ))

    return {
        status: AuctionStatusUtils.from_id(raw.status),
        work_request: work_request_from_raw(raw.work_request),
        bids: bids,
        winner: !raw.winner || raw.winner.vec.length == 0 ? null :bid_from_raw(raw.winner.vec[0])
    }
}

export function work_request_from_raw(raw: WorkRequestRaw): WorkRequest {
    return {
        requester: raw.requester,
        submission_time: Number(raw.submission_time),
        max_price: Number(raw.max_price)
    }
}

export function bid_from_raw(raw: BidRaw): Bid {
    return {
        bidder: raw.bidder,
        price: Number(raw.price)
    }
}


export interface AuctionEntryRaw {
    status: AuctionStatus;
    work_request: WorkRequestRaw;
    bids: BidRaw[];
    winner: {
        vec: BidRaw[]
    } | null
}

export interface WorkRequestRaw {
    requester: string;
    submission_time: string;
    max_price: string;
}

export interface BidRaw {
    bidder: string;
    price: string;
}