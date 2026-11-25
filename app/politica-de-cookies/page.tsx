import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { StaticPage } from "@/components/StaticPage";
import { CONSENT_KEY } from "@/lib/consent";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Política de Cookies | Calculadora de Horas",
  description:
    "Veja quais cookies e armazenamento do navegador o Calculadora de Horas usa (apenas o necessário) e como alterar as suas preferências.",
  path: "/politica-de-cookies",
});

export default function Page() {
  return (
    <StaticPage title="Política de Cookies" crumb="Política de Cookies" path="/politica-de-cookies" updated={siteConfig.lastUpdated}>
      <h2>O que são cookies e armazenamento local</h2>
      <p>
        Cookies são pequenos arquivos que um site grava no navegador. O armazenamento local (localStorage) é um recurso
        parecido, que guarda informações no seu dispositivo. Ambos podem ser usados para lembrar preferências, medir
        audiência ou exibir publicidade.
      </p>

      <h2>O que este site usa</h2>
      <p>
        O {siteConfig.name} usa <strong>apenas armazenamento necessário</strong>:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Tipo</th>
            <th scope="col">Finalidade</th>
            <th scope="col">Duração</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>{CONSENT_KEY}</code></td>
            <td>localStorage (necessário)</td>
            <td>Guardar a sua escolha sobre cookies para não repetir o aviso</td>
            <td>Até você limpar os dados do navegador ou mudar a escolha</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Não usamos cookies de análise nem de marketing</strong>, e as calculadoras não gravam os valores que você
        digita.
      </p>

      <h2>Categorias de consentimento</h2>
      <ul>
        <li>
          <strong>Necessários:</strong> sempre ativos, porque permitem lembrar a sua escolha.
        </li>
        <li>
          <strong>Análise:</strong> desativado por padrão. Hoje não existe nenhuma ferramenta de análise no site.
        </li>
        <li>
          <strong>Marketing:</strong> desativado por padrão. Hoje não existe nenhum cookie de marketing no site.
        </li>
      </ul>
      <p>
        As categorias opcionais existem para que, se algum serviço desse tipo for adicionado no futuro, ele só seja
        carregado com a sua permissão. Nesse caso, esta política será atualizada antes.
      </p>

      <h2>Como alterar ou retirar o consentimento</h2>
      <p>
        Você pode rever a sua escolha a qualquer momento pelo botão abaixo ou pelo link “Configurações de cookies” no
        rodapé de todas as páginas. Também é possível apagar o registro limpando os dados de navegação do site nas
        configurações do seu navegador.
      </p>
      <p className="not-prose">
        <CookieSettingsButton className="inline-flex min-h-11 items-center rounded-lg border border-sand-300 bg-paper px-4 font-semibold text-charcoal hover:bg-sand-100" />
      </p>
      <p className="mt-6">
        Mais detalhes sobre o tratamento de dados estão na <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
    </StaticPage>
  );
}
