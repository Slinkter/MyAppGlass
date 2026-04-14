import { useMemo } from "react";
import { Building2 } from "lucide-react";
import logo from "@/assets/branding/logovcr.png";

export const useMapIcons = (isLoaded, google) => {
  return useMemo(() => {
    if (!isLoaded || !google) return null;
    return {
      store: {
        iconContent: logo,
        isSvg: false,
        size: { width: 50, height: 50 },
      },
      project: {
        iconContent: Building2,
        isSvg: true,
        size: { width: 36, height: 36 },
      },
    };
  }, [isLoaded, google]);
};