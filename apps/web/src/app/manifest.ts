import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Glass & Aluminum Company S.A.C.",
    short_name: "GYA Company",
    description:
      "Especialistas en vidriería, ventanas antirruido, mamparas de vidrio templado y estructuras de aluminio en La Molina, Lima.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#111111",
    lang: "es-PE",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logovcr.png",
        sizes: "906x904",
        type: "image/png",
      },
    ],
  };
}
