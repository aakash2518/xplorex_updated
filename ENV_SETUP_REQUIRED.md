# Environment Setup Required

The website requires a connection to the external `xplorex_crm` backend to function dynamically. 

Currently, the required environment variables are either missing or improperly configured. 

## Required Environment Variables

You must create or update your `.env` (or `.env.local`) file in the root of this project with the following variable:

```env
# The base URL of the deployed xplorex_crm API (Do not include trailing slashes)
# Example: https://crm.xplorex.com
NEXT_PUBLIC_CRM_API_URL=
```

> **Important**: Never hardcode localhost URLs. The `NEXT_PUBLIC_CRM_API_URL` must point to the actual base URL where the CRM public APIs (like `/api/public/homepage`) are hosted. 

**Note**: The current value in your `.env` appears to be pointing to a specific webhook route (`http://localhost:3000/api/webhook/website-lead`), which is incorrect for base API fetching. Please update it to the base URL of the CRM server.

Once configured, restart your Next.js development server and let me know so we can continue the integration.
