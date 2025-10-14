// app/(site)/game-dev/page.jsx
// Your Game Dev portfolio: highlight systems, engines, shipped prototypes, etc.


import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";


export default function GameDevPage() {
return (
<div className="space-y-10">
<header className="space-y-2">
<h1 className="text-3xl font-bold">Game Development</h1>
<p className="text-neutral-300">Unity/C#, gameplay systems, AI, deck‑building, tools.</p>
</header>


<Section title="Highlights">
<div className="grid md:grid-cols-2 gap-6">
<ProjectCard
  title="Project Elysium"
  subtitle="Top-down RPG (WIP)"
  description="New real-time combat system and a handcrafted 3D world. Focus on feel, AI behaviors, and encounter pacing."
  imageUrl="/images/elysium.jpg"
  videoUrl="/videos/elysium-demo.mp4"
  tags={["Unity", "C#", "3D", "RPG", "PC"]}
/>

<ProjectCard
  title="Necro Ruler"
  subtitle="Roguelike deckbuilder (WIP)"
  description="Built with my students: dungeon flow, deck mechanics, and enemy AI. Modular systems for fast content iteration."
  imageUrl="/images/necro.jpg"
  videoUrl="/videos/necro-demo.mp4"
  tags={["Unity", "C#", "2D", "Deckbuilder", "Turn-based"]}
/>

<ProjectCard
  title="Inferno Trigger"
  subtitle="2D action roguelike"
  description="Enemy AI, wave spawning, and weapon upgrades. Previously available on Google Play for testing."
  imageUrl="/images/infernotrigger.jpg"
  videoUrl="/videos/infernotrigger-demo.mp4"
  tags={["Unity", "C#", "2D", "Mobile", "Action"]}
/>

<ProjectCard
  title="Magister’s Orb"
  subtitle="Turn-based card game (freelance)"
  description="Commissioned prototype. Core deck/turn logic, status effects, and combat UI."
  imageUrl="/images/magisters.jpg"
  videoUrl="/videos/magisters-demo.mp4"
  tags={["Unity", "C#", "Card Game", "PC", "Prototype"]}
/>

<ProjectCard
  title="All-Star Project"
  subtitle="2D JRPG prototype"
  description="Turn-based combat with status effects, items, and skills. Persona-inspired tempo and resource design."
  imageUrl="/images/allstar.jpg"
  videoUrl="/videos/allstar-demo.mp4"
  tags={["Unity", "C#", "2D", "JRPG", "PC"]}
/>

<ProjectCard
  title="Palette Drop"
  subtitle="Android casual runner"
  description="Level generation and responsive touch controls. Previously available on Google Play."
  imageUrl="/images/palette.jpg"
  videoUrl="/videos/palette-demo.mp4"
  tags={["Unity", "C#", "3D", "Mobile", "Casual"]}
/>

</div>
</Section>


<Section title="Skills & Tools">
<ul className="list-disc list-inside text-neutral-300 space-y-1">
<li>Game systems: Combat, AI, Deck‑building, Progression, Clicker/Idle</li>
<li>Architecture: OOP, ScriptableObjects, Event‑driven, State Machines</li>
<li>Editor tooling, profiling, builds for PC/Android</li>
</ul>
</Section>
</div>
);
}