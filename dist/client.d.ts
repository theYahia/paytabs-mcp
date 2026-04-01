export declare class PaytabsClient {
    private profileId;
    private serverKey;
    constructor();
    request(method: string, path: string, body?: unknown): Promise<unknown>;
}
