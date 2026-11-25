import type { FaqItem } from "@/types";

export const homeFaqs: FaqItem[] = [
  {
    question: "Como somar horas e minutos?",
    answer:
      "Some as horas com as horas e os minutos com os minutos. Se os minutos passarem de 59, converta cada 60 minutos em 1 hora. Exemplo: 7h20 + 1h50 = 8h70 = 9h10.",
  },
  {
    question: "Por que a calculadora comum dá resultado errado ao somar horas?",
    answer:
      "A calculadora comum trabalha em base 10, enquanto o tempo usa base 60 (1 hora = 60 minutos). Digitar 7,20 + 1,50 resulta em 8,70, mas o correto é 9h10, porque 70 minutos equivalem a 1 hora e 10 minutos.",
  },
  {
    question: "Como subtrair horas quando os minutos não dão?",
    answer:
      "Pegue 1 hora emprestada e transforme em 60 minutos. Exemplo: 8h15 − 2h40. Como 15 é menor que 40, 8h15 vira 7h75; então 7h75 − 2h40 = 5h35.",
  },
  {
    question: "Como converter horas e minutos em hora decimal?",
    answer:
      "Divida os minutos por 60 e some às horas. 7h30 = 7 + 30/60 = 7,5. 7h20 = 7 + 20/60 ≈ 7,33. Use a hora decimal para multiplicar pelo valor da hora.",
  },
  {
    question: "A calculadora aceita totais acima de 24 horas ou negativos?",
    answer:
      "Sim. O resultado é uma duração, não um horário do relógio, então pode passar de 24 horas (por exemplo, 30h30 em uma semana). Se as subtrações forem maiores que as somas, o total aparece negativo, como −1h15.",
  },
  {
    question: "O que acontece se eu digitar 70 minutos em um campo?",
    answer:
      "A calculadora aceita de 0 a 59 minutos por campo e mostra um aviso para valores maiores, para evitar erros de digitação. Para 70 minutos, digite 1 hora e 10 minutos.",
  },
  {
    question: "Meus dados são salvos ou enviados para algum lugar?",
    answer:
      "Não. Todos os cálculos são feitos no seu navegador. Os valores digitados não são enviados a servidores nem gravados no seu dispositivo, e não é preciso criar conta.",
  },
  {
    question: "Como calcular quanto vou receber pelas horas?",
    answer:
      "Informe o valor por hora no campo opcional. A calculadora converte o total para hora decimal e multiplica pelo valor, arredondando ao centavo. Exemplo: 9h10 a R$ 25,00 por hora = 9,1667 × 25 = R$ 229,17.",
  },
];
