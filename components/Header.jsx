// components/Header.jsx
// Simple top nav; keep it minimal and recruiter-friendly.


import Link from "next/link";


export default function Header() {
return (
<header className="border-b border-neutral-900/60">
<nav className="container py-4 flex items-center justify-between">
<Link href="/" className="font-bold tracking-tight text-lg">Emirkan.dev</Link>
<div className="flex items-center gap-4 text-sm">
<Link href="/game-dev" className="hover:underline">Game Dev</Link>
<Link href="/web-dev" className="hover:underline">Web Dev</Link>
<Link href="/profile"  className="hover:opacity-80">Profile</Link>

<a href="/gresume.pdf" className="px-3 py-1 rounded border border-neutral-700 hover:border-neutral-500">Game Dev CV</a>
<a href="/wresume.pdf" className="px-3 py-1 rounded border border-neutral-700 hover:border-neutral-500">Web Dev CV</a>
</div>
</nav>
</header>
);
}