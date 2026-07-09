"use client";

import { Check, Cpu, HardDrive, MemoryStick } from "lucide-react";
import { useMemo, useState } from "react";

import {
  configuratorBasePrice,
  configuratorGroups,
} from "@/features/configurator/data/configurator-options";
import type { ConfiguratorOption } from "@/shared/interfaces/configurator.interface";
import { calculateConfiguratorPrice } from "@/shared/utils/calculate-configurator-price";
import { cn } from "@/shared/utils/cn";
import { formatCurrency } from "@/shared/utils/format-currency";

const icons = [Cpu, MemoryStick, HardDrive];

const initialSelections = Object.fromEntries(
  configuratorGroups.map((group) => [group.id, group.options[0].id]),
);

export function BuildConfigurator() {
  const [selectedOptionIds, setSelectedOptionIds] = useState<Record<string, string>>(initialSelections);

  const selectedOptions = useMemo<ConfiguratorOption[]>(() => {
    return configuratorGroups.map((group) => {
      const selectedId = selectedOptionIds[group.id];
      return group.options.find((option) => option.id === selectedId) ?? group.options[0];
    });
  }, [selectedOptionIds]);

  const totalPrice = calculateConfiguratorPrice(configuratorBasePrice, selectedOptions);

  return (
    <section id="configurator" className="bg-ink py-20 text-white">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-acid">Konfigüratör</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">Kendi performans profilini kur.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
            Kullanıcının alışveriş kararını hızlandıran, canlı fiyat güncelleyen ve component state
            yönetimini gösteren mini ürün oluşturucu.
          </p>

          <div className="mt-8 rounded border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-bold text-white/60">Tahmini toplam</p>
            <p className="mt-2 text-4xl font-black text-acid">{formatCurrency(totalPrice)}</p>
            <button className="mt-6 w-full rounded bg-acid px-5 py-3 text-sm font-black text-ink transition hover:bg-volt">
              Yapılandırmayı Kaydet
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {configuratorGroups.map((group, index) => {
            const Icon = icons[index] ?? Cpu;

            return (
              <article key={group.id} className="rounded border border-white/10 bg-graphite p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded bg-acid text-ink">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-lg font-black">{group.title}</h3>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {group.options.map((option) => {
                    const isSelected = selectedOptionIds[group.id] === option.id;

                    return (
                      <button
                        key={option.id}
                        className={cn(
                          "relative rounded border p-4 text-left transition",
                          isSelected
                            ? "border-acid bg-acid/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/25",
                        )}
                        onClick={() =>
                          setSelectedOptionIds((current) => ({
                            ...current,
                            [group.id]: option.id,
                          }))
                        }
                      >
                        {isSelected && (
                          <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-acid text-ink">
                            <Check size={14} />
                          </span>
                        )}
                        <span className="block pr-6 text-sm font-black">{option.label}</span>
                        <span className="mt-2 block text-xs leading-5 text-white/60">
                          {option.description}
                        </span>
                        <span className="mt-4 block text-sm font-black text-acid">
                          {option.priceDelta === 0 ? "Dahil" : `+ ${formatCurrency(option.priceDelta)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
