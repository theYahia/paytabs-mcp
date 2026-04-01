import { z } from "zod";
export declare const createPaymentPageSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    cart_description: z.ZodString;
    cart_id: z.ZodString;
    callback_url: z.ZodString;
    return_url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    cart_description: string;
    cart_id: string;
    callback_url: string;
    return_url: string;
}, {
    amount: number;
    cart_description: string;
    cart_id: string;
    callback_url: string;
    return_url: string;
    currency?: string | undefined;
}>;
export declare function handleCreatePaymentPage(params: z.infer<typeof createPaymentPageSchema>): Promise<string>;
