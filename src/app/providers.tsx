"use client";

import { Provider } from "@/components/ui/provider";
import { system } from "@/theme";
import { LazyMotion, domAnimation } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider value={system}>
      <LazyMotion features={domAnimation}>
        {children}
      </LazyMotion>
    </Provider>
  );
}
