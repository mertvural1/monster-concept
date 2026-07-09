import { ArrowUpRight } from "lucide-react";

import { campaigns } from "@/features/campaigns/data/campaigns";

export function CampaignGrid() {
  return (
    <section id="campaigns" className="bg-ink pb-20 pt-4 text-white">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="grid gap-4 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <article
              key={campaign.title}
              className="group relative overflow-hidden rounded border border-white/10 bg-graphite p-6"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${campaign.accent}`} />
              <p className="text-xs font-black uppercase tracking-[0.24em] text-acid">
                {campaign.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-black">{campaign.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{campaign.description}</p>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-black text-acid transition group-hover:text-volt">
                {campaign.actionLabel}
                <ArrowUpRight size={17} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
