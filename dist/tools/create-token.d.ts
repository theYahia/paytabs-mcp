import { z } from "zod";
export declare const createTokenSchema: z.ZodObject<{
    card_number: z.ZodString;
    expiry_month: z.ZodString;
    expiry_year: z.ZodString;
    cvv: z.ZodString;
    return_url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    return_url: string;
    card_number: string;
    expiry_month: string;
    expiry_year: string;
    cvv: string;
}, {
    return_url: string;
    card_number: string;
    expiry_month: string;
    expiry_year: string;
    cvv: string;
}>;
export declare function handleCreateToken(params: z.infer<typeof createTokenSchema>): Promise<string>;
