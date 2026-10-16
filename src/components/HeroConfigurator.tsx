"use client";

import React, { useState } from "react";
import {
  NicheMode,
  ConversionChannel,
  AURA_PROTOCOLS,
  AURA_SLOTS,
  VERTICE_MODULES,
  VERTICE_TEAM_TIERS,
  VERTICE_URGENCIES,
  CapturedLead,
  formatBrl,
} from "@/data/niches";
import {
  Check,
  Clock,
  MessageSquare,
  FileCheck2,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

interface HeroConfiguratorProps {
  niche: NicheMode;
  conversionFocus: ConversionChannel;
  selectedAuraIds: string[];
  onToggleAuraProtocol: (id: string) => void;
  selectedAuraSlotId: string;
  onSelectAuraSlot: (id: string) => void;
  selectedVerticeIds: string[];
  onToggleVerticeModule: (id: string) => void;
  selectedTeamTierId: string;
  onSelectTeamTier: (id: string) => void;
  selectedUrgencyId: string;
  onSelectUrgency: (id: string) => void;
  onCaptureLead: (lead: Omit<CapturedLead, "id" | "createdAt">) => void;
}

export function HeroConfigurator({
  niche,
  conversionFocus,
  selectedAuraIds,
  onToggleAuraProtocol,
  selectedAuraSlotId,
  onSelectAuraSlot,
  selectedVerticeIds,
  onToggleVerticeModule,
  selectedTeamTierId,
  onSelectTeamTier,
  selectedUrgencyId,
  onSelectUrgency,
  onCaptureLead,
}: HeroConfiguratorProps) {
  const [activeMode, setActiveMode] = useState<ConversionChannel>(conversionFocus);
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [lastConfirmation, setLastConfirmation] = useState<string | null>(null);

  // --- Aura Calculations ---
  const selectedAuraProtocols = AURA_PROTOCOLS.filter((p) =>
    selectedAuraIds.includes(p.id)
  );
  const hasConsultation = selectedAuraIds.includes("consulta-dermatologica");
  const hasOtherProcedure = selectedAuraIds.some(
    (id) => id !== "consulta-dermatologica"
  );
  const auraComboCredit = hasConsultation && hasOtherProcedure ? 200 : 0;
  const auraSubtotal = selectedAuraProtocols.reduce((acc, p) => acc + p.price, 0);
  const auraTotal = Math.max(0, auraSubtotal - auraComboCredit);
  const auraTotalMinutes = selectedAuraProtocols.reduce(
    (acc, p) => acc + p.durationMinutes,
    0
  );
  const activeAuraSlot =
    AURA_SLOTS.find((s) => s.id === selectedAuraSlotId) || AURA_SLOTS[0];

  // --- Vértice Calculations ---
  const selectedVerticeModules = VERTICE_MODULES.filter((m) =>
    selectedVerticeIds.includes(m.id)
  );
  const activeTeamTier =
    VERTICE_TEAM_TIERS.find((t) => t.id === selectedTeamTierId) ||
    VERTICE_TEAM_TIERS[0];
  const activeUrgency =
    VERTICE_URGENCIES.find((u) => u.id === selectedUrgencyId) ||
    VERTICE_URGENCIES[0];

  const verticeBaseSum = selectedVerticeModules.reduce(
    (acc, m) => acc + m.basePrice,
    0
  );
  const verticeEstimatedTotal =
    Math.round(
      (verticeBaseSum * activeTeamTier.multiplier * activeUrgency.multiplier) / 50
    ) * 50;

  const rawWeeks = selectedVerticeModules.reduce(
    (acc, m) => acc + m.weeksEstimate,
    0
  );
  const verticeWeeks =
    selectedUrgencyId === "prioritario"
      ? Math.max(1, Math.ceil(rawWeeks * 0.7))
      : Math.max(1, rawWeeks);

  // --- Formatted WhatsApp Message ---
  const whatsappText =
    niche === "aura"
      ? `Olá, equipe da Aura Clínica!${
          clientName.trim() ? ` Meu nome é ${clientName.trim()}.` : ""
        } Gostaria de reservar o horário de ${
          activeAuraSlot.label
        } para: ${selectedAuraProtocols
          .map((p) => p.name)
          .join(" + ")} (Total estimado: ${formatBrl(auraTotal)}).`
      : `Olá, equipe da Vértice B2B!${
          clientName.trim() ? ` Sou ${clientName.trim()}.` : ""
        } Gostaria de agendar um diagnóstico para o escopo: ${selectedVerticeModules
          .map((m) => m.name)
          .join(" + ")} | Equipe: ${activeTeamTier.label} (Prazo estimado: ${verticeWeeks} semanas | Investimento estimado: ${formatBrl(
          verticeEstimatedTotal
        )}).`;

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (niche === "aura" && selectedAuraProtocols.length === 0) {
      setFormError("Selecione pelo menos um procedimento acima.");
      return;
    }

    if (niche === "vertice" && selectedVerticeModules.length === 0) {
      setFormError("Selecione pelo menos um módulo operacional acima.");
      return;
    }

    if (activeMode === "formulario" && (!clientName.trim() || !clientContact.trim())) {
      setFormError("Informe seu nome e WhatsApp para confirmarmos o agendamento.");
      return;
    }

    onCaptureLead({
      niche,
      channel: activeMode,
      clientName: clientName.trim() || "Visitante via WhatsApp",
      clientContact: clientContact.trim() || "Atendimento direto no WhatsApp",
      clientCompanyOrNote:
        niche === "aura" ? activeAuraSlot.doctor : activeTeamTier.label,
      selectedItems:
        niche === "aura"
          ? selectedAuraProtocols.map((p) => p.name)
          : selectedVerticeModules.map((m) => m.name),
      scheduleOrTimeline:
        niche === "aura"
          ? `${activeAuraSlot.label} (${auraTotalMinutes} min)`
          : `${verticeWeeks} semanas (${activeUrgency.label})`,
      estimatedTotalBrl: niche === "aura" ? auraTotal : verticeEstimatedTotal,
      whatsappPreviewText: whatsappText,
    });

    if (activeMode === "whatsapp") {
      setLastConfirmation(
        "Resumo pronto para o WhatsApp e salvo nos leads da demonstração."
      );
    } else {
      setLastConfirmation(
        niche === "aura"
          ? `Pré-reserva solicitada para ${activeAuraSlot.label}.`
          : `Solicitação de diagnóstico registrada para ${clientName.trim()}.`
      );
      setClientName("");
      setClientContact("");
    }
  };

  if (niche === "aura") {
    return (
      <div className="rounded-2xl border border-[#CFD8DC] bg-white p-6 shadow-sm sm:p-8">
        {/* Clean Header */}
        <div className="flex items-baseline justify-between border-b border-[#ECEFF1] pb-4">
          <h2 className="font-serif text-2xl font-medium text-[#182226]">
            Simular valores e horário
          </h2>
          <span className="text-xs font-semibold text-[#1F4E46]">
            Jardim Paulista, SP
          </span>
        </div>

        {/* Step 1: Select Clinical Protocols */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-[#37474F]">
            1. Selecione os procedimentos de interesse
          </p>

          <div
            role="group"
            aria-label="Procedimentos dermatológicos disponíveis"
            className="mt-2.5 space-y-2"
          >
            {AURA_PROTOCOLS.slice(0, 4).map((protocol) => {
              const isSelected = selectedAuraIds.includes(protocol.id);
              return (
                <button
                  key={protocol.id}
                  type="button"
                  onClick={() => onToggleAuraProtocol(protocol.id)}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors ${
                    isSelected
                      ? "border-[#1F4E46] bg-[#D7E4E0]/75"
                      : "border-[#CFD8DC] bg-[#F8F9FA] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        isSelected
                          ? "border-[#1F4E46] bg-[#1F4E46] text-white"
                          : "border-[#607D8B] bg-white"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#182226]">
                        {protocol.name}
                      </p>
                      <p className="text-xs text-[#37474F]">
                        {protocol.durationLabel}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-[#182226]">
                    {formatBrl(protocol.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Preferred Day & Period */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-[#37474F]">
            2. Escolha o melhor horário para atendimento
          </p>
          <div
            role="group"
            aria-label="Horários disponíveis para consulta"
            className="mt-2 grid grid-cols-3 gap-2"
          >
            {AURA_SLOTS.map((slot) => {
              const isSelected = slot.id === selectedAuraSlotId;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onSelectAuraSlot(slot.id)}
                  aria-pressed={isSelected}
                  className={`rounded-lg border px-3 py-2 text-center text-xs font-semibold transition-colors ${
                    isSelected
                      ? "border-[#1F4E46] bg-[#1F4E46] text-white"
                      : "border-[#CFD8DC] bg-[#F8F9FA] text-[#182226] hover:bg-white"
                  }`}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Total Bar */}
        <div className="mt-5 flex items-center justify-between rounded-xl border border-[#CFD8DC] bg-[#F8F9FA] px-4 py-3.5">
          <div>
            <span className="block text-xs font-medium text-[#37474F]">
              Total estimado ({auraTotalMinutes} min)
            </span>
            <span className="font-serif text-2xl font-semibold text-[#182226]">
              {formatBrl(auraTotal)}
            </span>
          </div>
          <div className="text-right text-xs text-[#37474F]">
            {auraComboCredit > 0 ? (
              <span className="font-semibold text-[#1F4E46]">
                Abatimento de R$ 200 aplicado
              </span>
            ) : (
              <span>Até 6x sem juros</span>
            )}
          </div>
        </div>

        {/* Directed Conversion Action */}
        <form onSubmit={handleAction} className="mt-5 space-y-3">
          {activeMode === "formulario" && (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <input
                type="text"
                aria-label="Seu nome completo"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-lg border border-[#90A4AE] bg-[#F8F9FA] px-3 py-2.5 text-sm text-[#182226] placeholder:text-[#455A64] focus:border-[#1F4E46] focus:bg-white"
              />
              <input
                type="tel"
                aria-label="Seu número de WhatsApp com DDD"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                placeholder="Seu WhatsApp (11) 99999-9999"
                className="w-full rounded-lg border border-[#90A4AE] bg-[#F8F9FA] px-3 py-2.5 text-sm text-[#182226] placeholder:text-[#455A64] focus:border-[#1F4E46] focus:bg-white"
              />
            </div>
          )}

          {formError && (
            <p role="alert" className="text-xs font-semibold text-[#991B1B]">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F4E46] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#173B35]"
          >
            {activeMode === "whatsapp" ? (
              <>
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>Reservar este horário pelo WhatsApp</span>
              </>
            ) : (
              <>
                <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                <span>Confirmar pré-reserva no site</span>
              </>
            )}
          </button>

          {lastConfirmation && (
            <div
              role="status"
              className="rounded-lg border border-[#1F4E46]/30 bg-[#D7E4E0] p-3 text-xs text-[#182226]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2
                    className="h-4 w-4 text-[#1F4E46]"
                    aria-hidden="true"
                  />
                  {lastConfirmation}
                </span>
                {activeMode === "whatsapp" && (
                  <a
                    href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                      whatsappText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#1F4E46] underline"
                  >
                    <span>Abrir WhatsApp</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() => {
                setActiveMode(
                  activeMode === "whatsapp" ? "formulario" : "whatsapp"
                );
                setLastConfirmation(null);
                setFormError(null);
              }}
              className="text-xs font-medium text-[#37474F] underline-offset-4 hover:text-[#182226] hover:underline"
            >
              {activeMode === "whatsapp"
                ? "Prefere deixar seu contato para ligarmos? Agendar pelo formulário"
                : "Prefere atendimento imediato? Reservar direto pelo WhatsApp"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- VÉRTICE B2B CONFIGURATOR ---
  return (
    <div className="rounded-2xl border border-[#D1D5DB] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-baseline justify-between border-b border-[#E5E7EB] pb-4">
        <h2 className="font-sans text-xl font-bold tracking-tight text-[#121820]">
          Simular escopo e investimento
        </h2>
        <span className="text-xs font-semibold text-[#1D4ED8]">
          Projeto fechado
        </span>
      </div>

      {/* Step 1: Select Operational Bottlenecks */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-[#374151]">
          1. Selecione as entregas que sua operação precisa
        </p>

        <div
          role="group"
          aria-label="Módulos de automação B2B disponíveis"
          className="mt-2.5 space-y-2"
        >
          {VERTICE_MODULES.map((mod) => {
            const isSelected = selectedVerticeIds.includes(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => onToggleVerticeModule(mod.id)}
                aria-pressed={isSelected}
                className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors ${
                  isSelected
                    ? "border-[#1D4ED8] bg-[#DBEAFE]/55"
                    : "border-[#D1D5DB] bg-[#F9FAFB] hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      isSelected
                        ? "border-[#1D4ED8] bg-[#1D4ED8] text-white"
                        : "border-[#6B7280] bg-white"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#121820]">
                      {mod.name}
                    </p>
                    <p className="text-xs text-[#374151]">{mod.stack}</p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-bold text-[#121820]">
                  {formatBrl(mod.basePrice)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Compact Team Size Selector */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-[#374151]">
          2. Porte da equipe comercial / operacional
        </p>
        <div
          role="group"
          aria-label="Porte da equipe"
          className="mt-2 grid grid-cols-3 gap-2"
        >
          {VERTICE_TEAM_TIERS.map((tier) => {
            const isSelected = tier.id === selectedTeamTierId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onSelectTeamTier(tier.id)}
                aria-pressed={isSelected}
                className={`rounded-lg border px-2.5 py-2 text-center text-xs font-semibold transition-colors ${
                  isSelected
                    ? "border-[#1D4ED8] bg-[#1D4ED8] text-white"
                    : "border-[#D1D5DB] bg-[#F9FAFB] text-[#121820] hover:bg-white"
                }`}
              >
                {tier.label.replace(" usuários", "")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean Total Box */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] px-4 py-3.5">
        <div>
          <span className="block text-xs font-medium text-[#374151]">
            Investimento estimado
          </span>
          <span className="text-2xl font-bold text-[#121820]">
            {formatBrl(verticeEstimatedTotal)}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md border border-[#D1D5DB] bg-white px-2.5 py-1 text-xs font-semibold text-[#121820]">
          <Clock className="h-3.5 w-3.5 text-[#1D4ED8]" aria-hidden="true" />
          {verticeWeeks} {verticeWeeks === 1 ? "semana" : "semanas"}
        </span>
      </div>

      {/* Single Directed Action */}
      <form onSubmit={handleAction} className="mt-5 space-y-3">
        {activeMode === "formulario" && (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <input
              type="text"
              aria-label="Seu nome e empresa"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nome e empresa"
              className="w-full rounded-lg border border-[#9CA3AF] bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#121820] placeholder:text-[#4B5563] focus:border-[#1D4ED8] focus:bg-white"
            />
            <input
              type="text"
              aria-label="Seu WhatsApp ou e-mail corporativo"
              value={clientContact}
              onChange={(e) => setClientContact(e.target.value)}
              placeholder="WhatsApp ou e-mail"
              className="w-full rounded-lg border border-[#9CA3AF] bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#121820] placeholder:text-[#4B5563] focus:border-[#1D4ED8] focus:bg-white"
            />
          </div>
        )}

        {formError && (
          <p role="alert" className="text-xs font-semibold text-[#991B1B]">
            {formError}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E40AF]"
        >
          {activeMode === "whatsapp" ? (
            <>
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>Falar com engenheiro no WhatsApp</span>
            </>
          ) : (
            <>
              <FileCheck2 className="h-4 w-4" aria-hidden="true" />
              <span>Solicitar proposta técnica</span>
            </>
          )}
        </button>

        {lastConfirmation && (
          <div
            role="status"
            className="rounded-lg border border-[#1D4ED8]/30 bg-[#DBEAFE] p-3 text-xs text-[#121820]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2
                  className="h-4 w-4 text-[#1D4ED8]"
                  aria-hidden="true"
                />
                {lastConfirmation}
              </span>
              {activeMode === "whatsapp" && (
                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                    whatsappText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#1D4ED8] underline"
                >
                  <span>Abrir WhatsApp</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        )}

        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={() => {
              setActiveMode(
                activeMode === "whatsapp" ? "formulario" : "whatsapp"
              );
              setLastConfirmation(null);
              setFormError(null);
            }}
            className="text-xs font-medium text-[#374151] underline-offset-4 hover:text-[#121820] hover:underline"
          >
            {activeMode === "whatsapp"
              ? "Prefere receber a proposta por e-mail? Preencher formulário"
              : "Prefere falar agora? Enviar escopo pelo WhatsApp"}
          </button>
        </div>
      </form>
    </div>
  );
}
