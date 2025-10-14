// app/api/upload/route.js
// A minimal serverless endpoint to accept a single file and store it in Vercel Blob.
// NOTE: This is intentionally simple for a portfolio. Add auth/rate limits in production.


import { put } from "@vercel/blob";


export const runtime = "edge"; // faster cold starts on Vercel


export async function POST(req) {
try {
const form = await req.formData();
const file = form.get("file");
if (!file || typeof file === "string") {
return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
}


// Store under a predictable prefix; you can group by section, e.g., videos/, images/
const { url } = await put(`uploads/${file.name}`, file, {
access: "public", // public URL returned
addRandomSuffix: true, // prevents overwriting accidentally
token: process.env.BLOB_READ_WRITE_TOKEN,
});


return new Response(JSON.stringify({ url }), { status: 200 });
} catch (err) {
return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}
}