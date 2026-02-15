import { useMemo } from "react";
import { FaBuilding } from "react-icons/fa";
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
        iconContent: FaBuilding,
        isSvg: true,
        size: { width: 36, height: 36 },
      },
    };
  }, [isLoaded, google]);
};
