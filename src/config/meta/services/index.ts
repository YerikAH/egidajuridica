import { site } from "../../sites";

export const servicesMeta = {
  title: `Servicios — ${site.name} | Derecho laboral, empresarial y civil`,
  description: `Servicios jurídicos especializados en derecho laboral, empresarial y civil. Asesoramiento riguroso, estrategia legal clara y soluciones adaptadas a cada cliente. ${site.name}.`,
  keywords:
    "servicios legales, derecho laboral, derecho empresarial, derecho civil, abogados especialistas, asesoramiento jurídico, despidos, contratos, reclamaciones, conflictos mercantiles, responsabilidad civil, Egida Jurídica",
  canonical: `${site.website}/servicios`,
  type: "website",
  robots: "index, follow",

  structuredData: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Servicios jurídicos — ${site.name}`,
    url: `${site.website}/servicios`,
    description:
      "Servicios jurídicos especializados en derecho laboral, empresarial y civil. Analizamos cada caso con rigor y definimos una estrategia legal clara y eficaz.",
    provider: {
      "@type": "LegalService",
      name: site.name,
      url: site.website,
    },
    serviceType: site.specialties.map((s) => s.name),
    areaServed: {
      "@type": "Country",
      name: "Perú",
    },
  },
};
