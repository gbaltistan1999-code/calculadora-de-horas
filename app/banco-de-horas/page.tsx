import Link from "next/link";
import { CalculatorPageLayout } from "@/components/CalculatorPageLayout";
import { TimeBankCalculator } from "@/components/calculators/TimeBankCalculator";
import { timeBankPage as meta } from "@/data/calculators";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: meta.title, description: meta.description, path: meta.path });

export default function Page() {
  return (
    <CalculatorPageLayout
      meta={meta}
      calculator={<TimeBankCalculator />}
      sources={["clt"]}
      laborDisclaimer
      nextStep={
        <p>
          Se o saldo positivo não for compensado no prazo, ele deve ser pago como hora extra. Estime o valor na{" "}
          <Link href="/horas-extras">calculadora de horas extras</Link>.
        </p>
      }
    >
      <h2>Como funciona o banco de horas</h2>
      <p>
        No banco de horas, o tempo trabalhado além da jornada em um dia vira <strong>crédito</strong>, que pode ser
        compensado com folgas ou saídas antecipadas em outros dias, em vez de ser pago como hora extra. Quando a pessoa
        trabalha menos do que o previsto, o saldo fica <strong>negativo</strong>.
      </p>
      <p>A CLT (art. 59) prevê três formas de compensação, com prazos diferentes:</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Forma de acordo</th>
            <th scope="col">Prazo máximo de compensação</th>
            <th scope="col">Base legal</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Acordo ou convenção coletiva</td><td>1 ano</td><td>CLT art. 59, §2º</td></tr>
          <tr><td>Acordo individual escrito</td><td>6 meses</td><td>CLT art. 59, §5º</td></tr>
          <tr><td>Acordo individual, tácito ou escrito</td><td>No mesmo mês</td><td>CLT art. 59, §6º</td></tr>
        </tbody>
      </table>
      <p>
        Se o contrato terminar antes da compensação integral, as horas não compensadas devem ser pagas como extras,
        calculadas sobre a remuneração na data da rescisão (art. 59, §3º).
      </p>

      <h2>Como o cálculo funciona</h2>
      <ol>
        <li>Para cada dia, calcula-se a diferença: horas trabalhadas − horas previstas.</li>
        <li>Somam-se as diferenças de todos os dias (positivas e negativas).</li>
        <li>Se houver saldo anterior, ele é somado (crédito) ou subtraído (débito).</li>
      </ol>
      <div className="example">
        <p><strong>Exemplo</strong> — jornada prevista de 8h00:</p>
        <p>Segunda: 9h00 (+1h00). Terça: 7h30 (−0h30). Quarta: 8h45 (+0h45). Quinta: 8h00 (0). Sexta: 7h40 (−0h20).</p>
        <p>
          Saldo: 1h00 − 0h30 + 0h45 − 0h20 = <strong>+0h55</strong> de crédito.
        </p>
      </div>
      <div className="example">
        <p><strong>Folga compensatória</strong></p>
        <p>
          Com saldo anterior de +6h00, tirar meia folga (previsto 4h00, trabalhado 0h00 — informe 0:00) deixa o saldo
          em <strong>+2h00</strong>.
        </p>
      </div>

      <h2>Como acompanhar o banco de horas ao longo do mês</h2>
      <p>
        Lançar dia por dia é o mais preciso, mas para acompanhar o mês inteiro costuma ser mais prático fechar o saldo
        de cada semana e somar as semanas. Um mês hipotético:
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Período</th>
            <th scope="col">Saldo do período</th>
            <th scope="col">Saldo acumulado</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Semana 1</td><td>+2h15</td><td>+2h15</td></tr>
          <tr><td>Semana 2</td><td>−0h40</td><td>+1h35</td></tr>
          <tr><td>Semana 3</td><td>+1h30</td><td>+3h05</td></tr>
          <tr><td>Semana 4</td><td>+0h50</td><td>+3h55</td></tr>
          <tr><td>Folga compensatória (saída 3h mais cedo)</td><td>−3h00</td><td><strong>+0h55</strong></td></tr>
        </tbody>
      </table>
      <p>
        Na calculadora, dá para fazer o mesmo usando uma linha por semana: para um saldo positivo, coloque “Previsto”
        0:00 e o saldo em “Trabalhado” (por exemplo, 2:15); para um saldo negativo, faça o inverso — o saldo em
        “Previsto” (0:40) e 0:00 em “Trabalhado”. Para carregar o resultado do mês passado, use o campo de saldo
        anterior.
      </p>

      <h2>Como conferir o saldo informado pela empresa</h2>
      <ol>
        <li>Peça o espelho de ponto do período e anote as horas trabalhadas de cada dia.</li>
        <li>
          Confira qual jornada diária a empresa considera prevista (8h00, 8h48, 7h20…). É comum o saldo divergir só por
          causa disso.
        </li>
        <li>
          Repare se o espelho mostra as horas em formato centesimal (por exemplo, 0,92 em vez de 0h55). Se for o caso,
          converta com o <Link href="/converter-hora-decimal">conversor de hora decimal</Link> antes de comparar.
        </li>
        <li>Lance os dias aqui e compare o saldo final com o do sistema da empresa.</li>
        <li>Se houver diferença, leve as anotações ao RH apontando os dias em que os números não batem.</li>
      </ol>

      <h2>Erros comuns e limitações</h2>
      <ul>
        <li>
          <strong>Usar a jornada errada.</strong> Quem trabalha 44 horas em 5 dias costuma ter jornada diária de 8h48, e
          não de 8h00. Ajuste o campo de jornada prevista.
        </li>
        <li>
          <strong>Misturar horas extras pagas com banco.</strong> Horas já pagas como extras não devem entrar no saldo.
        </li>
        <li>
          <strong>Prazo de compensação.</strong> A calculadora não controla datas de vencimento dos créditos; verifique o
          prazo do seu acordo.
        </li>
        <li>
          <strong>Regras da empresa.</strong> Algumas normas coletivas usam proporções diferentes de 1 para 1 (por
          exemplo, hora em domingo valendo mais no banco). Nesses casos, ajuste os valores antes de lançar.
        </li>
        <li>
          <strong>Jornada reduzida pela EC 141/2026.</strong> Com a redução do limite semanal para 42 e depois 40 horas,
          a jornada diária prevista pode mudar. Atualize o campo de jornada conforme o seu contrato.
        </li>
      </ul>
      <p>
        Para calcular as horas de cada dia a partir da entrada e saída, use a{" "}
        <Link href="/horas-trabalhadas">calculadora de horas trabalhadas</Link>. Para somas avulsas, a{" "}
        <Link href="/">calculadora de horas</Link> principal resolve.
      </p>
    </CalculatorPageLayout>
  );
}
