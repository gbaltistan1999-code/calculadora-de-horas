import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { legalSources } from "@/data/legal-sources";
import { CONSENT_KEY } from "@/lib/consent";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Política de Privacidade | Calculadora de Horas",
  description:
    "Saiba quais dados o Calculadora de Horas trata, como os cálculos são feitos localmente no navegador e quais são os seus direitos pela LGPD.",
  path: "/politica-de-privacidade",
});

// LEGAL REVIEW: have this text reviewed by a qualified professional before launch,
// and name the hosting provider in section 4.
export default function Page() {
  return (
    <StaticPage title="Política de Privacidade" crumb="Política de Privacidade" path="/politica-de-privacidade" updated={siteConfig.lastUpdated}>
      <p>
        Esta política explica como o {siteConfig.name} ({siteConfig.url}) trata informações dos visitantes, de acordo
        com a{" "}
        <a href={legalSources.lgpd.url} rel="noopener">
          Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD)
        </a>
        . Ela descreve o funcionamento real do site.
      </p>

      <h2>1. Resumo</h2>
      <ul>
        <li>Os valores digitados nas calculadoras são processados <strong>apenas no seu navegador</strong>.</li>
        <li>Esses valores <strong>não são enviados</strong> a servidores e <strong>não são salvos</strong> no seu dispositivo.</li>
        <li>Não há cadastro, login, formulários que enviem dados, ferramentas de análise ou publicidade.</li>
        <li>O único item gravado no navegador é a sua escolha sobre cookies.</li>
        <li>O provedor de hospedagem pode registrar dados técnicos de acesso, como explicado no item 4.</li>
      </ul>

      <h2>2. Dados digitados nas calculadoras</h2>
      <p>
        Horários, durações, salários e valores por hora digitados nas calculadoras são usados somente para exibir o
        resultado na tela. O cálculo é feito por código que roda no seu próprio navegador. Esses dados não são
        transmitidos, armazenados em banco de dados nem gravados em cookies ou no armazenamento local. Ao fechar ou
        recarregar a página, eles são descartados.
      </p>

      <h2>3. Cookies e armazenamento no navegador</h2>
      <p>
        O site grava um único registro no armazenamento local do navegador (localStorage), com a chave{" "}
        <code>{CONSENT_KEY}</code>, contendo a sua escolha sobre categorias de cookies e a data dessa escolha. Ele é
        necessário para não exibir o aviso de cookies em todas as páginas. O site não usa cookies de análise nem de
        marketing. Veja a <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>4. Hospedagem e registros técnicos</h2>
      <p>
        Como qualquer site, o {siteConfig.name} é entregue por um provedor de hospedagem. Ao acessar uma página, o seu
        navegador envia automaticamente informações técnicas, como endereço IP, data e hora, página solicitada, navegador
        e sistema operacional. O provedor de hospedagem pode registrar essas informações em logs para fins de segurança,
        prevenção de abusos e funcionamento do serviço, por prazos definidos na política dele. O {siteConfig.name} não
        usa esses registros para identificar visitantes nem para publicidade.
      </p>

      <h2>5. Contato por e-mail</h2>
      <p>
        Se você nos escrever por e-mail, receberemos o seu endereço e o conteúdo da mensagem, que serão usados apenas
        para responder e tratar a sua solicitação (base legal: legítimo interesse ou atendimento a pedido do titular). As
        mensagens são mantidas apenas pelo tempo necessário para esse fim. O formulário da página de Contato não envia
        dados ao site: ele só abre o seu aplicativo de e-mail.
      </p>

      <h2>6. Compartilhamento</h2>
      <p>
        Não vendemos nem compartilhamos dados pessoais com terceiros para fins comerciais. Os únicos terceiros envolvidos
        são o provedor de hospedagem (item 4) e o seu próprio provedor de e-mail, caso você nos escreva.
      </p>

      <h2>7. Links externos</h2>
      <p>
        Algumas páginas trazem links para fontes oficiais, como planalto.gov.br. Ao acessá-los, vale a política de
        privacidade do respectivo site.
      </p>

      <h2>8. Seus direitos pela LGPD</h2>
      <p>
        Nos termos do art. 18 da LGPD, você pode solicitar: confirmação da existência de tratamento; acesso aos dados;
        correção de dados incompletos, inexatos ou desatualizados; anonimização, bloqueio ou eliminação de dados
        desnecessários ou tratados em desconformidade; portabilidade; eliminação de dados tratados com base no
        consentimento; informação sobre compartilhamento; e revogação do consentimento. Você também pode apresentar
        reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
      </p>
      <p>
        O consentimento sobre cookies pode ser alterado ou retirado a qualquer momento pelo link “Configurações de
        cookies” no rodapé.
      </p>

      <h2>9. Contato</h2>
      <p>
        Para exercer seus direitos ou tirar dúvidas sobre esta política, use a página de{" "}
        <Link href="/contato">Contato</Link>.
      </p>

      <h2>10. Alterações</h2>
      <p>
        Se o funcionamento do site mudar (por exemplo, com a inclusão de uma ferramenta de análise), esta política será
        atualizada antes da mudança, e qualquer recurso opcional só será ativado com o seu consentimento.
      </p>
    </StaticPage>
  );
}
