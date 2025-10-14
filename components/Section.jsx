// components/Section.jsx
// A small wrapper to keep margins consistent and titles aligned.


export default function Section({ title, children }) {
return (
<section className="space-y-4">
{title && <h2 className="text-2xl font-semibold">{title}</h2>}
<div>{children}</div>
</section>
);
}