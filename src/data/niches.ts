export type NicheMode = "aura" | "vertice";
export type ConversionChannel = "whatsapp" | "formulario";

export interface AuraProtocol {
  id: string;
  name: string;
  category: "Tecnologias a Laser" | "Injetáveis & Bioestímulo" | "Dermatologia Clínica";
  indication: string;
  durationMinutes: number;
  durationLabel: string;
  price: number;
  recovery: string;
  included: string;
  featuredInHero?: boolean;
}

export interface AuraSlot {
  id: string;
  label: string;
  doctor: string;
  room: string;
}

export interface VerticeModule {
  id: string;
  name: string;
  category: "Comercial & CRM" | "Operações & Contratos" | "Dados & Financeiro";
  bottleneckSolved: string;
  weeksEstimate: number;
  basePrice: number;
  deliverable: string;
  stack: string;
  featuredInHero?: boolean;
}

export interface VerticeTeamTier {
  id: string;
  label: string;
  headcount: string;
  multiplier: number;
  description: string;
}

export interface VerticeUrgency {
  id: string;
  label: string;
  timelineNote: string;
  multiplier: number;
}

export interface CaseResult {
  id: string;
  title: string;
  profile: string;
  protocolOrScope: string;
  timeline: string;
  outcomeSummary: string;
  measuredIndicator: string;
  specialistNote: string;
}

