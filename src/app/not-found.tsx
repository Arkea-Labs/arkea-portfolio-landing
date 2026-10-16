import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-4 text-center text-[#182226]">
      <div className="mx-auto max-w-md rounded-2xl border border-[#CFD8DC] bg-white p-8 shadow-sm sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D7E4E0] text-[#1F4E46]">
          <Compass className="h-6 w-6" aria-hidden="true" />
        </div>

        <p className="mt-5 text-xs font-semibold text-[#1F4E46]">
          Erro 404 · Página não encontrada
        </p>

        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#182226]">
          Este endereço não está disponível
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-[#37474F]">
          A página que você tentou acessar foi movida ou não existe. Volte para
          a página principal para utilizar o simulador de procedimentos e
          agendamento.
        </p>

        <div className="mt-7">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F4E46] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173B35]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
