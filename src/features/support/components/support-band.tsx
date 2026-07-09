import { CalendarCheck, LifeBuoy, MapPin, Wrench } from "lucide-react";

const supportItems = [
  { icon: MapPin, title: "Mağazalar", text: "Yakındaki mağazayı ve stok durumunu hızlıca bul." },
  { icon: Wrench, title: "Teknik servis", text: "Randevu al, ürün gönder, servis sürecini takip et." },
  { icon: LifeBuoy, title: "Ömür boyu destek", text: "Sürücü, kullanım kılavuzu ve çözüm merkezi." },
  { icon: CalendarCheck, title: "Bakım", text: "Garanti ve bakım paketlerini tek ekrandan yönet." },
];

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
