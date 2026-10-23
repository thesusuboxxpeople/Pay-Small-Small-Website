import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function NotFound() {
  return <main><Navbar /><section id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-6 pb-24 pt-44 text-center"><p className="font-semibold text-[#8e2828]">Page not found</p><h1 className="mt-4 text-4xl font-bold text-[#27255f]">Let’s get you to the right place.</h1><p className="mt-5 text-gray-600">This page may have moved, or the address may be incorrect.</p><div className="mt-8 flex flex-wrap justify-center gap-4">{[["/", "Home"], ["/founders-club", "Founder’s Club"], ["/builders-club", "Builders Club"]].map(([href, label]) => <Link key={href} href={href} className="rounded-xl bg-[#27255f] px-5 py-3 font-semibold text-white">{label}</Link>)}</div></section><Footer /></main>;
}
