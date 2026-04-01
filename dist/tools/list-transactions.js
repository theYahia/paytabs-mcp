import { z } from "zod";
import { PaytabsClient } from "../client.js";
const client = new PaytabsClient();
export const listTransactionsSchema = z.object({
    date_from: z.string().describe("Start date (YYYY-MM-DD)"),
    date_to: z.string().describe("End date (YYYY-MM-DD)"),
});
export async function handleListTransactions(params) {
    const result = await client.request("POST", "/payment/query", {
        profile_id: process.env.PAYTABS_PROFILE_ID,
        date_from: params.date_from,
        date_to: params.date_to,
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=list-transactions.js.map