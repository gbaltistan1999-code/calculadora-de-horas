import Link from "next/link";
import { CalculatorPageLayout } from "@/components/CalculatorPageLayout";
import { DecimalConverter } from "@/components/calculators/DecimalConverter";
import { decimalPage as meta } from "@/data/calculators";
import { formatDecimal } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: meta.title, description: meta.description, path: meta.path });

/** Full 1–59 minute table, laid out in three column pairs of 20 rows. */
const ROWS = 20;
const minuteCell = (m: number) => (m <= 59 ? { m, dec: formatDecimal(m / 60, 2, 2) } : null);

function Cell({ m, dec }: { m: number; dec: string }) {
  return (
    <>
      <td>{m}</td>
      <td>{dec}</td>
    </>
  );
}

function EmptyCell() {
  return (
    <>
      <td />
      <td />
    </>
  );
}

export default function Page() {
  return (
    <CalculatorPageLayout
      meta={meta}
      calculator={<DecimalConverter />}
      nextStep={
        <p>
          Já tem as horas em decimal? Calcule o valor das <Link href="/horas-extras">horas extras</Link> ou some vários
          períodos na <Link href="/">calculadora de horas e minutos</Link>.
        </p>
      }
    >
      <h2>O que é hora decimal</h2>
      <p>
        Hora decimal é a duração escrita como um número comum, em que a parte depois da vírgula representa{" "}
        <strong>uma fração da hora</strong>, e não minutos. Assim, 7,5 horas são 7 horas e meia (7h30), e 7,25 horas
        são 7 horas e um quarto (7h15).
      </p>
      <p>
        Esse formato é usado em folhas de pagamento, planilhas e notas fiscais de serviço, porque permite multiplicar o
        tempo diretamente pelo valor da hora.
      </p>

      <h2>Como converter horas e minutos em decimal</h2>
      <p>
        <strong>Divida os minutos por 60 e some às horas.</strong>
      </p>
      <div className="example">
        <p>8h45 → 45 ÷ 60 = 0,75 → <strong>8,75 h</strong></p>
        <p>7h20 → 20 ÷ 60 = 0,333... → <strong>≈ 7,33 h</strong></p>
        <p>0h06 → 6 ÷ 60 = 0,1 → <strong>0,1 h</strong></p>
      </div>

      <h2>Como converter decimal em horas e minutos</h2>
      <p>
        <strong>Multiplique a parte decimal por 60</strong> para obter os minutos.
      </p>
      <div className="example">
        <p>7,25 h → 0,25 × 60 = 15 → <strong>7h15</strong></p>
        <p>3,8 h → 0,8 × 60 = 48 → <strong>3h48</strong></p>
        <p>1,33 h → 0,33 × 60 = 19,8 ≈ 20 → <strong>1h20</strong></p>
      </div>

      <h2>Tabela de minutos em hora decimal (1 a 59 minutos)</h2>
      <p>
        Para converter, procure os minutos na tabela e some o valor às horas inteiras. Exemplo: 6h37 = 6 + 0,62 ={" "}
        <strong>6,62 h</strong>.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Min</th>
            <th scope="col">Decimal</th>
            <th scope="col">Min</th>
            <th scope="col">Decimal</th>
            <th scope="col">Min</th>
            <th scope="col">Decimal</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROWS }, (_, i) => {
            const cells = [i + 1, i + 1 + ROWS, i + 1 + 2 * ROWS].map(minuteCell);
            return (
              <tr key={i}>
                {cells.map((c, j) =>
                  c ? (
                    <Cell key={j} m={c.m} dec={c.dec} />
                  ) : (
                    <EmptyCell key={j} />
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Valores arredondados a 2 casas, como costumam aparecer em folhas de pagamento. Só os múltiplos de 3 minutos têm
        decimal exato com 2 casas (3 min = 0,05; 6 min = 0,10; 15 min = 0,25). Os demais são dízimas: 20 minutos, por
        exemplo, são 0,3333… e aparecem como 0,33. Para cálculos de valor, prefira usar o conversor acima, que mostra 4
        casas.
      </p>

      <h2>Hora centesimal: o mesmo que hora decimal</h2>
      <p>
        Em departamentos pessoais, sistemas de ponto e holerites, a hora decimal costuma ser chamada de{" "}
        <strong>hora centesimal</strong>, porque a hora passa a ser dividida em 100 partes em vez de 60. É comum ver
        no espelho de ponto, por exemplo, “horas extras: 12,50”. Isso significa 12 horas e meia (12h30), e não 12 horas
        e 50 minutos.
      </p>
      <div className="example">
        <p><strong>Exemplo: conferindo o espelho de ponto</strong></p>
        <p>O sistema mostra 7,75 horas trabalhadas em um dia.</p>
        <p>0,75 × 60 = 45 minutos → <strong>7h45</strong>.</p>
        <p>
          Se você anotou entrada às 08:00 e saída às 16:45 com 1 hora de intervalo, o número bate. Se a sua anotação
          der outro valor, vale perguntar ao RH antes de assinar.
        </p>
      </div>
      <p>
        O mesmo raciocínio vale no sentido contrário: para lançar 37 horas e 24 minutos em uma planilha que só aceita
        decimais, digite 37,4 (24 ÷ 60 = 0,4).
      </p>

      <h2>Erros comuns e limitações</h2>
      <ul>
        <li>
          <strong>Ler a vírgula como separador de minutos.</strong> 7,20 h não é 7h20; é 7h12.
        </li>
        <li>
          <strong>Arredondar cedo demais.</strong> Arredondar 7h20 para 7,3 e multiplicar por um valor alto gera
          diferenças. A calculadora mostra 4 casas para cálculos de valor.
        </li>
        <li>
          <strong>Precisão de minutos.</strong> Na conversão de decimal para horas, o resultado é arredondado ao minuto
          mais próximo; segundos não são exibidos.
        </li>
        <li>
          <strong>Planilhas.</strong> No Excel ou Google Planilhas, um horário como 07:30 é armazenado como fração do dia.
          Multiplique por 24 para obter horas decimais (=A1*24).
        </li>
      </ul>
      <p>
        Precisa somar ou subtrair durações antes de converter? A <Link href="/">calculadora de horas</Link> já mostra o
        total em decimal. Para saldos de jornada, veja o <Link href="/banco-de-horas">banco de horas</Link>.
      </p>
    </CalculatorPageLayout>
  );
}
