import { z } from "zod";
export declare const voidTransactionSchema: z.ZodObject<{
    tran_ref: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tran_ref: string;
}, {
    tran_ref: string;
}>;
export declare function handleVoidTransaction(params: z.infer<typeof voidTransactionSchema>): Promise<string>;
