import { useMemo } from "react";
import { Building, type LucideIcon } from "lucide-react";
import { LogoIcon } from "@/assets/branding/LogoIcon";

export interface MapIconConfig {
  iconContent: React.ComponentType | string;
  isSvg: boolean;
  size: { width: number; height: number };
}

export interface MapIcons {
  store: MapIconConfig;
  project: MapIconConfig;
}

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
