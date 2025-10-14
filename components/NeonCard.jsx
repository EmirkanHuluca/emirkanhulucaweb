// components/NeonCard.jsx
"use client";

import styled from "styled-components";

export default function NeonCard({
  children,
  radius = 16,            // px
  thickness = 2,          // border thickness (px)
  colors = ["#7df9ff", "#22d3ee", "#0ea5e9", "#7df9ff"], // ring colors
  className,
  style,
}) {
  return (
    <Frame
      $radius={radius}
      $thick={thickness}
      $colors={colors.join(",")}
      className={className}
      style={style}
    >
      <div className="nc-content">{children}</div>
    </Frame>
  );
}

const Frame = styled.div`
  position: relative;
  --r: ${(p) => p.$radius}px;
  --t: ${(p) => p.$thick}px;
  --a: 0deg; /* animated angle */
  border-radius: var(--r);
  isolation: isolate;

  /* subtle neon-ish background like the example (doesn't cover content) */
  background: #0b0b0b;
  background-image:
    radial-gradient(120% 90% at 50% 0%, rgba(125,249,255,.14), transparent 60%),
    radial-gradient(120% 120% at 50% 100%, rgba(34,211,238,.10), transparent 60%);

  /* animated border ring that hugs the card */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: var(--t);
    border-radius: inherit;
    background: conic-gradient(from var(--a), ${(p) => p.$colors});
    /* cut out the middle so only the ring remains */
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
    z-index: 2;
    animation: spin 8s linear infinite;
  }

  /* soft inner gloss/shadow to match the demo */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.08),
      inset 0 -24px 60px rgba(34,211,238,.18);
    pointer-events: none;
    z-index: 1;
  }

  @keyframes spin { to { --a: 360deg; } }

  /* content fills the card; corners clip correctly */
  .nc-content {
    position: relative;
    z-index: 0;
    border-radius: inherit;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`;
