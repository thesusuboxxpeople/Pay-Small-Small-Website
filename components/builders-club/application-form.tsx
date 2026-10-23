"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, FileText, Paperclip, X } from "lucide-react";
import { buildersModels, formatGhs } from "@/lib/builders-club";
import { createApplicationPayload, DOCUMENT_ACCEPT, MAX_GROUP_FILES, MAX_TOTAL_BYTES, validateAttachment, validateDetails, validateDocuments, type Attachment, type BuildersApplication, type DocumentGroup } from "@/lib/builders-application";

const initial: BuildersApplication = { fullName: "", phone: "", email: "", residency: "", country: "", model: "", plotLocation: "", plotStatus: "", moveIn: "" };
const inputClass = "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none focus:border-[#27255f] focus:ring-2 focus:ring-[#27255f]/20";
const primary = "inline-flex items-center justify-center gap-2 rounded-xl bg-[#27255f] px-6 py-3 font-semibold text-white hover:bg-[#1f1d4a] disabled:cursor-not-allowed disabled:opacity-50";
const secondary = "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-[#27255f] hover:bg-gray-50 disabled:opacity-50";
const sizeLabel = (size: number) => size < 1024 * 1024 ? `${Math.ceil(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
const plotLabels: Record<string, string> = { "land-title": "Land title certificate", "registered-indenture": "Registered indenture", "site-plan-only": "Yellow paper / site plan only" };

export function BuildersApplicationForm({ endpoint }: { endpoint?: string }) {
  const [data, setData] = useState<BuildersApplication>(initial);
  const [step, setStep] = useState(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [documentError, setDocumentError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [uncertain, setUncertain] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const requestId = useRef("");
  const locked = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const configured = Boolean(endpoint);
  const model = buildersModels.find(item => item.id === data.model);

  function go(next: number) { setStep(next); setSubmissionError(""); requestAnimationFrame(() => heading.current?.focus()); }
  function update(key: keyof BuildersApplication, value: string) {
    requestId.current = "";
    setData(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: "" }));
  }
  function detailControl(key: keyof BuildersApplication, label: string, type = "text", autoComplete?: string) {
    return <label className="block text-sm font-semibold text-gray-700" key={key} htmlFor={`builders-${key}`}>{label} <span className="text-[#8e2828]">*</span><input id={`builders-${key}`} name={key} type={type} autoComplete={autoComplete} value={data[key]} onChange={e => update(key, e.target.value)} required maxLength={key === "email" ? 254 : key === "plotLocation" ? 500 : key === "phone" ? 30 : 120} className={inputClass} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined} />{errors[key] && <span id={`error-${key}`} className="mt-2 block text-sm font-normal text-red-700">{errors[key]}</span>}</label>;
  }
  function selectControl(key: keyof BuildersApplication, label: string, options: { value: string; label: string }[]) {
    return <label className="block text-sm font-semibold text-gray-700" htmlFor={`builders-${key}`}>{label} <span className="text-[#8e2828]">*</span><select id={`builders-${key}`} name={key} value={data[key]} onChange={e => update(key, e.target.value)} required className={inputClass} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined}><option value="">Select an option</option>{options.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select>{errors[key] && <span id={`error-${key}`} className="mt-2 block text-sm font-normal text-red-700">{errors[key]}</span>}</label>;
  }
  function addFiles(event: ChangeEvent<HTMLInputElement>, group: DocumentGroup) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    const additions: Attachment[] = [];
    for (const file of files) {
      const error = validateAttachment(file);
      if (error) { setDocumentError(`${file.name}: ${error}`); return; }
      if ([...attachments, ...additions].some(item => item.group === group && item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified)) continue;
      additions.push({ id: crypto.randomUUID(), group, file });
    }
    const next = [...attachments, ...additions];
    if (next.filter(item => item.group === group).length > MAX_GROUP_FILES) { setDocumentError("Choose no more than 5 documents per category. Remove a document before adding more."); return; }
    if (next.reduce((sum, item) => sum + item.file.size, 0) > MAX_TOTAL_BYTES) { setDocumentError("All attachments together must be 30 MB or smaller."); return; }
    requestId.current = "";
    setAttachments(next); setDocumentError("");
  }
  function documentGroup(group: DocumentGroup, title: string, hint: string) {
    return <fieldset className="rounded-2xl border border-gray-200 p-5 sm:p-6"><legend className="px-2 font-semibold text-[#27255f]">{title} <span className="text-[#8e2828]">*</span></legend><p id={`${group}-hint`} className="mb-4 text-sm leading-relaxed text-gray-600">{hint}</p><label htmlFor={`builders-${group}-files`} className="block rounded-xl border-2 border-dashed border-[#27255f]/25 bg-[#f8f8fb] p-5"><span className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#27255f]"><Paperclip aria-hidden="true" className="h-4 w-4" />Choose documents</span><input id={`builders-${group}-files`} type="file" multiple accept={DOCUMENT_ACCEPT} onChange={event => addFiles(event, group)} aria-describedby={`${group}-hint attachment-limits`} className="block w-full min-w-0 text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#27255f] file:px-3 file:py-2 file:font-semibold file:text-white" /></label><ul className="mt-4 space-y-2">{attachments.filter(item => item.group === group).map(item => <li key={item.id} className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2"><FileText aria-hidden="true" className="h-4 w-4 shrink-0 text-[#27255f]" /><span className="min-w-0 flex-1"><span className="block break-all text-sm text-gray-800">{item.file.name}</span><span className="text-xs text-gray-500">{sizeLabel(item.file.size)} · Selected, not uploaded</span></span><button type="button" aria-label={`Remove ${item.file.name}`} onClick={() => { requestId.current = ""; setAttachments(current => current.filter(file => file.id !== item.id)); setDocumentError(""); }} className="rounded-lg p-2 text-gray-600 hover:bg-gray-200"><X aria-hidden="true" className="h-4 w-4" /></button></li>)}</ul></fieldset>;
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0) {
      const nextErrors = validateDetails(data); setErrors(nextErrors);
      if (Object.keys(nextErrors).length) { requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()); return; }
      go(1); return;
    }
    const fileError = validateDocuments(attachments);
    if (fileError) { setDocumentError(fileError); if (step !== 1) go(1); return; }
    if (step === 1) { go(2); return; }
    if (!consent || !endpoint || locked.current || uncertain) return;
    const detailErrors = validateDetails(data);
    if (Object.keys(detailErrors).length) { setErrors(detailErrors); go(0); return; }
    locked.current = true; setSending(true); setSubmissionError("");
    requestId.current ||= crypto.randomUUID();
    setEnquiryId(requestId.current);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 60000);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Idempotency-Key": requestId.current }, body: createApplicationPayload(data, attachments, requestId.current), signal: controller.signal });
      const result = await response.json().catch(() => null);
      if (response.ok && typeof result?.applicationReference === "string" && result.applicationReference.trim()) {
        setReference(result.applicationReference.trim()); setAttachments([]); setData(initial); setConsent(false); requestAnimationFrame(() => heading.current?.focus()); return;
      }
      if (response.status === 422) { setSubmissionError("The application was not accepted. Check your details and documents, then try again. Your selections are still here."); return; }
      if (response.status === 413) { setSubmissionError("The service could not accept these file sizes. Return to Documents and choose smaller files."); return; }
      if (response.status === 429) { setSubmissionError("Too many attempts. Wait a few minutes before trying again; your selections are still here."); return; }
      setUncertain(true); setSubmissionError("We could not confirm whether your application was received. Please contact the Builders Club desk before submitting again. Keep this page open and quote the enquiry ID below.");
    } catch {
      setUncertain(true); setSubmissionError("The connection was interrupted and we could not confirm receipt. Contact the Builders Club desk before submitting again. Keep this page open and quote the enquiry ID below.");
    } finally { window.clearTimeout(timeout); locked.current = false; setSending(false); }
  }

  if (reference) return <div className="rounded-[2rem] border border-gray-200 bg-white p-7 sm:p-10"><Check aria-hidden="true" className="mb-5 h-10 w-10 text-green-700" /><h3 ref={heading} tabIndex={-1} className="text-2xl font-bold text-[#27255f]">Application received</h3><p className="mt-4 text-gray-600">Your application and documents have been received for review. This is not approval or a reserved building slot.</p><p className="mt-6 rounded-xl bg-[#f5f5fa] p-5 font-semibold text-[#27255f]">Application reference: <span className="break-all">{reference}</span></p><p className="mt-5 text-sm text-gray-600">Keep this reference for follow-up with the Builders Club desk on 0303 978 485.</p></div>;

  return <form ref={form} onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-gray-200 bg-white p-6 text-gray-900 sm:p-10" aria-label="Builders Club application">
    <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Application progress">{["Your details", "Documents", "Review"].map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={`border-t-4 pt-3 text-xs font-semibold sm:text-sm ${step === index ? "border-[#27255f] text-[#27255f]" : index < step ? "border-green-600 text-green-800" : "border-gray-200 text-gray-500"}`}>{index + 1}. {label}</li>)}</ol>
    {!configured && <p role="note" className="mb-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">Applications are not open for online submission yet. You can complete and review this form, but your details and documents will not be sent. Call 0303 978 485 for assistance.</p>}
    <h3 ref={heading} tabIndex={-1} className="text-2xl font-bold tracking-tight text-[#27255f]">{["Tell us about your plans", "Attach your supporting documents", "Check everything before sending"][step]}</h3>
    <p className="mb-7 mt-3 text-sm leading-relaxed text-gray-600">{["Fields marked * are required. You can review your details before submitting.", "Attach clear, readable copies. Files remain on this device until you submit successfully.", "Check your details and file names. You can go back and make changes without losing your selections."][step]}</p>
    {step === 0 && <div className="space-y-6"><div className="grid gap-6 sm:grid-cols-2">{detailControl("fullName", "Full legal name", "text", "name")}{detailControl("phone", "WhatsApp phone number", "tel", "tel")}{detailControl("email", "Email address", "email", "email")}{selectControl("residency", "Where do you currently live?", [{ value: "ghana", label: "Ghana" }, { value: "diaspora", label: "Outside Ghana" }])}{data.residency === "diaspora" && detailControl("country", "Country of residence", "text", "country-name")}</div>{selectControl("model", "Preferred home", buildersModels.map(item => ({ value: item.id, label: `${item.bedrooms}-bedroom ${item.name} — ${formatGhs(item.monthly)} / month` })))}{detailControl("plotLocation", "Plot location / nearest landmark")}{selectControl("plotStatus", "Land documentation status", Object.entries(plotLabels).map(([value, label]) => ({ value, label })))}{data.plotStatus === "site-plan-only" && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">A site plan alone does not establish eligibility. The team will need to verify ownership before any approval.</p>}{selectControl("moveIn", "Preferred plan", [{ value: "standard", label: "Standard — month 24 payment threshold" }, { value: "accelerated", label: "Accelerated — discuss a deposit and tailored schedule" }])}<p className="text-xs leading-relaxed text-gray-500">Move-in also depends on construction completion and final quality inspections.</p></div>}
    {step === 1 && <div className="space-y-6"><p id="attachment-limits" className="text-sm text-gray-600">PDF, JPG or PNG · up to 10 MB per file · 5 files per category · 30 MB total. At least one file is required in each category.</p>{documentGroup("land", "Land documents / site plan", "Land title certificate, registered indenture or site plan for your plot.")}{documentGroup("funds", "Proof of income / funds", "Bank statement, audited accounts or salary slips showing your capacity to service the selected plan.")}<p className="text-xs leading-relaxed text-gray-500">Your details and selected files are kept only in this open page. Refreshing or closing it will clear them. Do not upload passwords or payment-card security details.</p><p role="status" className="text-sm text-gray-600">{attachments.length} file{attachments.length === 1 ? "" : "s"} selected · {sizeLabel(attachments.reduce((sum, item) => sum + item.file.size, 0))} of 30 MB</p>{documentError && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{documentError}</p>}</div>}
    {step === 2 && <div className="space-y-6"><dl className="divide-y divide-gray-200">{[["Full legal name", data.fullName], ["WhatsApp", data.phone], ["Email", data.email], ["Residence", data.residency === "ghana" ? "Ghana" : data.country], ["Home", model ? `${model.bedrooms}-bedroom ${model.name} · ${formatGhs(model.monthly)} / month` : ""], ["Plot location", data.plotLocation], ["Land status", plotLabels[data.plotStatus]], ["Plan", data.moveIn === "standard" ? "Standard plan" : "Accelerated plan — subject to agreement"]].map(([label, value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[1fr_2fr]"><dt className="text-sm text-gray-500">{label}</dt><dd className="break-words text-sm font-medium">{value}</dd></div>)}</dl><div><h4 className="font-semibold text-[#27255f]">Selected documents</h4><ul className="mt-3 space-y-3">{attachments.map(item => <li key={item.id} className="flex gap-3 text-sm"><FileText aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#27255f]" /><span className="min-w-0 break-all">{item.file.name}<span className="block text-xs text-gray-500">{item.group === "land" ? "Land document" : "Proof of funds"} · {sizeLabel(item.file.size)}</span></span></li>)}</ul></div><label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#f5f5fa] p-4 text-sm leading-relaxed"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#27255f]" /><span>I confirm that these details are accurate and authorise Pay Small Small and MCC to review my application and supporting documents for the 2027 Builders Club cohort. I understand submission does not guarantee approval or a slot.</span></label></div>}
    {submissionError && <div role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-800"><p>{submissionError}</p>{uncertain && <p className="mt-3 break-all font-semibold">Enquiry ID: {enquiryId}</p>}</div>}
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-6">{step > 0 ? <button type="button" onClick={() => go(step - 1)} disabled={sending || uncertain} className={secondary}><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back</button> : <span className="text-xs text-gray-500">Your information stays here until submission.</span>}<button type="submit" disabled={sending || uncertain || (step === 2 && (!configured || !consent))} className={primary}>{sending ? "Sending application…" : step === 0 ? "Continue to documents" : step === 1 ? "Review application" : !configured ? "Online submission opens soon" : "Submit application"}{step < 2 && <ArrowRight aria-hidden="true" className="h-4 w-4" />}</button></div><p role="status" aria-live="polite" className="mt-3 text-xs text-gray-500">{sending ? "Sending your details and documents. Keep this page open." : ""}</p>
  </form>;
}
