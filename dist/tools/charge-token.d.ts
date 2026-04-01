import { z } from "zod";
export declare const chargeTokenSchema: z.ZodObject<{
    token: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    cart_description: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    cart_description: string;
    token: string;
}, {
    amount: number;
    token: string;
    currency?: string | undefined;
    cart_description?: string | undefined;
}>;
export declare function handleChargeToken(params: z.infer<typeof chargeTokenSchema>): Promise<string>;
