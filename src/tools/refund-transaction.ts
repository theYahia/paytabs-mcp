import { z } from "zod";
import { PaytabsClient } from "../client.js";

const client = new PaytabsClient();

export const refundTransactionSchema = z.object({
  tran_ref: z.string().describe("Transaction reference to refund"),
  amount: z.number().positive().describe("Refund amount"),
  cart_description: z.string().default("Refund").describe("Refund description"),
});

export async function handleRefundTransaction(params: z.infer<typeof refundTransactionSchema>): Promise<string> {
  const result = await client.request("POST", "/payment/request", {
    profile_id: process.env.PAYTABS_PROFILE_ID,
    tran_type: "refund",
    tran_class: "ecom",
    cart_id: `refund-${params.tran_ref}`,
    cart_description: params.cart_description,
    cart_currency: "SAR",
    cart_amount: params.amount,
    tran_ref: params.tran_ref,
  });
  return JSON.stringify(result, null, 2);
}
