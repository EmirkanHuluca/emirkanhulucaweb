// components/SplitText.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "0px 0px -25% 0px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
  /** NEW: animate on first render (no scroll needed) */
  playOnMount = false,
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts?.status === "loaded") setFontsLoaded(true);
    else document.fonts?.ready.then(() => setFontsLoaded(true));
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      if (el._rbsplitInstance) {
        try { el._rbsplitInstance.revert(); } catch {}
        el._rbsplitInstance = null;
      }

      // Parse bottom rootMargin just like before (used only when using ScrollTrigger)
      const norm = (rm) => {
        const parts = String(rm).trim().split(/\s+/);
        if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
        if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
        if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
        return [parts[0], parts[1], parts[2], parts[3]];
      };
      const [, , bottomRM] = norm(rootMargin);
      const m = /^(-?\d+(?:\.\d+)?)(px|%|vh|vw|rem|em)?$/.exec(bottomRM || "0");
      const mv = m ? parseFloat(m[1]) : 0;
      const mu = m ? m[2] || "px" : "px";
      const bottomOffset = mv === 0 ? "" : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
      const startPct = (1 - threshold) * 100;
      const start = `top ${startPct}%${bottomOffset}`;

      let targets;
      const pickTargets = (self) => {
        if (splitType.includes("chars") && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes("words") && self.words.length) targets = self.words;
        if (!targets && splitType.includes("lines") && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self) => {
          pickTargets(self);

          const tween = gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              ...(playOnMount
                ? {} // no ScrollTrigger -> play immediately
                : {
                    scrollTrigger: {
                      trigger: el,
                      start,
                      once: true,
                      fastScrollEnd: true,
                      anticipatePin: 0.4,
                    },
                  }),
              onComplete: () => onLetterAnimationComplete?.(),
              willChange: "transform, opacity",
              force3D: true,
            }
          );

          // If playing on mount, start right away (GSAP already does),
          // but ensure we don't leave any old ScrollTriggers behind.
          return tween;
        },
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try { splitInstance.revert(); } catch {}
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        playOnMount, // NEW
        onLetterAnimationComplete,
      ],
      scope: ref,
    }
  );

  const style = { textAlign, wordWrap: "break-word", willChange: "transform, opacity" };
  const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;

  const TagEl = tag;
  return (
    <TagEl ref={ref} style={style} className={classes}>
      {text}
    </TagEl>
  );
};

export default SplitText;
