"use client";

import { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";

/**
 * Project card: poster by default, video fades in on hover.
 * Props:
 * - poster: string  (image URL/path)
 * - video:  string  (video URL/path)
 * - badge:  string
 * - title:  string
 * - meta:   string
 * - href:   string (optional link)
 * - width:  number (px)  default 280
 * - height: number (px)  default 320
 * - borderColors: string[] gradient stops for the animated border
 * - borderThickness: number (px) default 2
 * - borderRadius: number (px) default 12
 */
export default function FlipCard({
  poster,
  video,
  badge = "Project",
  title = "Title",
  meta = "",
  href,
  width = 280,            // wider
  height = 320,
  borderColors = ["#7df9ff", "#4cc9f0", "#22d3ee", "#7df9ff"],
  borderThickness = 2,
  borderRadius = 14,
}) {
  const videoRef = useRef(null);

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.currentTime = 0;
      v.play();
    } catch {}
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  };

  const CardInner = (
    <StyledWrapper
      $w={width}
      $h={height}
      $radius={borderRadius}
      $thick={borderThickness}
      $colors={borderColors.join(",")}
    >
      <div className="card" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {/* Media */}
        <div className="media">
          <img className="poster" src={poster} alt={title} loading="lazy" />
          {video && (
            <video
              ref={videoRef}
              className="video"
              muted
              loop
              playsInline
              preload="metadata"
              src={video}
            />
          )}
        </div>

        {/* Overlay chrome */}
        <div className="chrome">
          <small className="badge">{badge}</small>
          <div className="desc">
            <p className="title"><strong>{title}</strong></p>
            {meta && <p className="meta">{meta}</p>}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );

  return href ? (
    <Link href={href} className="inline-block">{CardInner}</Link>
  ) : (
    CardInner
  );
}

const StyledWrapper = styled.div`
  --radius: ${(p) => p.$radius}px;
  --thick: ${(p) => p.$thick}px;
  --a: 0deg; /* animation angle */

  .card {
    position: relative;
    overflow: hidden;
    width: ${(p) => p.$w}px;
    height: ${(p) => p.$h}px;
    border-radius: var(--radius);
    background: #0b0b0b;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.8);
    isolation: isolate; /* keep border effects contained */
  }

  /* Always-on animated gradient border */
  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: var(--thick);              /* thickness of the border */
    border-radius: var(--radius);
    background: conic-gradient(from var(--a), ${p => p.$colors});
    /* cut out the middle so only the "ring" stays visible */
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    z-index: 2;
    animation: spin 6s linear infinite;
  }

  @keyframes spin {
    to { --a: 360deg; }
  }

  .media { position: absolute; inset: 0; }
  .poster, .video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    display: block;
    border-radius: var(--radius);
  }

  /* Video hidden by default; fade-in on hover */
  .video { opacity: 0; transition: opacity 220ms ease; }
  .card:hover .video { opacity: 1; }

  /* Overlay UI */
  .chrome {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    pointer-events: none; /* allow hover to reach the card */
    z-index: 3;           /* above the border ring */
  }

  .badge {
    background: rgba(0,0,0,0.45);
    padding: 2px 10px;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    color: #fff;
    width: fit-content;
    font-size: 11px;
  }

  .desc {
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(5px);
    border-radius: 8px;
    padding: 10px;
    color: #fff;
    box-shadow: 0 0 10px 5px rgba(0,0,0,0.45);
  }

  .title { font-size: 13px; line-height: 1.2; margin: 0; }
  .meta  { font-size: 11px; opacity: 0.85; margin-top: 4px; }
`;
