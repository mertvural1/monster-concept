import type { ConfiguratorGroup } from "@/shared/interfaces/configurator.interface";

export const configuratorBasePrice = 72999;

export const configuratorGroups: ConfiguratorGroup[] = [
  {
    id: "gpu",
    title: "Grafik kartı",
    options: [
      { id: "rtx-5060", label: "RTX 5060", description: "Dengeli FPS ve verimlilik", priceDelta: 0 },
      { id: "rtx-5070", label: "RTX 5070", description: "QHD oyun için daha yüksek tavan", priceDelta: 12000 },
      { id: "rtx-5080", label: "RTX 5080", description: "Yayın, AI ve ultra ayarlar", priceDelta: 28000 },
    ],
  },
  {
    id: "memory",
    title: "Bellek",
    options: [
      { id: "ram-16", label: "16GB DDR5", description: "Günlük oyun ve okul", priceDelta: 0 },
      { id: "ram-32", label: "32GB DDR5", description: "Çoklu görev ve üretim", priceDelta: 4500 },
      { id: "ram-64", label: "64GB DDR5", description: "Render ve ağır projeler", priceDelta: 12500 },
    ],
  },
  {
    id: "storage",
    title: "Depolama",
    options: [
      { id: "ssd-1tb", label: "1TB NVMe", description: "Hızlı başlangıç paketi", priceDelta: 0 },
      { id: "ssd-2tb", label: "2TB NVMe", description: "Geniş oyun kütüphanesi", priceDelta: 5500 },
      { id: "ssd-4tb", label: "4TB NVMe", description: "Arşiv ve proje diski", priceDelta: 14000 },
    ],
  },
];
