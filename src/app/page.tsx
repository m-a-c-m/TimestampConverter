import type { Metadata } from "next";
import TimestampConverter from "../components/TimestampConverter";
import { MdSchedule } from "react-icons/md";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/timestamp-converter";
const EMBED_URL = process.env.NEXT_PUBLIC_EMBED_URL || "https://miguelacm.es/embed/timestamp-converter";

export const metadata: Metadata = {
  title: "Conversor de Timestamp Unix Online Gratis — Epoch Calculator",
  description:
    "Convierte timestamps Unix a fechas legibles en múltiples formatos. Timestamp actual en tiempo real. ISO 8601, UTC, fecha local y tiempo relativo. Sin registro.",
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Conversor de Timestamp Unix Online Gratis",
  url: SITE_URL,
  description:
    "Convierte timestamps Unix a fechas legibles y viceversa. Timestamp actual en tiempo real. Sin registro, 100% en el navegador.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  inLanguage: "es-ES",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: {
    "@type": "Person",
    name: "Miguel Ángel Colorado Marin",
    url: "https://miguelacm.es",
  },
  featureList: [
    "Timestamp Unix en tiempo real",
    "Unix a fecha ISO 8601",
    "Unix a fecha UTC",
    "Unix a fecha local",
    "Tiempo relativo",
    "Fecha a Unix segundos",
    "Fecha a Unix milisegundos",
    "Auto-detección segundos/ms",
    "Sin registro",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <MdSchedule className="text-base" />
              Herramienta gratuita · Código abierto
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
              Conversor de Timestamp Unix Online Gratis — Epoch Calculator
            </h1>
            <p className="mb-2 text-lg text-text-muted">
              Convierte timestamps Unix a fechas en múltiples formatos. Timestamp actual en vivo.
            </p>
            <p className="text-sm text-text-muted/60">
              Hecho por{" "}
              <a
                href="https://miguelacm.es"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-medium hover:opacity-80 transition-opacity"
              >
                MACM
              </a>{" "}
              · Sin registro · Sin anuncios · 100% en el navegador
            </p>
          </div>

          {/* Tool */}
          <div className="glass rounded-2xl border border-border/20 p-6 md:p-8">
            <TimestampConverter locale="es" />
          </div>

          {/* Feature cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: "⏱️",
                title: "Timestamp en vivo",
                desc: "El timestamp Unix actual se actualiza cada segundo en tiempo real. Cópialo en segundos o milisegundos con un clic.",
              },
              {
                icon: "📅",
                title: "Múltiples formatos",
                desc: "Convierte a ISO 8601, UTC, fecha local, tiempo relativo y milisegundos. Auto-detecta si el timestamp está en segundos o ms.",
              },
              {
                icon: "🔄",
                title: "Bidireccional",
                desc: "Convierte Unix → Fecha y Fecha → Unix. Selecciona fecha y hora con pickers nativos para obtener el timestamp al instante.",
              },
            ].map((item) => (
              <div key={item.icon} className="glass rounded-xl border border-border/15 p-5">
                <span className="mb-3 block text-2xl">{item.icon}</span>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* How to use */}
          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Cómo usar el conversor de timestamp</h2>
            <ol className="space-y-3">
              {[
                { n: 1, text: "La sección superior muestra el timestamp Unix actual actualizándose cada segundo. Pulsa 'Copiar segundos' o 'Copiar ms' para copiarlo, o 'Usar en conversor' para enviarlo al panel de conversión." },
                { n: 2, text: "Para convertir Unix a fecha: introduce cualquier timestamp en el panel izquierdo. La herramienta detecta automáticamente si está en segundos (10 dígitos) o milisegundos (13 dígitos)." },
                { n: 3, text: "Para convertir fecha a Unix: usa el selector de fecha y hora en el panel derecho. El timestamp en segundos y milisegundos se calcula al instante." },
                { n: 4, text: "Las referencias rápidas al pie permiten cargar timestamps conocidos (año 2000, 2024, 2025, Unix máximo de 32 bits) para comparaciones rápidas." },
              ].map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {step.n}
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-white">Preguntas frecuentes</h2>
            {[
              {
                q: "¿Qué es el timestamp Unix?",
                a: "El timestamp Unix (también llamado Unix time o epoch time) es el número de segundos transcurridos desde las 00:00:00 UTC del 1 de enero de 1970. Es el sistema de tiempo más usado en informática porque es un número entero simple e independiente de zonas horarias.",
              },
              {
                q: "¿Cuál es la diferencia entre segundos y milisegundos?",
                a: "Los timestamps de Unix clásico, bases de datos y APIs REST suelen estar en segundos (10 dígitos en 2024: 1700000000). JavaScript y muchas APIs modernas usan milisegundos (13 dígitos: 1700000000000). La herramienta detecta automáticamente el formato.",
              },
              {
                q: "¿Qué es el bug del año 2038?",
                a: "Los sistemas que almacenan timestamps en un entero de 32 bits con signo tienen un máximo de 2.147.483.647 (19 de enero de 2038). Superado ese momento, el contador desbordará. Los sistemas modernos usan enteros de 64 bits que no tendrán este problema hasta el año 292 billones.",
              },
              {
                q: "¿Por qué la fecha sale en zona horaria incorrecta?",
                a: "El timestamp Unix es siempre UTC. Al convertirlo a fecha local, el navegador aplica la zona horaria del sistema operativo. Para una zona específica diferente a la tuya, usa el formato ISO 8601 o UTC que siempre muestran la hora en UTC.",
              },
              {
                q: "¿Se envían mis datos a algún servidor?",
                a: "No. Toda la conversión de timestamps se realiza usando el objeto Date nativo de JavaScript en tu navegador. Ningún timestamp ni fecha se envía a ningún servidor externo.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-border/20 bg-white/3 p-5">
                <h3 className="mb-2 font-medium text-white">{item.q}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          {/* Embed */}
          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-2 font-semibold text-white">Integra el conversor en tu web</h2>
            <p className="mb-4 text-sm text-text-muted">
              Puedes embeber este conversor de timestamps en cualquier web con un simple iframe.
            </p>
            <div className="mb-3 rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">Iframe (integración directa):</p>
              <code className="break-all text-xs text-green-400">
                {`<iframe src="${EMBED_URL}" width="100%" height="700" style="border:none;border-radius:12px;" title="Unix Timestamp Converter — miguelacm.es" loading="lazy"></iframe>`}
              </code>
            </div>
            <div className="rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">Enlace con atribución:</p>
              <code className="break-all text-xs text-green-400">
                {`<a href="${SITE_URL}" target="_blank" rel="noopener">Conversor de timestamp Unix gratis por MACM</a>`}
              </code>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
