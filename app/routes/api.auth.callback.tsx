// import { LoaderFunctionArgs } from "@remix-run/node";
// import { redirect } from "@remix-run/node";
// import { authenticate } from "../shopify.server";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   try {
//     const { session } = await authenticate.admin(request);
    
//     // Build the URL with query parameters for the Ardix AI service
//     const ardixServiceUrl = new URL("https://www.ardix.ai/shopify/auth");
//     ardixServiceUrl.searchParams.set("shop", session.shop);
//     ardixServiceUrl.searchParams.set("accessToken", session.accessToken);
//     ardixServiceUrl.searchParams.set("hasTrial", "check"); // Add this to check trial status

//     return redirect(ardixServiceUrl.toString());
//   } catch (err) {
//     console.error("Auth Callback Error:", err);
//     throw new Response("Authentication failed", { status: 500 });
//   }
// };