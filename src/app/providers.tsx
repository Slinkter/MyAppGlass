"use client";

import { Provider } from "@/components/ui/provider";
import { system } from "@/theme";
import { LazyMotion, domAnimation } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <Provider value={system}>
        <LazyMotion features={domAnimation}>
          {children}
        </LazyMotion>
      </Provider>
    </HelmetProvider>
  );
}
