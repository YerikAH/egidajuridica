import React, { useEffect, useRef } from "react";
import { site } from "../../../config";

const FormSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden font-sans pb-16 md:pb-24 lg:pb-32"
      aria-label="Información de contacto y formulario"
    >
      {/* Top Contact Info Area */}
      <div className="relative w-full py-16 md:py-24 lg:py-32 bg-background flex items-center justify-center overflow-hidden">
        {/* Large Faded Background Text (Decorative) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="text-[25vw] leading-none tracking-widest text-muted whitespace-nowrap font-times">
            CONTACTO
          </span>
        </div>

        {/* Foreground Content for Top Area */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-32">
          {/* Phone Block */}
          <div
            className="flex flex-col items-center text-center"
            data-animate="fade-up"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-2 font-serif">
              Número de celular:
            </h2>
            <a
              href={`tel:${site.phone}`}
              className="text-muted-foreground uppercase text-sm md:text-base hover:text-foreground transition-colors"
              aria-label={`Llamar al número ${site.phone}`}
            >
              {site.phone}
            </a>
          </div>

          {/* Email Block */}
          <div
            className="flex flex-col items-center text-center"
            data-animate="fade-up"
            data-animate-delay="200"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-2 font-serif">
              Correo electrónico:
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="text-muted-foreground text-sm md:text-base hover:text-foreground transition-colors"
              aria-label={`Enviar correo electrónico a ${site.email}`}
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Form Area with Image Background */}
      <div className="relative py-16 md:py-24 lg:py-32 bg-primary max-w-7xl w-full mx-auto">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/357514/pexels-photo-357514.jpeg")',
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        ></div>
        {/* Dark overlay (Decorative) */}
        <div
          className="absolute inset-0 bg-primary/60"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-16" data-animate="fade-up">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl text-primary-foreground mb-4 md:mb-6 font-serif"
              id="contact-form-title"
            >
              ¿Cómo podemos ayudarte?
            </h2>
            <div
              className="w-16 h-px bg-primary-foreground/40 mx-auto"
              data-animate="line-grow"
              aria-hidden="true"
            ></div>
          </div>

          <form
            className="w-full max-w-3xl mx-auto flex flex-col gap-6 md:gap-10"
            data-animate="fade-up"
            data-animate-delay="200"
            aria-labelledby="contact-form-title"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {/* First Name */}
              <div className="relative">
                <label htmlFor="firstName" className="sr-only">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Nombre *"
                  required
                  autoComplete="given-name"
                  aria-required="true"
                  className="w-full bg-transparent border-0 border-b border-primary-foreground/50 py-2 text-primary-foreground placeholder-primary-foreground text-sm md:text-base focus:outline-none focus:border-primary-foreground transition-colors focus:ring-0"
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <label htmlFor="lastName" className="sr-only">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Apellido *"
                  required
                  autoComplete="family-name"
                  aria-required="true"
                  className="w-full bg-transparent border-0 border-b border-primary-foreground/50 py-2 text-primary-foreground placeholder-primary-foreground text-sm md:text-base focus:outline-none focus:border-primary-foreground transition-colors focus:ring-0"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico *"
                  required
                  autoComplete="email"
                  aria-required="true"
                  className="w-full bg-transparent border-0 border-b border-primary-foreground/50 py-2 text-primary-foreground placeholder-primary-foreground text-sm md:text-base focus:outline-none focus:border-primary-foreground transition-colors focus:ring-0"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <label htmlFor="phone" className="sr-only">
                  Número de celular
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Número de celular"
                  autoComplete="tel"
                  className="w-full bg-transparent border-0 border-b border-primary-foreground/50 py-2 text-primary-foreground placeholder-primary-foreground text-sm md:text-base focus:outline-none focus:border-primary-foreground transition-colors focus:ring-0"
                />
              </div>
            </div>

            {/* Comments */}
            <div className="relative mb-2">
              <label htmlFor="comments" className="sr-only">
                Comentarios o preguntas
              </label>
              <textarea
                id="comments"
                name="comments"
                placeholder="Comentarios, preguntas? *"
                required
                aria-required="true"
                rows={1}
                className="w-full bg-transparent border-0 border-b border-white/50 py-2 text-white placeholder-white text-sm md:text-base focus:outline-none focus:border-white transition-colors focus:ring-0"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="border border-primary-foreground text-primary-foreground text-sm md:text-base uppercase font-medium tracking-wide px-5 py-2.5 md:px-6 md:py-3 hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
                aria-label="Enviar formulario de contacto"
              >
                ENVIAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
