import Link from "next/link";
import { Faq } from "@/components/Faq";
import { StaticPage } from "@/components/StaticPage";
import { buildMetadata } from "@/lib/seo";
import { calculatorLinks } from "@/lib/site-config";
import type { FaqItem } from "@/types";

export const metadata = buildMetadata({
  title: "Perguntas Frequentes sobre as Calculadoras de Horas",
  description:
    "Dúvidas gerais sobre o site: qual calculadora usar, formatos aceitos, precisão, uso no celular, privacidade e limitações dos cálculos trabalhistas.",
  path: "/perguntas-frequentes",
});

// General questions about the site. Topic-specific FAQs live on each calculator page
// (not repeated here, to avoid duplicate content).
const faqs: FaqItem[] = [
  {
    question: "Qual calculadora devo usar?",
    answer:
      "Para somar ou subtrair durações livremente, use a calculadora de horas da página inicial. Se você tem horários de entrada e saída, use a de horas trabalhadas. Para valores em reais, use horas extras ou adicional noturno. Para saldo de jornada, banco de horas. Para transformar 7h30 em 7,5, o conversor de hora decimal. Para o tempo entre dois horários, a diferença entre horários.",
  },
  {
    question: "Em quais formatos posso digitar horários?",
    answer:
      "Nos campos de horário, aceitamos o formato de 24 horas com ou sem dois-pontos: 08:30, 8:30, 8h30 ou 0830. Nos campos de duração, também valem 45min e totais acima de 24 horas, como 30:15.",
  },
  {
    question: "Os resultados são arredondados?",
    answer:
      "As contas de tempo são feitas em minutos inteiros, sem arredondamento. A hora decimal é exibida com 2 casas (e 4 casas onde isso ajuda a conferir valores), e os valores em reais são arredondados ao centavo apenas no final.",
  },
  {
    question: "Funciona no celular e sem internet?",
    answer:
      "Sim, o site foi feito para telas pequenas e abre o teclado numérico nos campos de números. Depois que a página carrega, as calculadoras funcionam mesmo se a conexão cair, porque todo o cálculo acontece no navegador.",
  },
  {
    question: "Preciso criar conta ou pagar?",
    answer: "Não. Todas as calculadoras são gratuitas e não exigem cadastro.",
  },
  {
    question: "O site guarda o histórico dos meus cálculos?",
    answer:
      "Não. Os valores digitados não são salvos nem enviados. Se quiser guardar um resultado, use o botão Copiar resultado e cole onde preferir.",
  },
  {
    question: "Posso usar os resultados para cobrar ou contestar a empresa?",
    answer:
      "Os resultados servem como estimativa e ponto de partida para conversar com o RH, o sindicato ou um profissional. Eles não substituem o cálculo oficial da folha de pagamento nem orientação jurídica, porque não conhecem o seu contrato nem a convenção coletiva da sua categoria.",
  },
  {
    question: "Encontrei um erro. Como aviso?",
    answer:
      "Escreva pela página de Contato informando a calculadora, os valores digitados e o resultado que você esperava.",
  },
];

export default function Page() {
  return (
    <StaticPage
      title="Perguntas frequentes"
      crumb="Perguntas frequentes"
      path="/perguntas-frequentes"
      lead="Dúvidas gerais sobre o uso do site. Perguntas sobre cada tema estão na página da respectiva calculadora."
    >
      <div className="not-prose -mt-12">
        <Faq items={faqs} title="Uso do site" id="uso-do-site" />
      </div>
      <h2>Perguntas sobre cada calculadora</h2>
      <ul>
        <li>
          <Link href="/#perguntas-frequentes">Somar e subtrair horas</Link>
        </li>
        {calculatorLinks.map((l) => (
          <li key={l.href}>
            <Link href={`${l.href}#perguntas-frequentes`}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </StaticPage>
  );
}
