import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Sobre o Calculadora de Horas",
  description:
    "Conheça o Calculadora de Horas: o que o site faz, como os cálculos são feitos, quais são as limitações e como entrar em contato.",
  path: "/sobre",
});

export default function Page() {
  return (
    <StaticPage
      title="Sobre nós"
      crumb="Sobre nós"
      path="/sobre"
      lead="Um site simples, com calculadoras de tempo gratuitas que funcionam direto no navegador."
    >
      <h2>O que é o {siteConfig.name}</h2>
      <p>
        O {siteConfig.name} reúne ferramentas para somar e subtrair horas e minutos, calcular horas trabalhadas, horas
        extras, banco de horas, adicional noturno, converter hora decimal e medir a diferença entre horários. Cada
        calculadora vem acompanhada de explicações e exemplos resolvidos para que você entenda o resultado, e não apenas o
        copie.
      </p>

      <h2>Por que o site existe</h2>
      <p>
        Somar horas parece simples, mas a calculadora comum trabalha em base 10, enquanto o tempo é contado em base 60.
        Esse descompasso causa erros frequentes no fechamento de cartão de ponto, na cobrança de serviços por hora e no
        cálculo de horas extras. O objetivo deste site é oferecer uma forma rápida e confiável de fazer essas contas.
      </p>

      <h2>Como os cálculos são feitos</h2>
      <ul>
        <li>
          Todas as durações são convertidas em <strong>minutos inteiros</strong> antes de qualquer operação, o que evita
          erros de arredondamento com números decimais.
        </li>
        <li>Valores em reais são arredondados ao centavo apenas no final.</li>
        <li>
          A lógica de cálculo é separada da interface e verificada por testes automatizados com exemplos conferidos à
          mão (como 7h20 + 1h50 = 9h10 e 22:00 às 06:00 = 8h00).
        </li>
        <li>
          Nas calculadoras trabalhistas, os padrões (percentuais, períodos noturnos, hora reduzida) seguem o texto oficial
          da legislação publicado em planalto.gov.br, e cada página indica as fontes consultadas. Todos esses valores são
          editáveis, porque convenções coletivas e categorias específicas podem ter regras próprias.
        </li>
      </ul>

      <h2>Privacidade</h2>
      <p>
        Os cálculos acontecem no seu navegador. Os valores digitados não são enviados a nenhum servidor nem salvos no seu
        dispositivo. Não há cadastro, login, ferramentas de análise ou publicidade. Detalhes na{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>

      <h2>Limitações</h2>
      <p>
        Os resultados são estimativas para fins informativos. Eles não substituem a orientação de um advogado, contador,
        departamento de RH ou o sistema oficial de folha de pagamento. Leia o <Link href="/aviso-legal">Aviso Legal</Link>{" "}
        para mais detalhes.
      </p>

      <h2>Correções e sugestões</h2>
      <p>
        Encontrou um erro de cálculo, uma informação desatualizada ou tem uma sugestão? Escreva pela página de{" "}
        <Link href="/contato">Contato</Link>. Mensagens sobre correções são tratadas com prioridade.
      </p>
    </StaticPage>
  );
}
