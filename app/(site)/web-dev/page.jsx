// app/(site)/web-dev/page.jsx
// Your Web Dev portfolio: real projects, tech stacks, clear outcomes.

"use client";

import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import FlipCard from "@/components/FlipCard";

export default function WebDevPage() {
return (
<div className="space-y-10">
<header className="space-y-2">
<h1 className="text-3xl font-bold">Web Development</h1>
<p className="text-neutral-300">Next.js, clean architecture, e‑commerce, content sites.</p>
</header>


<Section title="Projects">
<div className="grid md:grid-cols-2 gap-6">
<ProjectCard
  title="Hediyem"
  subtitle="Iyzico-integrated e-commerce"
  description="Products, carts, orders, JWT auth, admin dashboards. Clean Architecture .NET API + React/Next.js."
  imageUrl="/images/ecommerce.jpg"
  videoUrl="/videos/ecommerce-demo.mp4"
  tags={[".NET", "C#", "React", "Next.js", "Iyzico"]}
  gitLink="https://github.com/EmirkanHuluca/E-Commerce"
/>

<ProjectCard
  title="Storym"
  subtitle="Social/blog platform"
  description="User profiles, diaries, media uploads, likes, and comments. Role-based auth and image handling."
  imageUrl="/images/storym.jpg"
  videoUrl="/videos/storym-demo.mp4"
  tags={[".NET", "C#", "React", "Next.js", "Social"]}
  gitLink="https://github.com/EmirkanHuluca/Storym"
/>

<ProjectCard
  title="Branco"
  subtitle="Company site (content-driven)"
  description="Responsive site with smooth animations and MDX content. App Router, Contentlayer, and ISR."
  imageUrl="/images/branco.jpg"
  videoUrl="/videos/branco-demo.mp4"
  tags={["React", "Next.js", "Contentlayer", "MDX", "ISR"]}
  gitLink="https://github.com/EmirkanHuluca/Branco"
/>

<ProjectCard
  title="Song"
  subtitle="Personal time-based microsite"
  description="A small Next.js project that changes visuals based on time and location. Deployed on Vercel."
  imageUrl="/images/song.jpg"
  videoUrl="/videos/song-demo.mp4"
  tags={["Next.js", "React", "Tailwind", "Vercel"]}
  gitLink="https://github.com/EmirkanHuluca/Song"
/>

</div>
</Section>


<Section title="Stack & Approach">
<ul className="list-disc list-inside text-neutral-300 space-y-1">
<li>React/Next.js App Router, Tailwind, Vercel</li>
<li>Clean architecture, API integration, auth, forms</li>
<li>SEO, performance, accessibility basics baked in</li>
</ul>
</Section>
</div>
);
}