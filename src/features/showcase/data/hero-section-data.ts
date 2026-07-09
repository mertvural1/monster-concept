import { BadgeCheck, Truck, Zap } from "lucide-react";

import type { HeroHighlight } from "@/features/showcase/interfaces/hero-highlight.interface";

export const heroSectionCopy = {
  title: "Performans tutkunları için yeniden tasarlanmış alışveriş deneyimi.",
  description:
    "Next.js, TypeScript, Tailwind CSS ve PWA desteğiyle hazırlanmış hızlı, modüler ve feature based bir Monster Notebook vitrin prototipi.",
  imageAlt: "Tulpar oyun bilgisayarı",
  productSeries: "Tulpar serisi",
  productSpecs: "QHD / RTX / DDR5",
};

export const heroHighlights: HeroHighlight[] = [
  { icon: Zap, label: "RTX 50 hazır performans" },
  { icon: BadgeCheck, label: "4 yıla uzayan garanti" },
  { icon: Truck, label: "Mağaza teslim seçenekleri" },
];
