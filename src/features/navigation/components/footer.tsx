import { Cpu, Headphones, ShieldCheck } from "lucide-react";

import { UiCopy } from "@/shared/enums/ui-copy.enum";

const footerLinks = ["Tüm Laptoplar", "Oyun Bilgisayarları", "İş Bilgisayarları", "Aksesuarlar"];
const legalLinks = ["Gizlilik", "Mesafeli Satış", "KVKK", "Çerez Tercihleri"];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black text-acid">{UiCopy.BrandName}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
            Monster Notebook arayüzünden esinlenen, işe alım portfolyosu için hazırlanmış modern
            frontend redesign çalışması.
          </p>
          <div className="mt-6 flex gap-3">
            <ShieldCheck className="text-acid" size={20} />
            <Cpu className="text-acid" size={20} />
            <Headphones className="text-acid" size={20} />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase text-white">Ürünler</h3>
          <ul className="mt-4 grid gap-3 text-sm text-white/60">
            {footerLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase text-white">Yasal</h3>
          <ul className="mt-4 grid gap-3 text-sm text-white/60">
            {legalLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
