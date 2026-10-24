"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { Menu, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileOpen) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const wide = window.matchMedia("(min-width: 1280px)");
    const closeOnWideScreen = () => { if (wide.matches) setIsMobileOpen(false); };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsMobileOpen(false); return; }
      if (event.key !== "Tab") return;
      const controls = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!controls?.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keyboard);
    wide.addEventListener("change", closeOnWideScreen);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", keyboard);
      wide.removeEventListener("change", closeOnWideScreen);
      toggle?.focus();
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.split("#")[1];
    if (!targetId) return;
    const element = document.getElementById(targetId);

    if (element && pathname === href.split("#")[0]) {
      e.preventDefault();
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
    
    // Close mobile menu
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "py-4" : "py-6"
        )}
      >
        <div className="container mx-auto px-6">
          <div
            className={cn(
              "rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6",
              isScrolled
                ? "bg-white/80 backdrop-blur-lg shadow-lg shadow-black/5 border border-white/20 h-14 sm:h-16"
                : "bg-transparent h-16 sm:h-20"
            )}
          >
            {/* Logo */}
            <Link href="/" aria-label="Paysmallsmall home">
              <BrandMark />
            </Link>

            {/* Desktop Nav */}
            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-5">
              {[
                { label: "Features", id: "features" },
                { label: "How it Works", id: "how-it-works" },
                { label: "Pay Small Small", id: "pay-small-small" },
                { label: "Waitlist", id: "waitlist" },
              ].map((item) => {
                const href = `/#${item.id}`;
                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="text-sm font-medium text-gray-600 hover:text-[#27255f] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/founders-club" aria-current={pathname === "/founders-club" ? "page" : undefined}
                className="text-sm font-semibold text-[#27255f] hover:text-[#1f1d4a] transition-colors"
              >
                Founder&apos;s Club
              </Link>
              <Link href="/builders-club" aria-current={pathname === "/builders-club" ? "page" : undefined} className="text-sm font-semibold text-[#27255f] hover:text-[#1f1d4a]">Builders Club</Link>
            </nav>

            {/* CTA */}
            <div className="hidden xl:flex items-center gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Pay Small Small for iOS (opens in a new tab)"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-2xl border-2 border-[#27255f] px-4 text-sm font-semibold text-[#27255f] transition-colors hover:bg-[#27255f]/5"
              >
                <Smartphone className="w-4 h-4" />
                iOS
              </a>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer")}
                className="flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                Android
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              ref={toggleRef}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              className="xl:hidden p-2 text-gray-600"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <motion.div
          ref={menuRef}
          id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 overflow-y-auto bg-white pt-24 pb-8 px-6 xl:hidden"
        >
          <div className="flex flex-col gap-6">
            <button type="button" onClick={() => setIsMobileOpen(false)} className="self-end rounded-lg p-3 text-[#27255f]" aria-label="Close navigation menu"><X aria-hidden="true" /></button>
            {[
              { label: "Features", id: "features" },
              { label: "How it Works", id: "how-it-works" },
              { label: "Pay Small Small", id: "pay-small-small" },
              { label: "Waitlist", id: "waitlist" },
            ].map((item) => {
              const href = `/#${item.id}`;
              return (
                <Link
                  key={item.id}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer"
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/founders-club" aria-current={pathname === "/founders-club" ? "page" : undefined}
              onClick={() => setIsMobileOpen(false)}
              className="text-xl sm:text-2xl font-bold text-[#27255f]"
            >
              Founder&apos;s Club
            </Link>
            <Link href="/builders-club" aria-current={pathname === "/builders-club" ? "page" : undefined} onClick={() => setIsMobileOpen(false)} className="text-xl sm:text-2xl font-bold text-[#27255f]">Builders Club</Link>
            <div className="h-px bg-gray-100 my-4" />
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Download Pay Small Small for iOS (opens in a new tab)"
              className="inline-flex h-14 w-full items-center justify-center rounded-2xl border-2 border-[#27255f] px-8 text-lg font-semibold text-[#27255f] transition-colors hover:bg-[#27255f]/5"
            >
              <Smartphone className="mr-2 w-5 h-5" />
              iOS
            </a>
            <Button 
              className="w-full" 
              size="lg"
              variant="outline"
              onClick={() => {
                setIsMobileOpen(false);
                window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer");
              }}
            >
              <Smartphone className="mr-2 w-5 h-5" />
              Android
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
