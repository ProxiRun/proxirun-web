

export interface OnNewWorkRequestRaw {
    request_id: string,
    requester: string,
    time_limit: string
}

export class OnNewWorkRequest {
    request_id: number;
    requester: string;
    time_limit: number;

    constructor(request_id: number, requester: string, time_limit: number) {
        this.request_id = request_id;
        this.requester = requester;
        this.time_limit = time_limit;
    }

    public static from_raw(raw_event: OnNewWorkRequestRaw): OnNewWorkRequest {
        return new OnNewWorkRequest(
            Number(raw_event.request_id),
            raw_event.requester,
            Number(raw_event.time_limit)
        )
    }
}
