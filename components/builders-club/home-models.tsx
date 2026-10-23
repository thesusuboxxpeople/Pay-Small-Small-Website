"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { buildersModels, BUILDERS_TENOR, formatGhs } from "@/lib/builders-club";

export function HomeModels() {
  const [selected, setSelected] = useState(0);
  const model = buildersModels[selected];
  const total = model.monthly * BUILDERS_TENOR;
  return <div>
    <div role="tablist" aria-label="House models" className="mb-8 grid grid-cols-3 gap-2 rounded-2xl bg-[#eeeef5] p-2">
      {buildersModels.map((item, index) => <button key={item.id} id={`tab-${item.id}`} type="button" role="tab" aria-selected={selected === index} aria-controls="model-details" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)}
        onKeyDown={event => {
          let next = selected;
          if (event.key === "ArrowRight") next = (selected + 1) % 3;
          else if (event.key === "ArrowLeft") next = (selected + 2) % 3;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = 2;
          else return;
          event.preventDefault(); setSelected(next); document.getElementById(`tab-${buildersModels[next].id}`)?.focus();
        }}
        className={`rounded-xl px-2 py-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27255f] sm:text-base ${selected === index ? "bg-[#27255f] text-white" : "text-[#27255f] hover:bg-white"}`}>
        {item.bedrooms} bedrooms
      </button>)}
    </div>
    <div id="model-details" role="tabpanel" aria-labelledby={`tab-${model.id}`} tabIndex={0} className="grid overflow-hidden rounded-[2rem] border border-gray-200 bg-white lg:grid-cols-2">
      <div className="bg-[#e8f3fa] p-3 sm:p-5"><Image src={model.image} alt={`${model.bedrooms}-bedroom ${model.name} promotional illustration and payment plan`} width={1121} height={1403} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full rounded-2xl" /></div>
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#8e2828]">Your land. Your next chapter.</p><h3 className="text-3xl font-bold tracking-tight text-[#27255f] sm:text-4xl">{model.name}</h3>
        <ul className="my-7 space-y-3">{model.features.map(feature => <li key={feature} className="flex gap-3 text-gray-700"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#27255f]" />{feature}</li>)}</ul>
        <div className="rounded-2xl bg-[#f5f5fa] p-6"><p className="text-sm text-gray-600">Fixed monthly instalment</p><p className="mt-1 text-3xl font-bold text-[#27255f]">{formatGhs(model.monthly)}<span className="text-sm font-normal text-gray-600"> / month</span></p><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between gap-3"><dt>Payment period</dt><dd className="font-semibold">48 months</dd></div><div className="flex justify-between gap-3"><dt>Total contract value</dt><dd className="font-semibold">{formatGhs(total)}</dd></div><div className="flex justify-between gap-3 border-t border-gray-200 pt-3"><dt>50% payment threshold</dt><dd className="font-semibold">{formatGhs(total / 2)}</dd></div></dl></div>
        <p className="my-5 text-sm leading-relaxed text-gray-600">Standard plan: reach 50% at month 24. Handover also requires construction completion and final quality inspections. You supply the land; the final specification is agreed in your contract.</p>
        <a href="#application" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#27255f] px-6 py-4 font-semibold text-white hover:bg-[#1f1d4a]">Explore this home <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a><p className="mt-3 text-xs text-gray-500">Promotional illustrations; final drawings and finishes are agreed before construction.</p>
      </div>
    </div>
  </div>;
}
