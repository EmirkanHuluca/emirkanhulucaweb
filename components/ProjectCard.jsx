// components/ProjectCard.jsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import NeonCard from "@/components/NeonCard";

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageUrl,
  videoUrl,
  href,
  tags = [],
  // NEW — per-card neon ring customization
  neonColors,             // array of color stops, e.g. ["#7df9ff","#22d3ee","#0ea5e9","#7df9ff"]
  neonThickness,          // number (px)
  neonRadius,             // number (px)
}) {
  const vidRef = useRef(null);
  const playPromiseRef = useRef(null);


  const handleEnter = () => {
    const v = vidRef.current;
    if (!v) return;
    try {
      v.muted = true;
      v.playsInline = true;
      if (v.paused) {
        const p = v.play();
        if (p && typeof p.then === "function") {
          // store so we can wait before pausing
          playPromiseRef.current = p.catch(() => { /* swallow autoplay race */ });
        } else {
          playPromiseRef.current = null;
        }
      }
    } catch { /* ignore */ }
  };

  const handleLeave = () => {
    const v = vidRef.current;
    if (!v) return;

    const done = () => {
      // only pause if it's actually playing
      if (!v.paused && !v.ended) v.pause();
      playPromiseRef.current = null;
    };

    // If play() is still pending, pause after it resolves
    if (playPromiseRef.current) {
      playPromiseRef.current.finally(done);
    } else {
      done();
    }
  };

  return (
    <NeonCard colors={neonColors}
      thickness={neonThickness}
      radius={neonRadius ?? 16}
       className="rounded-2xl">
      {/* Media */}
      <div
        className="relative aspect-video bg-neutral-900"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {imageUrl && (
    <Image
      src={imageUrl}
      alt={title}
      fill                      // ⬅️ important: absolute fill
      className="object-cover"  // cover the 16:9 area
      sizes="(min-width: 768px) 50vw, 100vw"
      priority={false}
    />
  )}
        {videoUrl && (
    <video
      ref={vidRef}
      className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-200"
      src={videoUrl}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      poster={imageUrl || undefined}
    />
  )}
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          {subtitle && <p className="text-neutral-400 text-sm">{subtitle}</p>}
        </div>
        <p className="text-neutral-300 text-sm leading-relaxed">{description}</p>
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-full border border-neutral-800 text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {href && (
          <Link href={href} className="inline-block text-sm underline">
            View details →
          </Link>
        )}
      </div>
    </NeonCard>
  );
}
