import { Gamepad2, Headphones, Keyboard, MousePointer2 } from "lucide-react";

const ecosystemItems = [
  { icon: MousePointer2, label: "Pusat mouse", text: "Hızlı tepki ve ayarlanabilir DPI profilleri." },
  { icon: Keyboard, label: "Mekanik klavye", text: "RGB, makro ve oyun modları tek panelde." },
  { icon: Headphones, label: "7.1 kulaklık", text: "Konumsal ses ve düşük gecikmeli iletişim." },
  { icon: Gamepad2, label: "Oyun paketleri", text: "Game Pass, güvenlik ve aksesuar bundle seçenekleri." },
];

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="bg-mist py-20 text-ink">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-acid">Ekosistem</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">Level atla, setini tamamla.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {ecosystemItems.map(({ icon: Icon, label, text }) => (
            <article key={label} className="rounded border border-black/8 bg-white p-5 shadow-sm">
              <Icon className="text-acid" size={28} />
              <h3 className="mt-5 text-lg font-black">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/60">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
