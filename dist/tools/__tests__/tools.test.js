import { describe, it, expect, vi, beforeEach } from "vitest";
const mockFetch = vi.fn();
global.fetch = mockFetch;
process.env.PAYTABS_PROFILE_ID = "test-profile";
process.env.PAYTABS_SERVER_KEY = "test-server-key";
describe("paytabs-mcp tools", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
    });
    it("create_payment_page creates hosted page", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ tran_ref: "TST-123", redirect_url: "https://secure.paytabs.sa/payment/page/xxx" }),
        });
        const { handleCreatePaymentPage } = await import("../create-payment-page.js");
        const result = await handleCreatePaymentPage({
            amount: 100, currency: "SAR", cart_description: "Test", cart_id: "cart-1",
            callback_url: "https://example.com/cb", return_url: "https://example.com/return",
        });
        expect(JSON.parse(result).tran_ref).toBe("TST-123");
    });
    it("query_transaction retrieves details", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ tran_ref: "TST-123", tran_type: "sale", cart_amount: "100.00" }),
        });
        const { handleQueryTransaction } = await import("../query-transaction.js");
        const result = await handleQueryTransaction({ tran_ref: "TST-123" });
        expect(JSON.parse(result).tran_type).toBe("sale");
    });
    it("refund_transaction processes refund", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ tran_ref: "TST-REF-456", tran_type: "refund" }),
        });
        const { handleRefundTransaction } = await import("../refund-transaction.js");
        const result = await handleRefundTransaction({ tran_ref: "TST-123", amount: 50, cart_description: "Refund" });
        expect(JSON.parse(result).tran_type).toBe("refund");
    });
    it("charge_token charges saved card", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ tran_ref: "TOK-789", payment_result: { response_status: "A" } }),
        });
        const { handleChargeToken } = await import("../charge-token.js");
        const result = await handleChargeToken({ token: "tok-abc", amount: 200, currency: "SAR", cart_description: "Token charge" });
        expect(JSON.parse(result).payment_result.response_status).toBe("A");
    });
    it("void_transaction voids transaction", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ tran_ref: "VOID-101", tran_type: "void" }),
        });
        const { handleVoidTransaction } = await import("../void-transaction.js");
        const result = await handleVoidTransaction({ tran_ref: "TST-123" });
        expect(JSON.parse(result).tran_type).toBe("void");
    });
    it("handles HTTP errors gracefully", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false, status: 403, text: async () => "Forbidden",
        });
        const { handleQueryTransaction } = await import("../query-transaction.js");
        await expect(handleQueryTransaction({ tran_ref: "bad" })).rejects.toThrow("PayTabs HTTP 403");
    });
    it("list_transactions returns date-filtered list", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ transactions: [{ tran_ref: "T1" }, { tran_ref: "T2" }] }),
        });
        const { handleListTransactions } = await import("../list-transactions.js");
        const result = await handleListTransactions({ date_from: "2026-01-01", date_to: "2026-01-31" });
        expect(JSON.parse(result).transactions).toHaveLength(2);
    });
});
//# sourceMappingURL=tools.test.js.map