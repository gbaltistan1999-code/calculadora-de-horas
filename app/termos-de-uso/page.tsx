import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Termos de Uso | Calculadora de Horas",
  description: "Condições de uso do Calculadora de Horas: uso permitido, propriedade intelectual, limitações dos cálculos e responsabilidades.",
  path: "/termos-de-uso",
});

// LEGAL REVIEW: jurisdiction-specific clauses (limitation of liability, applicable
// law, consumer-protection interplay) should be reviewed by a qualified professional.
export default function Page() {
  return (
    <StaticPage title="Termos de Uso" crumb="Termos de Uso" path="/termos-de-uso" updated={siteConfig.lastUpdated}>
      <p>
        Ao usar o {siteConfig.name} ({siteConfig.url}), você concorda com estes termos. Se não concordar, não utilize o
        site.
      </p>

      <h2>1. O serviço</h2>
      <p>
        O site oferece, gratuitamente e sem cadastro, calculadoras de tempo e conteúdos explicativos. As calculadoras
        funcionam no navegador do usuário.
      </p>

      <h2>2. Uso permitido</h2>
      <ul>
        <li>Você pode usar as calculadoras para fins pessoais e profissionais.</li>
        <li>
          Não é permitido tentar interferir no funcionamento do site, sobrecarregá-lo de forma automatizada ou usá-lo para
          atividades ilegais.
        </li>
        <li>Você pode criar links para qualquer página do site.</li>
      </ul>

      <h2>3. Propriedade intelectual</h2>
      <p>
        Os textos, a organização do conteúdo, o design e o código do site são protegidos pela legislação de direitos
        autorais. É permitido citar trechos curtos com indicação da fonte e link. A reprodução integral de páginas
        depende de autorização. Os textos legais citados pertencem ao domínio público e estão disponíveis nas fontes
        oficiais indicadas.
      </p>

      <h2>4. Precisão dos cálculos</h2>
      <p>
        Fazemos o possível para que os cálculos estejam corretos e as explicações, atualizadas. Ainda assim, os resultados
        dependem dos dados informados e das regras configuradas, e podem não refletir situações específicas, como
        convenções coletivas, contratos individuais ou mudanças recentes na legislação. Os resultados são estimativas
        informativas. Confira o <Link href="/aviso-legal">Aviso Legal</Link>.
      </p>

      <h2>5. Disponibilidade</h2>
      <p>
        O site é oferecido “no estado em que se encontra”. Ele pode ficar temporariamente indisponível, mudar ou deixar
        de existir sem aviso prévio.
      </p>

      <h2>6. Limitação de responsabilidade</h2>
      <p>
        Na extensão permitida pela legislação aplicável, o {siteConfig.name} não se responsabiliza por decisões tomadas
        exclusivamente com base nos resultados das calculadoras, nem por danos decorrentes de dados digitados
        incorretamente, de indisponibilidade do site ou de diferenças entre a estimativa e o cálculo oficial de folha de
        pagamento. Nada nestes termos afasta direitos garantidos por lei ao usuário.
      </p>

      <h2>7. Privacidade</h2>
      <p>
        O tratamento de dados é descrito na <Link href="/politica-de-privacidade">Política de Privacidade</Link> e na{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>8. Alterações</h2>
      <p>
        Estes termos podem ser atualizados. A data da última atualização aparece no topo da página. O uso contínuo do site
        após uma alteração indica concordância com a nova versão.
      </p>

      <h2>9. Legislação aplicável</h2>
      <p>Estes termos são regidos pelas leis da República Federativa do Brasil.</p>

      <h2>10. Contato</h2>
      <p>
        Dúvidas sobre estes termos podem ser enviadas pela página de <Link href="/contato">Contato</Link>.
      </p>
    </StaticPage>
  );
}
