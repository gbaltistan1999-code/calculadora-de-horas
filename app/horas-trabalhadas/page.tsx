import Link from "next/link";
import { CalculatorPageLayout } from "@/components/CalculatorPageLayout";
import { WorkedHoursCalculator } from "@/components/calculators/WorkedHoursCalculator";
import { workedHoursPage as meta } from "@/data/calculators";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: meta.title, description: meta.description, path: meta.path });

export default function Page() {
  return (
    <CalculatorPageLayout
      meta={meta}
      calculator={<WorkedHoursCalculator />}
      sources={["clt", "cf", "ec141"]}
      laborDisclaimer
      nextStep={
        <p>
          Com o total de horas em mãos, veja se houve excedente na{" "}
          <Link href="/horas-extras">calculadora de horas extras</Link> ou acompanhe o saldo no{" "}
          <Link href="/banco-de-horas">banco de horas</Link>.
        </p>
      }
    >
      <h2>O que são horas trabalhadas</h2>
      <p>
        Horas trabalhadas são o tempo efetivamente dedicado ao trabalho em um dia ou período: do registro de entrada ao
        de saída, <strong>descontados os intervalos de descanso</strong>. A CLT determina que os intervalos de descanso
        não são computados na duração do trabalho (art. 71, §2º), por isso o almoço não entra na conta.
      </p>
      <p>
        É o número que aparece no fechamento do cartão de ponto e serve de base para conferir a jornada, as horas extras
        e o banco de horas.
      </p>

      <h2>Como o cálculo funciona</h2>
      <ol>
        <li>Calcula-se o período total: saída − entrada.</li>
        <li>Desconta-se o intervalo informado.</li>
        <li>Se a saída for menor que a entrada, considera-se que ela ocorreu no dia seguinte (jornada que passa da meia-noite).</li>
        <li>No modo semana, somam-se os totais de cada dia em base 60.</li>
      </ol>
      <div className="example">
        <p><strong>Exemplo 1 — jornada comercial</strong></p>
        <p>Entrada 08:00, saída 17:48, intervalo de 1:00.</p>
        <p>17:48 − 08:00 = 9h48. Menos 1h de intervalo = <strong>8h48</strong> trabalhadas.</p>
      </div>
      <div className="example">
        <p><strong>Exemplo 2 — turno noturno</strong></p>
        <p>Entrada 22:00, saída 06:00, intervalo de 1:00.</p>
        <p>Até a meia-noite: 2h. Depois: 6h. Período = 8h. Menos 1h = <strong>7h</strong> trabalhadas.</p>
      </div>
      <div className="example">
        <p><strong>Exemplo 3 — semana</strong></p>
        <p>Segunda a sexta com 8h48 por dia: 5 × 8h48 = 40h240min = <strong>44h00</strong> na semana.</p>
      </div>

      <h2>Intervalo: o que diz a CLT</h2>
      <p>
        Pelo art. 71 da CLT, em trabalho contínuo com mais de 6 horas é obrigatório um intervalo para repouso ou
        alimentação de <strong>no mínimo 1 hora</strong> e, em regra, no máximo 2 horas. Quando o trabalho passa de 4
        horas sem exceder 6, o intervalo é de <strong>15 minutos</strong> (art. 71, §1º). A calculadora mostra um aviso
        quando o intervalo informado fica abaixo desses mínimos, mas acordos coletivos e regras de categorias específicas
        podem alterar esses limites.
      </p>

      <h2>Limites de jornada</h2>
      <p>
        A Constituição prevê jornada normal de até 8 horas diárias (art. 7º, XIII), assim como a CLT (art. 58). O limite
        semanal está mudando: a Emenda Constitucional nº 141/2026 reduz a jornada normal de 44 para{" "}
        <strong>42 horas semanais dois meses após a sua publicação</strong> (publicada em 16/10/2026) e para{" "}
        <strong>40 horas semanais um ano depois disso</strong>. Use a calculadora semanal para comparar o seu total com
        o limite aplicável ao seu contrato.
      </p>

      <h2>Erros comuns e limitações</h2>
      <ul>
        <li>
          <strong>Somar horários como números decimais.</strong> 08:50 − 08:20 não é 0,30 hora: são 30 minutos, ou 0,5
          hora. Para converter, use o <Link href="/converter-hora-decimal">conversor de hora decimal</Link>.
        </li>
        <li>
          <strong>Esquecer de descontar o intervalo.</strong> O período entre entrada e saída não é igual às horas
          trabalhadas quando há pausa.
        </li>
        <li>
          <strong>Tolerância do ponto.</strong> A CLT (art. 58, §1º) não desconta nem conta como extra variações de até 5
          minutos por marcação, com limite de 10 minutos diários. A calculadora mostra o tempo exato e não aplica essa
          tolerância automaticamente.
        </li>
        <li>
          <strong>Mais de um intervalo.</strong> Se você teve várias pausas, some-as e informe o total no campo de
          intervalo (por exemplo, 1:00 + 0:15 = 1:15).
        </li>
        <li>
          <strong>Hora noturna.</strong> O total aqui é em horas de relógio. Para a hora noturna reduzida, use a{" "}
          <Link href="/adicional-noturno">calculadora de adicional noturno</Link>.
        </li>
      </ul>
      <p>
        Para somas livres de períodos, sem entrada e saída, a <Link href="/">calculadora de horas</Link> principal é mais
        direta.
      </p>
    </CalculatorPageLayout>
  );
}
