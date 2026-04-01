const BASE_URL = "https://secure.paytabs.sa";
const TIMEOUT = 15_000;

export class PaytabsClient {
  private profileId: string;
  private serverKey: string;

  constructor() {
    this.profileId = process.env.PAYTABS_PROFILE_ID ?? "";
    this.serverKey = process.env.PAYTABS_SERVER_KEY ?? "";
    if (!this.profileId || !this.serverKey) {
      throw new Error(
        "Environment variables PAYTABS_PROFILE_ID and PAYTABS_SERVER_KEY are required. " +
        "Get credentials at https://site.paytabs.com/en/developer/"
      );
    }
  }

  async request(method: string, path: string, body?: unknown): Promise<unknown> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
          "Authorization": this.serverKey,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`PayTabs HTTP ${response.status}: ${text}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timer);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("PayTabs: request timeout (15s). Try again later.");
      }
      throw error;
    }
  }
}
