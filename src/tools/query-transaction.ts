import { z } from "zod";
import { PaytabsClient } from "../client.js";

const client = new PaytabsClient();

export const queryTransactionSchema = z.object({
  tran_ref: z.string().describe("Transaction reference to query"),
});

export async function handleQueryTransaction(params: z.infer<typeof queryTransactionSchema>): Promise<string> {
  const result = await client.request("POST", "/payment/query", {
    profile_id: process.env.PAYTABS_PROFILE_ID,
    tran_ref: params.tran_ref,
  });
  return JSON.stringify(result, null, 2);
}
