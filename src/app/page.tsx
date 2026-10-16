"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  NicheMode,
  ConversionChannel,
  CapturedLead,
  INITIAL_SAMPLE_LEADS,
  AURA_PROTOCOLS,
  VERTICE_MODULES,
  formatBrl,
} from "@/data/niches";
import { PortfolioDemoBar } from "@/components/PortfolioDemoBar";
import { HeroConfigurator } from "@/components/HeroConfigurator";
import { Check, MessageSquare } from "lucide-react";

// Lazy-load below-the-fold sections for optimal initial bundle and LCP
const ArchitecturalTable = dynamic(
  () =>
    import("@/components/ArchitecturalTable").then((m) => m.ArchitecturalTable),
  { ssr: true }
);

const MethodologyAndCases = dynamic(
  () =>
    import("@/components/MethodologyAndCases").then(
      (m) => m.MethodologyAndCases
    ),
  { ssr: true }
);

const STORAGE_KEY = "arkea_lp_conversao_leads_v1";

export default function LandingPageConversao() {
  const [niche, setNiche] = useState<NicheMode>("aura");
  const [conversionFocus, setConversionFocus] =
    useState<ConversionChannel>("whatsapp");

  // Aura Planner State
  const [selectedAuraIds, setSelectedAuraIds] = useState<string[]>([
    "laser-lavieen",
    "consulta-dermatologica",
  ]);
  const [selectedAuraSlotId, setSelectedAuraSlotId] =
    useState<string>("terca-1430");

  // Vértice B2B Estimator State
  const [selectedVerticeIds, setSelectedVerticeIds] = useState<string[]>([
    "integracao-whatsapp-crm",
    "automacao-propostas-contratos",
  ]);
  const [selectedTeamTierId, setSelectedTeamTierId] =
    useState<string>("11-a-35");
  const [selectedUrgencyId, setSelectedUrgencyId] = useState<string>("padrao");

  // Captured Leads Drawer State
  const [leads, setLeads] = useState<CapturedLead[]>(INITIAL_SAMPLE_LEADS);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
        }
      }
    } catch {
      // Fallback to default sample leads
    }
  }, []);

  const handleToggleAuraProtocol = (id: string) => {
    setSelectedAuraIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleVerticeModule = (id: string) => {
    setSelectedVerticeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCaptureLead = (
    newLeadData: Omit<CapturedLead, "id" | "createdAt">
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newLead: CapturedLead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: `Agora, ${timeStr}`,
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }
  };

  const handleResetLeads = () => {
    setLeads(INITIAL_SAMPLE_LEADS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const currentSelectionCount =
    niche === "aura" ? selectedAuraIds.length : selectedVerticeIds.length;

  const currentEstimatedTotal =
    niche === "aura"
      ? Math.max(
          0,
          AURA_PROTOCOLS.filter((p) => selectedAuraIds.includes(p.id)).reduce(
            (acc, p) => acc + p.price,
            0
          ) -
            (selectedAuraIds.includes("consulta-dermatologica") &&
            selectedAuraIds.some((id) => id !== "consulta-dermatologica")
              ? 200
              : 0)
        )
      : VERTICE_MODULES.filter((m) =>
          selectedVerticeIds.includes(m.id)
        ).reduce((acc, m) => acc + m.basePrice, 0);

  return (
    <div
      data-niche={niche}
      className={`min-h-screen transition-colors duration-200 ${
        niche === "aura"
          ? "bg-[#F8F9FA] text-[#182226]"
          : "bg-[#F3F4F6] text-[#121820]"
      }`}
    >
      {/* Compact Demo Switcher */}
      <PortfolioDemoBar
        niche={niche}
        onSelectNiche={(mode) => {
          setNiche(mode);
          setConversionFocus(mode === "aura" ? "whatsapp" : "formulario");
        }}
        leads={leads}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={setIsDrawerOpen}
        onClearLeads={handleResetLeads}
      />

      {/* Clean, Spacious Brand Header */}
      <header
        className={`border-b ${
          niche === "aura"
            ? "border-[#CFD8DC] bg-[#F8F9FA]"
            : "border-[#D1D5DB] bg-white"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Clean Brand Identity */}
          <a href="#planejador-hero" className="flex items-baseline gap-3">
            <span
              className={
                niche === "aura"
                  ? "font-serif text-2xl font-medium tracking-tight text-[#182226]"
                  : "font-sans text-xl font-bold tracking-tight text-[#121820]"
              }
            >
              {niche === "aura" ? "Aura Clínica" : "Vértice Sistemas"}
            </span>
            <span className="hidden text-xs font-medium text-[#37474F] sm:inline-block">
              {niche === "aura" ? "Dermatologia • São Paulo" : "Automação B2B"}
            </span>
          </a>

          {/* Center: 3 Spaced Navigation Links */}
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-10 text-sm font-medium text-[#334155] md:flex"
          >
            <a
              href="#protocolos"
              className="transition-colors hover:text-[#121820]"
            >
              {niche === "aura" ? "Procedimentos e Valores" : "Soluções e Prazos"}
            </a>
            <a
              href="#metodologia"
              className="transition-colors hover:text-[#121820]"
            >
              {niche === "aura" ? "Corpo Clínico" : "Como Funciona"}
            </a>
            <a
              href="#duvidas"
              className="transition-colors hover:text-[#121820]"
            >
              Dúvidas
            </a>
          </nav>

          {/* Right: Single Direct Primary Option */}
          <a
            href="#planejador-hero"
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
              niche === "aura"
                ? "bg-[#1F4E46] hover:bg-[#173B35]"
                : "bg-[#1D4ED8] hover:bg-[#1E40AF]"
            }`}
          >
            <span>
              {niche === "aura" ? "Agendar avaliação" : "Simular projeto"}
            </span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* HERO SECTION — Clean Left Narrative + Right Focused Configurator */}
        <section
          id="planejador-hero"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column (Cols 1-6): Focused Value Proposition & Direct Action */}
            <div className="lg:col-span-6">
              <h1
                className={`text-4xl leading-[1.12] tracking-tight sm:text-5xl ${
                  niche === "aura"
                    ? "font-serif font-medium text-[#182226]"
                    : "font-sans font-bold text-[#121820]"
                }`}
              >
                {niche === "aura"
                  ? "Dermatologia clínica e laser com indicação médica individualizada"
                  : "Unifique seu WhatsApp, CRM e contratos em uma operação sem planilhas"}
              </h1>

              <p
                className={`mt-5 max-w-[56ch] text-base leading-relaxed sm:text-lg ${
                  niche === "aura" ? "text-[#37474F]" : "text-[#374151]"
                }`}
              >
                {niche === "aura"
                  ? "Protocolos faciais e corporais conduzidos exclusivamente por médicos dermatologistas no Jardim Paulista. Consulte os valores ao lado e reserve seu horário sem fila de espera."
                  : "Projetamos e implantamos automações comerciais e painéis financeiros integrados ao seu ERP em até 4 semanas. Selecione os módulos ao lado para calcular seu escopo."}
              </p>

              {/* 3 Clean Bullet Points */}
              <ul className="mt-7 space-y-3 text-sm">
                {niche === "aura" ? (
                  <>
                    <li className="flex items-center gap-3 text-[#182226]">
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D7E4E0] text-[#1F4E46]"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        Atendimento 100% médico (SBD / RQE) com diagnóstico óptico da pele
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-[#182226]">
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D7E4E0] text-[#1F4E46]"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        Abatimento de R$ 200 na consulta ao realizar procedimento no mesmo dia
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-[#182226]">
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D7E4E0] text-[#1F4E46]"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        Acompanhamento pós-procedimento direto com a dermatologista
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-3 text-[#121820]">
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1D4ED8]"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        Projeto com escopo fechado e código próprio, sem mensalidade por usuário
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-[#121820]">
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1D4ED8]"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        Integração direta com Omie, Conta Azul, HubSpot, Pipedrive e RD Station
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-[#121820]">
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1D4ED8]"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        Treinamento prático da equipe e 30 dias de operação assistida
                      </span>
                    </li>
                  </>
                )}
              </ul>

              {/* Direct Primary Action + Secondary Anchor */}
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                    niche === "aura"
                      ? "Olá! Gostaria de agendar uma avaliação dermatológica na Aura Clínica."
                      : "Olá! Gostaria de agendar um diagnóstico técnico com a Vértice."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors ${
                    niche === "aura"
                      ? "bg-[#1F4E46] hover:bg-[#173B35]"
                      : "bg-[#1D4ED8] hover:bg-[#1E40AF]"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {niche === "aura"
                      ? "Falar com a clínica no WhatsApp"
                      : "Falar com consultor no WhatsApp"}
                  </span>
                </a>

                <a
                  href="#protocolos"
                  className="text-sm font-semibold text-[#334155] underline-offset-4 hover:text-[#121820] hover:underline"
                >
                  {niche === "aura"
                    ? "Ver tabela completa de procedimentos"
                    : "Ver detalhes dos módulos"}
                </a>
              </div>
            </div>

            {/* Right Column (Cols 7-12): Focused Interactive Planner */}
            <div className="lg:col-span-6">
              <HeroConfigurator
                niche={niche}
                conversionFocus={conversionFocus}
                selectedAuraIds={selectedAuraIds}
                onToggleAuraProtocol={handleToggleAuraProtocol}
                selectedAuraSlotId={selectedAuraSlotId}
                onSelectAuraSlot={setSelectedAuraSlotId}
                selectedVerticeIds={selectedVerticeIds}
                onToggleVerticeModule={handleToggleVerticeModule}
                selectedTeamTierId={selectedTeamTierId}
                onSelectTeamTier={setSelectedTeamTierId}
                selectedUrgencyId={selectedUrgencyId}
                onSelectUrgency={setSelectedUrgencyId}
                onCaptureLead={handleCaptureLead}
              />
            </div>
          </div>
        </section>

        {/* LAZY-LOADED BELOW-THE-FOLD SECTIONS */}
        <ArchitecturalTable
          niche={niche}
          selectedAuraIds={selectedAuraIds}
          onToggleAuraProtocol={handleToggleAuraProtocol}
          selectedVerticeIds={selectedVerticeIds}
          onToggleVerticeModule={handleToggleVerticeModule}
        />

        <MethodologyAndCases niche={niche} />
      </main>

      {/* Conversion Footer */}
      <footer
        className={`border-t py-12 ${
          niche === "aura"
            ? "border-[#CFD8DC] bg-[#182226] text-[#F8F9FA]"
            : "border-[#D1D5DB] bg-[#121820] text-[#F3F4F6]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2
                className={`text-2xl ${
                  niche === "aura"
                    ? "font-serif font-medium"
                    : "font-sans font-bold"
                }`}
              >
                {niche === "aura"
                  ? "Agende sua consulta dermatológica no Jardim Paulista"
                  : "Pronto para automatizar sua operação comercial?"}
              </h2>
              <p className="mt-2 text-sm text-[#E2E8F0]">
                {niche === "aura"
                  ? `Plano selecionado: ${currentSelectionCount} procedimento(s) (${formatBrl(
                      currentEstimatedTotal
                    )}).`
                  : `Escopo selecionado: ${currentSelectionCount} módulo(s).`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#planejador-hero"
                className={`rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors ${
                  niche === "aura"
                    ? "bg-[#1F4E46] hover:bg-[#2A685D]"
                    : "bg-[#1D4ED8] hover:bg-[#2563EB]"
                }`}
              >
                {niche === "aura"
                  ? "Reservar horário agora"
                  : "Solicitar diagnóstico"}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-[#CBD5E1] sm:flex-row">
            <p>
              {niche === "aura"
                ? "Aura Clínica Dermatológica — Rua Oscar Freire, 1420, São Paulo/SP. CRM-SP 148.920."
                : "Vértice Sistemas & Operações B2B — Av. Paulista, 1636, São Paulo/SP."}
            </p>
            <p>Projeto 01 — Portfólio de Serviços Web</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
