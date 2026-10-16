"use client";

import React, { useState } from "react";
import {
  NicheMode,
  AURA_PROTOCOLS,
  VERTICE_MODULES,
  formatBrl,
} from "@/data/niches";
import { Check, Plus, Clock } from "lucide-react";

interface ArchitecturalTableProps {
  niche: NicheMode;
  selectedAuraIds: string[];
  onToggleAuraProtocol: (id: string) => void;
  selectedVerticeIds: string[];
  onToggleVerticeModule: (id: string) => void;
}

export function ArchitecturalTable({
  niche,
  selectedAuraIds,
  onToggleAuraProtocol,
  selectedVerticeIds,
  onToggleVerticeModule,
}: ArchitecturalTableProps) {
  const [auraCategory, setAuraCategory] = useState<string>("Todos");
  const [verticeCategory, setVerticeCategory] = useState<string>("Todos");

  if (niche === "aura") {
    const categories = [
      "Todos",
      "Dermatologia Clínica",
      "Tecnologias a Laser",
      "Injetáveis & Bioestímulo",
    ];
    const filtered =
      auraCategory === "Todos"
        ? AURA_PROTOCOLS
        : AURA_PROTOCOLS.filter((p) => p.category === auraCategory);

    return (
      <section
        id="protocolos"
        className="border-t border-[#CFD8DC] bg-[#F8F9FA] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#1F4E46]">
                Tabela clínica aberta e valores transparentes
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#182226] sm:text-4xl">
                Protocolos dermatológicos, tempo em cabine e insumos incluídos
              </h2>
              <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-[#48565C]">
                Publicamos abertamente o escopo de cada sessão, o tempo real de
                preparo anestésico e a janela de recuperação para que você
                planeje sua agenda sem surpresas.
              </p>
            </div>

            {/* Category Filter */}
            <div
              role="group"
              aria-label="Filtrar protocolos por especialidade"
              className="flex flex-wrap gap-1.5"
            >
              {categories.map((cat) => {
                const active = auraCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setAuraCategory(cat)}
                    className={`rounded-md border px-3.5 py-2 text-xs font-medium transition-colors ${
                      active
                        ? "border-[#1F4E46] bg-[#1F4E46] text-white"
                        : "border-[#CFD8DC] bg-white text-[#182226] hover:bg-[#ECEFF1]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Open Architectural Ledger / Table */}
          <div className="mt-10 overflow-hidden rounded-xl border border-[#CFD8DC] bg-white">
            {/* Desktop Table Header */}
            <div className="hidden grid-cols-12 border-b border-[#CFD8DC] bg-[#ECEFF1] px-6 py-3.5 text-xs font-semibold text-[#182226] lg:grid">
              <div className="col-span-3">Protocolo e especialidade</div>
              <div className="col-span-3">Indicação clínica principal</div>
              <div className="col-span-3">O que está incluído na sessão</div>
              <div className="col-span-1">Cabine</div>
              <div className="col-span-2 text-right">Valor e seleção</div>
            </div>

            <div className="divide-y divide-[#CFD8DC]">
              {filtered.map((protocol) => {
                const isSelected = selectedAuraIds.includes(protocol.id);
                return (
                  <div
                    key={protocol.id}
                    className={`grid grid-cols-1 gap-4 p-6 transition-colors lg:grid-cols-12 lg:items-center lg:gap-6 ${
                      isSelected ? "bg-[#D7E4E0]/45" : "hover:bg-[#F8F9FA]"
                    }`}
                  >
                    <div className="lg:col-span-3">
                      <span className="inline-block rounded bg-[#ECEFF1] px-2 py-0.5 text-[11px] font-medium text-[#48565C]">
                        {protocol.category}
                      </span>
                      <h3 className="mt-1.5 font-serif text-lg font-medium text-[#182226]">
                        {protocol.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#48565C]">
                        Recuperação: {protocol.recovery}
                      </p>
                    </div>

                    <div className="text-sm leading-relaxed text-[#182226] lg:col-span-3">
                      {protocol.indication}
                    </div>

                    <div className="text-xs leading-relaxed text-[#48565C] lg:col-span-3">
                      {protocol.included}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#182226] lg:col-span-1">
                      <Clock className="h-3.5 w-3.5 text-[#1F4E46] lg:hidden" />
                      <span>{protocol.durationLabel}</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-[#ECEFF1] pt-3 lg:col-span-2 lg:flex-col lg:items-end lg:justify-center lg:border-t-0 lg:pt-0">
                      <div className="text-left lg:text-right">
                        <span className="font-serif text-xl font-semibold text-[#182226]">
                          {formatBrl(protocol.price)}
                        </span>
                        <span className="block text-[11px] text-[#48565C]">
                          em até 6x sem juros
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleAuraProtocol(protocol.id)}
                        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                          isSelected
                            ? "bg-[#1F4E46] text-white hover:bg-[#173B35]"
                            : "border border-[#1F4E46] bg-white text-[#1F4E46] hover:bg-[#D7E4E0]"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Incluído no plano</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            <span>Incluir no plano</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Footer Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#CFD8DC] bg-[#ECEFF1] px-6 py-4">
              <p className="text-xs text-[#182226]">
                <strong>Regra de abatimento clínico:</strong> Ao realizar a
                Consulta Dermatológica Completa no mesmo dia de qualquer
                procedimento a laser ou injetável, concedemos R$ 200 de crédito
                direto no orçamento.
              </p>
              <a
                href="#planejador-hero"
                className="rounded-md bg-[#1F4E46] px-4 py-2 text-xs font-semibold text-white hover:bg-[#173B35]"
              >
                Revisar plano selecionado ({selectedAuraIds.length})
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- VÉRTICE B2B ARCHITECTURAL DELIVERABLE TABLE ---
  const b2bCategories = [
    "Todos",
    "Comercial & CRM",
    "Operações & Contratos",
    "Dados & Financeiro",
  ];
  const filteredB2B =
    verticeCategory === "Todos"
      ? VERTICE_MODULES
      : VERTICE_MODULES.filter((m) => m.category === verticeCategory);

  return (
    <section
      id="protocolos"
      className="border-t border-[#D1D5DB] bg-[#F3F4F6] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1D4ED8]">
              Catálogo de engenharia e entregáveis de escopo fechado
            </p>
            <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-[#121820] sm:text-4xl">
              Módulos de automação, arquitetura de dados e prazos de entrega
            </h2>
            <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-[#4B5563]">
              Cada módulo abaixo é entregue documentado, integrado às
              ferramentas que sua empresa já opera e sem cobrança de mensalidade
              por usuário.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrar módulos B2B por área operacional"
            className="flex flex-wrap gap-1.5"
          >
            {b2bCategories.map((cat) => {
              const active = verticeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setVerticeCategory(cat)}
                  className={`rounded-md border px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? "border-[#1D4ED8] bg-[#1D4ED8] text-white"
                      : "border-[#D1D5DB] bg-white text-[#121820] hover:bg-[#E5E7EB]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-[#D1D5DB] bg-white">
          <div className="hidden grid-cols-12 border-b border-[#D1D5DB] bg-[#E5E7EB] px-6 py-3.5 text-xs font-semibold text-[#121820] lg:grid">
            <div className="col-span-3">Módulo e stack técnica</div>
            <div className="col-span-3">Gargalo operacional eliminado</div>
            <div className="col-span-3">Entregável em produção</div>
            <div className="col-span-1">Prazo base</div>
            <div className="col-span-2 text-right">Investimento base</div>
          </div>

          <div className="divide-y divide-[#D1D5DB]">
            {filteredB2B.map((mod) => {
              const isSelected = selectedVerticeIds.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  className={`grid grid-cols-1 gap-4 p-6 transition-colors lg:grid-cols-12 lg:items-center lg:gap-6 ${
                    isSelected ? "bg-[#DBEAFE]/40" : "hover:bg-[#F9FAFB]"
                  }`}
                >
                  <div className="lg:col-span-3">
                    <span className="inline-block rounded bg-[#F3F4F6] px-2 py-0.5 text-[11px] font-semibold text-[#4B5563]">
                      {mod.category}
                    </span>
                    <h3 className="mt-1.5 font-sans text-base font-bold text-[#121820]">
                      {mod.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#4B5563]">{mod.stack}</p>
                  </div>

                  <div className="text-sm leading-relaxed text-[#121820] lg:col-span-3">
                    {mod.bottleneckSolved}
                  </div>

                  <div className="text-xs leading-relaxed text-[#4B5563] lg:col-span-3">
                    {mod.deliverable}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#121820] lg:col-span-1">
                    <Clock className="h-3.5 w-3.5 text-[#1D4ED8] lg:hidden" />
                    <span>
                      {mod.weeksEstimate}{" "}
                      {mod.weeksEstimate === 1 ? "semana" : "semanas"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-[#E5E7EB] pt-3 lg:col-span-2 lg:flex-col lg:items-end lg:justify-center lg:border-t-0 lg:pt-0">
                    <div className="text-left lg:text-right">
                      <span className="text-lg font-bold text-[#121820]">
                        {formatBrl(mod.basePrice)}
                      </span>
                      <span className="block text-[11px] text-[#4B5563]">
                        porte até 10 usuários
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleVerticeModule(mod.id)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                        isSelected
                          ? "bg-[#1D4ED8] text-white hover:bg-[#1E40AF]"
                          : "border border-[#1D4ED8] bg-white text-[#1D4ED8] hover:bg-[#DBEAFE]"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>No escopo</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Adicionar ao escopo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D1D5DB] bg-[#E5E7EB] px-6 py-4">
            <p className="text-xs text-[#121820]">
              <strong>Propriedade intelectual integral:</strong> Todo código,
              banco de dados e fluxo construído pertence 100% à sua empresa
              desde o primeiro dia em produção.
            </p>
            <a
              href="#planejador-hero"
              className="rounded-md bg-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E40AF]"
            >
              Recalcular investimento no topo ({selectedVerticeIds.length})
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
