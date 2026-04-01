import { z } from "zod";
import { PaytabsClient } from "../client.js";
const client = new PaytabsClient();
export const voidTransactionSchema = z.object({
    tran_ref: z.string().describe("Transaction reference to void"),
});
export async function handleVoidTransaction(params) {
    const result = await client.request("POST", "/payment/request", {
        profile_id: process.env.PAYTABS_PROFILE_ID,
        tran_type: "void",
        tran_class: "ecom",
        cart_id: `void-${params.tran_ref}`,
        cart_description: "Void transaction",
        cart_currency: "SAR",
        cart_amount: 0,
        tran_ref: params.tran_ref,
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=void-transaction.js.map