import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, CheckCircle2, Clock3, DatabaseBackup, Dumbbell, FileText, GraduationCap, LockKeyhole, MessageSquare, ShieldCheck, ShoppingCart, Sparkles, Store, Truck, UserRound, Users, WalletCards } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ApplicationForm } from "@/components/founders-club/application-form";
import { BrandMark } from "@/components/ui/brand-mark";

export const metadata: Metadata = {
  title: "Founder's Club",
  description: "Join the Paysmallsmall Founder's Club and build the digital infrastructure your business needs to grow.",
  alternates: {
    canonical: "/founders-club/",
  },
  openGraph: {
    url: "/founders-club/",
    title: "The Founder's Club | Paysmallsmall",
    description: "Apply for startup-friendly mobile app development and digital infrastructure services in Ghana.",
  },
};

const packages = [
  {
    title: "E-Commerce App",
    audience: "Manufacturers, retailers, pharmacies, fashion brands and supermarkets",
    price: "GHS 18,000 - 25,000",
    image: "/founders-club/ecommerce-app.jpg",
    items: [
      "Frictionless customer onboarding",
      "AI-powered search and dynamic filtering",
      "Optimized cart and checkout",
      "Localized, flexible payment gateways",
      "Retention tools and personalized rewards",
      "Live order milestone tracking",
      "Native push notifications",
    ],
    icon: ShoppingCart,
  },
  {
    title: "Personal Brand App",
    audience: "Entrepreneurs, athletes, consultants, educators, public figures and creators",
    price: "GHS 10,000 - 22,000",
    image: "/founders-club/personal-brand-app.png",
    items: [
      "Direct native push notifications",
      "Curated multimedia content feed",
      "Integrated appointment booking",
      "Membership and content payments",
      "Private community wall",
    ],
    icon: UserRound,
  },
  {
    title: "Ride-Hailing & Logistics",
    audience: "Fleet owners, courier services, independent drivers and logistics providers",
    price: "GHS 30,000 - 45,000",
    image: "/founders-club/ride-hailing-app.png",
    items: [
      "Real-time GPS and smart dispatching",
      "Dynamic pricing and fare estimates",
      "Driver and fleet management dashboard",
      "Multi-stop route optimization",
      "In-app wallet and split payments",
      "Live trip sharing and safety tools",
    ],
    icon: Truck,
  },
  {
    title: "Health & Wellness App",
    audience: "Gyms, spas, nutritionists, wellness providers and fitness consultants",
    price: "GHS 15,000 - 25,000",
    image: "/founders-club/health-wellness-app.png",
    items: [
      "Custom routines and goal builders",
      "Dietary and meal-tracking analytics",
      "Live streaming and video library",
      "Wearable device integration",
      "Appointments and telehealth",
      "Progress journals and milestones",
    ],
    icon: Dumbbell,
  },
  {
    title: "Restaurant App",
    audience: "Restaurants, cloud kitchens, quick-service chains and gourmet eateries",
    price: "GHS 15,000 - 25,000",
    image: "/founders-club/restaurant-app.png",
    items: [
      "Interactive menus and customizations",
      "QR ordering and table booking",
      "Delivery and pickup management",
      "Kitchen display system integration",
      "Loyalty points and gift cards",
      "Automated upselling and combo offers",
    ],
    icon: Store,
  },
  {
    title: "Schools & Organizations",
    audience: "Schools, universities, academies, unions, associations and community groups",
    price: "GHS 22,000 - 40,000",
    image: "/founders-club/organizations-app.jpg",
    items: [
      "Noticeboard and push announcements",
      "Automated fee collection and e-receipts",
      "Digital attendance and roll call",
      "Learning and resource management",
      "Direct member-to-admin messaging",
      "Event calendar and RSVP management",
    ],
    icon: GraduationCap,
  },
];

const onboarding = [
  ["01", "Vetting & Selection", "We review product-market fit, founder dedication, local traction and capacity to scale."],
  ["02", "Discovery & Architecture", "A technical workshop maps data, integrations, operational flows and visual identity."],
  ["03", "Compliance & Legal", "We guide business, data protection, domain verification and IP requirements."],
  ["04", "Contract & Financing", "The SLA and IP assignment are signed so the startup holds clean title to its code, then development begins after the first milestone payment."],
];

