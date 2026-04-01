import { z } from "zod";
export declare const refundTransactionSchema: z.ZodObject<{
    tran_ref: z.ZodString;
    amount: z.ZodNumber;
    cart_description: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    cart_description: string;
    tran_ref: string;
}, {
    amount: number;
    tran_ref: string;
    cart_description?: string | undefined;
}>;
export declare function handleRefundTransaction(params: z.infer<typeof refundTransactionSchema>): Promise<string>;
