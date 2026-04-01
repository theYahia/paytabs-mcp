import { z } from "zod";
import { PaytabsClient } from "../client.js";

const client = new PaytabsClient();

export const chargeTokenSchema = z.object({
  token: z.string().describe("Saved card token"),
  amount: z.number().positive().describe("Charge amount"),
  currency: z.string().default("SAR").describe("Currency code"),
  cart_description: z.string().default("Token charge").describe("Charge description"),
});

export async function handleChargeToken(params: z.infer<typeof chargeTokenSchema>): Promise<string> {
  const result = await client.request("POST", "/payment/request", {
    profile_id: process.env.PAYTABS_PROFILE_ID,
    tran_type: "sale",
    tran_class: "recurring",
    cart_id: `tok-charge-${Date.now()}`,
    cart_description: params.cart_description,
    cart_currency: params.currency,
    cart_amount: params.amount,
    token: params.token,
  });
  return JSON.stringify(result, null, 2);
}
