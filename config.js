/*
 * EDITA ESTE ÚNICO ARCHIVO para reutilizar la web con un cliente.
 * Datos de demostración: NO representan un negocio real.
 * IMPORTANTE: al publicar para un cliente real, pon demo: false, completa
 * los campos y quita la meta noindex de index.html (explicado en README).
 */
window.BARBER_CONFIG = {
  demo: true,
  brand: 'RITUAL',                 // Marca ficticia para la demostración
  brandSuffix: 'BARBER STUDIO',
  eyebrow: 'ESTILO · DETALLE · ACTITUD',
  headline: 'El corte es solo el comienzo.',
  description: 'Un espacio pensado para quienes valoran su estilo. Cortes precisos, detalles cuidados y una experiencia a tu ritmo.',
  whatsappPhone: '',              // Ej.: '+56 9 1234 5678' (número VERIFICADO del cliente)
  whatsappIntro: 'Hola, quisiera consultar disponibilidad para',
  instagramUrl: '',               // https://www.instagram.com/usuario_real/
  address: '',                    // Calle y número confirmados por el cliente
  city: '',                       // Comuna, región
  mapsUrl: '',                    // URL https://maps.app.goo.gl/... o google.com/maps...
  hours: [                        // Mantener vacío hasta recibir horarios reales
    // { label: 'Lunes a viernes', value: '10:00 a 19:00' },
    // { label: 'Sábado', value: '10:00 a 15:00' }
  ],
  services: [                     // SERVICIOS Y PRECIOS ILUSTRATIVOS, no reales
    { name: 'Corte de autor', description: 'Asesoría de estilo y terminación cuidada.', duration: '45 min', price: 14000, icon: 'cut' },
    { name: 'Perfilado de barba', description: 'Líneas definidas y acabado detallado.', duration: '30 min', price: 9000, icon: 'beard' },
    { name: 'Corte + barba', description: 'La experiencia completa en una sola visita.', duration: '70 min', price: 21000, icon: 'spark' },
    { name: 'Corte clásico', description: 'Limpio, versátil y siempre vigente.', duration: '35 min', price: 12000, icon: 'style' }
  ],
  gallery: [
    { image:'assets/galeria-corte.svg', title:'Precisión en cada detalle', category:'Estilo / Ilustración' },
    { image:'assets/galeria-barba.svg', title:'Carácter y definición', category:'Barba / Ilustración' },
    { image:'assets/galeria-herramientas.svg', title:'Oficio y técnica', category:'Herramientas / Ilustración' },
    { image:'assets/galeria-estudio.svg', title:'Un espacio a tu estilo', category:'Ambiente / Ilustración' }
  ]
};
