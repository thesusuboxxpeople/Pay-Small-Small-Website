import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Check, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { HomeModels } from "@/components/builders-club/home-models";
import { BUILDERS_PHONE } from "@/lib/builders-club";
import { BuildersApplicationForm } from "@/components/builders-club/application-form";


export const metadata: Metadata = {
  title: "Builders Club",
  description: "Build a fully finished home on your land in Greater Accra with Pay Small Small and MCC. Explore 2, 3 and 4-bedroom homes with 48-month payment plans.",
  alternates: { canonical: "/builders-club/" },
  openGraph: { title: "Builders Club | Paysmallsmall", url: "/builders-club/", description: "Your land. A finished home. One clear plan. Explore the 2027 Builders Club cohort." },
};
const oversight = [
  { title: "See your site, wherever you are", image: "live-site.jpeg", text: "24/7 live site feeds let you follow activity and material deliveries through the app, subject to plot connectivity and network coverage." },
  { title: "Engineering updates every 30 days", image: "engineering-audit.jpeg", text: "Certified monthly engineering reports document structural milestones and progress, delivered to your registered email." },
  { title: "Your payments and progress, together", image: "payment-tracking.jpeg", text: "The programme includes in-app instalment records, digital receipts and milestone tracking, so you can follow your payments alongside construction." },
  { title: "Walk the site with your engineers", image: "site-walkthrough.jpeg", text: "Guided inspections with MCC project engineers at critical sign-offs: foundation, lintel or slab, roofing and finishing." },
];
const stages = [
  ["01", "Apply and verify", "Complete your application and attach your land documentation for review. MCC assesses site feasibility, boundaries and access."],
  ["02", "Agree the complete picture", "Confirm your home specification and sign the fixed-cost construction agreement and legal escrow framework. Your project dashboard is activated."],
  ["03", "Build with visibility", "Construction begins. Follow site reports, updates and payment records, with engineering checks at the key stages."],
  ["04", "Take your keys at 50%", "Once 50% is paid and final quality inspections pass, move in and continue paying the remaining contract balance."],
];
const faqs = [
  ["Can I apply from outside Ghana?", "Yes. Diaspora applicants can apply using verifiable land documentation and evidence of income or remittance capacity. Reports, payment records and connectivity-dependent site feeds support remote oversight."],
  ["Can I move in earlier than month 24?", "An upfront deposit or additional payments can bring forward the 50% payment threshold. Your payment schedule and construction timetable are agreed during onboarding. Handover requires the threshold and a completed home that passes final quality inspections."],
  ["What is included in a finished home?", "Substructure and superstructure, flat-roof parapet architecture, commercial-grade glazing, electrical and plumbing first and second fix, sanitary ware, Complete roofing and paint job, installation of two major doors, window fixtures. Model layouts differ. Final drawings, materials and scope are confirmed in your signed agreement."],
  ["How are construction prices kept fixed?", "The construction agreement locks in the bill of quantities and material schedule at signing. MCC absorbs normal market fluctuations during the active build for compliant cohort members, under the programme terms. Review the agreed scope and contract before committing."],
  ["How is the remaining balance secured?", "The programme provides for title documentation held in legal escrow and a registered charge or deed of legal mortgage until full settlement. The security arrangement and release terms are set out before signing. Zero commercial bank loans does not remove the secured payment obligation."],
  ["What land documentation do I need?", "Qualification requires clean, unencumbered land with verifiable title or a registered indenture. Have your documents and site plan ready for review. If you have only a site plan or yellow paper, speak to the desk before assuming eligibility."],
];
const section = "scroll-mt-28 px-6 py-16 sm:py-24";
const wrap = "mx-auto max-w-6xl";

