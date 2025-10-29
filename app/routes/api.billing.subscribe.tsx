// import { shopifyApp } from "@shopify/shopify-app-express";

// export const shopify = shopifyApp({
//   api: {
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     apiVersion: "2025-10",
//     scopes: process.env.SHOPIFY_API_SCOPES?.split(",") || ["write_products"],
//   },
//   auth: {
//     path: "/api/auth",
//     callbackPath: "/api/auth/callback",
//   },
// });

// export async function subscribe(req, res) {
//   try {
//     const { plan } = req.body;
//     const session = await shopify.auth.getCurrentSession(req, res);

//     if (!session) {
//       return res.status(401).json({ error: "No session found" });
//     }

//     const admin = new shopify.api.clients.Graphql({ session });

//     const plans = {
//       Basic: { name: "Basic Plan", price: 9.0 },
//       Pro: { name: "Pro Plan", price: 29.0 },
//       Enterprise: { name: "Enterprise Plan", price: 99.0 },
//     };

//     const { name, price } = plans[plan] || plans.Basic;

//     const mutation = `
//       mutation {
//         appSubscriptionCreate(
//           name: "${name}"
//           returnUrl: "https://www.ardix.ai/shopify/redirect?shop=${session.shop}&plan=${plan}"
//           test: true
//           lineItems: [{
//             plan: {
//               appRecurringPricingDetails: {
//                 price: { amount: ${price}, currencyCode: USD }
//               }
//             }
//           }]
//         ) {
//           appSubscription {
//             id
//             name
//           }
//           confirmationUrl
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const response = await admin.query({ data: mutation });
//     const data = response.body.data.appSubscriptionCreate;

//     if (data.userErrors.length > 0) {
//       return res.status(400).json({ error: data.userErrors[0].message });
//     }

//     return res.json({ confirmationUrl: data.confirmationUrl });
//   } catch (error) {
//     console.error("Billing Error:", error);
//     return res.status(500).json({ error: "Subscription failed" });
//   }
// }
