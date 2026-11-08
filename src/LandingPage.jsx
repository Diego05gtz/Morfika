import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  PRODUCTS,
  MATERIAL_FILTERS,
  PRODUCT_COLORS,
  WHATSAPP_NUMBER,
} from './data/productos.js';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name-asc', label: 'Nombre: A - Z' },
];

const FILAMENT_GUIDE_ITEMS = [
  {
    code: 'PLA',
    title: 'PLA (Poliácido Láctico)',
    badge: 'Decoración y Prototipos',
    description:
      'El estándar de oro para figuras decorativas y prototipos. Acabado excelente y amigable con el medio ambiente.',
  },
  {
    code: 'PETG',
    title: 'PETG (Polietileno Tereftalato Glicol)',
    badge: 'Funcional e Impermeable',
    description:
      'Alta resistencia a impactos y temperatura. Perfecto para uso en exteriores o piezas funcionales.',
  },
  {
    code: 'ABS',
    title: 'ABS (Acrilonitrilo Butadieno Estireno)',
    badge: 'Grado Industrial',
    description:
      'Resistencia industrial. Ideal para refacciones mecánicas y piezas que soportan desgaste.',
  },
  {
    code: 'TPU',
    title: 'TPU (Poliuretano Termoplástico)',
    badge: 'Elástico y Flexible',
    description:
      'Filamento flexible y elástico como la goma. Excelente para llantas, empaques o fundas protectoras.',
  },
];

const formatMXN = (amount) => `$${Number(amount).toFixed(2)} MXN`;

function MorfikaLogo() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0"
      aria-label="Morfika Inicio"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        className="w-8 h-8 sm:w-9 sm:h-9 text-purple-600 group-hover:scale-105 transition-transform duration-300 ease-out shrink-0"
        fill="none"
      >
        <path
          d="M18 3L32 11V25L18 33L4 25V11L18 3Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
          className="fill-purple-50"
        />
        <path
          d="M4 11L18 19L32 11"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 19V33"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points="18,8 25,12 18,16 11,12"
          fill="currentColor"
          className="opacity-25"
        />
      </svg>
      <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
        Morfika
      </span>
    </a>
  );
}

