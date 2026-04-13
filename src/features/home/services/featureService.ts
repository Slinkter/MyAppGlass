import { features, iconMap } from "@/data/features";

export interface Feature {
  id: number;
  heading: string;
  iconName: string;
  description: string;
}

export type IconMapType = Record<string, any>;

export interface GetFeaturesReturn {
  features: Feature[];
  iconMap: IconMapType;
}

export const getFeatures = (): GetFeaturesReturn => {
  return { features, iconMap };
};
