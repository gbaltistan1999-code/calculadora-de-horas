import { Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { StaticPage } from "@/components/StaticPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Contato | Calculadora de Horas",
  description: "Fale com o Calculadora de Horas para relatar erros, sugerir melhorias ou tirar dúvidas sobre o site.",
  path: "/contato",
});

export default function Page() {
  const email = siteConfig.contactEmail;
  return (
    <StaticPage
      title="Contato"
      crumb="Contato"
      path="/contato"
      lead="Relate um erro de cálculo, sugira uma melhoria ou tire uma dúvida sobre o site."
    >
      {email ? (
        <>
          <p>Escreva para:</p>
          <p className="not-prose">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-sand-200 bg-paper px-4 py-3 font-semibold text-accent hover:border-accent"
            >
              <Mail aria-hidden className="h-5 w-5" />
              {email}
            </a>
          </p>
          <h2>Preparar a mensagem por aqui</h2>
          <p>
            Se preferir, escreva abaixo. O formulário apenas abre o seu aplicativo de e-mail com o texto preenchido —{" "}
            <strong>ele não envia a mensagem diretamente</strong>. O envio acontece no seu próprio e-mail.
          </p>
          <ContactForm email={email} />
        </>
      ) : (
        <div role="note" className="rounded-xl border border-sand-300 bg-sand-100 p-5">
          <p className="mb-0">
            <strong>O endereço de e-mail de contato ainda não foi configurado.</strong> Ele será publicado nesta página
            em breve.
          </p>
        </div>
      )}

      <h2>Antes de escrever</h2>
      <ul>
        <li>Para relatar um erro, informe a página, os valores digitados e o resultado esperado.</li>
        <li>
          Não enviamos respostas sobre casos trabalhistas individuais: as calculadoras são informativas e não substituem
          um advogado, contador ou o RH da empresa.
        </li>
        <li>Não envie dados sensíveis, como documentos ou informações de saúde.</li>
      </ul>
    </StaticPage>
  );
}
