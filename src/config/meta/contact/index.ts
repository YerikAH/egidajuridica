import { site } from "../../sites";

export const contactMeta = {
  title: `Contacto — ${site.name} | Consulta jurídica profesional`,
  description: `Contacta con ${site.name} para recibir orientación legal clara y profesional. Asesoramiento en derecho laboral, empresarial y civil adaptado a tu situación.`,
  keywords:
    "contacto abogados, consulta jurídica, asesoría legal, contactar abogado, derecho laboral contacto, Egida Jurídica contacto, consulta legal Perú",
  canonical: `${site.website}/contacto`,
  type: "website",
  robots: "index, follow",

  structuredData: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contacto — ${site.name}`,
    url: `${site.website}/contacto`,
    description: `Contacta con ${site.name} y recibe orientación legal profesional. Estamos preparados para analizar tu caso y ofrecerte una estrategia jurídica clara.`,
    mainEntity: {
      "@type": "LegalService",
      name: site.name,
      url: site.website,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address,
        addressCountry: site.country,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Asesoría jurídica",
        telephone: site.phone,
        email: site.email,
        availableLanguage: ["Spanish"],
        areaServed: site.country,
      },
    },
  },
};