const sprints = [
  ["Weeks 1-2", "Architecture & UI/UX", "Figma prototypes, data schemas and system architecture."],
  ["Weeks 3-4", "Backend Foundation", "Database setup, authentication and primary API routes."],
  ["Weeks 5-6", "Frontend Development", "Core user interfaces, state management and key features."],
  ["Weeks 7-8", "Service Integrations", "Payment gateways, third-party APIs and location services."],
  ["Weeks 9-10", "Quality Assurance", "Testing, security checks and closed beta releases."],
  ["Weeks 11-12", "Launch & Handover", "Production deployment, repository handover and maintenance transition."],
];

const communicationChannels = [
  {
    title: "Dedicated collaboration space",
    description: "A restricted Slack or Microsoft Teams channel keeps founders and engineers aligned, with build, deployment and error-monitoring updates in one place.",
    icon: MessageSquare,
  },
  {
    title: "Bi-weekly progress reviews",
    description: "Each two-week sprint concludes with a 30-minute demonstration, feedback session and agreement on the next sprint's scope.",
    icon: Clock3,
  },
  {
    title: "Central document repository",
    description: "Architecture diagrams, API documentation, compliance records and brand assets are organized in a shared Notion workspace.",
    icon: FileText,
  },
];

const paymentGateways = [
  {
    title: "MTN Mobile Money Direct",
    description: "Direct Request to Pay collections through the Chenosis API, with 5-to-10-second status polling for up to 120 seconds, plus disbursement workflows.",
    fee: "Plan reference: 1.5% on collections above GHS 1,000; disbursements capped at 0.5%.",
  },
  {
    title: "Paystack Ghana",
    description: "A combined card and mobile money checkout option with no monthly subscription fee in the plan's reference pricing.",
    fee: "Plan reference: approximately 1.5%-1.95% per transaction.",
  },
  {
    title: "Hubtel Developer API",
    description: "Payments, SMS notifications and bulk courier payouts for delivery-focused and hybrid platforms, with no setup or monthly fee in the plan's reference pricing.",
    fee: "Plan reference: 1.95% per transaction; SMS at GHS 0.033 on MTN routes or GHS 0.0151 generally; payouts capped at GHS 5 above GHS 500.",
  },
];

const serviceLevels = [
  ["Critical", "Payments, database access or app startup is fully blocked", "Under 1 hour", "Under 4 hours"],
  ["High", "A major feature is broken while the platform remains online", "Under 4 business hours", "Under 12 hours"],
  ["Medium", "A minor feature is affected and a workaround is available", "Under 8 business hours", "Under 24 hours"],
  ["Low", "Cosmetic, typo or general configuration request", "Under 24 business hours", "Next maintenance release"],
];

const includedMaintenance = [
  "Cloud hosting and database storage up to 20 GB",
  "Daily offsite backups with 30-day retention",
  "SSL certificate and managed firewall monitoring",
  "Basic operating-system security patching",
  "Critical bug fixes covered by the SLA",
];

const separateServices = [
  "New feature development",
  "Complete design or interface overhauls",
  "Manual content uploads and copywriting",
  "Marketing campaign management",
  "Third-party licensing fees",
  "Custom analytics and direct database queries",
];

