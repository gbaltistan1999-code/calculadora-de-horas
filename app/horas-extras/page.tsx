import Link from "next/link";
import { CalculatorPageLayout } from "@/components/CalculatorPageLayout";
import { OvertimeCalculator } from "@/components/calculators/OvertimeCalculator";
import { overtimePage as meta } from "@/data/calculators";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: meta.title, description: meta.description, path: meta.path });

export default function Page() {
  return (
    <CalculatorPageLayout
      meta={meta}
      calculator={<OvertimeCalculator />}
      sources={["cf", "clt", "ec141"]}
      laborDisclaimer
      nextStep={
        <p>
          Não sabe quantas horas extras fez? Calcule primeiro na{" "}
          <Link href="/horas-trabalhadas">calculadora de horas trabalhadas</Link>. Se a empresa usa compensação, confira
          o saldo no <Link href="/banco-de-horas">banco de horas</Link>.
        </p>
      }
    >
      <h2>O que é hora extra</h2>
      <p>
        Hora extra é o tempo trabalhado além da jornada normal combinada. A CLT permite acrescentar{" "}
        <strong>até 2 horas extras por dia</strong>, por acordo individual, convenção coletiva ou acordo coletivo (art.
        59), e a Constituição garante que esse serviço extraordinário seja pago com acréscimo de{" "}
        <strong>no mínimo 50%</strong> sobre a hora normal (art. 7º, XVI; CLT art. 59, §1º).
      </p>
      <p>
        Esse é o mínimo legal. Muitas convenções coletivas preveem percentuais maiores — por isso a calculadora permite
        escolher 50%, 100% ou digitar qualquer outro percentual.
      </p>

      <h2>Como o cálculo funciona</h2>
      <ol>
        <li>
          <strong>Valor da hora normal</strong> = salário mensal ÷ divisor de horas do mês (ou o valor da hora informado
          diretamente).
        </li>
        <li>
          <strong>Valor da hora extra</strong> = hora normal × (1 + percentual ÷ 100). Com 50%, multiplica-se por 1,5;
          com 100%, por 2.
        </li>
        <li>
          <strong>Total</strong> = horas extras em decimal × valor da hora extra, arredondado ao centavo.
        </li>
      </ol>
      <div className="example">
        <p><strong>Exemplo 1 — 50%</strong></p>
        <p>Salário de R$ 2.200,00, divisor 220 → hora normal de R$ 10,00.</p>
        <p>Hora extra a 50%: R$ 10,00 × 1,5 = R$ 15,00.</p>
        <p>
          10h30 extras = 10,5 h × R$ 15,00 = <strong>R$ 157,50</strong>.
        </p>
      </div>
      <div className="example">
        <p><strong>Exemplo 2 — 100%</strong></p>
        <p>Hora normal de R$ 18,00 e 4h20 extras a 100%.</p>
        <p>
          Hora extra: R$ 36,00. 4h20 ≈ 4,3333 h × R$ 36,00 = <strong>R$ 156,00</strong>.
        </p>
      </div>
      <p>
        Repare que 4h20 vira 4,3333 h, e não 4,20. Multiplicar o número “4,20” daria R$ 151,20, R$ 4,80 a menos. Veja
        por que no <Link href="/converter-hora-decimal">conversor de horas em decimal</Link>.
      </p>

      <h2>Exemplo completo de um mês com dois percentuais</h2>
      <p>
        É comum o mesmo mês ter horas extras com percentuais diferentes — por exemplo, 50% em dias úteis e 100% em um
        dia previsto na convenção coletiva. Nesse caso, calcule cada grupo separadamente e some.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Cálculo</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Hora normal</td><td>R$ 3.000,00 ÷ 220</td><td>R$ 13,64</td></tr>
          <tr><td>12h30 a 50%</td><td>12,5 h × R$ 13,6364 × 1,5</td><td>R$ 255,68</td></tr>
          <tr><td>4h00 a 100%</td><td>4 h × R$ 13,6364 × 2</td><td>R$ 109,09</td></tr>
          <tr><td><strong>Total de horas extras</strong></td><td>R$ 255,68 + R$ 109,09</td><td><strong>R$ 364,77</strong></td></tr>
        </tbody>
      </table>
      <p>
        Repare que a hora normal foi usada com 4 casas (R$ 13,6364) e só o resultado final foi arredondado. Arredondar a
        hora para R$ 13,64 antes de multiplicar muda o resultado em alguns centavos. A calculadora acima já faz a conta
        dessa forma: rode-a uma vez com 50% e outra com 100%.
      </p>

      <h2>Como conferir as horas extras no holerite</h2>
      <ol>
        <li>
          Localize no holerite as linhas de horas extras. Elas costumam mostrar a <strong>quantidade</strong> e o{" "}
          <strong>valor</strong> separadamente, muitas vezes uma linha para cada percentual.
        </li>
        <li>
          Verifique se a quantidade está em formato centesimal: “12,50” significa 12h30, e não 12h50. Na dúvida, use o{" "}
          <Link href="/converter-hora-decimal">conversor de hora decimal</Link>.
        </li>
        <li>Compare a quantidade com as suas anotações ou com o espelho de ponto do mês.</li>
        <li>Refaça o valor aqui com o seu salário, o divisor e o percentual informados pela empresa.</li>
        <li>
          Diferenças pequenas podem vir de arredondamento ou de verbas que entram na base de cálculo (como adicionais).
          Diferenças grandes merecem uma conversa com o RH.
        </li>
      </ol>

      <h2>Qual divisor usar: 220, 210 ou 200?</h2>
      <p>
        O divisor representa as horas pagas no mês. O <strong>220</strong> é o divisor tradicionalmente usado para a
        jornada de 44 horas semanais, e o <strong>200</strong> para 40 horas semanais. A Emenda Constitucional nº 141,
        publicada em 16/10/2026, reduz a jornada normal para <strong>42 horas semanais</strong> dois meses após a
        publicação e para <strong>40 horas</strong> um ano depois disso. Por isso a calculadora oferece também a opção
        210 (42 horas) e um campo para outro divisor.
      </p>
      <p>
        O divisor correto depende do seu contrato, da sua jornada e da norma coletiva. Na dúvida, confirme com o RH, o
        contador ou o sindicato da categoria.
      </p>

      <h2>Erros comuns e limitações</h2>
      <ul>
        <li>
          <strong>Multiplicar minutos como decimal.</strong> 1h30 é 1,5 hora, não 1,30.
        </li>
        <li>
          <strong>Aplicar o percentual só sobre o adicional.</strong> O total da hora extra inclui a hora normal mais o
          adicional. A calculadora mostra os dois valores separadamente.
        </li>
        <li>
          <strong>Ignorar a convenção coletiva.</strong> O percentual pode ser maior que 50%, e algumas categorias têm
          regras próprias.
        </li>
        <li>
          <strong>Reflexos não incluídos.</strong> O resultado não inclui reflexos em descanso semanal remunerado,
          férias, 13º e FGTS, nem descontos de INSS e imposto de renda. Também não considera adicionais que integram a
          base de cálculo, como adicional noturno ou de insalubridade.
        </li>
        <li>
          <strong>Horas extras noturnas</strong> combinam adicional de hora extra e adicional noturno. Calcule a parte
          noturna na <Link href="/adicional-noturno">calculadora de adicional noturno</Link>.
        </li>
      </ul>
      <p>
        Precisa apenas somar as horas extras de vários dias? Use a <Link href="/">calculadora de horas e minutos</Link> e
        depois traga o total para cá.
      </p>
    </CalculatorPageLayout>
  );
}
