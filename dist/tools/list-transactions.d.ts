import { z } from "zod";
export declare const listTransactionsSchema: z.ZodObject<{
    date_from: z.ZodString;
    date_to: z.ZodString;
}, "strip", z.ZodTypeAny, {
    date_from: string;
    date_to: string;
}, {
    date_from: string;
    date_to: string;
}>;
export declare function handleListTransactions(params: z.infer<typeof listTransactionsSchema>): Promise<string>;
