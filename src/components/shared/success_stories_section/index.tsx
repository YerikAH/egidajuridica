import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const stories = [
  {
    rating: 5,
    text: `"Recibí un trato profesional y claro desde el primer momento. Supieron orientarme con honestidad y resolver mi situación de forma eficaz."`,
    author: "Julian Marco",
  },
  {
    rating: 5,
    text: `"Destaco su rigor jurídico y la tranquilidad que transmiten durante todo el proceso. Un equipo serio y comprometido con su trabajo."`,
    author: "Michael Zarate",
  },
  {
    rating: 5,
    text: `"Gracias a su asesoramiento pude tomar decisiones importantes con seguridad. Comunicación directa y soluciones bien planteadas."`,
    author: "Samantha Rodriguez",
  },
  {
    rating: 5,
    text: `"Un despacho en el que se nota la experiencia. Analizaron mi caso con detalle y me ofrecieron una estrategia clara desde el inicio."`,
    author: "Erick Ortiz",
  },
];

export const SuccessStoriesSection = () => {
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[70vh] md:min-h-screen flex flex-col justify-center bg-primary py-16 md:py-24 lg:py-32 overflow-hidden z-10 font-sans"
      aria-label="Historias de éxito de nuestros clientes"
    >
      {/* Giant Background Text Wrapper (Decorative) */}
      <div
        className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[10%] w-full text-center flex justify-center">
          <span
            className="text-[30vw] sm:text-[25vw] md:text-[28vw] lg:text-[26vw] font-serif tracking-widest uppercase opacity-[0.04] whitespace-nowrap text-left text-primary-foreground"
            style={{
              fontFamily: "'Times New Roman', serif",
              lineHeight: 0.7,
            }}
          >
            CLIENTES
          </span>
        </div>
      </div>

      {/* Background Image / Overlay (Decorative) */}
      <div className="absolute inset-0 z-0 opacity-25" aria-hidden="true">
        <img
          src="https://images.pexels.com/photos/4427818/pexels-photo-4427818.jpeg"
          alt=""
          className="w-full h-full object-cover grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/70 " />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 text-center">
        <h2
          className="text-primary-foreground text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif tracking-wide mb-4 md:mb-6"
          data-animate="fade-up"
          id="stories-carousel-title"
        >
          Historias de éxito
        </h2>
        <div className="flex justify-center mb-8 md:mb-12">
          <div
            className="h-px w-full max-w-32 bg-primary-foreground"
            data-animate="line-grow"
            data-animate-delay="200"
            aria-hidden="true"
          ></div>
        </div>

        <div
          role="region"
          aria-roledescription="carrusel"
          aria-labelledby="stories-carousel-title"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-bullet-custom",
              bulletActiveClass: "swiper-bullet-active-custom",
            }}
            className="w-full pb-16"
          >
            {stories.map((story, index) => (
              <SwiperSlide
                key={index}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`Testimonio ${index + 1} de ${stories.length}: ${story.author}`}
              >
                <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
                  <div className="flex items-center space-x-1 mb-6 md:mb-8 justify-between w-full px-2 sm:px-6 md:px-12">
                    {/* Stars */}
                    <div
                      className="flex mr-2"
                      role="img"
                      aria-label={`Valoración: ${story.rating} de 5 estrellas`}
                    >
                      {[...Array(story.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 md:w-5 md:h-5 text-gold"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {/* Google Logo */}
                    <div
                      className="ml-4 flex items-center justify-center w-6 h-6 bg-primary-foreground rounded-full p-0.75"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 48 48"
                        className="w-full h-full"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <title>Google</title>
                        <clipPath id="g">
                          <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                        </clipPath>
                        <g className="colors" clipPath="url(#g)">
                          <path fill="#FBBC05" d="M0 37V11l17 13z" />
                          <path
                            fill="#EA4335"
                            d="M0 11l17 13 7-6.1L48 14V0H0z"
                          />
                          <path
                            fill="#34A853"
                            d="M0 37l30-23 7.9 1L48 0v48H0z"
                          />
                          <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <blockquote>
                    <p className="text-primary-foreground/80 text-base md:text-lg lg:text-xl leading-relaxed text-center mb-6 md:mb-8 px-2 sm:px-4 md:px-16">
                      {story.text}
                    </p>
                    <footer className="text-primary-foreground font-semibold text-sm md:text-base mb-6 md:mb-10 pb-4">
                      <cite className="not-italic">{story.author}</cite>
                    </footer>
                  </blockquote>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-bullet-custom {
          width: 20px;
          height: 2px;
          display: inline-block;
          background: var(--color-primary-foreground);
          opacity: 0.3;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-bullet-active-custom {
          background: var(--color-gold) !important;
          opacity: 1;
        }
        @media (min-width: 768px) {
          .swiper-bullet-custom {
            width: 30px;
          }
        }
      `,
        }}
      />
    </section>
  );
};

export default SuccessStoriesSection;