export interface SequenceStep {
  stepNumber: string;
  title: string;
  timing: string;
  description: string;
  artifact: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CapturedLead {
  id: string;
  createdAt: string;
  niche: NicheMode;
  channel: ConversionChannel;
  clientName: string;
  clientContact: string;
  clientCompanyOrNote: string;
  selectedItems: string[];
  scheduleOrTimeline: string;
  estimatedTotalBrl: number;
  whatsappPreviewText: string;
}

export const AURA_PROTOCOLS: AuraProtocol[] = [
  {
    id: "consulta-dermatologica",
    name: "Consulta Dermatológica Completa",
    category: "Dermatologia Clínica",
    indication: "Mapeamento digital de pele, tricoscopia ou plano terapêutico individual",
    durationMinutes: 50,
    durationLabel: "50 min",
    price: 450,
    recovery: "Sem tempo de recuperação",
    included: "Dermatoscopia digital Fotofinder + prescrição personalizada + retorno em 21 dias",
    featuredInHero: true,
  },
  {
    id: "laser-lavieen",
    name: "Protocolo Laser Lavieen",
    category: "Tecnologias a Laser",
    indication: "Uniformização de textura, poros dilatados, melasma controlado e viço imediato",
    durationMinutes: 45,
    durationLabel: "45 min",
    price: 890,
    recovery: "Vermelhidão leve por 24h a 36h",
    included: "Preparo anestésico tópico + disparo Thulium 1927nm + máscara calmante pós-laser",
    featuredInHero: true,
  },
  {
    id: "harmonizacao-toxina",
    name: "Harmonização Sutil / Toxina",
    category: "Injetáveis & Bioestímulo",
    indication: "Suavização de linhas dinâmicas do terço superior preservando expressão natural",
    durationMinutes: 40,
    durationLabel: "40 min",
    price: 1290,
    recovery: "Retorno imediato à rotina",
    included: "Marcação anatômica individual + aplicação global (3 regiões) + revisão em 15 dias",
    featuredInHero: true,
  },
  {
    id: "bioestimulador-colageno",
    name: "Bioestimulador de Colágeno",
    category: "Injetáveis & Bioestímulo",
    indication: "Firmeza dérmica progressiva, contorno mandibular e reposição de sustentação",
    durationMinutes: 60,
    durationLabel: "60 min",
    price: 1850,
    recovery: "Edema discreto por 24h",
    included: "1 frasco Sculptra ou Radiesse + cânula atraumática + guia de massagem domiciliar",
    featuredInHero: true,
  },
  {
    id: "ultraformer-mpt",
    name: "Ultrassom Microfocado Ultraformer MPT",
    category: "Tecnologias a Laser",
    indication: "Efeito lifting não cirúrgico de face completa e região submentoniana (papada)",
    durationMinutes: 75,
    durationLabel: "75 min",
    price: 2400,
    recovery: "Sem descamação; sensibilidade leve ao toque",
    included: "650 disparos micropulsados + ponteiras de 1.5mm, 3.0mm e 4.5mm + registro fotográfico 3D",
    featuredInHero: false,
  },
  {
    id: "peeling-renovador",
    name: "Protocolo Clareador & Controle de Melasma",
    category: "Dermatologia Clínica",
    indication: "Hiperpigmentação pós-inflamatória, manchas solares resistentes e fotoenvelhecimento",
    durationMinutes: 40,
    durationLabel: "40 min",
    price: 680,
    recovery: "Descamação fina entre o 3º e 5º dia",
    included: "Peeling químico combinado + drug delivery de ácido tranexâmico + kit home care 7 dias",
    featuredInHero: false,
  },
];

export const AURA_SLOTS: AuraSlot[] = [
  {
    id: "terca-1430",
    label: "Terça 14h30",
    doctor: "Dra. Helena Vasconcelos (CRM-SP 148.920)",
    room: "Suíte Clínica 02 — Jardins",
  },
  {
    id: "quinta-1000",
    label: "Quinta 10h00",
    doctor: "Dr. Rafael Monteiro (CRM-SP 162.410)",
    room: "Suíte Laser & Tecnologias 01",
  },
  {
    id: "sabado-0930",
    label: "Sábado 09h30",
    doctor: "Dra. Helena Vasconcelos (CRM-SP 148.920)",
    room: "Suíte Clínica 01 — Jardins",
  },
];

export const AURA_STEPS: SequenceStep[] = [
  {
    stepNumber: "1",
    title: "Diagnóstico por imagem e escuta clínica",
    timing: "Primeiros 25 minutos da visita",
    description:
      "Antes de qualquer indicação de laser ou injetável, realizamos leitura óptica da barreira cutânea, padrão vascular e profundidade de manchas para evitar sobretratamento.",
    artifact: "Laudo Fotofinder + plano terapêutico impresso e digital",
  },
  {
    stepNumber: "2",
    title: "Execução médica sob anestesia confortável",
    timing: "Durante o procedimento agendado",
    description:
      "Todos os protocolos invasivos e tecnologias de energia são executados exclusivamente por médicos dermatologistas membros da SBD, com rastreabilidade de lote e parâmetros documentados.",
    artifact: "Passaporte de rastreabilidade de insumos e ponteiras",
  },
  {
    stepNumber: "3",
    title: "Acompanhamento de recuperação e revisão clínica",
    timing: "15 a 21 dias após a sessão",
    description:
      "Nossa concierge clínica monitora sua evolução pelo WhatsApp no 2º e 7º dia, com consulta presencial de revisão já incluída no valor do protocolo.",
    artifact: "Comparativo fotográfico padronizado em consulta de retorno",
  },
];

export const AURA_CASES: CaseResult[] = [
  {
    id: "case-aura-1",
    title: "Reabilitação de textura e controle de melasma refratário",
    profile: "Paciente feminina, 38 anos, histórico de rebote com peelings agressivos",
    protocolOrScope: "Consulta Dermatológica + 2 sessões de Laser Lavieen sub-ablativo",
    timeline: "Acompanhamento documentado em 45 dias",
    outcomeSummary:
      "Redução visível do contraste pigmentar nas regiões malares sem efeito rebote, com recuperação da luminosidade natural e fechamento de poros na zona T.",
    measuredIndicator: "Redução de 64% no índice de melanina localizada (leitura óptica)",
    specialistNote:
      "Usamos fluência baixa no Lavieen associada ao ácido tranexâmico tópico, respeitando a barreira cutânea.",
  },
  {
    id: "case-aura-2",
    title: "Reposicionamento de terço médio e linha mandibular sem volume artificial",
    profile: "Paciente masculino, 46 anos, queixa de semblante cansado em chamadas de vídeo",
    protocolOrScope: "Bioestimulador de Colágeno + Harmonização Sutil de terço superior",
    timeline: "Resultado avaliado aos 60 dias pós-sessão única",
    outcomeSummary:
      "Definição limpa do ângulo mandibular e suavização das linhas da glabela mantendo mímica facial íntegra, sem aspecto edemaciado ou preenchimento perceptível.",
    measuredIndicator: "Retorno ao trabalho presencial na mesma tarde, zero afastamento",
    specialistNote:
      "Priorizamos vetorização lateral com bioestimulador em vez de ácido hialurônico volumizador.",
  },
  {
    id: "case-aura-3",
    title: "Estímulo preventivo de colágeno e uniformização pré-evento",
    profile: "Paciente feminina, 31 anos, preparo de pele 90 dias antes do casamento",
    protocolOrScope: "Protocolo Laser Lavieen + Bioestimulador de Colágeno",
    timeline: "Ciclo clínico de 8 semanas",
    outcomeSummary:
      "Espessamento dérmico gradual na região periorbital e acabamento acetinado da epiderme, reduzindo a necessidade de maquiagem corretiva densa.",
    measuredIndicator: "98% de adesão ao cronograma domiciliar sem descamação severa",
    specialistNote:
      "O intervalo de 21 dias entre o bioestímulo e o laser Thulium potencializou a síntese de pró-colágeno.",
  },
];

export const AURA_FAQS: FaqItem[] = [
  {
    question: "O valor da consulta é abatido caso eu realize o procedimento no mesmo dia?",
    answer:
      "Quando o paciente agenda a Consulta Dermatológica Completa junto a um protocolo terapêutico (como Laser Lavieen, Toxina ou Bioestimulador) para a mesma visita, concedemos crédito de R$ 200 sobre o valor combinado, desde que haja indicação clínica confirmada em avaliação.",
  },
  {
    question: "Quem realiza as aplicações de laser e injetáveis na Aura Clínica?",
    answer:
      "Exclusivamente médicos dermatologistas com título de especialista (RQE) registrado no CREMESP. Não delegamos procedimentos injetáveis ou disparo de tecnologias médicas a profissionais não médicos.",
  },
  {
    question: "Posso parcelar o plano terapêutico ou solicitar nota fiscal para reembolso?",
    answer:
      "Sim. Emitimos nota fiscal médica detalhada para solicitação de reembolso da Consulta Dermatológica junto ao seu plano de saúde. Os protocolos estéticos e tecnologias podem ser parcelados em até 6x sem juros no cartão ou com 5% de desconto via PIX.",
  },
  {
    question: "Preciso me afastar do trabalho após o Protocolo Laser Lavieen?",
    answer:
      "Não é necessário afastamento. Na calibragem sub-ablativa que adotamos, a pele apresenta leve eritema (aspecto de sol suave) nas primeiras 24 horas, permitindo uso de protetor solar com cor já na manhã seguinte.",
  },
];

export const VERTICE_MODULES: VerticeModule[] = [
  {
    id: "integracao-whatsapp-crm",
    name: "Integração WhatsApp + CRM",
    category: "Comercial & CRM",
    bottleneckSolved:
      "Vendedores atendendo em aparelhos pessoais sem histórico centralizado, perda de leads e falta de tempo de resposta auditável",
    weeksEstimate: 2,
    basePrice: 4800,
    deliverable:
      "Caixa de entrada oficial multiagente integrada ao HubSpot, Pipedrive ou RD Station + distribuição automática por fila e registro integral de conversas",
    stack: "WhatsApp Cloud API / Evolution + CRM Webhook + Painel de SLA",
    featuredInHero: true,
  },
  {
    id: "automacao-propostas-contratos",
    name: "Automação de Propostas e Contratos",
    category: "Operações & Contratos",
    bottleneckSolved:
      "Horas gastas copiando dados do CRM para documentos Word/PDF, erros de precificação manual e demora na coleta de assinatura",
    weeksEstimate: 2,
    basePrice: 3600,
    deliverable:
      "Geração em 1 clique de propostas e minutas contratuais a partir do negócio no CRM, disparo para Clicksign/DocuSign e baixa automática ao assinar",
    stack: "CRM Triggers + Motor de Templates PDF + API de Assinatura Digital",
    featuredInHero: true,
  },
  {
    id: "painel-indicadores-financeiros",
    name: "Painel de Indicadores Financeiros",
    category: "Dados & Financeiro",
    bottleneckSolved:
      "Fechamento mensal dependente de planilhas desencontradas entre comercial, faturamento (ERP) e conciliação bancária",
    weeksEstimate: 3,
    basePrice: 5200,
    deliverable:
      "Dashboard executivo atualizado de hora em hora com CAC, Receita Recorrente, Inadimplência, Margem por Projeto e Previsão de Caixa 90 dias",
    stack: "Conector Omie / Conta Azul / Bling + PostgreSQL + Painel Web Executivo",
    featuredInHero: true,
  },
  {
    id: "migracao-planilhas-sistema-web",
    name: "Migração de Planilhas para Sistema Web",
    category: "Operações & Contratos",
    bottleneckSolved:
      "Planilhas críticas travando com múltiplos usuários, fórmulas quebradas e ausência de controle de permissão por cargo",
    weeksEstimate: 4,
    basePrice: 7900,
    deliverable:
      "Aplicação web interna sob medida com banco de dados relacional, controle de acesso por perfil, trilha de auditoria e importação histórica",
    stack: "Next.js + PostgreSQL + Autenticação Corporativa + Backups Diários",
    featuredInHero: true,
  },
  {
    id: "roteamento-leads-sla",
    name: "Qualificação & Roteamento Automático de Leads",
    category: "Comercial & CRM",
    bottleneckSolved:
      "Leads de alto ticket esperando horas pelo primeiro contato ou distribuídos para o consultor errado",
    weeksEstimate: 1,
    basePrice: 3200,
    deliverable:
      "Triagem instantânea via formulário/WhatsApp, enriquecimento de CNPJ na Receita Federal e alerta imediato ao executivo responsável em até 45 segundos",
    stack: "API ReceitaWS + Roteador Round-Robin + Alerta Slack/WhatsApp",
    featuredInHero: false,
  },
  {
    id: "auditoria-arquitetura-dados",
    name: "Diagnóstico & Arquitetura de Processos B2B",
    category: "Dados & Financeiro",
    bottleneckSolved:
      "Empresas com múltiplas ferramentas contratadas que não conversam entre si e geram retrabalho administrativo",
    weeksEstimate: 1,
    basePrice: 2900,
    deliverable:
      "Mapa completo da arquitetura atual (As-Is) e futura (To-Be), plano de corte de licenças ociosas e especificação técnica de integrações",
    stack: "Mapeamento BPMN + Auditoria de APIs + Matriz de ROI em 90 dias",
    featuredInHero: false,
  },
];

export const VERTICE_TEAM_TIERS: VerticeTeamTier[] = [
  {
    id: "ate-10",
    label: "Até 10 usuários na operação",
    headcount: "1 a 10 operadores",
    multiplier: 1.0,
    description: "Implantação enxuta com treinamento em turma única e migração direta.",
  },
  {
    id: "11-a-35",
    label: "11 a 35 usuários (Múltiplas áreas)",
    headcount: "11 a 35 operadores",
    multiplier: 1.25,
    description: "Inclui perfis de permissão por diretoria, ambiente de homologação e treinamento por squad.",
  },
  {
    id: "acima-35",
    label: "Acima de 35 usuários (Operação crítica)",
    headcount: "35+ operadores",
    multiplier: 1.55,
    description: "Inclui SSO corporativo, migração assistida em janela noturna e SLA dedicado de 90 dias.",
  },
];

export const VERTICE_URGENCIES: VerticeUrgency[] = [
  {
    id: "padrao",
    label: "Cronograma Padrão (Sprints quinzenais)",
    timelineNote: "Início em 5 dias úteis",
    multiplier: 1.0,
  },
  {
    id: "prioritario",
    label: "Implantação Acelerada (Squad dedicada)",
    timelineNote: "Início em 48h com redução de 30% no prazo",
    multiplier: 1.18,
  },
];

export const VERTICE_STEPS: SequenceStep[] = [
  {
    stepNumber: "1",
    title: "Mapeamento de gargalos e auditoria de dados",
    timing: "Semana 1 do projeto",
    description:
      "Entrevistamos os líderes comerciais e operacionais, auditamos as planilhas e APIs existentes e desenhamos a arquitetura exata antes de escrever qualquer linha de código.",
    artifact: "Blueprint técnico aprovado + cronograma fechado em R$",
  },
  {
    stepNumber: "2",
    title: "Construção em ambiente isolado e migração limpa",
    timing: "Semanas 2 a 4 (conforme escopo)",
    description:
      "Desenvolvemos os conectores, painéis e automações sem interromper a operação atual da sua equipe. Higienizamos cadastros duplicados antes da virada de chave.",
    artifact: "Ambiente de homologação testado com dados reais da empresa",
  },
  {
    stepNumber: "3",
    title: "Treinamento prático da equipe e operação assistida",
    timing: "30 dias pós-implantação",
    description:
      "Treinamos vendedores, analistas e gestores no fluxo novo, entregamos documentação em vídeo curto e monitoramos logs de execução diariamente durante o primeiro mês.",
    artifact: "Repositório de código/automações próprio da sua empresa (sem lock-in)",
  },
];

export const VERTICE_CASES: CaseResult[] = [
  {
    id: "case-vertice-1",
    title: "Unificação de 14 números de WhatsApp ao CRM com geração automática de contratos",
    profile: "Distribuidora de equipamentos hospitalares em São Paulo (28 vendedores)",
    protocolOrScope: "Integração WhatsApp + CRM + Automação de Propostas e Contratos",
    timeline: "Implantado em 3 semanas",
    outcomeSummary:
      "Eliminação total de propostas feitas manualmente em Word. Toda conversa de WhatsApp passou a ficar vinculada ao CNPJ do cliente no CRM, com emissão de minuta contratual em 40 segundos.",
    measuredIndicator: "Tempo médio de envio de proposta caiu de 4h20 para 6 minutos",
    specialistNote:
      "Mantivemos o número principal da empresa via API Oficial e criamos regras automáticas de redistribuição caso um vendedor não responda em 15 minutos.",
  },
  {
    id: "case-vertice-2",
    title: "Substituição de 19 planilhas de controle operacional por sistema web integrado ao Omie",
    profile: "Empresa de engenharia e manutenção predial B2B (45 colaboradores)",
    protocolOrScope: "Migração de Planilhas para Sistema Web + Painel de Indicadores Financeiros",
    timeline: "Implantado em 5 semanas",
    outcomeSummary:
      "Ordens de serviço aprovadas em campo passaram a gerar previsão de faturamento e requisição de compras automaticamente no ERP, encerrando divergências no fechamento mensal.",
    measuredIndicator: "Economia de 110 horas/mês da equipe administrativa e financeira",
    specialistNote:
      "Construímos travas de margem mínima diretamente na tela de orçamento técnico antes do envio ao cliente.",
  },
  {
    id: "case-vertice-3",
    title: "Triagem enriquecida por CNPJ e painel de receita previsível em tempo real",
    profile: "Consultoria tributária e societária B2B (16 consultores)",
    protocolOrScope: "Qualificação de Leads + Painel de Indicadores Financeiros",
    timeline: "Implantado em 2 semanas",
    outcomeSummary:
      "Ao preencher o formulário do site, o sistema consulta porte e regime tributário do CNPJ na Receita Federal e direciona imediatamente para o sócio especialista naquele segmento.",
    measuredIndicator: "Aumento de 34% no comparecimento em reuniões de diagnóstico",
    specialistNote:
      "Integração direta entre captura da landing page, enriquecimento de dados e agenda dos sócios.",
  },
];

export const VERTICE_FAQS: FaqItem[] = [
  {
    question: "A minha empresa fica presa a uma mensalidade de software da Vértice?",
    answer:
      "Não. Trabalhamos no modelo de engenharia sob encomenda com escopo fechado. Todas as automações, bancos de dados e painéis são provisionados nas contas da sua própria empresa. Após a entrega e o período de garantia de 30 dias, você tem autonomia total sem cobrança de licença proprietária.",
  },
  {
    question: "Vocês integram com os sistemas que já utilizamos hoje (Omie, Conta Azul, Pipedrive, HubSpot, RD)?",
    answer:
      "Sim. Mais de 90% dos nossos projetos conectam as ferramentas que sua operação já domina. Quando um sistema legado não possui API aberta, construímos rotinas seguras de sincronização via banco de dados ou webhooks.",
  },
  {
    question: "Como funciona o pagamento dos projetos de implementação?",
    answer:
      "Operamos com cronograma atrelado a entregas: 40% na aprovação do blueprint técnico (Semana 1), 30% na entrega do ambiente de homologação e 30% após a virada em produção e treinamento da equipe, com emissão de NF-e corporativa.",
  },
  {
    question: "Nossa equipe tem pouca familiaridade técnica. A adoção costuma ser difícil?",
    answer:
      "Desenhamos telas e automações para reduzir etapas manuais, não para adicionar jargão técnico. Um vendedor continua usando o CRM ou WhatsApp normalmente — a diferença é que o contrato e o histórico passam a ser preenchidos sozinhos nos bastidores.",
  },
];

export const INITIAL_SAMPLE_LEADS: CapturedLead[] = [
  {
    id: "lead-demo-01",
    createdAt: "Hoje, 09:14",
    niche: "aura",
    channel: "whatsapp",
    clientName: "Mariana Alencar",
    clientContact: "(11) 99412-8830",
    clientCompanyOrNote: "Primeira vez na clínica — preferência período da tarde",
    selectedItems: ["Protocolo Laser Lavieen", "Consulta Dermatológica Completa"],
    scheduleOrTimeline: "Terça 14h30",
    estimatedTotalBrl: 1340,
    whatsappPreviewText:
      "Olá, equipe da Aura Clínica! Meu nome é Mariana Alencar. Gostaria de reservar o horário de Terça 14h30 para: Protocolo Laser Lavieen + Consulta Dermatológica Completa (Total estimado: R$ 1.340).",
  },
  {
    id: "lead-demo-02",
    createdAt: "Hoje, 10:02",
    niche: "vertice",
    channel: "formulario",
    clientName: "Roberto Cavalcanti",
    clientContact: "roberto@logisticaaltosul.com.br / (11) 98105-4419",
    clientCompanyOrNote: "Altosul Logística (11 a 35 usuários)",
    selectedItems: ["Integração WhatsApp + CRM", "Automação de Propostas e Contratos"],
    scheduleOrTimeline: "Cronograma Padrão (4 semanas)",
    estimatedTotalBrl: 10500,
    whatsappPreviewText:
      "Olá, Vértice B2B! Sou Roberto Cavalcanti (Altosul Logística). Solicitei diagnóstico técnico para: Integração WhatsApp + CRM + Automação de Propostas e Contratos (Investimento estimado: R$ 10.500).",
  },
];

export function formatBrl(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
