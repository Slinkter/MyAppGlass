import { Metadata } from "next";
import { HomeView } from "@/screens/home";

export const metadata: Metadata = {
  title: "Vidriería en La Molina | Glass & Aluminum Company S.A.C.",
  description: "Glass & Aluminum Company S.A.C.: Expertos en vidriería y aluminio en La Molina, Lima. Ventanas antirruido, mamparas de baño, duchas, barandas y techos. ¡Cotiza a domicilio sin compromiso!",
  keywords: ["vidriería la molina", "Glass & Aluminum Company S.A.C.", "GYA Company", "ventanas antirruido la molina", "mamparas de vidrio"],
  alternates: {
    canonical: "https://www.gyacompany.com",
  },
};

export default function Page() {
  return <HomeView />;
}