export default function LandingPage() {
  const [selectedMaterial, setSelectedMaterial] = useState('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedColors, setSelectedColors] = useState(() => {
    const initial = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = p.defaultColor || 'Blanco';
    });
    return initial;
  });
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isFilamentGuideOpen, setIsFilamentGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (productName) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(`✅ ${productName} agregado`);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const getProductColor = (productId) => selectedColors[productId] || 'Blanco';

  const handleSelectColor = (productId, colorName) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorName,
    }));
  };

  const filteredAndSortedProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = PRODUCTS.filter((product) => {
      const matchesMaterial =
        selectedMaterial === 'TODOS' || product.materialType === selectedMaterial;

      if (!matchesMaterial) return false;
      if (!query) return true;

      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.materialLabel.toLowerCase().includes(query) ||
        product.materialType.toLowerCase().includes(query)
      );
    });

    if (sortBy === 'featured') return filtered;

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'es');
      return 0;
    });
  }, [selectedMaterial, searchQuery, sortBy]);

  const handleAddToCart = (product, explicitColor) => {
    const chosenColor = explicitColor || getProductColor(product.id);
    const cartKey = `${product.id}-${chosenColor}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartKey,
          selectedColor: chosenColor,
          quantity: 1,
        },
      ];
    });

    showToast(product.name);
  };

  const handleUpdateQuantity = (cartKey, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    const itemsDescription = cartItems
      .map(
        (item) =>
          `*${item.quantity}x ${item.name}* (Material: ${item.materialType}, Color: ${item.selectedColor})`
      )
      .join('\n\n');

    const message = `Hola, me gustaría solicitar el siguiente pedido:\n\n*Detalles de los artículos:*\n\n${itemsDescription}\n\nQuedo a la espera para ponernos de acuerdo con los detalles de la compra. ¡Gracias!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white rounded-full px-6 py-3 shadow-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-all max-w-[90vw] text-center"
        >
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
            {/* Integrated Isometric Cube SVG Logo */}
            <MorfikaLogo />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a
                href="#catalogo"
                className="hover:text-purple-600 transition-colors"
              >
                Catálogo
              </a>
              <button
                type="button"
                onClick={() => setIsFilamentGuideOpen(true)}
                className="hover:text-purple-600 transition-colors cursor-pointer font-medium"
              >
                Filamentos
              </button>
              <a
                href="#quienes-somos"
                className="hover:text-purple-600 transition-colors"
              >
                Acerca de Morfika
              </a>
              <a
                href="#como-funciona"
                className="hover:text-purple-600 transition-colors"
              >
                Cómo comprar
              </a>
            </nav>

            {/* Mobile Quick Action + Cart Trigger Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsFilamentGuideOpen(true)}
                className="md:hidden rounded-full bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-600 px-3 py-2 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
              >
                Filamentos
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label="Abrir carrito de compras"
                className="rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/80 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all active:scale-95 flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="hidden xs:inline sm:inline">Mi Pedido</span>
                <span className="rounded-full bg-purple-600 text-white px-2 py-0.5 text-xs font-bold">
                  {totalUnits}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* "COMPRA 100% SEGURA" TRUST BANNER */}
      <section
        aria-label="Garantía de compra segura"
        className="w-full bg-purple-50 border-b border-purple-100/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-6 text-xs sm:text-sm text-slate-700">
            {/* Point 1 */}
            <div className="flex items-center gap-2 font-semibold text-slate-800 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-purple-600 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Contacto directo y seguro</span>
            </div>

            <span className="hidden lg:inline text-purple-300">•</span>

            {/* Point 2 */}
            <div className="flex items-center gap-2 font-semibold text-slate-800 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-purple-600 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>Atención personalizada</span>
            </div>

            <span className="hidden lg:inline text-purple-300">•</span>

            {/* Point 3 */}
            <div className="flex items-center gap-2 text-center lg:text-left text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-purple-600 shrink-0 hidden sm:inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>
                <strong className="text-slate-900">Sin pagos por adelantado:</strong>{' '}
                Todo se coordina y confirma directamente por WhatsApp con nuestro equipo.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/60 via-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 text-purple-700 px-4 py-1.5 text-xs sm:text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              Diseño e Impresión 3D Personalizada en México
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
              Objetos únicos creados capa por capa para tu{' '}
              <span className="text-purple-600">espacio ideal.</span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
              En <strong className="text-slate-800">Morfika</strong> fabricamos macetas geométricas, soportes de
              escritorio, figuras decorativas y piezas funcionales con filamentos de alta
              calidad. Elige tu pieza, selecciona tu color favorito y solicita tu pedido en
              segundos.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#catalogo"
                className="rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold shadow-sm hover:shadow-lg hover:shadow-purple-200 transition-all text-center"
              >
                Explorar Catálogo
              </a>
              <button
                type="button"
                onClick={() => setIsFilamentGuideOpen(true)}
                className="rounded-full bg-white hover:bg-purple-50 active:scale-95 text-purple-700 border border-purple-200 px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold transition-all cursor-pointer text-center"
              >
                Guía de Materiales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG SECTION */}
      <main id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Colección Morfika
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Catálogo de Productos
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-semibold text-slate-900">{filteredAndSortedProducts.length}</span> de{' '}
            <span className="font-semibold text-slate-900">{PRODUCTS.length}</span> piezas disponibles
          </p>
        </div>

        {/* INTEGRATED SEARCH BAR + MATERIAL FILTERS + SORT */}
        <div id="materiales" className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Material Filter Pills */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por material">
              <span className="text-xs font-semibold text-slate-500 mr-1">
                Material:
              </span>
              {MATERIAL_FILTERS.map((material) => {
                const isActive = selectedMaterial === material;
                return (
                  <button
                    key={material}
                    type="button"
                    onClick={() => setSelectedMaterial(material)}
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    {material === 'TODOS' ? 'Todos' : material}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setIsFilamentGuideOpen(true)}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700 underline underline-offset-4 ml-1 sm:ml-2 cursor-pointer"
              >
                ¿Qué filamento elegir?
              </button>
            </div>

            {/* Integrated Search Input & Sort Select */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 lg:justify-end">
              {/* Integrated Search Input */}
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar modelos, piezas..."
                  aria-label="Buscar modelos, piezas..."
                  className="rounded-full border border-gray-200 px-4 py-2 w-full max-w-md text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="shrink-0">
                <label htmlFor="sort-select" className="sr-only">
                  Ordenar por
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Ordenar productos"
                  className="w-full sm:w-auto rounded-full bg-slate-50 border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID: 1 col mobile (grid-cols-1), 2 cols tablet (md:grid-cols-2), 4 cols PC (lg:grid-cols-4) */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
            <p className="text-lg font-bold text-slate-900 mb-2">
              No encontramos piezas con esos criterios
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Intenta con otro término de búsqueda o selecciona &quot;Todos&quot; los materiales.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedMaterial('TODOS');
              }}
              className="rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-6 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => {
              const currentColor = getProductColor(product.id);

              return (
                <article
                  key={product.id}
                  className="rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Product Image Container (overflow-hidden + hover:scale-105 on img) */}
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      aria-label={`Vista rápida de ${product.name}`}
                      className="relative aspect-square w-full bg-slate-100 overflow-hidden block cursor-pointer text-left focus:outline-none"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                      {/* Material Pill */}
                      <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-xs text-purple-600 px-3 py-1 text-xs font-bold shadow-xs">
                        {product.materialType}
                      </span>
                      {/* Quick View Hover Badge */}
                      <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 backdrop-blur-xs text-white px-3 py-1 text-xs font-medium opacity-90 group-hover:bg-purple-600 transition-colors">
                        Vista rápida
                      </span>
                    </button>

                    {/* Card Content with Enhanced Typography Contrast */}
                    <div className="p-5 pb-3">
                      <p className="text-xs font-semibold text-purple-600 mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        {product.materialLabel} • {product.dimensions}
                      </p>

                      {/* Color Selector Swatches */}
                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">Color:</span>
                          <span className="text-xs font-bold text-slate-900">
                            {currentColor}
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-2.5"
                          role="radiogroup"
                          aria-label={`Seleccionar color para ${product.name}`}
                        >
                          {PRODUCT_COLORS.map((colorObj) => {
                            const isSelected = currentColor === colorObj.name;
                            return (
                              <button
                                key={colorObj.name}
                                type="button"
                                onClick={() =>
                                  handleSelectColor(product.id, colorObj.name)
                                }
                                title={colorObj.name}
                                aria-label={`Color ${colorObj.name}`}
                                aria-pressed={isSelected}
                                style={{ backgroundColor: colorObj.hex }}
                                className={`w-6 h-6 rounded-full border ${
                                  colorObj.border
                                } transition-all duration-200 active:scale-95 cursor-pointer ${
                                  isSelected
                                    ? 'ring-2 ring-purple-600 ring-offset-2 scale-110'
                                    : 'hover:scale-110 opacity-85 hover:opacity-100'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Add to Cart */}
                  <div className="p-5 pt-3 mt-1">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xs text-slate-500">Precio</span>
                      <span className="text-lg font-extrabold text-slate-900">
                        {formatMXN(product.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product, currentColor)}
                      className="w-full rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white py-2.5 px-4 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Agregar al carrito</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* "QUIÉNES SOMOS" / ACERCA DE MORFIKA SECTION */}
      <section
        id="quienes-somos"
        className="bg-purple-50 border-t border-b border-purple-100/80 py-16 md:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white text-purple-600 border border-purple-200/80 px-4 py-1 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            Nuestra Esencia
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            Acerca de Morfika
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            &ldquo;Morfika nace de la idea de materializar la imaginación. Nuestro propósito es hacer accesible la manufactura 3D de alta calidad para todos, transformando polímeros en piezas funcionales, decorativas y herramientas precisas para tu día a día.&rdquo;
          </p>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="como-funciona" className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-purple-100 text-purple-600 font-bold text-sm mb-3">
                1
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Elige tu pieza y color
              </h3>
              <p className="text-sm text-slate-500">
                Selecciona entre nuestros modelos en PLA, PETG, ABS o TPU y personaliza el color directamente en cada tarjeta.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-purple-100 text-purple-600 font-bold text-sm mb-3">
                2
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Revisa tu pedido
              </h3>
              <p className="text-sm text-slate-500">
                Agrega todas las piezas que necesites al carrito y ajusta las cantidades según tu proyecto.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-purple-100 text-purple-600 font-bold text-sm mb-3">
                3
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Solicita por WhatsApp
              </h3>
              <p className="text-sm text-slate-500">
                Con un clic enviamos el resumen detallado de tu pedido a nuestro WhatsApp para coordinar el pago y la entrega.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILAMENT GUIDE MODAL ("Guía de Materiales") */}
      {isFilamentGuideOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsFilamentGuideOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="filament-guide-title"
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Morfika • Educación 3D
                </span>
                <h2
                  id="filament-guide-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Guía de Materiales
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFilamentGuideOpen(false)}
                aria-label="Cerrar guía de materiales"
                className="rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-sm text-slate-500">
                Conoce las propiedades de cada filamento que utilizamos en Morfika para elegir el ideal según el uso de tu pieza:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FILAMENT_GUIDE_ITEMS.map((mat) => (
                  <div
                    key={mat.code}
                    className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 flex flex-col justify-between hover:border-purple-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="rounded-full bg-purple-600 text-white px-3 py-0.5 text-xs font-bold">
                          {mat.code}
                        </span>
                        <span className="text-[11px] font-semibold text-purple-600">
                          {mat.badge}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                        {mat.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {mat.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMaterial(mat.code);
                        setIsFilamentGuideOpen(false);
                      }}
                      className="w-full rounded-full bg-white hover:bg-purple-50 active:scale-95 text-purple-600 border border-purple-200 py-2 px-3 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Filtrar piezas en {mat.code}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsFilamentGuideOpen(false)}
                className="rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-6 py-2.5 text-sm font-semibold shadow-sm transition-all cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setQuickViewProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-100 text-purple-700 px-3 py-0.5 text-xs font-bold">
                  {quickViewProduct.materialType}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {quickViewProduct.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Cerrar vista rápida"
                className="rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-out"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 backdrop-blur-xs px-4 py-1.5 text-sm font-extrabold text-slate-900 shadow-sm">
                  {formatMXN(quickViewProduct.price)}
                </div>
              </div>

              {/* Specs, Color Selector & Actions */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h2
                    id="quick-view-title"
                    className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
                  >
                    {quickViewProduct.name}
                  </h2>
                  <p className="text-sm text-slate-500 font-medium mb-5">
                    Filamento: <span className="text-purple-600 font-semibold">{quickViewProduct.materialLabel}</span>
                  </p>

                  {/* Color Selector inside Quick View */}
                  <div className="mb-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-semibold text-slate-500">
                        Selecciona el color de impresión:
                      </span>
                      <span className="text-xs font-bold text-purple-600">
                        {getProductColor(quickViewProduct.id)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {PRODUCT_COLORS.map((colorObj) => {
                        const isSelected =
                          getProductColor(quickViewProduct.id) === colorObj.name;
                        return (
                          <button
                            key={colorObj.name}
                            type="button"
                            onClick={() =>
                              handleSelectColor(
                                quickViewProduct.id,
                                colorObj.name
                              )
                            }
                            title={colorObj.name}
                            aria-label={`Elegir color ${colorObj.name}`}
                            aria-pressed={isSelected}
                            style={{ backgroundColor: colorObj.hex }}
                            className={`w-7 h-7 rounded-full border ${
                              colorObj.border
                            } transition-all duration-200 active:scale-95 cursor-pointer ${
                              isSelected
                                ? 'ring-2 ring-purple-600 ring-offset-2 scale-110'
                                : 'hover:scale-110 opacity-85 hover:opacity-100'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Technical Specs Table */}
                  <div className="rounded-2xl border border-slate-200 overflow-hidden mb-6">
                    <table className="w-full text-xs sm:text-sm">
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <th className="py-2.5 px-4 text-left font-medium text-slate-500 bg-slate-50/70">
                            Resolución de capa
                          </th>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                            {quickViewProduct.layerResolution}
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2.5 px-4 text-left font-medium text-slate-500 bg-slate-50/70">
                            Tiempo de impresión estimado
                          </th>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                            {quickViewProduct.printTime}
                          </td>
                        </tr>
                        <tr>
                          <th className="py-2.5 px-4 text-left font-medium text-slate-500 bg-slate-50/70">
                            Dimensiones
                          </th>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                            {quickViewProduct.dimensions}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(
                        quickViewProduct,
                        getProductColor(quickViewProduct.id)
                      );
                      setQuickViewProduct(null);
                    }}
                    className="w-full rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white py-3.5 px-6 text-sm font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    Agregar al carrito • {formatMXN(quickViewProduct.price)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(null)}
                    className="w-full rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 py-2.5 px-6 text-sm font-semibold transition-all cursor-pointer"
                  >
                    Seguir explorando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER: 100% width on mobile (w-full), fixed 400px on PC (md:w-[400px]) */}
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200 ${
          isCartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Panel */}
      <aside
        aria-label="Carrito de compras"
        className={`fixed top-0 right-0 z-50 h-full w-full md:w-[400px] bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between transform transition-transform duration-200 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Tu Pedido</h2>
            <p className="text-xs text-purple-600 font-medium">
              {totalUnits} {totalUnits === 1 ? 'artículo seleccionado' : 'artículos seleccionados'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
            className="rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
          >
            Cerrar ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-base font-bold text-slate-900 mb-1">
                Tu carrito está vacío
              </p>
              <p className="text-sm text-slate-500 max-w-xs">
                Explora el catálogo de Morfika, elige el color de tus piezas y agrégalas aquí para solicitar tu pedido.
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              const colorSwatch = PRODUCT_COLORS.find(
                (c) => c.name === item.selectedColor
              );

              return (
                <div
                  key={item.cartKey}
                  className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 flex gap-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.cartKey)}
                        aria-label={`Eliminar ${item.name}`}
                        className="text-xs text-slate-400 hover:text-red-500 font-medium cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>

                    {/* Material & Selected Color Badges */}
                    <div className="flex flex-wrap items-center gap-2 mt-1 mb-3">
                      <span className="rounded-full bg-purple-100 text-purple-700 px-2.5 py-0.5 text-[11px] font-semibold">
                        {item.materialType}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                        <span
                          style={{
                            backgroundColor: colorSwatch?.hex || '#FFFFFF',
                          }}
                          className="w-2.5 h-2.5 rounded-full border border-slate-300"
                        />
                        Color: {item.selectedColor}
                      </span>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full bg-white border border-slate-200 p-0.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.cartKey, -1)}
                          aria-label={`Disminuir cantidad de ${item.name}`}
                          className="w-6 h-6 rounded-full text-slate-600 hover:bg-purple-50 hover:text-purple-600 active:scale-95 font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.cartKey, 1)}
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          className="w-6 h-6 rounded-full text-slate-600 hover:bg-purple-50 hover:text-purple-600 active:scale-95 font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-medium text-slate-500">
                        {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer (No price total calculation) */}
        <div className="p-6 border-t border-slate-200 bg-slate-50/70 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-500">Artículos a solicitar</span>
            <span className="font-bold text-purple-600">{totalUnits}</span>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppOrder}
            disabled={cartItems.length === 0}
            className="w-full rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white py-3.5 px-6 text-sm font-bold tracking-wide uppercase shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            SOLICITAR PEDIDO
          </button>
        </div>
      </aside>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200/80 py-10 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <MorfikaLogo />
            <span className="text-slate-300">•</span>
            <span>Diseño e Impresión 3D en Filamento</span>
          </div>
          <span className="text-xs text-slate-400">
            PLA • PETG • ABS • TPU — Precios en MXN
          </span>
        </div>
      </footer>
    </div>
  );
}
