import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HoursCalculator } from "@/components/calculators/HoursCalculator";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { homeFaqs } from "@/data/home";
import { buildMetadata, webApplicationJsonLd, websiteJsonLd } from "@/lib/seo";
import { calculatorLinks } from "@/lib/site-config";

const TITLE = "Calculadora de Horas: Somar e Subtrair Horas e Minutos";
const DESCRIPTION =
  "Calculadora de horas grátis: some e subtraia horas e minutos, veja o total em hora decimal e em reais. Rápida, sem cadastro e fácil de usar.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[websiteJsonLd(), webApplicationJsonLd({ name: "Calculadora de Horas", description: DESCRIPTION, path: "/" })]}
      />
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 sm:pt-12">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">Calculadora de Horas</h1>
          <p className="mt-3 text-lg leading-relaxed text-charcoal-soft">
            Some e subtraia horas e minutos sem erro. Veja o total em horas, em hora decimal e, se quiser, em reais.
          </p>
        </header>

        <HoursCalculator />

        <article className="prose-content mt-14">
          <h2>O que a calculadora de horas faz</h2>
          <p>
            Esta ferramenta soma e subtrai durações em horas e minutos respeitando a base 60 do tempo — o ponto em que a
            calculadora comum costuma errar. Você pode lançar quantas linhas precisar, misturar somas e subtrações e
            obter o resultado em quatro formatos:
          </p>
          <ul>
            <li>
              <strong>horas e minutos</strong> (9h10);
            </li>
            <li>
              <strong>formato de relógio</strong> (09:10), que pode passar de 24 horas, como 30:30;
            </li>
            <li>
              <strong>hora decimal</strong> (9,17), útil para multiplicar pelo valor da hora;
            </li>
            <li>
              <strong>total em minutos</strong> (550 min).
            </li>
          </ul>
          <p>
            Se você informar o valor por hora, a calculadora também mostra o total em reais. O resultado pode ser maior
            que 24 horas e também negativo, quando as subtrações superam as somas.
          </p>

          <h2>Como usar a calculadora</h2>
          <ol>
            <li>Em cada linha, escolha a operação: <strong>+ somar</strong> ou <strong>− subtrair</strong>.</li>
            <li>Digite as horas e os minutos (de 0 a 59). Campos vazios contam como zero.</li>
            <li>Use <strong>Adicionar linha</strong> para lançar mais períodos ou a lixeira para remover.</li>
            <li>Se quiser o valor a receber, preencha o <strong>valor por hora</strong> em R$.</li>
            <li>
              O resultado aparece automaticamente. Use <strong>Copiar resultado</strong> para colar em outro lugar ou{" "}
              <strong>Limpar</strong> para recomeçar.
            </li>
          </ol>

          <h2>Por que a calculadora comum erra a soma de horas</h2>
          <p>
            A calculadora do celular trabalha em <strong>base 10</strong>: cada casa vale 10 vezes a anterior. O tempo,
            porém, é contado em <strong>base 60</strong>: uma hora tem 60 minutos, não 100. Quando você digita horas
            como se fossem números decimais, o resultado sai errado.
          </p>
          <div className="example">
            <p>
              <strong>Exemplo:</strong> 7h20 + 1h50.
            </p>
            <p>
              Na calculadora comum: 7,20 + 1,50 = <strong>8,70</strong> — um valor que não existe em horas, porque não
              há “70 minutos” em uma hora.
            </p>
            <p>
              Correto: 7h + 1h = 8h e 20 min + 50 min = 70 min = 1h10. Total: <strong>9h10</strong>.
            </p>
          </div>
          <p>
            Por isso esta calculadora converte tudo em minutos, faz a conta com números inteiros e só no final volta a
            mostrar horas e minutos. Assim não há erros de arredondamento.
          </p>

          <h2>Como somar horas manualmente</h2>
          <ol>
            <li>Some todas as horas.</li>
            <li>Some todos os minutos.</li>
            <li>Divida o total de minutos por 60: o quociente vira horas e o resto continua como minutos.</li>
            <li>Junte as horas do passo 1 com as do passo 3.</li>
          </ol>
          <div className="example">
            <p>
              <strong>Exemplo:</strong> 3h45 + 2h30 + 1h50
            </p>
            <p>Horas: 3 + 2 + 1 = 6 h. Minutos: 45 + 30 + 50 = 125 min.</p>
            <p>125 ÷ 60 = 2 horas e sobram 5 minutos.</p>
            <p>
              Resultado: 6h + 2h05 = <strong>8h05</strong>.
            </p>
          </div>

          <h2>Como subtrair horas manualmente</h2>
          <p>
            Subtraia horas de horas e minutos de minutos. Quando os minutos de cima forem menores que os de baixo,
            “pegue emprestada” 1 hora e transforme em 60 minutos — como no “vai um” da escola, só que com 60.
          </p>
          <div className="example">
            <p>
              <strong>Exemplo:</strong> 8h15 − 2h40
            </p>
            <p>Como 15 é menor que 40, tire 1 hora de 8h15: ela vira 7h e os minutos viram 15 + 60 = 75.</p>
            <p>
              Agora: 7h75 − 2h40 = 5 horas e 35 minutos → <strong>5h35</strong>.
            </p>
          </div>
          <p>
            Se a quantidade subtraída for maior que a inicial, o resultado é negativo: 1h00 − 2h15 ={" "}
            <strong>−1h15</strong>. A calculadora mostra o sinal de menos para deixar isso claro.
          </p>

          <h2>Como converter horas e minutos em decimal</h2>
          <p>
            Para multiplicar horas por um valor em reais, primeiro transforme os minutos em fração de hora:{" "}
            <strong>divida os minutos por 60</strong> e some às horas.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Horas e minutos</th>
                <th scope="col">Cálculo</th>
                <th scope="col">Hora decimal</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>7h15</td><td>7 + 15 ÷ 60</td><td>7,25</td></tr>
              <tr><td>7h20</td><td>7 + 20 ÷ 60</td><td>≈ 7,33</td></tr>
              <tr><td>7h30</td><td>7 + 30 ÷ 60</td><td>7,5</td></tr>
              <tr><td>7h45</td><td>7 + 45 ÷ 60</td><td>7,75</td></tr>
            </tbody>
          </table>
          <div className="example">
            <p>
              <strong>Pagamento por hora:</strong> 9h10 trabalhadas a R$ 25,00 a hora.
            </p>
            <p>
              9h10 = 9 + 10 ÷ 60 ≈ 9,1667 h. Valor: 9,1667 × R$ 25,00 = <strong>R$ 229,17</strong>.
            </p>
            <p>
              Se você multiplicasse 9,10 × 25, chegaria a R$ 227,50 — um erro de R$ 1,67 só nessa conta.
            </p>
          </div>
          <p>
            Para converter em lote ou fazer o caminho inverso (decimal para horas), use o{" "}
            <Link href="/converter-hora-decimal">conversor de hora decimal</Link>.
          </p>

          <h2>Exemplos práticos</h2>
          <h3>Fechar o cartão de ponto da semana</h3>
          <p>
            Lance as horas de cada dia como linhas de soma — por exemplo, 8h12, 7h58, 8h30, 8h05 e 7h40 — e veja o total
            semanal (40h25). Se você tem os horários de entrada e saída, a{" "}
            <Link href="/horas-trabalhadas">calculadora de horas trabalhadas</Link> faz a conta de cada dia, já
            descontando o intervalo.
          </p>
          <h3>Cobrar um cliente como freelancer</h3>
          <p>
            Some as sessões de trabalho do projeto (1h45 + 2h20 + 0h50 = 4h55), informe o seu valor por hora e copie o
            resultado para a fatura ou orçamento.
          </p>
          <h3>Planejar o tempo de estudo</h3>
          <p>
            Defina uma meta, como 20 horas no mês, lance-a como soma e subtraia cada sessão de estudo concluída. O
            resultado mostra quanto falta; se ficar negativo, você passou da meta.
          </p>
          <h3>Descontar atrasos ou saídas antecipadas</h3>
          <p>
            Comece com a jornada prevista (8h00) e subtraia o atraso (0h25): restam 7h35. Para acompanhar o saldo ao
            longo de vários dias, a <Link href="/banco-de-horas">calculadora de banco de horas</Link> é mais prática.
          </p>
        </article>

        <Faq items={homeFaqs} />

        <section aria-labelledby="outras-calculadoras" className="mt-14">
          <h2 id="outras-calculadoras" className="text-2xl font-bold tracking-tight text-charcoal">
            Outras calculadoras
          </h2>
          <p className="mt-2 text-charcoal-soft">Ferramentas específicas para jornada, salário e conversões de tempo.</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {calculatorLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex h-full items-start justify-between gap-3 rounded-xl border border-sand-200 bg-paper p-4 hover:border-accent"
                >
                  <span>
                    <span className="block font-semibold text-charcoal group-hover:text-accent">
                      Calculadora de {l.label.toLowerCase()}
                    </span>
                    <span className="mt-1 block text-sm text-stone-muted">{l.description}</span>
                  </span>
                  <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-stone-muted group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="prose-content mt-14">
          <h2>Conclusão</h2>
          <p>
            Somar e subtrair horas fica simples quando se lembra que o tempo é contado em base 60. Para contas rápidas,
            use a calculadora no topo desta página; para entender o resultado, as explicações acima mostram o passo a
            passo. Se a sua dúvida envolve jornada de trabalho, comece pela{" "}
            <Link href="/horas-trabalhadas">calculadora de horas trabalhadas</Link> e, se houver excedente, siga para a{" "}
            <Link href="/horas-extras">calculadora de horas extras</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
