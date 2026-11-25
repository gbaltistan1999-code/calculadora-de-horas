import type { CalculatorPageMeta } from "@/types";

export const workedHoursPage: CalculatorPageMeta = {
  path: "/horas-trabalhadas",
  title: "Calculadora de Horas Trabalhadas: Dia e Semana",
  description:
    "Calcule as horas trabalhadas a partir da entrada, saída e intervalo. Veja o total do dia, da semana e em hora decimal. Grátis e sem cadastro.",
  h1: "Calculadora de Horas Trabalhadas",
  shortName: "Horas trabalhadas",
  intro:
    "Informe o horário de entrada, de saída e o intervalo para saber quantas horas você trabalhou no dia — ou preencha a semana inteira para ter o total semanal.",
  related: ["/horas-extras", "/banco-de-horas", "/diferenca-entre-horarios"],
  faqs: [
    {
      question: "Como calcular as horas trabalhadas no dia?",
      answer:
        "Subtraia o horário de entrada do horário de saída e desconte o intervalo. Exemplo: entrada 08:00, saída 17:00 e 1 hora de almoço: 9 horas − 1 hora = 8 horas trabalhadas.",
    },
    {
      question: "O intervalo de almoço conta como hora trabalhada?",
      answer:
        "Em regra, não. Pela CLT (art. 71, §2º), os intervalos de descanso não são computados na duração do trabalho. Por isso a calculadora desconta o intervalo do total.",
    },
    {
      question: "E se eu sair depois da meia-noite?",
      answer:
        "Sem problema. Se o horário de saída for menor que o de entrada (por exemplo, entrada 22:00 e saída 06:00), a calculadora entende que a saída foi no dia seguinte.",
    },
    {
      question: "Como somar as horas trabalhadas da semana?",
      answer:
        "Use o modo Semana: preencha entrada, saída e intervalo de cada dia. Os dias em branco são tratados como folga e o total semanal é somado em base 60.",
    },
    {
      question: "Os 5 minutos de tolerância do ponto são considerados?",
      answer:
        "Não automaticamente. A CLT (art. 58, §1º) prevê que variações de até 5 minutos por marcação, com limite de 10 minutos por dia, não sejam descontadas nem contadas como hora extra. A calculadora mostra o tempo exato; aplique a tolerância conforme o seu caso.",
    },
  ],
};

export const overtimePage: CalculatorPageMeta = {
  path: "/horas-extras",
  title: "Calculadora de Horas Extras: 50%, 100% ou Outro Percentual",
  description:
    "Calcule o valor das horas extras pelo salário ou pelo valor da hora, com adicional de 50%, 100% ou percentual da sua convenção coletiva. Estimativa grátis.",
  h1: "Calculadora de Horas Extras",
  shortName: "Horas extras",
  intro:
    "Descubra quanto valem as suas horas extras a partir do salário mensal ou do valor da hora, escolhendo o percentual de adicional que se aplica a você.",
  related: ["/horas-trabalhadas", "/banco-de-horas", "/converter-hora-decimal"],
  faqs: [
    {
      question: "Qual é o adicional mínimo de hora extra?",
      answer:
        "A Constituição Federal (art. 7º, XVI) e a CLT (art. 59, §1º) determinam que a hora extra seja paga com acréscimo de, no mínimo, 50% sobre a hora normal. Convenções coletivas podem prever percentuais maiores.",
    },
    {
      question: "Quando a hora extra é de 100%?",
      answer:
        "Não há uma regra geral única na CLT para 100%. O percentual de 100% costuma aparecer em convenções coletivas ou em situações como trabalho em domingos e feriados não compensados. Confira a norma da sua categoria.",
    },
    {
      question: "Como calcular o valor da hora a partir do salário?",
      answer:
        "Divida o salário mensal pelo divisor de horas do mês. O divisor 220 é o usado tradicionalmente para a jornada de 44 horas semanais; jornadas menores usam divisores menores, como 200 para 40 horas semanais.",
    },
    {
      question: "Quantas horas extras posso fazer por dia?",
      answer:
        "A CLT (art. 59) permite acrescentar até 2 horas extras por dia, mediante acordo individual, convenção coletiva ou acordo coletivo. Há exceções em situações específicas previstas em lei.",
    },
    {
      question: "O resultado inclui reflexos e descontos?",
      answer:
        "Não. O cálculo mostra apenas o valor bruto das horas extras. Reflexos em descanso semanal remunerado, férias, 13º salário e FGTS, assim como descontos de INSS e IR, não estão incluídos.",
    },
    {
      question: "Por que existem as opções de divisor 210 e 200?",
      answer:
        "A Emenda Constitucional nº 141/2026 reduz gradualmente o limite semanal de 44 para 42 e depois para 40 horas. Com jornadas menores, o divisor mensal também tende a ser menor. Confirme o divisor aplicável ao seu contrato com o RH ou sindicato.",
    },
  ],
};

