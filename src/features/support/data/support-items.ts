import { CalendarCheck, LifeBuoy, MapPin, Wrench } from "lucide-react";

import type { SupportItem } from "@/features/support/interfaces/support-item.interface";

export const supportItems: SupportItem[] = [
  { icon: MapPin, title: "Mağazalar", text: "Yakındaki mağazayı ve stok durumunu hızlıca bul." },
  { icon: Wrench, title: "Teknik servis", text: "Randevu al, ürün gönder, servis sürecini takip et." },
  { icon: LifeBuoy, title: "Ömür boyu destek", text: "Sürücü, kullanım kılavuzu ve çözüm merkezi." },
  { icon: CalendarCheck, title: "Bakım", text: "Garanti ve bakım paketlerini tek ekrandan yönet." },
];
