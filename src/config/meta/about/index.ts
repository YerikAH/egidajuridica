import { site } from "../../sites";

export const aboutMeta = {
  title: `Sobre nosotros — ${site.name} | Firma legal con ${site.yearsOfExperience} de experiencia`,
  description: `Conoce a ${site.name}: una firma legal sólida, con ${site.yearsOfExperience} de ejercicio profesional. Equipo comprometido, enfoque riguroso y trato directo. Especialistas en derecho laboral, empresarial y civil.`,
  keywords:
    "sobre nosotros, equipo jurídico, abogados con experiencia, firma legal Perú, trayectoria legal, equipo profesional, Egida Jurídica, despacho de abogados",
  canonical: `${site.website}/acerca`,
  type: "website",
  robots: "index, follow",

  structuredData: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Sobre nosotros — ${site.name}`,
    url: `${site.website}/acerca`,
    description: `Conoce al equipo de ${site.name}. ${site.yearsOfExperience.charAt(0).toUpperCase() + site.yearsOfExperience.slice(1)} de ejercicio profesional, compromiso con la excelencia y un enfoque jurídico basado en el rigor, la estrategia y la comunicación clara.`,
    mainEntity: {
      "@type": "LegalService",
      name: site.name,
      url: site.website,
      foundingDate: String(site.foundingYear),
      description: site.description,
    },
  },
};
