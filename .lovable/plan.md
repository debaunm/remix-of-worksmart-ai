

## Update Stripe Webhook Secret

The `STRIPE_WEBHOOK_SECRET` already exists as a configured secret. The plan is simple:

1. **Update the secret value** with the new signing secret `whsec_V6YKgaa45e5DnPRk05cX5cNcRAShnQq3` so the webhook can verify incoming Stripe events.

2. **Manually grant the customer access** — since the webhook wasn't active when they paid, we need to insert a purchase record into `user_purchases` for the customer who bought Money Systems.

### What I need from you:
- **The customer's email or user ID** so I can add their `money_systems` purchase record manually.

### After that:
- Future Stripe payments will automatically be recorded via the webhook.
- The customer will immediately see their Money Systems access on the dashboard.

