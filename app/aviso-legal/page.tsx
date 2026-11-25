import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Aviso Legal | Calculadora de Horas",
  description:
    "As calculadoras do site fornecem estimativas informativas e não substituem advogado, contador, RH ou a folha de pagamento oficial.",
  path: "/aviso-legal",
});

export default function Page() {
  return (
    <StaticPage title="Aviso Legal" crumb="Aviso Legal" path="/aviso-legal" updated={siteConfig.lastUpdated}>
      <h2>Natureza das informações</h2>
      <p>
        As calculadoras e os conteúdos do {siteConfig.name} têm finalidade <strong>exclusivamente informativa e
        educativa</strong>. Os resultados são estimativas baseadas nos dados que você digita e nas regras configuradas em
        cada calculadora.
      </p>

      <h2>Não é orientação profissional</h2>
      <p>
        As informações do site <strong>não constituem orientação jurídica, contábil ou trabalhista</strong> e não
        substituem a consulta a um advogado, contador, ao departamento de recursos humanos da empresa, ao sindicato da
        categoria ou ao sistema oficial de folha de pagamento.
      </p>

      <h2>Cálculos trabalhistas</h2>
      <p>
        Resultados de horas extras, adicional noturno, banco de horas e jornada dependem de fatores que a calculadora não
        conhece, como:
      </p>
      <ul>
        <li>o contrato de trabalho individual;</li>
        <li>convenções e acordos coletivos da categoria;</li>
        <li>regras de categorias específicas (por exemplo, trabalhadores rurais, domésticos e profissões regulamentadas);</li>
        <li>regimes especiais de jornada, como escalas 12x36 e turnos de revezamento;</li>
        <li>reflexos em outras verbas (DSR, férias, 13º salário, FGTS) e descontos legais;</li>
        <li>entendimentos dos tribunais e mudanças na legislação, como a redução gradual da jornada pela Emenda Constitucional nº 141/2026.</li>
      </ul>
      <p>
        Os padrões das calculadoras foram conferidos com o texto oficial da legislação em planalto.gov.br na data indicada
        em cada página, mas a lei pode mudar. Sempre confirme os valores antes de tomar decisões.
      </p>

      <h2>Precisão</h2>
      <p>
        Embora os cálculos sejam testados, erros podem ocorrer. Se encontrar algum, informe pela página de{" "}
        <Link href="/contato">Contato</Link>.
      </p>

      <h2>Links externos</h2>
      <p>
        Links para sites de terceiros, como fontes oficiais, são fornecidos por conveniência. Não temos controle sobre o
        conteúdo desses sites.
      </p>
      <p>
        Veja também os <Link href="/termos-de-uso">Termos de Uso</Link>.
      </p>
    </StaticPage>
  );
}
