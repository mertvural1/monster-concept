import type { ConfiguratorOption } from "@/shared/interfaces/configurator.interface";

export function calculateConfiguratorPrice(basePrice: number, selectedOptions: ConfiguratorOption[]) {
  return selectedOptions.reduce((total, option) => total + option.priceDelta, basePrice);
}
