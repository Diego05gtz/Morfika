/**
 * ============================================================================
 * CATÁLOGO DE PRODUCTOS — MORFIKA (IMPRESIÓN 3D EN FILAMENTO)
 * ============================================================================
 *
 * ¿CÓMO AGREGAR TUS PROPIAS IMÁGENES LOCALES?
 * ----------------------------------------------------------------------------
 * 1. Guarda tus fotos en formato `.jpg`, `.png` o `.webp` dentro de la carpeta
 *    `public/img/` (ejemplo: `public/img/maceta-dodecaedro.jpg`).
 * 2. En el campo `image` del producto correspondiente aquí abajo, escribe la
 *    ruta comenzando con `/` (sin escribir "public"):
 *      image: '/img/maceta-dodecaedro.jpg',
 *
 * ¿CÓMO EDITAR O AGREGAR UN PRODUCTO NUEVO?
 * ----------------------------------------------------------------------------
 * Copia cualquiera de los bloques `{ ... }` dentro del arreglo `PRODUCTS`,
 * pégalo al final antes del corchete de cierre `]` y edita sus campos:
 *  - id: Identificador único del artículo (ej. 'MFK-017').
 *  - name: Nombre comercial del producto (ej. 'Maceta Geométrica Dodecaedro').
 *  - category: Categoría visible en la tarjeta (ej. 'Macetas y Decoración').
 *  - materialType: DEBE SER uno de los filtros disponibles:
 *      'PLA' | 'PETG' | 'ABS' | 'TPU'
 *  - materialLabel: Detalle del filamento (ej. 'PLA Ecológico Mate').
 *  - layerResolution: Altura de capa para la Vista Rápida (ej. '0.16 mm (Alta Definición)').
 *  - printTime: Tiempo estimado de fabricación (ej. '5 horas 30 min').
 *  - dimensions: Medidas en milímetros o centímetros (ej. '15 x 15 x 13.5 cm').
 *  - price: Precio numérico en MXN (ej. 290.00).
 *  - stock: Disponibilidad (ej. 'Disponible bajo pedido').
 *  - defaultColor: Color inicial seleccionado ('Blanco' | 'Negro' | 'Gris' | 'Rojo' | 'Azul').
 *  - image: Ruta local ('/img/archivo.jpg') o enlace URL ('https://...').
 *
 * ¿CÓMO CAMBIAR EL NÚMERO DE WHATSAPP?
 * ----------------------------------------------------------------------------
 * Modifica la constante `WHATSAPP_NUMBER` con el código de país + número a 10
 * dígitos, sin signos `+`, ni espacios ni guiones (ej. '521234567890').
 * ============================================================================
 */

export const WHATSAPP_NUMBER = '523314176140';

export const MATERIAL_FILTERS = ['TODOS', 'PLA', 'PETG', 'ABS', 'TPU'];

export const PRODUCT_COLORS = [
  { name: 'Blanco', hex: '#FFFFFF', border: 'border-slate-300' },
  { name: 'Negro', hex: '#18181B', border: 'border-slate-900' },
  { name: 'Gris', hex: '#94A3B8', border: 'border-slate-400' },
  { name: 'Rojo', hex: '#EF4444', border: 'border-red-500' },
  { name: 'Azul', hex: '#3B82F6', border: 'border-blue-500' },
];

