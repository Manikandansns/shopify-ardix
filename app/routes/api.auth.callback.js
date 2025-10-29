// import { shopify } from "../billing/subscribe.js";

// export async function callback(req, res) {
//   try {
//     const session = await shopify.auth.callback(req, res);

//     // After successful OAuth
//     const redirectUrl = `https://www.ardix.ai/shopify/connect?shop=${session.shop}`;
//     return res.redirect(redirectUrl);
//   } catch (err) {
//     console.error("Auth Callback Error:", err);
//     res.status(500).send("Authentication failed");
//   }
// }
