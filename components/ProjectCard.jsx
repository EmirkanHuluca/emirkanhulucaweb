// components/ProjectCard.jsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import NeonCard from "@/components/NeonCard";

// tiny helper: accept "owner/repo" or a full https:// link
function normalizeGit(url) {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http")) return trimmed;
  // allow "github/owner/repo" or "owner/repo"
  const slug = trimmed.replace(/^github\//i, "");
  return `https://github.com/${slug}`;
}

function GithubIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
      1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.62 7.62 0 0 1 8 3.47c.68.003
      1.36.092 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
      0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8
      c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  imageUrl,
  videoUrl,
  href,             // your existing “View details →” link (internal or external)
  liveLink,         // optional separate “Live” button (external or internal)
  gitLink,          // NEW: GitHub link (owner/repo or full URL)
  tags = [],
  neonColors,
  neonThickness,
  neonRadius,
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
        if (p?.then) playPromiseRef.current = p.catch(() => {});
      }
    } catch {}
  };

  const handleLeave = () => {
    const v = vidRef.current;
    if (!v) return;
    const done = () => {
      if (!v.paused && !v.ended) v.pause();
      playPromiseRef.current = null;
    };
    playPromiseRef.current ? playPromiseRef.current.finally(done) : done();
  };

  // normalize links
  const gh = normalizeGit(gitLink);
  const live = liveLink || href || "";

  return (
    <NeonCard
      colors={neonColors}
      thickness={neonThickness}
      radius={neonRadius ?? 16}
      className="rounded-2xl"
    >
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
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
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

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {/* tags */}
          <div className="flex flex-wrap gap-2">
            {tags?.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-full border border-neutral-800 text-neutral-300 text-xs"
              >
                {t}
              </span>
            ))}
          </div>

          {/* GitHub button (push to right) */}
          {gh && (
            <a
              href={gh}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-white/10"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </NeonCard>
  );
}
