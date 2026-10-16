"use client";

import React, { useState } from "react";
import {
  NicheMode,
  AURA_STEPS,
  AURA_CASES,
  AURA_FAQS,
  VERTICE_STEPS,
  VERTICE_CASES,
  VERTICE_FAQS,
} from "@/data/niches";
import { ChevronDown, CheckCircle2, Award, Shield } from "lucide-react";

interface MethodologyAndCasesProps {
  niche: NicheMode;
}

export function MethodologyAndCases({ niche }: MethodologyAndCasesProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const steps = niche === "aura" ? AURA_STEPS : VERTICE_STEPS;
  const cases = niche === "aura" ? AURA_CASES : VERTICE_CASES;
  const faqs = niche === "aura" ? AURA_FAQS : VERTICE_FAQS;

  return (
    <>
      {/* Section 1: Sequential Methodology & Specialist Credentials */}
      <section
        id="metodologia"
        className={`border-t py-16 sm:py-20 ${
          niche === "aura"
            ? "border-[#CFD8DC] bg-[#ECEFF1]"
            : "border-[#D1D5DB] bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column (Cols 1-5): Direction & Credentials */}
            <div className="lg:col-span-5">
              <p
                className={`text-sm font-medium ${
                  niche === "aura" ? "text-[#1F4E46]" : "text-[#1D4ED8]"
                }`}
              >
                {niche === "aura"
                  ? "Corpo clínico e jornada do paciente"
                  : "Engenharia de implantação em três etapas"}
              </p>

              <h2
                className={`mt-2 text-3xl tracking-tight sm:text-4xl ${
                  niche === "aura"
                    ? "font-serif font-medium text-[#182226]"
                    : "font-sans font-bold text-[#121820]"
                }`}
              >
                {niche === "aura"
                  ? "Rigor dermatológico antes, durante e após cada sessão"
                  : "Como substituímos retrabalho manual por sistemas auditáveis"}
              </h2>

              <p
                className={`mt-4 max-w-[60ch] text-base leading-relaxed ${
                  niche === "aura" ? "text-[#48565C]" : "text-[#4B5563]"
                }`}
              >
                {niche === "aura"
                  ? "Rejeitamos protocolos padronizados de balcão. Cada indicação parte da leitura objetiva da sua pele e respeita a anatomia natural do rosto."
                  : "Não vendemos horas abertas de consultoria nem relatórios teóricos. Entramos na operação para conectar bancos de dados, CRM e financeiro com prazo fechado."}
              </p>

              {/* Specialist / Team Credential Box */}
              <div
                className={`mt-8 rounded-xl border p-5 ${
                  niche === "aura"
                    ? "border-[#CFD8DC] bg-white"
                    : "border-[#D1D5DB] bg-[#F3F4F6]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award
                    className={`h-5 w-5 ${
                      niche === "aura" ? "text-[#1F4E46]" : "text-[#1D4ED8]"
                    }`}
                  />
                  <h3 className="text-sm font-semibold text-[#182226]">
                    {niche === "aura"
                      ? "Direção Médica Responsável"
                      : "Liderança Técnica de Arquitetura"}
                  </h3>
                </div>

                {niche === "aura" ? (
                  <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#48565C]">
                    <p>
                      <strong className="text-[#182226]">
                        Dra. Helena Vasconcelos
                      </strong>{" "}
                      — CRM-SP 148.920 / RQE 61.402. Médica dermatologista
                      titular da Sociedade Brasileira de Dermatologia (SBD),
                      preceptora em tecnologias a laser e cosmiatria médica.
                    </p>
                    <p>
                      <strong className="text-[#182226]">
                        Dr. Rafael Monteiro
                      </strong>{" "}
                      — CRM-SP 162.410 / RQE 70.118. Especialista em
                      bioestimuladores dérmicos, ultrassom microfocado e
                      reabilitação da barreira cutânea.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#4B5563]">
                    <p>
                      <strong className="text-[#121820]">
                        Lucas Andrade, Engenheiro Chefe
                      </strong>{" "}
                      — 12 anos estruturando integrações de ERP (Omie, TOTVS,
                      SAP B1) e arquiteturas comerciais de alto volume em
                      HubSpot e Pipedrive.
                    </p>
                    <p>
                      <strong className="text-[#121820]">
                        Beatriz Nogueira, Líder de Automação & Dados
                      </strong>{" "}
                      — Especialista em migração de planilhas críticas para
                      aplicações web em PostgreSQL e governança de indicadores
                      financeiros.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column (Cols 6-12): True Sequential Timeline (Steps 1, 2, 3) */}
            <div className="lg:col-span-7">
              <ol className="space-y-4">
                {steps.map((step) => (
                  <li
                    key={step.stepNumber}
                    className={`rounded-xl border p-6 ${
                      niche === "aura"
                        ? "border-[#CFD8DC] bg-white"
                        : "border-[#D1D5DB] bg-[#F3F4F6]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white ${
                            niche === "aura" ? "bg-[#1F4E46]" : "bg-[#1D4ED8]"
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                        <h3
                          className={`text-lg ${
                            niche === "aura"
                              ? "font-serif font-medium text-[#182226]"
                              : "font-sans font-bold text-[#121820]"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <span
                        className={`rounded px-2.5 py-1 text-xs font-medium ${
                          niche === "aura"
                            ? "bg-[#ECEFF1] text-[#182226]"
                            : "bg-white text-[#121820]"
                        }`}
                      >
                        {step.timing}
                      </span>
                    </div>

                    <p
                      className={`mt-3 max-w-[65ch] text-sm leading-relaxed ${
                        niche === "aura" ? "text-[#48565C]" : "text-[#4B5563]"
                      }`}
                    >
                      {step.description}
                    </p>

                    <div
                      className={`mt-4 flex items-center gap-2 border-t pt-3 text-xs font-medium ${
                        niche === "aura"
                          ? "border-[#ECEFF1] text-[#1F4E46]"
                          : "border-[#D1D5DB] text-[#1D4ED8]"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>Entregável da etapa: {step.artifact}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Documented Case Results */}
      <section
        id="resultados"
        className={`border-t py-16 sm:py-20 ${
          niche === "aura"
            ? "border-[#CFD8DC] bg-[#F8F9FA]"
            : "border-[#D1D5DB] bg-[#F3F4F6]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p
              className={`text-sm font-medium ${
                niche === "aura" ? "text-[#1F4E46]" : "text-[#1D4ED8]"
              }`}
            >
              {niche === "aura"
                ? "Casos clínicos documentados na unidade Jardins"
                : "Resultados operacionais auditados em clientes B2B"}
            </p>
            <h2
              className={`mt-2 text-3xl tracking-tight sm:text-4xl ${
                niche === "aura"
                  ? "font-serif font-medium text-[#182226]"
                  : "font-sans font-bold text-[#121820]"
              }`}
            >
              {niche === "aura"
                ? "Evoluções reais com preservação da naturalidade"
                : "Impacto direto em velocidade comercial e fechamento financeiro"}
            </h2>
          </div>

          <div className="mt-10 divide-y divide-[#CFD8DC] overflow-hidden rounded-xl border border-[#CFD8DC] bg-white">
            {cases.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <span
                    className={`inline-block rounded px-2.5 py-1 text-xs font-medium ${
                      niche === "aura"
                        ? "bg-[#D7E4E0] text-[#182226]"
                        : "bg-[#DBEAFE] text-[#1D4ED8]"
                    }`}
                  >
                    {item.timeline}
                  </span>
                  <h3
                    className={`mt-3 text-xl ${
                      niche === "aura"
                        ? "font-serif font-medium text-[#182226]"
                        : "font-sans font-bold text-[#121820]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#4B5563]">{item.profile}</p>
                  <p className="mt-2 text-xs font-semibold text-[#182226]">
                    Protocolo / Escopo: {item.protocolOrScope}
                  </p>
                </div>

                <div className="flex flex-col justify-between lg:col-span-5">
                  <p className="max-w-[62ch] text-sm leading-relaxed text-[#182226]">
                    {item.outcomeSummary}
                  </p>
                  <p className="mt-4 rounded-lg bg-[#F8F9FA] p-3 text-xs italic text-[#48565C]">
                    Nota técnica: “{item.specialistNote}”
                  </p>
                </div>

                <div className="flex flex-col justify-center rounded-lg border border-[#ECEFF1] bg-[#F8F9FA] p-4 lg:col-span-3">
                  <span className="text-xs font-medium text-[#48565C]">
                    Indicador verificado
                  </span>
                  <p
                    className={`mt-1.5 text-base font-semibold ${
                      niche === "aura" ? "text-[#1F4E46]" : "text-[#1D4ED8]"
                    }`}
                  >
                    {item.measuredIndicator}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive FAQ */}
      <section
        id="duvidas"
        className={`border-t py-16 sm:py-20 ${
          niche === "aura"
            ? "border-[#CFD8DC] bg-[#ECEFF1]"
            : "border-[#D1D5DB] bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p
                className={`text-sm font-medium ${
                  niche === "aura" ? "text-[#1F4E46]" : "text-[#1D4ED8]"
                }`}
              >
                Perguntas frequentes antes do agendamento
              </p>
              <h2
                className={`mt-2 text-3xl tracking-tight ${
                  niche === "aura"
                    ? "font-serif font-medium text-[#182226]"
                    : "font-sans font-bold text-[#121820]"
                }`}
              >
                Respostas diretas sobre valores, execução e garantias
              </h2>
              <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-[#48565C]">
                Caso sua dúvida específica não esteja abaixo, envie uma mensagem
                pelo planejador no topo da página para falar diretamente com
                nossa equipe.
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#CFD8DC] bg-white p-4">
                <Shield
                  className={`mt-0.5 h-5 w-5 shrink-0 ${
                    niche === "aura" ? "text-[#1F4E46]" : "text-[#1D4ED8]"
                  }`}
                />
                <div className="text-xs leading-relaxed text-[#48565C]">
                  {niche === "aura" ? (
                    <>
                      <strong className="block text-[#182226]">
                        Atendimento particular e reembolso assistido
                      </strong>
                      Preparamos toda a documentação clínica e recibo médico
                      detalhado para reembolso junto aos principais convênios
                      (Bradesco Saúde, SulAmérica, Omint, Porto Seguro e Care
                      Plus).
                    </>
                  ) : (
                    <>
                      <strong className="block text-[#121820]">
                        Garantia contratual de funcionamento de 30 dias
                      </strong>
                      Qualquer ajuste fino de regra de negócio ou conector nos
                      primeiros 30 dias após a entrada em produção é coberto
                      integralmente pelo escopo fechado.
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 lg:col-span-7">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-xl border border-[#CFD8DC] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? null : index)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-[#182226] sm:text-base">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#48565C] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#ECEFF1] px-6 py-4 text-sm leading-relaxed text-[#48565C]">
                        <p className="max-w-[68ch]">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
