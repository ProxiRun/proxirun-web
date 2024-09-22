

export class FakeWallet {
    connected: boolean = $state(false);

    constructor() {};

    async connect(): Promise<void> {
        this.connected = true;
    }

    async disconnect(): Promise<void> {
        this.connected = false;
    }
    
    is_connected(): boolean {
        return this.connected;
    }
}


export const wallet = new FakeWallet();

