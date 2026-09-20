import type { Testimonial } from "./types";

export const site = {
  name: "Wilfer Becerra",
  url: "https://wilferbecerra.com",
  email: "wilfer.becerra2526@gmail.com",
  location: "Lucena, Córdoba",
  links: {
    github: "https://github.com/WilferBH",
    linkedin: "https://www.linkedin.com/in/wilfer-becerra-84bb02402/",
    // Pendiente: añadir la URL del perfil de Upwork cuando exista.
    upwork: null as string | null,
  },
  albor: "https://albor-automations.com",
};

// Reseñas de clientes. Con más de una, se activa el carrusel.
export const testimonials: Testimonial[] = [
  {
    author: "Yohan Barbosa",
    role: {
      es: "Repartidor autónomo · más de 30.000 paquetes al mes",
      en: "Independent courier · 30,000+ parcels a month",
    },
    photo: "/clientes/yohan-barbosa.webp",
    project: "Exodus Logistics",
    // Pendiente: añadir aquí la reseña real cuando Yohan la envíe ({ es, en }).
    quote: undefined,
  },
];
