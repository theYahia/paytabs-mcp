#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createPaymentPageSchema, handleCreatePaymentPage } from "./tools/create-payment-page.js";
import { queryTransactionSchema, handleQueryTransaction } from "./tools/query-transaction.js";
import { refundTransactionSchema, handleRefundTransaction } from "./tools/refund-transaction.js";
import { createTokenSchema, handleCreateToken } from "./tools/create-token.js";
import { chargeTokenSchema, handleChargeToken } from "./tools/charge-token.js";
import { listTransactionsSchema, handleListTransactions } from "./tools/list-transactions.js";
import { voidTransactionSchema, handleVoidTransaction } from "./tools/void-transaction.js";
import { getPaymentMethodsSchema, handleGetPaymentMethods } from "./tools/get-payment-methods.js";

const server = new McpServer({ name: "paytabs-mcp", version: "1.0.0" });

server.tool("create_payment_page", "Create a hosted payment page via PayTabs.", createPaymentPageSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreatePaymentPage(params) }] }));

server.tool("query_transaction", "Query transaction details by reference.", queryTransactionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleQueryTransaction(params) }] }));

server.tool("refund_transaction", "Refund a completed transaction.", refundTransactionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleRefundTransaction(params) }] }));

server.tool("create_token", "Tokenize a card for recurring payments.", createTokenSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateToken(params) }] }));

server.tool("charge_token", "Charge a saved card token.", chargeTokenSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleChargeToken(params) }] }));

server.tool("list_transactions", "List transactions by date range.", listTransactionsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleListTransactions(params) }] }));

server.tool("void_transaction", "Void a pending transaction.", voidTransactionSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleVoidTransaction(params) }] }));

server.tool("get_payment_methods", "Get available payment methods for a currency.", getPaymentMethodsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetPaymentMethods(params) }] }));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[paytabs-mcp] Server started. 8 tools available.");
}

main().catch((error) => { console.error("[paytabs-mcp] Error:", error); process.exit(1); });
