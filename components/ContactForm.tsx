"use client";

import { useId, useState, type FormEvent } from "react";
import { btnPrimary, Field, inputCls } from "./calculators/ui";

/**
 * Prepares an email in the visitor's own email app (mailto:). It does NOT send
 * anything by itself, and never shows a "message sent" confirmation.
 */
export function ContactForm({ email }: { email: string }) {
  const uid = useId();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (message.trim().length < 5) {
      setError("Escreva a sua mensagem antes de continuar.");
      return;
    }
    setError("");
    const href = `mailto:${email}?subject=${encodeURIComponent(subject || "Contato pelo site")}&body=${encodeURIComponent(message)}`;
    window.location.href = href;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="not-prose mt-4 space-y-4 rounded-2xl border border-sand-200 bg-paper p-5">
      <Field id={`${uid}-subject`} label="Assunto" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={120} />
      <div>
        <label htmlFor={`${uid}-msg`} className="mb-1.5 block text-sm font-medium text-charcoal-soft">
          Mensagem
        </label>
        <textarea
          id={`${uid}-msg`}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${uid}-err` : `${uid}-hint`}
          className={`${inputCls} py-3`}
        />
        {error ? (
          <p id={`${uid}-err`} className="mt-1 text-sm text-danger">{error}</p>
        ) : (
          <p id={`${uid}-hint`} className="mt-1 text-xs text-stone-muted">
            Não inclua dados sensíveis. Ao continuar, o seu aplicativo de e-mail será aberto com a mensagem preenchida.
          </p>
        )}
      </div>
      <button type="submit" className={btnPrimary}>Abrir no meu e-mail</button>
      <p aria-live="polite" className="text-sm text-charcoal-soft">
        {opened &&
          "Se o seu aplicativo de e-mail abriu, revise a mensagem e clique em enviar por lá. Este site não envia mensagens por conta própria. Se nada aconteceu, escreva diretamente para o endereço acima."}
      </p>
    </form>
  );
}
