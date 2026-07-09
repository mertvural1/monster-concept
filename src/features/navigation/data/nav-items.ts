import { AppRoute } from "@/shared/enums/app-route.enum";
import type { NavItem } from "@/shared/interfaces/nav-item.interface";

export const navItems: NavItem[] = [
  { label: "Laptoplar", href: AppRoute.Products },
  { label: "Kampanyalar", href: AppRoute.Campaigns },
  { label: "Konfigüratör", href: AppRoute.Configurator },
  { label: "Ekosistem", href: AppRoute.Ecosystem },
  { label: "Destek", href: AppRoute.Support },
];