export default function BuildersClubPage() {
  return <main className="min-h-screen bg-white text-gray-900 selection:bg-[#ece825] selection:text-[#27255f]">
    <Navbar />
    <section id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f7f7fb] px-6 pb-16 pt-36 sm:pb-24 sm:pt-44"><div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]`}>
      <div><span className="inline-flex items-center gap-2 rounded-full border border-[#27255f]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#27255f]"><span className="h-2 w-2 rounded-full bg-[#8e2828]" />2027 cohort · 10 building slots</span><p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-[#8e2828]">The Builders Club</p><h1 className="mt-4 text-5xl font-bold leading-[1.07] tracking-tight text-[#27255f] sm:text-6xl">Your land.<br />Your home.<br /><span className="text-[#8e2828]">One clear plan.</span></h1><p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">Build an architect-designed, fully finished home on your land in Greater Accra. Pay over 48 months, with key handover at 50% paid and construction complete.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#models" className="inline-flex items-center gap-2 rounded-xl bg-[#27255f] px-6 py-4 font-semibold text-white hover:bg-[#1f1d4a]">Find your home <ArrowDown aria-hidden="true" className="h-4 w-4" /></a><a href="#eligibility" className="rounded-xl border border-[#27255f]/25 px-6 py-4 font-semibold text-[#27255f] hover:bg-white">Check eligibility</a></div><p className="mt-6 text-sm text-gray-500">Pay Small Small × The Modern Construction Company</p></div>
      <Image src="/builders-club/programme.jpeg" alt="Pay Small Small and MCC promotional artwork showing a family looking towards a modern home" width={1080} height={1350} priority sizes="(max-width: 1024px) 100vw, 46vw" className="h-auto w-full rounded-[2rem] shadow-2xl shadow-[#27255f]/15" />
    </div></section>
    <div className="border-y border-gray-200 px-6 py-7"><div className={`${wrap} grid gap-6 sm:grid-cols-3`}>{[["Move in at 50%", "Subject to completion and quality checks"], ["Zero commercial bank loans", "A secured contractual balance remains"], ["Fixed monthly instalments", "48-month plans with agreed scope"]].map(([title, text]) => <div key={title} className="flex items-start gap-3"><Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#8e2828]" /><div><p className="font-semibold text-[#27255f]">{title}</p><p className="mt-1 text-xs text-gray-500">{text}</p></div></div>)}</div></div>
    <section id="eligibility" className={section}><div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr]`}><div><p className="text-sm font-semibold uppercase tracking-wider text-[#8e2828]">Start with your land</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#27255f] sm:text-4xl">Is Builders Club<br />right for you?</h2><p className="mt-5 leading-relaxed text-gray-600">For landowners who want a finished home with structured payments and a professionally managed build, whether living in Ghana or abroad.</p></div><div className="divide-y divide-gray-200">{[
      ["Verifiable land ownership", "Clean, unencumbered land with verifiable title or registered indenture in Greater Accra or designated developing corridors."],
      ["A site we can access", "Motorable access for concrete trucks and material deliveries, subject to MCC’s site feasibility and boundary checks."],
      ["A sustainable payment plan", "Evidence of steady salary, registered business revenue or diaspora remittance capacity for your chosen monthly instalment."],
    ].map(([title, text]) => <div key={title} className="flex gap-4 py-6 first:pt-0"><Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#8e2828]" /><div><h3 className="font-bold text-[#27255f]">{title}</h3><p className="mt-2 leading-relaxed text-gray-600">{text}</p></div></div>)}<p className="pt-5 text-sm text-gray-500">Example corridors: East Legon Hills, Oyarifa, Pokuase, Prampram, Tema and Dawhenya. All plots require individual review.</p></div></div></section>
    <section id="models" className={`${section} bg-[#f8f8fb]`}><div className={wrap}><div className="mb-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-wider text-[#8e2828]">Choose your space</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#27255f] sm:text-4xl">Three homes. One clear commitment.</h2><p className="mt-4 text-gray-600">Compare your layout, monthly instalment and full contract value. Every model is built on your own land to the agreed turnkey specification.</p></div><HomeModels /><div className="mt-8 rounded-2xl border border-[#27255f]/10 bg-white p-6 sm:p-8"><h3 className="font-bold text-[#27255f]">Finished means ready for your next chapter.</h3><p className="mt-3 leading-relaxed text-gray-600">Substructure and superstructure, parapet architecture, glazing, electrical and plumbing first and second fix, sanitary ware, Complete roofing and paint job, installation of two major doors, window fixtures. Your model’s final specification forms part of your construction agreement.</p></div></div></section>
    <section id="process" className={section}><div className={wrap}><p className="text-sm font-semibold uppercase tracking-wider text-[#8e2828]">From plot to keys</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#27255f] sm:text-4xl">Know what happens next.</h2><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{stages.map(([number, title, text]) => <article key={number} className="border-t-2 border-[#27255f]/15 pt-6"><p className="text-4xl font-light text-[#8e2828]">{number}</p><h3 className="mt-5 text-lg font-bold text-[#27255f]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p></article>)}</div><div className="mt-10 rounded-2xl bg-[#27255f] p-7 text-white sm:p-9"><h3 className="text-xl font-bold">Want to reach the payment milestone sooner?</h3><p className="mt-3 max-w-3xl leading-relaxed text-white/80">An upfront deposit or additional payments can accelerate progress towards 50%. Discuss a tailored schedule with the team. Earlier payment does not bypass construction completion or final quality inspections.</p></div></div></section>
    <section id="accountability" className={`${section} bg-[#f8f8fb]`}><div className={wrap}><div className="mb-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-wider text-[#8e2828]">Visibility, wherever life takes you</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#27255f] sm:text-4xl">Follow the build.<br />Understand every milestone.</h2><p className="mt-4 text-gray-600">Digital records and engineering oversight keep progress documented beyond a site visit.</p></div><div className="grid gap-6 sm:grid-cols-2">{oversight.map(item => <article key={item.image} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"><Image src={`/builders-club/${item.image}`} alt={`${item.title} — promotional artwork`} width={1080} height={1350} sizes="(max-width: 640px) 100vw, 50vw" className="h-auto w-full" /><div className="p-6 sm:p-8"><h3 className="text-xl font-bold text-[#27255f]">{item.title}</h3><p className="mt-3 leading-relaxed text-gray-600">{item.text}</p></div></article>)}</div></div></section>
    <section id="faq" className={section}><div className={`${wrap} grid gap-10 lg:grid-cols-[0.7fr_1.3fr]`}><div><p className="text-sm font-semibold uppercase tracking-wider text-[#8e2828]">Before you commit</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#27255f] sm:text-4xl">A few important<br />questions.</h2><p className="mt-5 text-gray-600">Review the full agreement and ask the team about any terms that affect your land, payments or handover.</p></div><div className="divide-y divide-gray-200">{faqs.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer pr-3 font-semibold leading-relaxed text-[#27255f] focus-visible:outline-2 focus-visible:outline-[#27255f]">{question}</summary><p className="mt-4 leading-relaxed text-gray-600">{answer}</p></details>)}</div></div></section>
    <section id="company-profile" className="px-6 pb-16 sm:pb-24">
      <div className={`${wrap} rounded-2xl border border-[#27255f]/15 p-7 sm:p-10`}>
        <p className="text-sm font-semibold uppercase tracking-wider text-[#8e2828]">Meet your construction partner</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#27255f]">MCC Company Profile</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">Explore the Modern Construction Company profile before starting your Builders Club application.</p>
        <p className="mt-3 text-sm text-gray-500">PDF · 15 pages · 8.4 MB</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href="/builders-club/mcc-company-profile.pdf" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#27255f] px-6 py-3 font-semibold text-white hover:bg-[#36337b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27255f]">View profile <span className="sr-only">(PDF, opens in a new tab)</span></a>
          <a href="/builders-club/mcc-company-profile.pdf" download="MCC-Company-Profile.pdf" className="rounded-xl border border-[#27255f] px-6 py-3 font-semibold text-[#27255f] hover:bg-[#f8f8fb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27255f]">Download PDF</a>
        </div>
      </div>
    </section>
    <section id="application" className={`${section} bg-[#f8f8fb]`}>
      <div className={wrap}>
        <div className="mb-10 grid gap-8 lg:grid-cols-2">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-[#8e2828]">2027 cohort - capped at 10 slots</p><h2 className="mt-4 text-3xl font-bold tracking-tight text-[#27255f] sm:text-4xl">Your next chapter<br />starts with an application.</h2><p className="mt-5 max-w-lg leading-relaxed text-gray-600">Tell us about your plans, attach supporting documents and review everything before sending. Applications are assessed for land eligibility, site feasibility and payment capacity.</p></div>
          <div className="rounded-2xl bg-[#27255f] p-7 text-white"><h3 className="font-bold">Need help with your application?</h3><a href={`tel:${BUILDERS_PHONE}`} className="mt-4 inline-flex items-center gap-3 font-semibold text-[#ece825]"><Phone aria-hidden="true" className="h-5 w-5" />024 993 9025</a><p className="mt-5 flex items-start gap-2 text-sm text-white/80"><MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />14 Cotton Street, East Legon, Accra, Ghana</p><p className="mt-4 text-sm leading-relaxed text-white/70">Submitting an application does not guarantee approval or reserve a building slot.</p></div>
        </div>
       <BuildersApplicationForm />
      </div>
    </section>
    <Footer />
  </main>;
}
