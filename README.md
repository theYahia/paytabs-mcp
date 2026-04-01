# paytabs-mcp

MCP server for PayTabs payment gateway (MENA region). Supports payment pages, transactions, refunds, voids, tokenization, and payment method discovery.

## Tools (8)

| Tool | Description |
|---|---|
| `create_payment_page` | Create a hosted payment page |
| `query_transaction` | Query transaction details |
| `refund_transaction` | Refund a completed transaction |
| `create_token` | Tokenize a card for recurring payments |
| `charge_token` | Charge a saved card token |
| `list_transactions` | List transactions by date range |
| `void_transaction` | Void a pending transaction |
| `get_payment_methods` | Get available payment methods |

## Quick Start

```json
{
  "mcpServers": {
    "paytabs": {
      "command": "npx",
      "args": ["-y", "@theyahia/paytabs-mcp"],
      "env": {
        "PAYTABS_PROFILE_ID": "<YOUR_PROFILE_ID>",
        "PAYTABS_SERVER_KEY": "<YOUR_SERVER_KEY>"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PAYTABS_PROFILE_ID` | Yes | Merchant profile ID |
| `PAYTABS_SERVER_KEY` | Yes | Server key from PayTabs dashboard |

## Demo Prompts

- "Create a payment page for 500 SAR for electronics order"
- "Check status of transaction TST2026040112345"
- "Refund 200 SAR from transaction TST2026040112345"
- "Void pending transaction TST2026040198765"
- "What payment methods are available for AED?"

## License

MIT
