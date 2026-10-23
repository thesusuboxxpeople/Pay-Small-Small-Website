"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, User, Mail, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleGhanaPhoneChange, unformatGhanaPhone } from "@/lib/phone";

export function Waitlist({ endpoint }: { endpoint?: string }) {
  const submitting = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+233 ");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = handleGhanaPhoneChange(phone, inputValue);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    setError(null);
    if (!endpoint) { setError("The waitlist is temporarily unavailable. Please contact support@paysmallsmall.app."); return; }

    if (!name.trim() || !phone.trim()) {
      setError("Please enter your full name and phone number.");
      return;
    }

    // Validate phone number
    const unformattedPhone = unformatGhanaPhone(phone);
    if (!unformattedPhone || unformattedPhone.length !== 12 || !/^233\d{9}$/.test(unformattedPhone)) {
      setError("Please enter a valid Ghana phone number (e.g. 0241234567 or 233241234567).");
      return;
    }

    setStatus("loading");
    submitting.current = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(endpoint, {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: unformattedPhone,
          email: email.trim() || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && typeof data === "object" && !Array.isArray(data) && data.success !== false) {
        setStatus("success");
        return;
      }

      const errorType = data?.error_type as string | undefined;
      const apiMessage = typeof data?.message === "string" ? data.message : null;

      if (errorType === "waitlist_duplicate_phone") {
        setError(apiMessage || "You are already on the waitlist with this phone number.");
      } else if (data?.data?.errors) {
        const firstError = Object.values(data.data.errors).flat().find((value): value is string => typeof value === "string")
          ?? apiMessage ?? "Please check your details and try again.";
        setError(firstError);
      } else if (apiMessage) {
        setError(apiMessage);
      } else {
        setError("Something went wrong while joining the waitlist. Please try again.");
      }
      setStatus("idle");
    } catch {
      setError("We could not confirm your waitlist registration. Check your connection and try again, or contact support@paysmallsmall.app.");
      setStatus("idle");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setError(null);
    setName("");
    setEmail("");
    setPhone("+233 ");
  };

  return (
    <section id="waitlist" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#27255f] via-[#27255f]/90 to-[#27255f] -skew-y-3 transform origin-top-left md:-skew-y-2 scale-110 z-0" />
      <div className="absolute inset-0 bg-[#27255f]/95 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-[#27255f]/20 to-[#ece825]/30 text-[#27255f] rounded-full text-sm font-bold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              EARLY ACCESS
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4 sm:px-0">
              Be the first to know when we launch
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto px-4 sm:px-0">
              Join the waitlist to receive launch updates and hear about early access.
            </p>
          </div>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-br from-[#27255f]/10 to-[#ece825]/20 rounded-2xl border-2 border-[#27255f]/20"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#27255f] to-[#27255f]/80 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#27255f] mb-2 md:mb-3 px-4 sm:px-0">You&apos;re on the list!</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center mb-1.5 sm:mb-2 px-4 sm:px-0">We&apos;ll notify you as soon as we launch.</p>
              <p className="text-xs sm:text-sm text-gray-500 text-center mb-4 sm:mb-6 px-4 sm:px-0">Keep an eye on your phone and email for updates.</p>
              <Button 
                 variant="outline" 
                 className="mt-4" 
                 onClick={handleReset}
              >
                Add Another Person
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="name"
                    autoComplete="name"
                    maxLength={120}
                    disabled={status === "loading"}
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 sm:h-14 pl-12 pr-6 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-[#27255f] focus:outline-none transition-colors text-base sm:text-lg"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    id="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    disabled={status === "loading"}
                    type="tel"
                    placeholder="+233 (XXX) XXX-XXXX"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full h-14 pl-12 pr-6 rounded-2xl border-2 border-gray-200 focus:border-[#27255f] focus:outline-none transition-colors text-lg font-mono"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">Enter your Ghana phone number (e.g., 0241234567)</p>
              </div>

              {/* Email Field (Optional) */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    autoComplete="email"
                    maxLength={254}
                    disabled={status === "loading"}
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 sm:h-14 pl-12 pr-6 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-[#27255f] focus:outline-none transition-colors text-base sm:text-lg"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">We&apos;ll send you updates via email (optional)</p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                isLoading={status === "loading"}
                className="w-full h-14 text-lg hover:scale-[1.02] transition-transform"
              >
                Join Waitlist
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-center text-sm text-gray-400 mt-4">
                We use your contact details to send Pay Small Small launch updates. Contact support@paysmallsmall.app to request removal.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
