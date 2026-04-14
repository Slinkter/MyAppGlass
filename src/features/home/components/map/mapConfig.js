import { keyframes } from "@emotion/react";

export const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

export const center = { lat: -12.046374, lng: -77.042793 };

export const mainStore = {
  id: "store",
  name: "Glass & Aluminum Company",
  address: "Av. Los Fresnos MZ. H LT. 1250 - La Molina - Lima",
  type: "store",
  client: "Sede Principal",
  position: { lat: -12.103252, lng: -76.942035 },
};

export const pulseRing = keyframes`
  0% { transform: scale(0.33); opacity: 1; }
  80%, 100% { opacity: 0; }
`;

export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;