export const timeBankPage: CalculatorPageMeta = {
  path: "/banco-de-horas",
  title: "Calculadora de Banco de Horas: Saldo Positivo e Negativo",
  description:
    "Calcule o saldo do banco de horas comparando horas previstas e trabalhadas por dia. Veja crédito ou débito em horas e minutos. Grátis e sem cadastro.",
  h1: "Calculadora de Banco de Horas",
  shortName: "Banco de horas",
  intro:
    "Compare a jornada prevista com as horas realmente trabalhadas, dia a dia, e veja se o seu banco de horas está positivo (crédito) ou negativo (débito).",
  related: ["/horas-trabalhadas", "/horas-extras", "/converter-hora-decimal"],
  faqs: [
    {
      question: "O que é banco de horas?",
      answer:
        "É um sistema de compensação em que as horas trabalhadas além da jornada em um dia são compensadas com folgas ou saídas antecipadas em outros dias, em vez de serem pagas como horas extras.",
    },
    {
      question: "Qual é o prazo para compensar o banco de horas?",
      answer:
        "Pela CLT, o banco de horas por acordo ou convenção coletiva pode ter compensação em até um ano (art. 59, §2º); por acordo individual escrito, em até seis meses (art. 59, §5º). A compensação no mesmo mês pode ser feita por acordo individual, tácito ou escrito (art. 59, §6º).",
    },
    {
      question: "O que acontece com as horas não compensadas?",
      answer:
        "Segundo a CLT (art. 59, §3º), se o contrato terminar sem a compensação integral, as horas extras não compensadas devem ser pagas, calculadas sobre o valor da remuneração na data da rescisão.",
    },
    {
      question: "Como funciona o saldo negativo?",
      answer:
        "Saldo negativo significa que você trabalhou menos do que o previsto. As regras para compensar ou descontar esse saldo dependem do acordo de banco de horas da empresa.",
    },
    {
      question: "Posso informar uma jornada de 8h48?",
      answer:
        "Sim. Digite 8:48 no campo de jornada prevista. Esse formato é comum para quem trabalha 44 horas semanais distribuídas em 5 dias.",
    },
  ],
};

export const nightShiftPage: CalculatorPageMeta = {
  path: "/adicional-noturno",
  title: "Calculadora de Adicional Noturno com Hora Reduzida",
  description:
    "Calcule as horas noturnas e o adicional noturno com hora reduzida de 52min30s. Padrões para CLT, doméstico e rural, todos editáveis. Grátis.",
  h1: "Calculadora de Adicional Noturno",
  shortName: "Adicional noturno",
  intro:
    "Informe o horário de trabalho para saber quantas horas caem no período noturno, aplicar a hora reduzida e estimar o valor do adicional noturno.",
  related: ["/horas-extras", "/diferenca-entre-horarios", "/horas-trabalhadas"],
  faqs: [
    {
      question: "Qual é o horário noturno pela CLT?",
      answer:
        "Para o trabalhador urbano, a CLT (art. 73, §2º) considera noturno o trabalho entre as 22 horas de um dia e as 5 horas do dia seguinte.",
    },
    {
      question: "Qual é o percentual do adicional noturno?",
      answer:
        "Pela CLT (art. 73), o trabalho noturno urbano tem acréscimo de pelo menos 20% sobre a hora diurna. Para o trabalhador rural, a Lei nº 5.889/1973 prevê 25%. Convenções coletivas podem prever percentuais maiores.",
    },
    {
      question: "O que é a hora noturna reduzida?",
      answer:
        "Pela CLT (art. 73, §1º), cada hora noturna é computada como 52 minutos e 30 segundos. Assim, 7 horas de relógio entre 22h e 5h equivalem a 8 horas noturnas para fins de pagamento.",
    },
    {
      question: "O trabalhador rural tem hora reduzida?",
      answer:
        "A Lei nº 5.889/1973 não prevê a hora reduzida para o rural; em compensação, o adicional é de 25% e o período noturno é das 21h às 5h na lavoura e das 20h às 4h na pecuária.",
    },
    {
      question: "E o empregado doméstico?",
      answer:
        "A Lei Complementar nº 150/2015 (art. 14) considera noturno o trabalho entre 22h e 5h, com hora de 52 minutos e 30 segundos e adicional mínimo de 20% sobre a hora diurna.",
    },
    {
      question: "A calculadora considera a prorrogação da jornada noturna?",
      answer:
        "Não automaticamente. Quando a jornada noturna é cumprida integralmente e prorrogada após as 5h, há entendimento de que o adicional também incide sobre as horas prorrogadas. Nesses casos, ajuste o fim do período noturno no campo de regras ou confirme com um especialista.",
    },
  ],
};

