"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Magnet from "@/components/Magnet";
import ElectricBorder from "@/components/ElectricBorder";
import SplitText from "@/components/SplitText";

// WebGL background (SSR off)
const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section
        className="full-bleed relative h-[100svh] w-screen overflow-hidden"
        aria-label="Choose Game Dev, Web Dev, or view Profile"
      >
        <LiquidEther
          className="absolute inset-0 -z-10 pointer-events-none"
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
        />

        {/* ✅ SCALE WRAPPER — uniformly scales the three interactive areas */}
        <div className="absolute inset-0 origin-center
                        scale-[0.90] md:scale-[0.95] xl:scale-[0.98]">

          {/* LEFT — Game Dev */}
          <Link
            href="/game-dev"
            className="absolute inset-0 clip-left origin-bottom-left flex items-start justify-start"
            aria-label="Go to Game Development"
          >
            <Magnet padding={170} disabled={false} magnetStrength={10}>
              <div className="pl-[7vw] pt-[12vh] select-none">
                <SplitText
                  text="Game"
                  playOnMount
                  className="text-5xl md:text-7xl font-black leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                />
                <SplitText
                  text="Dev"
                  playOnMount
                  className="text-5xl md:text-7xl font-black -mt-2 leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                />
                <div className="mt-5 h-[2px] w-28 bg-white/20" />
              </div>
            </Magnet>
          </Link>

          {/* RIGHT — Web Dev */}
          <Link
            href="/web-dev"
            className="absolute inset-0 clip-right origin-top-right flex items-end justify-end"
            aria-label="Go to Web Development"
          >
            <Magnet padding={170} disabled={false} magnetStrength={10}>
              <div className="pr-[7vw] pb-[10vh] text-right select-none">
                <SplitText
                  text="Web"
                  playOnMount
                  className="text-5xl md:text-7xl font-black leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                />
                <SplitText
                  text="Dev"
                  playOnMount
                  className="text-5xl md:text-7xl font-black -mt-2 leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                />
                <div className="ml-auto mt-5 h-[2px] w-28 bg-white/20" />
              </div>
            </Magnet>
          </Link>

          {/* CENTER — Profile circle */}
          <a
            href="/profile"
            className="absolute inset-0 clip-circle flex items-center justify-center"
            aria-label="Go to Profile"
          >
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.6}
              thickness={2}
              className="rounded-full flex items-center justify-center
                         h-40 w-40 md:h-56 md:w-56"
              style={{ borderRadius: 9999 }}
            >
              <div className="h-full w-full rounded-full flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-semibold">Profile</span>
              </div>
            </ElectricBorder>
          </a>

        </div>
        {/* /scale wrapper */}
      </section>
    </div>
  );
}