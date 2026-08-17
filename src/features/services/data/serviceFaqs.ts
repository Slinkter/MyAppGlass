export interface ServiceFaq {
  question: string;
  answer: string;
}

export const serviceFaqsMap: Record<string, ServiceFaq[]> = {
  ventana: [
    {
      question: "¿Cuánto ruido aísla una ventana acústica antirruido?",
      answer: "Nuestras ventanas con Doble Vidriado Hermético (DVH 6+12+6) y perfiles acústicos herméticos Serie Nova reducen entre 32 y 42 decibeles (dB), eliminando hasta un 80% del ruido exterior vehicular y urbano."
    },
    {
      question: "¿Realizan visitas técnicas a domicilio en La Molina, Surco y Lima?",
      answer: "Sí, nuestros técnicos especializados realizan visitas a domicilio para rectificación de medidas exactas en obra y asesoría personalizada de perfiles y cristales."
    },
    {
      question: "¿Qué garantía tienen las ventanas de aluminio?",
      answer: "Ofrecemos 12 meses de garantía directa en instalación y herrajes, además de certificación de resistencia a la corrosión en perfiles de aluminio anodizado."
    }
  ],
  mampara: [
    {
      question: "¿Qué espesor de vidrio templado se utiliza para mamparas de terraza?",
      answer: "Utilizamos cristales templados de seguridad de 8mm y 10mm conforme a la Norma Técnica E.040 del RNE, garantizando resistencia ante presiones de viento e impactos mecánicos."
    },
    {
      question: "¿Las mamparas corredizas son herméticas contra polvo y viento?",
      answer: "Sí, incorporan felpas perimetrales de alta densidad y empaques EPDM que aseguran un sellado hermético contra corrientes de aire, polvo y filtraciones de agua."
    },
    {
      question: "¿Cuál es el tiempo de fabricación e instalación?",
      answer: "El tiempo estándar de fabricación y templado a medida es de 5 a 7 días hábiles, con instalación en obra realizada en 1 jornada."
    }
  ],
  ducha: [
    {
      question: "¿Qué ventajas tiene un box de ducha de vidrio templado frente al acrílico?",
      answer: "El vidrio templado de 8mm no se decolora, es altamente higiénico, resistente a roturas térmicas y proporciona una estética moderna y luminosa de spa."
    },
    {
      question: "¿Los accesorios y tiradores se oxidan con el vapor de agua?",
      answer: "No, todos nuestros sistemas KIT emplean acero inoxidable calidad AISI 304 y perfilería de aluminio anodizado inmunes al óxido y la humedad."
    }
  ],
  techo: [
    {
      question: "¿Qué es mejor para terrazas: policarbonato alveolar o cristal templado?",
      answer: "El policarbonato es ultraligero y económico con filtro UV del 99%. El cristal templado brinda máxima transparencia panorámica, elegancia y no produce ruido con la lluvia."
    },
    {
      question: "¿Cómo se evacúa el agua de lluvia en los techos de aluminio?",
      answer: "Diseñamos canaletas pluviales integradas y ocultas en la estructura de aluminio para un drenaje seguro y estético."
    }
  ],
  baranda: [
    {
      question: "¿Las barandas de vidrio templado cumplen con las normas de seguridad en altura?",
      answer: "Sí, utilizamos cristal templado o laminado de 8mm a 12mm con anclajes químicos y conectores de acero inoxidable certificados para balcones y escaleras."
    }
  ],
  balcones: [
    {
      question: "¿Se puede instalar vidrio templado en balcones sin perder la vista panorámica?",
      answer: "Sí, nuestros sistemas de balcones panorámicos emplean fijaciones perimetrales o de piso que eliminan perfiles verticales invasivos."
    }
  ]
};

export const defaultServiceFaqs: ServiceFaq[] = [
  {
    question: "¿Cómo solicito una cotización a medida con GYA Company?",
    answer: "Puedes llenar nuestro formulario de contacto en línea o escribirnos directamente al WhatsApp oficial (+51 974 278 303) con tus medidas aproximadas."
  },
  {
    question: "¿Cuáles son las formas de pago y plazos de entrega?",
    answer: "Aceptamos transferencias bancarias, tarjetas de crédito/débito y efectivo. Los plazos de entrega varían entre 5 y 10 días hábiles según la magnitud de la obra."
  }
];
