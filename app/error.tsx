"use client";
import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main-content" tabIndex={-1} className="mx-auto max-w-2xl px-6 py-32 text-center"><h1 className="text-3xl font-bold text-[#27255f]">We couldn’t load this page.</h1><p className="mt-5 text-gray-600">Try loading it again, or return to the homepage. If you were completing a form, confirm its status before sending again.</p><div className="mt-8 flex justify-center gap-4"><button onClick={reset} className="rounded-xl bg-[#27255f] px-5 py-3 font-semibold text-white">Try again</button><Link href="/" className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-[#27255f]">Go home</Link></div></main>;
}
