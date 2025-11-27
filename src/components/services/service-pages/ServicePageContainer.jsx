import { useParams } from "react-router-dom";
import ServicePageLayout from "./ServicePageLayout";
import { servicePageDataMap } from "@/data/servicePageDataMap";
import ErrorDisplay from "@/components/common/ErrorDisplay"; // Assuming you have an ErrorDisplay component

/**
 * @component ServicePageContainer
 * @description A container component that dynamically loads service page data
 * based on the URL slug and renders the ServicePageLayout.
 * This component replaces the individual *Page.jsx files, centralizing data loading.
 * @returns {JSX.Element} The rendered ServicePageLayout with dynamic data, or an error message.
 */
const ServicePageContainer = () => {
  const { serviceSlug } = useParams();
  const pageData = servicePageDataMap[serviceSlug];

  if (!pageData) {
    return (
      <ErrorDisplay
        message={`No se encontraron datos para el servicio: "${serviceSlug}". Por favor, verifique la URL.`}
      />
    );
  }

  return <ServicePageLayout pageData={pageData} />;
};

export default ServicePageContainer;
