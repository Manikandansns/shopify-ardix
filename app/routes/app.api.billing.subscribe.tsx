
// import { json } from "stream/consumers";
// import shopify from "../shopify.server";

// export async function loader({ request }: { request: Request }) {
//   const url = new URL(request.url);
//   const plan = url.searchParams.get("plan");
//   const shop = url.searchParams.get("shop");

//   const session = await shopify.session.getCurrentSession(request);
//   const client = new shopify.clients.Graphql({ session });

//   const plans: Record<string, { name: string; price: number }> = {
//     Basic: { name: "Basic Plan", price: 9.0 },
//     Pro: { name: "Pro Plan", price: 29.0 },
//     Enterprise: { name: "Enterprise Plan", price: 99.0 },
//   };

//   const selectedPlan = plans[plan ?? "Basic"];
//   if (!selectedPlan) return json({ error: "Invalid plan" }, { status: 400 });

//   const response = await client.query({
//     data: {
//       query: `mutation CreateSubscription {
//         appSubscriptionCreate(
//           name: "${selectedPlan.name}"
//           lineItems: [
//             { plan: { appRecurringPricingDetails: {
//               price: { amount: ${selectedPlan.price}, currencyCode: USD }
//             } } }
//           ]
//           returnUrl: "https://${shop}/admin/apps/ardix-ai-services"
//           test: true
//         ) {
//           appSubscription { id }
//           confirmationUrl
//           userErrors { field message }
//         }
//       }`,
//     },
//   });

//   const confirmationUrl =
//     response.body?.data?.appSubscriptionCreate?.confirmationUrl;

//   return json({ confirmationUrl });
// }
