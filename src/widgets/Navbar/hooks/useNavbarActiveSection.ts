"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export type NavbarSection = "inicio" | "servicios" | "proyectos" | "ubicacion" | "auth" | "";

/**
 * Hook para determinar la sección activa en la barra de navegación.
 * Combina la ruta actual (pathname), el hash de anclaje, el scroll-spy
 * mediante IntersectionObserver y soporte de clics instantáneos.
 */
export function useNavbarActiveSection() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<NavbarSection>("");

  useEffect(() => {
    // Fuera de la home (p. ej. en /auth, /blog, /servicios/..., etc.)
    if (pathname.startsWith("/auth")) {
      setActiveSection("auth");
      return;
    }

    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    // Inicialización segura en home
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash === "servicios" || initialHash === "proyectos" || initialHash === "ubicacion") {
      setActiveSection(initialHash as NavbarSection);
    } else {
      setActiveSection("inicio");
    }

    const sections: { id: NavbarSection; element: HTMLElement | null }[] = [
      { id: "servicios", element: document.getElementById("servicios") },
      { id: "proyectos", element: document.getElementById("proyectos") },
      { id: "ubicacion", element: document.getElementById("ubicacion") },
    ];

    const handleScroll = () => {
      // Si el usuario vuelve a la parte superior de la página
      if (window.scrollY < 200) {
        setActiveSection("inicio");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 200) {
          setActiveSection("inicio");
          return;
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as NavbarSection;
            if (id === "servicios" || id === "proyectos" || id === "ubicacion") {
              setActiveSection(id);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "servicios" || hash === "proyectos" || hash === "ubicacion") {
        setActiveSection(hash as NavbarSection);
      } else if (!hash && window.scrollY < 200) {
        setActiveSection("inicio");
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      sections.forEach(({ element }) => {
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [pathname]);

  const selectSection = useCallback((section: NavbarSection) => {
    setActiveSection(section);
  }, []);

  return { activeSection, selectSection };
}
