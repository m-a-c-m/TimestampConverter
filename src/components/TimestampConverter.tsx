"use client";

import { useState, useEffect } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface Props {
  locale?: string;
}

export default function TimestampConverter({ locale = "es" }: Props) {
  const isEs = locale === "es";
  const [currentTs, setCurrentTs] = useState(0);
  const [unixInput, setUnixInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("00:00");
  const [copied, setCopied] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const now = new Date();
    setCurrentTs(Math.floor(Date.now() / 1000));
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const h = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    setDateInput(`${y}-${m}-${d}`);
    setTimeInput(`${h}:${min}`);
    const interval = setInterval(() => setCurrentTs(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  // Unix → Date
  const parsedDate: Date | null = (() => {
    if (!unixInput.trim()) return null;
    const n = Number(unixInput.trim());
    if (isNaN(n)) return null;
    return new Date(n > 1e12 ? n : n * 1000);
  })();

  // Date → Unix
  const computedUnix = (() => {
    if (!dateInput || !timeInput) return null;
    const dt = new Date(`${dateInput}T${timeInput}:00`);
    if (isNaN(dt.getTime())) return null;
    return Math.floor(dt.getTime() / 1000);
  })();

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function relativeTime(date: Date): string {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    const abs = Math.abs(diff);
    const future = diff < 0;
    if (abs < 60) return isEs ? "hace unos segundos" : "just now";
    if (abs < 3600) {
      const m = Math.round(abs / 60);
      return future ? (isEs ? `en ${m} min` : `in ${m} min`) : (isEs ? `hace ${m} min` : `${m} min ago`);
    }
    if (abs < 86400) {
      const h = Math.round(abs / 3600);
      return future ? (isEs ? `en ${h} h` : `in ${h} h`) : (isEs ? `hace ${h} h` : `${h} h ago`);
    }
    const d = Math.round(abs / 86400);
    return future ? (isEs ? `en ${d} días` : `in ${d} days`) : (isEs ? `hace ${d} días` : `${d} days ago`);
  }

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => copy(text, id)}
      className="ml-2 flex-shrink-0 rounded-lg border border-border/20 bg-surface/60 px-2.5 py-1 text-xs text-text-muted transition-colors hover:text-text"
    >
      {copied === id ? <FiCheck className="inline text-green-400" /> : <FiCopy className="inline" />}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Live clock */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/60">
              {isEs ? "Timestamp Unix actual" : "Current Unix timestamp"}
            </p>
            <p className="font-mono text-4xl font-bold tabular-nums text-white">
              {hydrated ? currentTs.toLocaleString() : "—"}
            </p>
            <p className="mt-1 text-xs text-text-muted/60">
              {hydrated ? new Date(currentTs * 1000).toUTCString() : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => copy(String(currentTs), "live-s")}
              className="flex items-center gap-1.5 rounded-xl border border-border/30 bg-surface/60 px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-text"
            >
              {copied === "live-s" ? <FiCheck className="text-green-400" /> : <FiCopy />}
              {isEs ? "Copiar segundos" : "Copy seconds"}
            </button>
            <button
              onClick={() => copy(String(currentTs * 1000), "live-ms")}
              className="flex items-center gap-1.5 rounded-xl border border-border/30 bg-surface/60 px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-text"
            >
              {copied === "live-ms" ? <FiCheck className="text-green-400" /> : <FiCopy />}
              {isEs ? "Copiar ms" : "Copy ms"}
            </button>
            <button
              onClick={() => setUnixInput(String(currentTs))}
              className="rounded-xl border border-border/30 bg-surface/60 px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-text"
            >
              {isEs ? "Usar en conversor ↓" : "Use in converter ↓"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Unix → Date */}
        <div className="space-y-4 rounded-xl border border-border/20 bg-surface/40 p-5">
          <h3 className="font-semibold text-white">
            {isEs ? "Unix → Fecha legible" : "Unix → Human date"}
          </h3>
          <input
            type="number"
            value={unixInput}
            onChange={e => setUnixInput(e.target.value)}
            placeholder={hydrated ? String(currentTs) : "1700000000"}
            className="w-full rounded-xl border border-border/30 bg-surface/60 px-4 py-2.5 font-mono text-sm text-text placeholder:text-text-muted/40 outline-none transition-colors focus:border-primary/50"
          />
          {parsedDate && !isNaN(parsedDate.getTime()) ? (
            <div className="space-y-2 text-sm">
              {[
                { label: "ISO 8601", val: parsedDate.toISOString(), id: "iso" },
                { label: "UTC", val: parsedDate.toUTCString(), id: "utc" },
                {
                  label: isEs ? "Local" : "Local",
                  val: parsedDate.toLocaleString(isEs ? "es-ES" : "en-US", { dateStyle: "long", timeStyle: "medium" }),
                  id: "local",
                },
                { label: isEs ? "Relativo" : "Relative", val: relativeTime(parsedDate), id: "rel" },
                {
                  label: isEs ? "Milisegundos" : "Milliseconds",
                  val: String(parsedDate.getTime()),
                  id: "ms",
                },
              ].map(({ label, val, id }) => (
                <div key={id} className="flex items-start justify-between gap-2 rounded-lg bg-surface/60 px-3 py-2">
                  <div className="min-w-0">
                    <span className="text-xs text-text-muted/60">{label}</span>
                    <p className="break-all font-mono text-sm text-text">{val}</p>
                  </div>
                  <CopyBtn text={val} id={id} />
                </div>
              ))}
            </div>
          ) : unixInput ? (
            <p className="text-sm text-red-400">{isEs ? "Timestamp inválido" : "Invalid timestamp"}</p>
          ) : (
            <p className="text-sm text-text-muted/40">
              {isEs ? "Introduce un timestamp Unix para convertirlo…" : "Enter a Unix timestamp to convert it…"}
            </p>
          )}
        </div>

        {/* Date → Unix */}
        <div className="space-y-4 rounded-xl border border-border/20 bg-surface/40 p-5">
          <h3 className="font-semibold text-white">
            {isEs ? "Fecha → Unix" : "Date → Unix"}
          </h3>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateInput}
              onChange={e => setDateInput(e.target.value)}
              className="flex-1 rounded-xl border border-border/30 bg-surface/60 px-3 py-2.5 text-sm text-text outline-none transition-colors focus:border-primary/50"
            />
            <input
              type="time"
              value={timeInput}
              onChange={e => setTimeInput(e.target.value)}
              className="w-28 rounded-xl border border-border/30 bg-surface/60 px-3 py-2.5 text-sm text-text outline-none transition-colors focus:border-primary/50"
            />
          </div>
          {computedUnix !== null ? (
            <div className="space-y-2 text-sm">
              {[
                { label: isEs ? "Unix (segundos)" : "Unix (seconds)", val: String(computedUnix), id: "ds" },
                { label: isEs ? "Unix (milisegundos)" : "Unix (milliseconds)", val: String(computedUnix * 1000), id: "dms" },
                { label: "ISO 8601", val: new Date(computedUnix * 1000).toISOString(), id: "diso" },
              ].map(({ label, val, id }) => (
                <div key={id} className="flex items-center justify-between rounded-lg bg-surface/60 px-3 py-2">
                  <div>
                    <span className="text-xs text-text-muted/60">{label}</span>
                    <p className="font-mono text-base font-semibold text-white">{val}</p>
                  </div>
                  <CopyBtn text={val} id={id} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-400">{isEs ? "Fecha inválida" : "Invalid date"}</p>
          )}
        </div>
      </div>

      {/* Quick reference */}
      <div className="rounded-xl border border-border/15 bg-surface/30 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted/60">
          {isEs ? "Referencias rápidas" : "Quick references"}
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: isEs ? "Año 2000" : "Year 2000", ts: 946684800 },
            { label: isEs ? "Año 2024" : "Year 2024", ts: 1704067200 },
            { label: isEs ? "Año 2025" : "Year 2025", ts: 1735689600 },
            { label: "Unix max (32-bit)", ts: 2147483647 },
          ].map(({ label, ts }) => (
            <button
              key={ts}
              onClick={() => setUnixInput(String(ts))}
              className="rounded-lg border border-border/20 bg-surface/60 px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-primary/30 hover:text-text"
            >
              {label} <span className="font-mono text-primary/70">{ts}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