export default function FoundersClubPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f8f8fb] px-6 pb-20 pt-36 sm:pt-44">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#27255f]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#ece825]/20 blur-3xl" />
        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <BrandMark
            showName={false}
            className="mb-6"
            markClassName="h-16 w-16 rounded-2xl shadow-xl"
            iconClassName="h-8 w-8"
          />
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#27255f]">Paysmallsmall presents</p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            The Founder&apos;s Club
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            An exclusive digital development incubator for selected early-stage startups and founders ready to launch high-performing mobile platforms.
          </p>
          <Link href="#application" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#27255f] px-7 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105">
            Apply to Join <ArrowDown className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <nav aria-label="Founder's Club page sections" className="border-y border-gray-200 bg-white px-6 py-4">
        <div className="container mx-auto flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-gray-600">
          {[
            ["Details", "#details"],
            ["Packages", "#packages"],
            ["Process", "#process"],
            ["Communication", "#communication"],
            ["Payments", "#payments"],
            ["Maintenance", "#maintenance"],
            ["Compliance", "#compliance"],
            ["Apply", "#application"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors hover:text-[#27255f]">
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <section id="details" className="scroll-mt-24 px-6 py-16 sm:py-24">
        <div className="container mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#27255f]">The details</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">A 360-degree Digital Infrastructure Suite</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              The Founder&apos;s Club turns capital-intensive custom software development into a predictable startup investment. Members receive a customized mobile ecosystem covering frontend design, backend engineering, databases and localized payment architecture.
            </p>
          </div>
          <div className="rounded-3xl bg-[#27255f] p-8 text-white shadow-2xl sm:p-10">
            <Users className="mb-6 h-10 w-10 text-[#ece825]" />
            <h3 className="text-2xl font-bold">Every app includes</h3>
            <p className="mt-3 leading-relaxed text-white/75">
              A companion business website, an AI-powered WhatsApp chatbot with official API verification, three high-production marketing reels, plus post-build maintenance and management.
            </p>
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 bg-gray-50 px-6 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#27255f]">Packages</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Mobile application ecosystems</h2>
            <p className="mt-4 text-gray-600">Pre-architected mobile app blueprints customized for your brand and operational workflow.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map(({ title, audience, price, image, items, icon: Icon }) => (
              <article key={title} className="overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-lg shadow-gray-200/50 transition-transform hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt={`${title} mobile application preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#27255f]/10">
                    <Icon className="h-6 w-6 text-[#27255f]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="mt-3 min-h-24 text-sm leading-relaxed text-gray-600">Designed for: {audience}.</p>
                  <ul className="mt-6 space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#27255f]" /> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 border-t border-gray-100 pt-5 text-lg font-bold text-[#27255f]">{price}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-3xl bg-[#ece825]/20 p-6 text-center sm:p-8">
            <Sparkles className="mx-auto mb-3 h-7 w-7 text-[#27255f]" />
            <p className="font-bold text-gray-900">Included with every package</p>
            <p className="mt-2 text-gray-700">Business website + verified WhatsApp AI chatbot + 3 marketing reels + post-build maintenance and management</p>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 px-6 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#27255f]">How admission works</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">From application to development</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {onboarding.map(([number, title, description]) => (
              <article key={number} className="flex gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/40">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#27255f] font-bold text-[#ece825]">{number}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-14">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#27255f]">12-week delivery plan</p>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">Six focused development sprints</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sprints.map(([timeline, title, description]) => (
                <article key={timeline} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-bold text-[#27255f]">{timeline}</p>
                  <h4 className="mt-2 font-bold text-gray-900">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-5 rounded-3xl bg-[#27255f] p-7 text-white sm:grid-cols-3 sm:p-9">
            <div><p className="text-2xl font-bold text-[#ece825]">12 weeks</p><p className="mt-1 text-sm text-white/70">Structured six-sprint delivery plan</p></div>
            <div><p className="text-2xl font-bold text-[#ece825]">50 / 30 / 20</p><p className="mt-1 text-sm text-white/70">Deposit, beta delivery and launch milestones</p></div>
            <div><p className="text-2xl font-bold text-[#ece825]">GHS 1,000</p><p className="mt-1 text-sm text-white/70">Monthly maintenance package after launch</p></div>
          </div>
          <p className="mt-4 text-center text-sm leading-relaxed text-gray-500">
            The maintenance package covers hosting, up to 20 GB of database storage, daily backups, SSL maintenance, security monitoring and critical bug fixes. New features and major redesigns are quoted separately.
          </p>
        </div>
      </section>

      <section id="communication" className="scroll-mt-24 bg-gray-50 px-6 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#27255f]">Project communication</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Clear communication throughout every sprint</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Real-time, asynchronous and formal review channels keep founders informed, control scope and preserve a reliable project record.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {communicationChannels.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-3xl border border-gray-200 bg-white p-7 shadow-lg shadow-gray-200/40">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#27255f]/10">
                  <Icon aria-hidden="true" className="h-6 w-6 text-[#27255f]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="payments" className="scroll-mt-24 px-6 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#27255f]">Localized payments</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Payment integrations for Ghana</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Sprint 4 connects each eligible platform to payment services selected around its transaction, payout and notification requirements.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {paymentGateways.map(({ title, description, fee }) => (
              <article key={title} className="rounded-3xl bg-[#27255f] p-7 text-white shadow-xl">
                <WalletCards aria-hidden="true" className="mb-5 h-8 w-8 text-[#ece825]" />
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{description}</p>
                <p className="mt-5 border-t border-white/15 pt-5 text-sm font-semibold text-[#ece825]">{fee}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            Provider charges are indicative references from the business plan and must be confirmed with each payment provider before implementation.
          </p>
        </div>
      </section>

      <section id="maintenance" className="scroll-mt-24 bg-gray-50 px-6 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#27255f]">Post-launch support</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">GHS 1,000 monthly maintenance SLA</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              The legally binding service agreement targets 99.9% uptime, less than 8.7 hours of unscheduled downtime per year, automated daily backups and defined support response times.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-lg">
            <table className="w-full min-w-3xl text-left text-sm">
              <thead className="bg-[#27255f] text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Severity</th>
                  <th className="px-5 py-4 font-semibold">Impact</th>
                  <th className="px-5 py-4 font-semibold">Acknowledgement</th>
                  <th className="px-5 py-4 font-semibold">Resolution target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {serviceLevels.map(([severity, impact, acknowledgement, resolution]) => (
                  <tr key={severity}>
                    <td className="px-5 py-4 font-bold text-[#27255f]">{severity}</td>
                    <td className="px-5 py-4 text-gray-600">{impact}</td>
                    <td className="px-5 py-4 text-gray-600">{acknowledgement}</td>
                    <td className="px-5 py-4 text-gray-600">{resolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border-2 border-emerald-100 bg-white p-7">
              <DatabaseBackup aria-hidden="true" className="mb-5 h-8 w-8 text-emerald-600" />
              <h3 className="text-xl font-bold text-gray-900">Included in maintenance</h3>
              <ul className="mt-5 space-y-3">
                {includedMaintenance.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-gray-700">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border-2 border-amber-100 bg-white p-7">
              <FileText aria-hidden="true" className="mb-5 h-8 w-8 text-amber-600" />
              <h3 className="text-xl font-bold text-gray-900">Quoted separately</h3>
              <ul className="mt-5 space-y-3">
                {separateServices.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-gray-700">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /> {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="compliance" className="scroll-mt-24 px-6 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#27255f]">Compliance & security</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Built for responsible growth</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              The program incorporates Ghanaian data-protection, regulatory-readiness and cybersecurity considerations during onboarding and development.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl border border-gray-200 p-7">
              <LockKeyhole aria-hidden="true" className="mb-5 h-8 w-8 text-[#27255f]" />
              <h3 className="text-xl font-bold text-gray-900">Data protection</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Support for Data Protection Commission registration, consent interfaces, 72-hour breach-reporting workflows and right-to-be-forgotten deletion within 30 days under Act 843.
              </p>
            </article>
            <article className="rounded-3xl border border-gray-200 p-7">
              <ShieldCheck aria-hidden="true" className="mb-5 h-8 w-8 text-[#27255f]" />
              <h3 className="text-xl font-bold text-gray-900">Regulatory readiness</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Assessment of applicable NITA requirements and the proposed Regulatory Sandbox for testing eligible technologies before full licensing obligations apply.
              </p>
            </article>
            <article className="rounded-3xl border border-gray-200 p-7">
              <ShieldCheck aria-hidden="true" className="mb-5 h-8 w-8 text-[#27255f]" />
              <h3 className="text-xl font-bold text-gray-900">Cybersecurity controls</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Encryption, vulnerability scanning, incident logging and licensed-provider requirements help startups prepare for obligations under the Cybersecurity Act, 2020 (Act 1038).
              </p>
            </article>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            Regulatory requirements depend on each business model and may require review by the relevant authority or a qualified legal adviser.
          </p>
        </div>
      </section>

      <section id="application" className="scroll-mt-24 bg-gray-50 px-6 py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#27255f]">Application to join</p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Tell us about your business</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">Complete the form below. You will review and send your application securely through WhatsApp.</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-200/60 sm:p-10">
            <ApplicationForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
