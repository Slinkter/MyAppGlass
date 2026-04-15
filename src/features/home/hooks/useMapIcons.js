import { useMemo } from "react";
import { Building2 } from "lucide-react";
import logo from "@/assets/branding/LogoCompanytrans.png";

export const useMapIcons = (isLoaded, google) => {
  return useMemo(() => {
    if (!isLoaded || !google) return null;
    return {
      store: {
        iconContent: logo,
        isSvg: false,
        size: { width: 60, height: 60 },
      },
      project: {
        iconContent: Building2,
        isSvg: true,
        size: { width: 36, height: 36 },
      },
    };
  }, [isLoaded, google]);
};