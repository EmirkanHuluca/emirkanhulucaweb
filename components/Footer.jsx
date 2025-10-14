// components/Footer.jsx


export default function Footer() {
return (
<footer className="border-t border-neutral-900/60 mt-16">
<div className="container py-8 text-sm text-neutral-400 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
<p>© {new Date().getFullYear()} Emirkan Huluca</p>
<p>Built with Next.js • Deployed on Vercel</p>
</div>
</footer>
);
}