import Link from "next/link";
import { CalculatorPageLayout } from "@/components/CalculatorPageLayout";
import { TimeDifferenceCalculator } from "@/components/calculators/TimeDifferenceCalculator";
import { timeDiffPage as meta } from "@/data/calculators";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: meta.title, description: meta.description, path: meta.path });

export default function Page() {
  return (
    <CalculatorPageLayout
      meta={meta}
      calculator={<TimeDifferenceCalculator />}
      nextStep={
        <p>
          Precisa descontar o almoço? A <Link href="/horas-trabalhadas">calculadora de horas trabalhadas</Link> faz isso
          automaticamente. Se o período foi noturno, confira o{" "}
          <Link href="/adicional-noturno">adicional noturno</Link>.
        </p>
      }
    >
      <h2>Para que serve</h2>
      <p>
        A diferença entre horários responde à pergunta “quanto tempo se passou entre um horário e outro?”. É útil para
        medir a duração de um turno, de uma viagem, de uma reunião ou do tempo de sono — inclusive quando o período
        começa em um dia e termina no seguinte.
      </p>

      <h2>Como o cálculo funciona</h2>
      <p>
        Os dois horários são convertidos em minutos desde a meia-noite (por exemplo, 08:30 = 510 min). Se o horário final
        for maior que o inicial, basta subtrair. Se for menor, o período atravessou a meia-noite: soma-se o tempo até
        24:00 com o tempo depois dela.
      </p>
      <div className="example">
        <p><strong>Exemplo 1 — mesmo dia</strong></p>
        <p>De 08:40 às 17:15.</p>
        <p>
          Como 15 é menor que 40, pega-se 1 hora emprestada: 16:75 − 08:40 = <strong>8h35</strong>.
        </p>
      </div>
      <div className="example">
        <p><strong>Exemplo 2 — passando da meia-noite</strong></p>
        <p>De 22:00 às 06:00.</p>
        <p>
          Até a meia-noite: 2h00. Depois: 6h00. Total: <strong>8h00</strong>.
        </p>
      </div>
      <div className="example">
        <p><strong>Exemplo 3 — sono</strong></p>
        <p>De 23:30 às 07:15.</p>
        <p>
          Até a meia-noite: 0h30. Depois: 7h15. Total: <strong>7h45</strong>.
        </p>
      </div>

      <h2>Exemplos de uso no dia a dia</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Situação</th>
            <th scope="col">Início</th>
            <th scope="col">Fim</th>
            <th scope="col">Duração</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Plantão noturno de 12 horas</td><td>19:00</td><td>07:00</td><td>12h00</td></tr>
          <tr><td>Turno da manhã</td><td>06:00</td><td>14:20</td><td>8h20</td></tr>
          <tr><td>Turno da tarde/noite</td><td>13:45</td><td>22:05</td><td>8h20</td></tr>
          <tr><td>Noite de sono</td><td>23:30</td><td>07:15</td><td>7h45</td></tr>
          <tr><td>Reunião que atrasou</td><td>14:10</td><td>15:55</td><td>1h45</td></tr>
          <tr><td>Turno de 24 horas</td><td>07:00</td><td>07:00</td><td>24h00 (marque a opção)</td></tr>
        </tbody>
      </table>

      <h2>Dia dividido em dois períodos</h2>
      <p>
        Quando a jornada é dividida — manhã e tarde, com almoço no meio —, calcule cada período separadamente e some os
        resultados.
      </p>
      <div className="example">
        <p><strong>Exemplo</strong></p>
        <p>Manhã: 08:00 às 12:00 = 4h00. Tarde: 13:12 às 17:30 = 4h18.</p>
        <p>
          Total: 4h00 + 4h18 = <strong>8h18</strong>.
        </p>
      </div>
      <p>
        Para não precisar somar à mão, a <Link href="/horas-trabalhadas">calculadora de horas trabalhadas</Link> faz
        tudo de uma vez: informe a entrada (08:00), a saída (17:30) e o intervalo (1:12) e ela chega aos mesmos 8h18.
      </p>

      <h2>Quanto tempo falta até um horário?</h2>
      <p>
        A mesma conta responde a perguntas como “quanto falta para o fim do expediente?”. Coloque o horário atual como
        início e o horário desejado como fim. Às 15:20, faltam <strong>2h40</strong> para as 18:00. Às 22:30, faltam{" "}
        <strong>8h00</strong> para as 06:30 do dia seguinte.
      </p>

      <h2>Erros comuns e limitações</h2>
      <ul>
        <li>
          <strong>Subtrair como número decimal.</strong> 17,15 − 8,40 = 8,75 na calculadora comum, mas a diferença real é
          8h35.
        </li>
        <li>
          <strong>Formato de 12 horas.</strong> Use sempre o formato de 24 horas: 2 da tarde é 14:00. Sem isso, 08:00 às
          02:00 seria lido como 18 horas, não 6.
        </li>
        <li>
          <strong>Mais de 24 horas.</strong> A calculadora compara apenas horários do relógio, então o máximo é 24 horas.
          Para durações maiores, some os períodos na <Link href="/">calculadora de horas</Link>.
        </li>
        <li>
          <strong>Horário de verão e fusos.</strong> O cálculo não considera mudanças de fuso horário nem de horário de
          verão.
        </li>
      </ul>
      <p>
        Quer o resultado em número decimal para uma planilha? Veja o{" "}
        <Link href="/converter-hora-decimal">conversor de hora decimal</Link>.
      </p>
    </CalculatorPageLayout>
  );
}
