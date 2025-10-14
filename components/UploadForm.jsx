// components/UploadForm.jsx
// Client component that posts a selected file to our /api/upload route.
"use client";


import { useState } from "react";


export default function UploadForm({ onUploaded }) {
const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


async function handleSubmit(e) {
e.preventDefault();
setError(null);
if (!file) return;


const data = new FormData();
data.append("file", file);


setLoading(true);
try {
const res = await fetch("/api/upload", { method: "POST", body: data });
const json = await res.json();
if (!res.ok) throw new Error(json.error || "Upload failed");
onUploaded?.(json.url);
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
}


return (
<form onSubmit={handleSubmit} className="space-y-3">
<input
type="file"
onChange={(e) => setFile(e.target.files?.[0] || null)}
className="block w-full text-sm"
accept="video/*,image/*"
/>
<button
disabled={!file || loading}
className="px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-500 disabled:opacity-50"
>
{loading ? "Uploading…" : "Upload"}
</button>
{error && <p className="text-red-400 text-sm">{error}</p>}
</form>
);
}