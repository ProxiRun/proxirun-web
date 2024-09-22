

export enum AuctionStatus {
    InAuction,
    Fail,
    Processing,
    Success
}



export class AuctionStatusUtils {
    public static to_string(status: AuctionStatus): string {
        switch (status) {
            case AuctionStatus.InAuction:
                return "In Auction"
            case AuctionStatus.Processing:
                return "Processing"
            case AuctionStatus.Success:
                return "Success"
            case AuctionStatus.Fail:
                return "Failed"
        }
    }

    public static from_id(id: number): AuctionStatus {
        switch (id) {
            case 0:
                return AuctionStatus.InAuction
            case 1:
                return AuctionStatus.Fail
            case 2:
                return AuctionStatus.Processing
            case 3:
                return AuctionStatus.Success
            default:
                throw new Error("invalid AuctionStatus id provided")
        }
    }

}