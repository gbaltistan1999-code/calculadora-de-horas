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
