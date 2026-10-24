"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Paperclip } from "lucide-react";
import { buildersModels, formatGhs } from "@/lib/builders-club";
import { validateDetails, type BuildersApplication } from "@/lib/builders-application";

const WHATSAPP_NUMBER = "233303978485";
const initial: BuildersApplication = {
  fullName: "", phone: "", email: "", residency: "", country: "",
  model: "", plotLocation: "", plotStatus: "", moveIn: "",
};
const plotLabels: Record<string, string> = {
  "land-title": "Land title certificate",
  "registered-indenture": "Registered indenture",
  "site-plan-only": "Yellow paper / site plan only",
};
const inputClass = "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none focus:border-[#27255f] focus:ring-2 focus:ring-[#27255f]/20";
const primary = "inline-flex items-center justify-center gap-2 rounded-xl bg-[#27255f] px-6 py-3 font-semibold text-white hover:bg-[#1f1d4a] disabled:cursor-not-allowed disabled:opacity-50";

export function BuildersApplicationForm() {
  const [data, setData] = useState<BuildersApplication>(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const model = buildersModels.find(item => item.id === data.model);
  const residence = data.residency === "ghana" ? "Ghana" : data.country;
  const plan = data.moveIn === "standard"
    ? "Standard plan - month 24 payment threshold"
    : "Accelerated plan - discuss deposit and tailored schedule";

  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }

  function update(key: keyof BuildersApplication, value: string) {
    setData(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: "" }));
    setConsent(false);
  }

  function detailControl(key: keyof BuildersApplication, label: string, type = "text", autoComplete?: string) {
    return <label className="block text-sm font-semibold text-gray-700" htmlFor={`builders-${key}`}>
      {label} <span className="text-[#8e2828]">*</span>
      <input id={`builders-${key}`} name={key} type={type} autoComplete={autoComplete}
        value={data[key]} onChange={event => update(key, event.target.value)} required
        maxLength={key === "email" ? 254 : key === "plotLocation" ? 500 : key === "phone" ? 30 : 120}
        className={inputClass} aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `error-${key}` : undefined} />
      {errors[key] && <span id={`error-${key}`} className="mt-2 block text-sm font-normal text-red-700">{errors[key]}</span>}
    </label>;
  }

  function selectControl(key: keyof BuildersApplication, label: string, options: { value: string; label: string }[]) {
    return <label className="block text-sm font-semibold text-gray-700" htmlFor={`builders-${key}`}>
      {label} <span className="text-[#8e2828]">*</span>
      <select id={`builders-${key}`} name={key} value={data[key]} required
        onChange={event => update(key, event.target.value)} className={inputClass}
        aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined}>
        <option value="">Select an option</option>
        {options.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      {errors[key] && <span id={`error-${key}`} className="mt-2 block text-sm font-normal text-red-700">{errors[key]}</span>}
    </label>;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDetails(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStep(0);
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    if (step === 0) { go(1); return; }
    if (!consent || !model) return;

    const message = [
      "BUILDERS CLUB - 2027 APPLICATION",
      "",
      `Full legal name: ${data.fullName.trim()}`,
      `WhatsApp number: ${data.phone.trim()}`,
      `Email: ${data.email.trim()}`,
      `Country of residence: ${residence.trim()}`,
      `Preferred home: ${model.bedrooms}-bedroom ${model.name}`,
      `Monthly instalment: ${formatGhs(model.monthly)} over 48 months`,
      `Plot location / landmark: ${data.plotLocation.trim()}`,
      `Land documentation: ${plotLabels[data.plotStatus]}`,
      `Preferred plan: ${plan}`,
      "",
      "I confirm these details are accurate and authorise Pay Small Small and MCC to review my application and supporting documents.",
      "I understand this application does not guarantee approval or a building slot.",
      "",
      "Supporting documents to attach in this chat: land documentation / site plan and proof of income or funds.",
    ].join("\n");

    // Opens a draft only. The applicant attaches documents and presses Send in WhatsApp.
    window.location.assign(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  }

  return <form ref={form} onSubmit={onSubmit} noValidate
    className="rounded-[2rem] border border-gray-200 bg-white p-6 text-gray-900 sm:p-10"
    aria-label="Builders Club application">
    <ol className="mb-8 grid grid-cols-2 gap-3" aria-label="Application progress">
      {["Your details", "Review and continue"].map((label, index) => <li key={label}
        aria-current={step === index ? "step" : undefined}
        className={`border-t-4 pt-3 text-sm font-semibold ${step === index ? "border-[#27255f] text-[#27255f]" : "border-gray-200 text-gray-500"}`}>
        {index + 1}. {label}
      </li>)}
    </ol>
    <p className="mb-6 rounded-xl bg-[#f5f5fa] p-4 text-sm leading-relaxed text-gray-700">
      Your application opens as a draft in WhatsApp to <strong>0303 978 485</strong>.
      Attach your documents in that chat, then press Send. Nothing is submitted automatically.
    </p>
    <h3 ref={heading} tabIndex={-1} className="mb-6 text-2xl font-bold text-[#27255f]">
      {step === 0 ? "Tell us about your plans" : "Review your application"}
    </h3>
    {step === 0 && <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {detailControl("fullName", "Full legal name", "text", "name")}
        {detailControl("phone", "WhatsApp phone number", "tel", "tel")}
        {detailControl("email", "Email address", "email", "email")}
        {selectControl("residency", "Where do you currently live?", [
          { value: "ghana", label: "Ghana" }, { value: "diaspora", label: "Outside Ghana" },
        ])}
        {data.residency === "diaspora" && detailControl("country", "Country of residence", "text", "country-name")}
      </div>
      {selectControl("model", "Preferred home", buildersModels.map(item => ({
        value: item.id, label: `${item.bedrooms}-bedroom ${item.name} - ${formatGhs(item.monthly)} / month`,
      })))}
      {detailControl("plotLocation", "Plot location / nearest landmark")}
      {selectControl("plotStatus", "Land documentation status", Object.entries(plotLabels).map(([value, label]) => ({ value, label })))}
      {data.plotStatus === "site-plan-only" && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        A site plan alone does not establish eligibility. Ownership must be verified before approval.
      </p>}
      {selectControl("moveIn", "Preferred plan", [
        { value: "standard", label: "Standard - month 24 payment threshold" },
        { value: "accelerated", label: "Accelerated - discuss a deposit and tailored schedule" },
      ])}
      <p className="text-xs text-gray-500">Handover also requires construction completion and final quality inspections. Unsent details clear if you refresh or close this page.</p>
    </div>}
    {step === 1 && <div className="space-y-6">
      <dl className="divide-y divide-gray-200">
        {[
          ["Full legal name", data.fullName], ["WhatsApp", data.phone], ["Email", data.email],
          ["Residence", residence], ["Home", model ? `${model.bedrooms}-bedroom ${model.name}` : ""],
          ["Monthly instalment", model ? `${formatGhs(model.monthly)} / month over 48 months` : ""],
          ["Plot location", data.plotLocation], ["Land status", plotLabels[data.plotStatus]], ["Plan", plan],
        ].map(([label, value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[1fr_2fr]">
          <dt className="text-sm text-gray-500">{label}</dt><dd className="break-words text-sm font-medium">{value}</dd>
        </div>)}
      </dl>
      <div className="rounded-xl border border-gray-200 p-5">
        <h4 className="flex items-center gap-2 font-semibold text-[#27255f]"><Paperclip aria-hidden="true" className="h-4 w-4" />Attach these in WhatsApp</h4>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
          <li>Land title certificate, registered indenture or site plan.</li>
          <li>Proof of income or funds: bank statement, audited accounts or salary slips.</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">In WhatsApp, use the paperclip or + button to add your documents. Review the recipient and message before sending. No files are uploaded through this website.</p>
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#f5f5fa] p-4 text-sm leading-relaxed">
        <input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#27255f]" />
        <span>I confirm my details are accurate and authorise Pay Small Small and MCC to review my application and the documents I send. I understand this does not guarantee approval or a building slot.</span>
      </label>
    </div>}
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-6">
      {step === 1 ? <button type="button" onClick={() => go(0)} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-[#27255f]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back</button> : <span className="text-xs text-gray-500">Fields marked * are required.</span>}
      <button type="submit" disabled={step === 1 && !consent} className={primary}>
        {step === 0 ? "Review application" : "Continue to WhatsApp"}
        {step === 0 ? <ArrowRight aria-hidden="true" className="h-4 w-4" /> : <Check aria-hidden="true" className="h-4 w-4" />}
      </button>
    </div>
    <p className="mt-4 text-xs text-gray-500">You need access to WhatsApp on your phone or computer. Opening a draft does not confirm that the application was received.</p>
  </form>;
}
