import { Metadata } from "next";
import { HomeView } from "@/screens/home";

export const metadata: Metadata = {
  title: "Vidriería en La Molina | Glass & Aluminum Company S.A.C. - GYA Company",
  description: "Especialistas en ventanas antirruido, mamparas de vidrio templado y aluminio en La Molina. Glass & Aluminum Company S.A.C. (GYA) ofrece soluciones premium a medida. ¡Cotiza aquí!",
  keywords: ["vidriería la molina", "Glass & Aluminum Company S.A.C.", "GYA Company", "ventanas antirruido la molina", "mamparas de vidrio"],
  alternates: {
    canonical: "https://www.gyacompany.com",
  },
};

export default function Page() {
  return <HomeView />;
}