export const decimalPage: CalculatorPageMeta = {
  path: "/converter-hora-decimal",
  title: "Converter Horas em Decimal (e Decimal em Horas)",
  description:
    "Converta horas e minutos em hora decimal (7h30 = 7,5) e decimal em horas e minutos (7,25 = 7h15). Tabela de minutos em decimal e exemplos.",
  h1: "Conversor de Horas em Decimal",
  shortName: "Converter hora decimal",
  intro:
    "Transforme horas e minutos em número decimal para multiplicar pelo valor da hora ou usar em planilhas — ou faça o caminho inverso.",
  related: ["/horas-extras", "/banco-de-horas", "/horas-trabalhadas"],
  faqs: [
    {
      question: "Como transformar minutos em decimal?",
      answer:
        "Divida os minutos por 60. Exemplo: 45 minutos ÷ 60 = 0,75. Assim, 8h45 equivale a 8,75 horas.",
    },
    {
      question: "Quanto é 7,5 horas em horas e minutos?",
      answer: "7,5 horas são 7 horas e 30 minutos, porque 0,5 × 60 = 30 minutos.",
    },
    {
      question: "Quanto é 1,2 horas em minutos?",
      answer: "1,2 horas são 72 minutos, ou seja, 1 hora e 12 minutos (0,2 × 60 = 12).",
    },
    {
      question: "Por que 7h20 vira 7,33 e não 7,20?",
      answer:
        "Porque 20 minutos são um terço da hora: 20 ÷ 60 = 0,333... O número depois da vírgula na hora decimal não representa minutos, e sim uma fração da hora.",
    },
    {
      question: "Como fazer essa conversão no Excel ou Google Planilhas?",
      answer:
        "Se a célula contém um horário (por exemplo, 07:30), multiplique por 24 e formate como número: =A1*24 resulta em 7,5. Para o caminho inverso, divida por 24 e formate como hora.",
    },
  ],
};

export const timeDiffPage: CalculatorPageMeta = {
  path: "/diferenca-entre-horarios",
  title: "Diferença entre Horários: Calcule o Tempo entre Duas Horas",
  description:
    "Calcule quanto tempo há entre dois horários, inclusive em períodos que passam da meia-noite, como 22:00 às 06:00. Resultado em horas, minutos e decimal.",
  h1: "Calculadora de Diferença entre Horários",
  shortName: "Diferença entre horários",
  intro:
    "Digite um horário inicial e um final para saber quanto tempo se passou entre eles — mesmo quando o período atravessa a meia-noite.",
  related: ["/horas-trabalhadas", "/adicional-noturno", "/converter-hora-decimal"],
  faqs: [
    {
      question: "Como calcular a diferença entre dois horários?",
      answer:
        "Subtraia o horário inicial do final, pegando 60 minutos emprestados quando necessário. Exemplo: 17:15 − 08:40 = 16:75 − 08:40 = 8h35.",
    },
    {
      question: "Como calcular horas que passam da meia-noite?",
      answer:
        "Calcule o tempo até 24:00 e some o tempo depois da meia-noite. De 22:00 às 06:00: 2 horas até a meia-noite + 6 horas depois = 8 horas.",
    },
    {
      question: "E se os dois horários forem iguais?",
      answer:
        "A diferença é zero. Se você quis dizer um período de 24 horas (por exemplo, de 07:00 de um dia às 07:00 do dia seguinte), marque a opção para considerar um dia inteiro.",
    },
    {
      question: "A calculadora funciona para períodos de mais de um dia?",
      answer:
        "Não. Ela calcula intervalos de até 24 horas entre dois horários do relógio. Para somar períodos maiores, use a calculadora de horas principal, que aceita totais acima de 24 horas.",
    },
  ],
};

export const calculatorPages = [workedHoursPage, overtimePage, timeBankPage, nightShiftPage, decimalPage, timeDiffPage];

export function getCalculatorPage(path: string): CalculatorPageMeta {
  const p = calculatorPages.find((c) => c.path === path);
  if (!p) throw new Error(`Unknown calculator page: ${path}`);
  return p;
}
