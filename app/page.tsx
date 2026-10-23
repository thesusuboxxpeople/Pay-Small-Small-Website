import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { PaySmallSmall } from "@/components/landing/pay-small-small";
import { Waitlist } from "@/components/landing/waitlist";
import { Footer } from "@/components/landing/footer";
import { publicEndpoint } from "@/lib/site-config";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#27255f]/10 selection:text-[#27255f]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <PaySmallSmall />
      <Waitlist endpoint={publicEndpoint(process.env.WAITLIST_ENDPOINT, "https://admin.paysmallsmall.app/api/waitlist")} />
      <Footer />
    </main>
  );
}