export const PRODUCTS = [
  // --- MACETAS Y DECORACIÓN ---
  {
    id: 'MFK-001',
    name: 'Maceta Geométrica Dodecaedro',
    category: 'Macetas Geométricas',
    materialType: 'PETG',
    materialLabel: 'PETG Impermeable UV',
    layerResolution: '0.20 mm (Acabado Estanco)',
    printTime: '5 horas 10 min',
    dimensions: '15 x 15 x 13.5 cm',
    price: 290.0,
    stock: 'Disponible',
    defaultColor: 'Blanco',
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-002',
    name: 'Maceta Espiral con Autorriego',
    category: 'Macetas Geométricas',
    materialType: 'PETG',
    materialLabel: 'PETG Reciclado Satinado',
    layerResolution: '0.16 mm (Doble Pared)',
    printTime: '7 horas 45 min',
    dimensions: '16 x 16 x 18 cm',
    price: 360.0,
    stock: 'Disponible',
    defaultColor: 'Gris',
    image:
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-003',
    name: 'Maceta Minimalista Hexagonal',
    category: 'Macetas Geométricas',
    materialType: 'PLA',
    materialLabel: 'PLA+ Textura Mate',
    layerResolution: '0.20 mm (Pared Reforzada)',
    printTime: '4 horas 15 min',
    dimensions: '12.5 x 12.5 x 14 cm',
    price: 240.0,
    stock: 'Disponible',
    defaultColor: 'Blanco',
    image:
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-004',
    name: 'Jarrón Paramétrico Ondulado',
    category: 'Macetas Geométricas',
    materialType: 'PLA',
    materialLabel: 'PLA Seda Brillante',
    layerResolution: '0.16 mm (Contorno Continuo)',
    printTime: '6 horas 20 min',
    dimensions: '14 x 14 x 24 cm',
    price: 380.0,
    stock: 'Disponible',
    defaultColor: 'Azul',
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  },

  // --- SOPORTES Y ESCRITORIO ---
  {
    id: 'MFK-005',
    name: 'Soporte Voronoi para Audífonos',
    category: 'Soportes y Escritorio',
    materialType: 'PLA',
    materialLabel: 'PLA+ Fibra de Carbono',
    layerResolution: '0.16 mm (Alta Definición)',
    printTime: '6 horas 45 min',
    dimensions: '12 x 14 x 26 cm',
    price: 340.0,
    stock: 'Disponible',
    defaultColor: 'Negro',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-006',
    name: 'Soporte Ergonómico para Laptop',
    category: 'Soportes y Escritorio',
    materialType: 'PETG',
    materialLabel: 'PETG Estructural de Alta Carga',
    layerResolution: '0.20 mm (Relleno Panorámico)',
    printTime: '7 horas 15 min',
    dimensions: '24 x 21 x 8.5 cm',
    price: 420.0,
    stock: 'Disponible',
    defaultColor: 'Gris',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-007',
    name: 'Base Dual para Controles de Consola',
    category: 'Soportes y Escritorio',
    materialType: 'PLA',
    materialLabel: 'PLA+ Acabado Suave',
    layerResolution: '0.16 mm (Alta Definición)',
    printTime: '4 horas 50 min',
    dimensions: '16.5 x 13 x 19 cm',
    price: 265.0,
    stock: 'Disponible',
    defaultColor: 'Blanco',
    image:
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-008',
    name: 'Soporte Articulado para Smartphone',
    category: 'Soportes y Escritorio',
    materialType: 'PETG',
    materialLabel: 'PETG Resistente al Uso Diario',
    layerResolution: '0.16 mm (Bisagra Impresa en Sitio)',
    printTime: '3 horas 20 min',
    dimensions: '9 x 11 x 12 cm',
    price: 190.0,
    stock: 'Disponible',
    defaultColor: 'Azul',
    image:
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
  },

  // --- FIGURAS Y ESCULTURAS LOW-POLY ---
  {
    id: 'MFK-009',
    name: 'Figura Low-Poly Lobo Geométrico',
    category: 'Figuras Decorativas',
    materialType: 'PLA',
    materialLabel: 'PLA Seda Metalizado',
    layerResolution: '0.12 mm (Ultra Detalle)',
    printTime: '8 horas 10 min',
    dimensions: '18.5 x 7.5 x 15 cm',
    price: 380.0,
    stock: 'Disponible',
    defaultColor: 'Gris',
    image:
      'https://images.unsplash.com/photo-1563520239648-a24e51d4b570?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-010',
    name: 'Escultura Articulada Robot de Estudio',
    category: 'Figuras Decorativas',
    materialType: 'PLA',
    materialLabel: 'PLA+ Alta Precisión',
    layerResolution: '0.12 mm (Ultra Detalle)',
    printTime: '11 horas 40 min',
    dimensions: '14 x 14 x 23 cm',
    price: 540.0,
    stock: 'Disponible',
    defaultColor: 'Blanco',
    image:
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-011',
    name: 'Lámpara Ambiental Panal Hexagonal',
    category: 'Figuras Decorativas',
    materialType: 'PETG',
    materialLabel: 'PETG Difusor Translúcido',
    layerResolution: '0.16 mm (Difusión de Luz)',
    printTime: '9 horas 30 min',
    dimensions: '18 x 18 x 28 cm',
    price: 490.0,
    stock: 'Disponible',
    defaultColor: 'Blanco',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
  },

  // --- REFACCIONES Y ACCESORIOS TÉCNICOS ---
  {
    id: 'MFK-012',
    name: 'Kit de Engranajes Helicoidales NEMA',
    category: 'Refacciones y Taller',
    materialType: 'ABS',
    materialLabel: 'ABS Ingeniería Alto Torque',
    layerResolution: '0.12 mm (Precisión Mecánica)',
    printTime: '2 horas 40 min',
    dimensions: '6.8 x 6.8 x 2.4 cm',
    price: 185.0,
    stock: 'Disponible',
    defaultColor: 'Negro',
    image:
      'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-013',
    name: 'Carcasa Ventilada para Raspberry Pi',
    category: 'Refacciones y Taller',
    materialType: 'ABS',
    materialLabel: 'ABS Resistente al Calor',
    layerResolution: '0.16 mm (Ajuste Exacto)',
    printTime: '4 horas 20 min',
    dimensions: '9.5 x 7 x 3.8 cm',
    price: 250.0,
    stock: 'Disponible',
    defaultColor: 'Rojo',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-014',
    name: 'Organizador Modular de Herramientas',
    category: 'Refacciones y Taller',
    materialType: 'ABS',
    materialLabel: 'ABS Alto Impacto',
    layerResolution: '0.20 mm (Relleno 50%)',
    printTime: '5 horas 30 min',
    dimensions: '28 x 9.5 x 7 cm',
    price: 310.0,
    stock: 'Disponible',
    defaultColor: 'Rojo',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },

  // --- FLEXIBLES EN TPU ---
  {
    id: 'MFK-015',
    name: 'Set 4 Amortiguadores Antivibración',
    category: 'Accesorios Flexibles TPU',
    materialType: 'TPU',
    materialLabel: 'TPU 95A Elastómero Flexible',
    layerResolution: '0.20 mm (Relleno Giroide)',
    printTime: '3 horas 45 min',
    dimensions: '4.5 x 4.5 x 3.5 cm (c/u)',
    price: 210.0,
    stock: 'Disponible',
    defaultColor: 'Negro',
    image:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'MFK-016',
    name: 'Organizador Flexible de Cables para Escritorio',
    category: 'Accesorios Flexibles TPU',
    materialType: 'TPU',
    materialLabel: 'TPU 85A Suave al Tacto',
    layerResolution: '0.20 mm (Contorno Elástico)',
    printTime: '3 horas 15 min',
    dimensions: '15 x 4.5 x 2.5 cm',
    price: 150.0,
    stock: 'Disponible',
    defaultColor: 'Azul',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
];
