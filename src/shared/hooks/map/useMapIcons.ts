import { useMemo } from "react";
import { Building, type LucideIcon } from "lucide-react";
import { LogoIcon } from "@/assets/branding/LogoIcon";
import type { MapIcons } from "@/shared/types/map";

export type { MapIconConfig, MapIcons } from "@/shared/types/map";

export const useMapIcons = (isLoaded: boolean, google: typeof window.google | undefined): MapIcons | null => {
  return useMemo(() => {
    if (!isLoaded || !google) return null;
    return {
      store: {
        iconContent: LogoIcon,
        isSvg: true,
        size: { width: 36, height: 36 },
      },
      project: {
        iconContent: Building as LucideIcon,
        isSvg: true,
        size: { width: 36, height: 36 },
      },
    };
  }, [isLoaded, google]);
};
