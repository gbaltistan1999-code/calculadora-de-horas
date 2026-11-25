"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OPEN_SETTINGS_EVENT, readConsent, saveConsent } from "@/lib/consent";

/**
 * LGPD-aware consent banner + settings dialog.
 * The site currently uses ONLY necessary storage (this consent record).
 * Optional categories exist so a future analytics/marketing tool can be gated;
 * nothing optional is loaded today, whatever the choice.
 */
export function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const existing = readConsent();
    // Reading localStorage must happen after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!existing) setBannerOpen(true);
    function open() {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setSavedMsg("");
      setSettingsOpen(true);
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (settingsOpen && !d.open) d.showModal();
    if (!settingsOpen && d.open) d.close();
  }, [settingsOpen]);

  function choose(choice: { analytics: boolean; marketing: boolean }) {
    saveConsent(choice);
    setBannerOpen(false);
  }

  function saveSettings() {
    choose({ analytics, marketing });
    setSavedMsg("Preferências salvas.");
    setSettingsOpen(false);
  }

  const btnPrimary =
    "inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-dark";
  const btnSecondary =
    "inline-flex min-h-11 items-center justify-center rounded-lg border border-sand-300 bg-paper px-4 text-sm font-semibold text-charcoal hover:bg-sand-100";

  return (
    <>
      {bannerOpen && !settingsOpen && (
        <section
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-sand-200 bg-paper shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center">
            <p className="text-sm leading-relaxed text-charcoal-soft md:flex-1">
              Usamos apenas o armazenamento do navegador necessário para lembrar a sua escolha sobre cookies. Não
              usamos cookies de análise nem de publicidade. Saiba mais na{" "}
              <Link href="/politica-de-privacidade" className="font-medium text-accent underline underline-offset-2">
                Política de Privacidade
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={btnSecondary} onClick={() => setSettingsOpen(true)}>
                Configurações
              </button>
              <button type="button" className={btnSecondary} onClick={() => choose({ analytics: false, marketing: false })}>
                Rejeitar opcionais
              </button>
              <button type="button" className={btnPrimary} onClick={() => choose({ analytics: true, marketing: true })}>
                Aceitar todos
              </button>
            </div>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-settings-title"
        onClose={() => setSettingsOpen(false)}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-sand-200 bg-paper p-0 text-charcoal shadow-xl backdrop:bg-charcoal/40"
      >
        <div className="p-6">
          <h2 id="cookie-settings-title" className="text-lg font-bold">
            Configurações de cookies
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
            Escolha quais categorias você permite. Você pode mudar ou retirar o consentimento a qualquer momento pelo
            link “Configurações de cookies” no rodapé.
          </p>

          <ul className="mt-5 space-y-3">
            <li className="rounded-xl border border-sand-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Necessários</span>
                <span className="text-xs font-semibold text-accent">Sempre ativos</span>
              </div>
              <p className="mt-1 text-sm text-stone-muted">
                Guardam apenas a sua escolha de consentimento (localStorage, chave “cdh-consent”). Sem eles, este aviso
                apareceria em todas as páginas.
              </p>
            </li>
            <li className="rounded-xl border border-sand-200 p-4">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="font-semibold">Análise</span>
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[var(--color-accent)]"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
              </label>
              <p className="mt-1 text-sm text-stone-muted">
                Medição de audiência. <strong>No momento, este site não usa nenhuma ferramenta de análise</strong>; se
                isso mudar, ela só será carregada com a sua permissão.
              </p>
            </li>
            <li className="rounded-xl border border-sand-200 p-4">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="font-semibold">Marketing</span>
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[var(--color-accent)]"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
              </label>
              <p className="mt-1 text-sm text-stone-muted">
                Publicidade e personalização. <strong>No momento, este site não usa cookies de marketing.</strong>
              </p>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button type="button" className={btnSecondary} onClick={() => setSettingsOpen(false)}>
              Cancelar
            </button>
            <button
              type="button"
              className={btnSecondary}
              onClick={() => {
                setAnalytics(false);
                setMarketing(false);
                choose({ analytics: false, marketing: false });
                setSettingsOpen(false);
              }}
            >
              Rejeitar opcionais
            </button>
            <button type="button" className={btnPrimary} onClick={saveSettings}>
              Salvar preferências
            </button>
          </div>
        </div>
      </dialog>
      <p className="sr-only" aria-live="polite">
        {savedMsg}
      </p>
    </>
  );
}
