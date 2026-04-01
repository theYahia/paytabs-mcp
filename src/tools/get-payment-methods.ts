import { z } from "zod";
import { PaytabsClient } from "../client.js";

const client = new PaytabsClient();

export const getPaymentMethodsSchema = z.object({
  currency: z.string().default("SAR").describe("Currency to check available methods for"),
});

export async function handleGetPaymentMethods(params: z.infer<typeof getPaymentMethodsSchema>): Promise<string> {
  const result = await client.request("GET", `/payment/methods?currency=${params.currency}`);
  return JSON.stringify(result, null, 2);
}
