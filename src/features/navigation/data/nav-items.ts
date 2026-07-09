import { AppRoute } from "@/shared/enums/app-route.enum";
import type { NavItem } from "@/shared/interfaces/nav-item.interface";

export const navItems: NavItem[] = [
  { label: "Laptoplar", href: AppRoute.PRODUCTS },
  { label: "Kampanyalar", href: AppRoute.CAMPAIGNS },
  { label: "Konfigüratör", href: AppRoute.CONFIGURATOR },
  { label: "Ekosistem", href: AppRoute.ECOSYSTEM },
  { label: "Destek", href: AppRoute.SUPPORT },
];
