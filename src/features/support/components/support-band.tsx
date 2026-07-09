import { supportItems } from "@/features/support/data/support-items";

export function SupportBand() {
  return (
    <section id="support" className="bg-white py-20 text-ink">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="grid gap-4 md:grid-cols-4">
          {supportItems.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded border border-black/8 bg-mist p-5">
              <Icon className="text-acid" size={26} />
              <h3 className="mt-5 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
