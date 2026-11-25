import Link from "next/link";
import { CalculatorPageLayout } from "@/components/CalculatorPageLayout";
import { NightShiftCalculator } from "@/components/calculators/NightShiftCalculator";
import { nightShiftPage as meta } from "@/data/calculators";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: meta.title, description: meta.description, path: meta.path });

export default function Page() {
  return (
    <CalculatorPageLayout
      meta={meta}
      calculator={<NightShiftCalculator />}
      sources={["cf", "clt", "rural", "domestico"]}
      laborDisclaimer
      nextStep={
        <p>
          Trabalhou além da jornada no período noturno? Estime também as{" "}
          <Link href="/horas-extras">horas extras</Link>. Para conferir apenas o tempo entre dois horários, use a{" "}
          <Link href="/diferenca-entre-horarios">diferença entre horários</Link>.
        </p>
      }
    >
      <h2>O que é adicional noturno</h2>
      <p>
        A Constituição garante remuneração do trabalho noturno superior à do diurno (art. 7º, IX). Na prática, isso se
        traduz em dois benefícios previstos em lei: um <strong>acréscimo percentual</strong> sobre a hora e, para
        algumas categorias, a <strong>hora noturna reduzida</strong>, que faz cada hora de relógio valer mais.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Categoria</th>
            <th scope="col">Período noturno</th>
            <th scope="col">Adicional mínimo</th>
            <th scope="col">Hora reduzida</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Urbano (CLT art. 73)</td><td>22h às 5h</td><td>20%</td><td>Sim (52min30s)</td></tr>
          <tr><td>Doméstico (LC 150/2015, art. 14)</td><td>22h às 5h</td><td>20%</td><td>Sim (52min30s)</td></tr>
          <tr><td>Rural — lavoura (Lei 5.889/1973, art. 7º)</td><td>21h às 5h</td><td>25%</td><td>Não prevista</td></tr>
          <tr><td>Rural — pecuária (Lei 5.889/1973, art. 7º)</td><td>20h às 4h</td><td>25%</td><td>Não prevista</td></tr>
        </tbody>
      </table>
      <p>
        Esses são os mínimos legais. Convenções coletivas podem prever percentuais maiores, e algumas categorias têm leis
        próprias. Por isso todos os campos da calculadora são editáveis.
      </p>

      <h2>Como o cálculo funciona</h2>
      <ol>
        <li>Identifica-se quanto do horário de trabalho cai dentro do período noturno (minutos de relógio).</li>
        <li>
          Se houver hora reduzida, converte-se para horas noturnas: minutos reais ÷ 52,5 × 60 (o mesmo que multiplicar
          por 8/7).
        </li>
        <li>Adicional = horas noturnas × valor da hora diurna × percentual.</li>
      </ol>
      <div className="example">
        <p><strong>Exemplo 1 — urbano, turno integral noturno</strong></p>
        <p>Das 22:00 às 05:00 = 7 horas de relógio = 420 minutos.</p>
        <p>420 ÷ 52,5 = <strong>8 horas noturnas</strong>.</p>
        <p>Com hora diurna de R$ 10,00 e 20%: 8 × R$ 10,00 × 20% = <strong>R$ 16,00</strong> de adicional.</p>
      </div>
      <div className="example">
        <p><strong>Exemplo 2 — urbano, turno parcialmente noturno</strong></p>
        <p>Das 18:00 às 02:00: apenas 22:00–02:00 é noturno = 4 horas de relógio.</p>
        <p>240 ÷ 52,5 × 60 ≈ 274,3 min ≈ <strong>4h34</strong> noturnas.</p>
      </div>
      <div className="example">
        <p><strong>Exemplo 3 — rural, lavoura</strong></p>
        <p>Das 20:00 às 06:00: o período noturno é 21:00–05:00 = 8 horas, sem hora reduzida.</p>
        <p>Com hora de R$ 10,00 e 25%: 8 × R$ 10,00 × 25% = <strong>R$ 20,00</strong>.</p>
      </div>

      <h2>Erros comuns e limitações</h2>
      <ul>
        <li>
          <strong>Esquecer a hora reduzida.</strong> Para urbanos e domésticos, 7 horas de relógio no período noturno
          valem 8 horas.
        </li>
        <li>
          <strong>Aplicar hora reduzida ao rural.</strong> A lei do trabalho rural não a prevê; em troca, o adicional é
          maior.
        </li>
        <li>
          <strong>Prorrogação da jornada noturna.</strong> Quando a jornada noturna é cumprida e prorrogada após as 5h,
          há entendimento de que o adicional também incide sobre as horas prorrogadas. A calculadora não aplica isso
          automaticamente; você pode ajustar o fim do período noturno no campo de regras.
        </li>
        <li>
          <strong>Revezamento.</strong> O art. 73 da CLT ressalva casos de revezamento semanal ou quinzenal. Confira a
          situação com o RH.
        </li>
        <li>
          <strong>Intervalo.</strong> A calculadora considera o período corrido entre início e fim. Se houve pausa dentro
          do período noturno, desconte-a das horas.
        </li>
      </ul>
      <p>
        Precisa apenas somar horas noturnas de vários dias? Use a <Link href="/">calculadora de horas</Link> principal.
      </p>
    </CalculatorPageLayout>
  );
}
