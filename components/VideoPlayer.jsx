// components/VideoPlayer.jsx
// Uses native HTML5 <video>. For large/optimized hosting, prefer a CDN (Vercel Blob, Cloudinary).
"use client";


import { useRef } from "react";


export default function VideoPlayer({ src, poster, autoPlay=false, loop=false }) {
const ref = useRef(null);
return (
<video
ref={ref}
className="w-full h-full object-cover"
controls
playsInline
autoPlay={autoPlay}
loop={loop}
poster={poster}
src={src}
/>
);
}