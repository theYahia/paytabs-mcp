import { z } from "zod";
import { PaytabsClient } from "../client.js";
const client = new PaytabsClient();
export const createPaymentPageSchema = z.object({
    amount: z.number().positive().describe("Payment amount"),
    currency: z.string().default("SAR").describe("Currency code (SAR, AED, USD, EGP)"),
    cart_description: z.string().describe("Cart/order description"),
    cart_id: z.string().describe("Your unique cart/order ID"),
    callback_url: z.string().url().describe("Server-to-server callback URL"),
    return_url: z.string().url().describe("Customer redirect URL after payment"),
});
export async function handleCreatePaymentPage(params) {
    const result = await client.request("POST", "/payment/request", {
        profile_id: process.env.PAYTABS_PROFILE_ID,
        tran_type: "sale",
        tran_class: "ecom",
        cart_id: params.cart_id,
        cart_description: params.cart_description,
        cart_currency: params.currency,
        cart_amount: params.amount,
        callback: params.callback_url,
        return: params.return_url,
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=create-payment-page.js.map