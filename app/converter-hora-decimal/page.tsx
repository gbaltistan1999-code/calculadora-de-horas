import Link from "next/link";
import { CalculatorPageLayout } from "@/components/CalculatorPageLayout";
import { DecimalConverter } from "@/components/calculators/DecimalConverter";
import { decimalPage as meta } from "@/data/calculators";
import { formatDecimal } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: meta.title, description: meta.description, path: meta.path });

const TABLE_MINUTES = [1, 2, 3, 5, 6, 10, 12, 15, 18, 20, 24, 25, 30, 35, 36, 40, 42, 45, 48, 50, 54, 55];

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

      <h2>Tabela de minutos em hora decimal</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Minutos</th>
            <th scope="col">Hora decimal</th>
            <th scope="col">Minutos</th>
            <th scope="col">Hora decimal</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(TABLE_MINUTES.length / 2) }, (_, i) => {
            const a = TABLE_MINUTES[i];
            const b = TABLE_MINUTES[i + Math.ceil(TABLE_MINUTES.length / 2)];
            return (
              <tr key={a}>
                <td>{a} min</td>
                <td>{formatDecimal(a / 60, 4)}</td>
                <td>{b !== undefined ? `${b} min` : ""}</td>
                <td>{b !== undefined ? formatDecimal(b / 60, 4) : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Valores com até 4 casas decimais. Repare que só os múltiplos de 3 minutos têm decimal exato com até 2 casas
        (como 0,05, 0,1, 0,25); os demais são dízimas e precisam ser arredondados.
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
