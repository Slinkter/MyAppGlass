import ItemGridLayout from "@/components/common/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import ServiceListSkeleton from "./ServiceListSkeleton";
import { services } from "@/data/services";

/**
 * @component ServiceList
 * @description Lista de servicios usando el componente genérico ItemGridLayout.
 * Muestra todos los servicios ofrecidos por la empresa en un grid responsive.
 *
 * @returns {JSX.Element} Grid de servicios con SEO y loading state
 */
const ServiceList = () => {
  return (
    <ItemGridLayout
      title="SERVICIOS"
      subtitle="Fabricación & Instalación"
      items={services}
      ItemComponent={ServiceCard}
      SkeletonComponent={ServiceListSkeleton}
      seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
      seoCanonicalUrl="https://www.gyacompany.com/servicios"
    />
  );
};

export default ServiceList;
