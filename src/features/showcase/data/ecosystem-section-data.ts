import { Gamepad2, Headphones, Keyboard, MousePointer2 } from "lucide-react";

import type { EcosystemItem } from "@/features/showcase/interfaces/ecosystem-item.interface";

export const ecosystemSectionCopy = {
  eyebrow: "Ekosistem",
  title: "Level atla, setini tamamla.",
};

export const ecosystemItems: EcosystemItem[] = [
  { icon: MousePointer2, label: "Pusat mouse", text: "Hızlı tepki ve ayarlanabilir DPI profilleri." },
  { icon: Keyboard, label: "Mekanik klavye", text: "RGB, makro ve oyun modları tek panelde." },
  { icon: Headphones, label: "7.1 kulaklık", text: "Konumsal ses ve düşük gecikmeli iletişim." },
  { icon: Gamepad2, label: "Oyun paketleri", text: "Game Pass, güvenlik ve aksesuar bundle seçenekleri." },
];
