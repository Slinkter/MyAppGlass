"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProyectosRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/#proyectos");
  }, [router]);
  return null;
}
