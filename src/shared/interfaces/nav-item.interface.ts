import type { AppRoute } from "@/shared/enums/app-route.enum";

export interface NavItem {
  label: string;
  href: AppRoute;
}
