import { z } from "zod";
export declare const queryTransactionSchema: z.ZodObject<{
    tran_ref: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tran_ref: string;
}, {
    tran_ref: string;
}>;
export declare function handleQueryTransaction(params: z.infer<typeof queryTransactionSchema>): Promise<string>;
