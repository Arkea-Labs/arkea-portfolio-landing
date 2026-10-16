"use client";

import React from "react";
import {
  NicheMode,
  CapturedLead,
  formatBrl,
} from "@/data/niches";
import {
  SlidersHorizontal,
  Inbox,
  X,
  ExternalLink,
  Trash2,
  CheckCircle2,
} from "lucide-react";

interface PortfolioDemoBarProps {
  niche: NicheMode;
  onSelectNiche: (niche: NicheMode) => void;
  leads: CapturedLead[];
  isDrawerOpen: boolean;
  onToggleDrawer: (open: boolean) => void;
  onClearLeads: () => void;
}

export function PortfolioDemoBar({
  niche,
  onSelectNiche,
  leads,
  isDrawerOpen,
  onToggleDrawer,
  onClearLeads,
}: PortfolioDemoBarProps) {
  return (
    <>
      <div className="border-b border-[#263238] bg-[#101619] text-[#F1F5F9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          {/* Left: Compact Demo Switcher */}
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs text-[#94A3B8] sm:inline-flex">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Alternar exemplo:</span>
            </span>

            <div
              role="group"
              aria-label="Alternar nicho comercial da demonstração"
              className="inline-flex rounded-md bg-[#1E293B] p-0.5"
            >
              <button
                type="button"
                onClick={() => onSelectNiche("aura")}
                className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                  niche === "aura"
                    ? "bg-[#D7E4E0] text-[#182226]"
                    : "text-[#CBD5E1] hover:text-white"
                }`}
              >
                1. Clínica & Estética
              </button>
              <button
                type="button"
                onClick={() => onSelectNiche("vertice")}
                className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                  niche === "vertice"
                    ? "bg-[#DBEAFE] text-[#121820]"
                    : "text-[#CBD5E1] hover:text-white"
                }`}
              >
                2. Consultoria B2B
              </button>
            </div>
          </div>

          {/* Right: Captured Leads Drawer Trigger */}
          <button
            type="button"
            onClick={() => onToggleDrawer(true)}
            className="inline-flex items-center gap-2 rounded-md bg-[#1E293B] px-3 py-1 text-xs font-medium text-[#E2E8F0] transition-colors hover:bg-[#334155]"
          >
            <Inbox className="h-3.5 w-3.5 text-[#34D399]" />
            <span>Leads capturados</span>
            <span className="rounded bg-[#0F172A] px-1.5 py-0.5 text-[11px] font-semibold text-[#34D399]">
              {leads.length}
            </span>
          </button>
        </div>
      </div>

      {/* Leads Captured Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[1px]"
          role="dialog"
          aria-modal="true"
          aria-label="Leads capturados na sessão de demonstração"
        >
          <div className="flex h-full w-full max-w-lg flex-col border-l border-[#CFD8DC] bg-white text-[#182226] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
              <div>
                <h2 className="text-base font-semibold text-[#121820]">
                  Leads Capturados na Sessão ({leads.length})
                </h2>
                <p className="text-xs text-[#4B5563]">
                  Simulação de saída para CRM e disparo estruturado via WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onToggleDrawer(false)}
                className="rounded-md p-1.5 text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#121820]"
                aria-label="Fechar painel de leads"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {leads.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#CBD5E1] p-8 text-center">
                  <p className="text-sm font-medium text-[#121820]">
                    Nenhum lead registrado neste momento.
                  </p>
                  <p className="mt-1 text-xs text-[#4B5563]">
                    Selecione protocolos ou módulos no simulador principal para testar a captura.
                  </p>
                </div>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-semibold ${
                            lead.niche === "aura"
                              ? "bg-[#D7E4E0] text-[#182226]"
                              : "bg-[#DBEAFE] text-[#1D4ED8]"
                          }`}
                        >
                          {lead.niche === "aura" ? "Aura Clínica" : "Vértice B2B"}
                        </span>
                        <span className="rounded border border-[#CBD5E1] bg-white px-2 py-0.5 text-xs font-medium text-[#4B5563]">
                          {lead.channel === "whatsapp"
                            ? "Via WhatsApp"
                            : "Via Site"}
                        </span>
                      </div>
                      <span className="text-xs text-[#64748B]">{lead.createdAt}</span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="font-semibold text-[#121820]">
                          {lead.clientName}
                        </span>
                        <span className="font-semibold text-[#121820]">
                          {formatBrl(lead.estimatedTotalBrl)}
                        </span>
                      </div>
                      <p className="text-[#4B5563]">Contato: {lead.clientContact}</p>
                      <p className="text-[#121820]">
                        <span className="font-medium">Agenda / Prazo:</span>{" "}
                        {lead.scheduleOrTimeline}
                      </p>
                      <div className="pt-1">
                        <span className="font-medium text-[#121820]">
                          Itens selecionados:
                        </span>
                        <ul className="mt-1 list-inside list-disc text-[#4B5563]">
                          {lead.selectedItems.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-3 rounded border border-[#E2E8F0] bg-white p-2.5">
                      <p className="text-[11px] font-medium text-[#64748B]">
                        Mensagem gerada:
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#1E293B]">
                        “{lead.whatsappPreviewText}”
                      </p>
                      <div className="mt-2 flex items-center justify-between pt-1">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1F4E46]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Salvo no CRM
                        </span>
                        <a
                          href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                            lead.whatsappPreviewText
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] hover:underline"
                        >
                          <span>Abrir wa.me</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3.5">
              <button
                type="button"
                onClick={onClearLeads}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#DC2626]"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Restaurar demonstração</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleDrawer(false)}
                className="rounded-md bg-[#121820] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#1E293B]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
