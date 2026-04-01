import { z } from "zod";
export declare const getPaymentMethodsSchema: z.ZodObject<{
    currency: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency: string;
}, {
    currency?: string | undefined;
}>;
export declare function handleGetPaymentMethods(params: z.infer<typeof getPaymentMethodsSchema>): Promise<string>;
