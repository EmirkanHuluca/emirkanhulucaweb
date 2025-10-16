// app/(site)/profile/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import LogoLoop from "@/components/LogoLoop";
import ProjectCard from "@/components/ProjectCard";

const techLogos = [
  { src: "/react.svg", title: "React", href: "https://react.dev" },
  { src: "/next.svg", title: "Next.js", href: "https://nextjs.org" },
  { src: "/js.svg", title: "JavaScript", href: "https://www.javascript.com" },
  { src: "/nodejs.svg", title: "Node.js", href: "https://nodejs.org" },
  { src: "/vercel.svg", title: "Vercel", href: "https://vercel.com" },
  { src: "/unity.svg", title: "Unity", href: "https://unity.com" },
  { src: "/csharp.svg", title: "C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
  { src: "/git.svg", title: "GitHub", href: "https://github.com" },
];

const skills = {
  "Game Dev": ["Unity", "C#", "Input System", "Object Pooling", "Profiler"],
  "Web Dev": [".NET", "EF Core", "React", "Next.js", "Tailwind"],
  "Architecture": ["Clean Architecture", "JWT/Auth", "REST API", "SQL", "GitHub"],
};

export default function ProfilePage() {
  return (
    <main className="space-y-12" aria-label="Profile page for Emirkan Huluca">
      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center gap-8" aria-label="Intro">
        <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full overflow-hidden ring-2 ring-white/10">
          <Image
            src="/images/avatar.jpg"
            alt="Portrait of Emirkan Huluca"
            fill
            className="object-cover"
            sizes="144px"
            priority
          />
        </div>

        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Emirkan Huluca</h1>
          <p className="text-neutral-300 mt-2">
            Game Developer (Unity/C#) & Web Developer (Next.js). I build combat, AI,
            deck-building systems, and full-stack apps with clean architecture.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href="mailto:es.huluca@gmail.com">Email me</ButtonLink>
            <ButtonLink href="/gresume.pdf">Game Dev CV</ButtonLink>
            <ButtonLink href="/wresume.pdf">Web Dev CV</ButtonLink>
            <ButtonLink href="https://github.com/EmirkanHuluca" external>GitHub</ButtonLink>
            <ButtonLink href="https://www.linkedin.com/in/emirkan-huluca-966aa9225/" external>LinkedIn</ButtonLink>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="space-y-4" aria-label="Skills and tools">
        <h2 className="text-xl font-semibold">Skills / Tools</h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="rounded-xl border border-neutral-800 p-4 bg-black/30">
              <h3 className="text-sm font-semibold text-neutral-200">{group}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full border border-neutral-800 text-neutral-300 text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logo marquee */}
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={30}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        iconToWhite
        forceMono
        ariaLabel="Technology logos"
      />

      {/* SELECTED WORK */}
      <section className="space-y-6" aria-label="Selected work">
        <h2 className="text-xl font-semibold">Selected Work</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <ProjectCard
            title="Necro Ruler"
            subtitle="Roguelike deckbuilder (WIP)"
            description="Built with my students: dungeon flow, deck mechanics, and enemy AI. Modular systems for fast content iteration."
            imageUrl="/images/necro.jpg"
            videoUrl="/videos/necro-demo.mp4"
            tags={["Unity", "C#", "2D", "Deckbuilder", "Turn-based"]}
            neonColors={["#ffffffff","#ffffffff","#ffffffff","#ffffffff"]}
            gitLink="https://github.com/EmirkanHuluca/Necro-Ruler"
          />
          <ProjectCard
            title="Storym"
            subtitle="Social/blog platform"
            description="User profiles, diaries, media uploads, likes, and comments. Role-based auth and image handling."
            imageUrl="/images/storym.jpg"
            videoUrl="/videos/storym-demo.mp4"
            tags={[".NET", "C#", "React", "Next.js", "Social"]}
            neonColors={["#ffffffff","#ffffffff","#ffffffff","#ffffffff"]}
            gitLink="https://github.com/EmirkanHuluca/Storym"
          />
          <ProjectCard
            title="Hediyem"
            subtitle="Iyzico-integrated e-commerce"
            description="Products, carts, orders, JWT auth, admin dashboards. Clean Architecture .NET API + React/Next.js."
            imageUrl="/images/ecommerce.jpg"
            videoUrl="/videos/ecommerce-demo.mp4"
            tags={[".NET", "C#", "React", "Next.js", "Iyzico"]}
            neonColors={["#ffffffff","#ffffffff","#ffffffff","#ffffffff"]}
            gitLink="https://github.com/EmirkanHuluca/E-Commerce"
          />
          <ProjectCard
            title="Project Elysium"
            subtitle="Top-down RPG (WIP)"
            description="New real-time combat system and a handcrafted 3D world. Focus on feel, AI behaviors, and encounter pacing."
            imageUrl="/images/elysium.jpg"
            videoUrl="/videos/elysium-demo.mp4"
            tags={["Unity", "C#", "3D", "RPG", "PC"]}
            neonColors={["#ffffffff","#ffffffff","#ffffffff","#ffffffff"]}
            gitLink="https://github.com/EmirkanHuluca/Project-Elysium"
          />
        </div>
      </section>
    </main>
  );
}

function ButtonLink({ href, children, external = false }) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg border border-white/15 hover:border-white/30 transition"
      {...props}
    >
      {children}
    </Link>
  );
}

function PrimaryLink({ href, children }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
    >
      {children}
    </Link>
  );
}

function Item({ title, subtitle, body, hrefCode, hrefCase }) {
  return (
    <article className="rounded-xl border border-neutral-800 p-5 bg-black/30">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-neutral-400 text-sm">{subtitle}</p>}
      <p className="text-neutral-300 mt-2 text-sm leading-relaxed">{body}</p>
      {(hrefCode || hrefCase) && (
        <div className="mt-3 flex gap-3">
          {hrefCase && (
            <Link
              href={hrefCase}
              className="text-sm underline underline-offset-4 hover:opacity-90"
            >
              View case study
            </Link>
          )}
          {hrefCode && (
            <Link
              href={hrefCode}
              className="text-sm underline underline-offset-4 hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              View code
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
