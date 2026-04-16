import { useMemo } from "react";
import { Building } from "lucide-react";
import { LogoIcon } from "@/assets/branding/LogoIcon";

export const useMapIcons = (isLoaded, google) => {
  return useMemo(() => {
    if (!isLoaded || !google) return null;
    return {
      store: {
        iconContent: LogoIcon,
        isSvg: true,
        size: { width: 36, height: 36 },
      },
      project: {
        iconContent: Building,
        isSvg: true,
        size: { width: 36, height: 36 },
      },
    };
  }, [isLoaded, google]);
};