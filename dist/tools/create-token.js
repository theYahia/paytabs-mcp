import { z } from "zod";
import { PaytabsClient } from "../client.js";
const client = new PaytabsClient();
export const createTokenSchema = z.object({
    card_number: z.string().describe("Card number"),
    expiry_month: z.string().describe("Expiry month (MM)"),
    expiry_year: z.string().describe("Expiry year (YYYY)"),
    cvv: z.string().describe("Card CVV"),
    return_url: z.string().url().describe("Return URL after tokenization"),
});
export async function handleCreateToken(params) {
    const result = await client.request("POST", "/payment/request", {
        profile_id: process.env.PAYTABS_PROFILE_ID,
        tran_type: "sale",
        tran_class: "recurring",
        cart_id: `token-${Date.now()}`,
        cart_description: "Card tokenization",
        cart_currency: "SAR",
        cart_amount: 0,
        tokenise: 2,
        return: params.return_url,
        card_details: {
            pan: params.card_number,
            expiry_month: params.expiry_month,
            expiry_year: params.expiry_year,
            cvv: params.cvv,
        },
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=create-token.js.map