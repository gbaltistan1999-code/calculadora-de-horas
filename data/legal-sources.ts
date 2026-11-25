/**
 * Official legal sources (planalto.gov.br), checked on 25/11/2026.
 * Re-check before launch and whenever the law changes.
 */
export const legalSources = {
  cf: {
    label: "Constituição Federal, art. 7º",
    url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
  },
  ec141: {
    label: "Emenda Constitucional nº 141/2026",
    url: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc141.htm",
  },
  clt: {
    label: "CLT (Decreto-Lei nº 5.452/1943)",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm",
  },
  rural: {
    label: "Lei nº 5.889/1973 (trabalho rural)",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l5889.htm",
  },
  domestico: {
    label: "Lei Complementar nº 150/2015 (trabalho doméstico)",
    url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp150.htm",
  },
  lgpd: {
    label: "Lei nº 13.709/2018 (LGPD)",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
  },
} as const;

export type LegalSourceKey = keyof typeof legalSources;
