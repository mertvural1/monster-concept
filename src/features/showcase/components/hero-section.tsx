import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { heroHighlights, heroSectionCopy } from "@/features/showcase/data/hero-section-data";
import { AppRoute } from "@/shared/enums/app-route.enum";
import { UiCopy } from "@/shared/enums/ui-copy.enum";

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-ink text-white">
      <div className="mx-auto grid min-h-[calc(100vh-104px)] max-w-[1180px] items-center gap-10 px-4 py-12 lg:grid-cols-[0.94fr_1.06fr]">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-acid">
            {UiCopy.CASE_STUDY_LABEL}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            {heroSectionCopy.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
            {heroSectionCopy.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={AppRoute.PRODUCTS}
              className="inline-flex items-center justify-center gap-2 rounded bg-acid px-6 py-3 text-sm font-black text-ink transition hover:bg-volt"
            >
              {UiCopy.PRIMARY_CTA}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={AppRoute.CONFIGURATOR}
              className="inline-flex items-center justify-center gap-2 rounded border border-white/14 px-6 py-3 text-sm font-black text-white transition hover:border-acid hover:text-acid"
            >
              {UiCopy.SECONDARY_CTA}
            </Link>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {heroHighlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded border border-white/10 bg-white/[0.03] p-3">
                <Icon className="shrink-0 text-acid" size={18} />
                <span className="text-xs font-bold leading-5 text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[440px]">
          <div className="absolute inset-x-4 bottom-6 top-10 rounded-full bg-acid/20 blur-3xl" />
          <div className="relative mx-auto flex h-full max-w-[620px] items-center justify-center">
            <Image
              src="https://cdn.monsternotebook.com.tr//monsternotebook-tr/UPLOAD/Menu/new-mmenu-tulpar.png"
              alt={heroSectionCopy.imageAlt}
              width={680}
              height={520}
              priority
              className="drop-shadow-[0_50px_80px_rgba(0,0,0,0.55)]"
            />
          </div>
          <div className="absolute bottom-8 left-2 rounded border border-white/10 bg-white/[0.08] p-4 backdrop-blur md:left-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-acid">{heroSectionCopy.productSeries}</p>
            <p className="mt-1 text-2xl font-black">{heroSectionCopy.productSpecs}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
