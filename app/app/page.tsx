"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Wallet } from "lucide-react";

export default function AppPage() {
  const [accessCode, setAccessCode] = useState(["", "", "", ""]);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const [showWalletStep, setShowWalletStep] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setIsVisible(true);
    // Auto focus first input
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 800);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...accessCode];
    newCode[index] = value;
    setAccessCode(newCode);
    setIsCodeInvalid(false);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      const enteredCode = newCode.join("");
      if (enteredCode === "7447") {
        setIsCodeValid(true);
        setTimeout(() => {
          setShowWalletStep(true);
        }, 2000);
      } else {
        setIsCodeInvalid(true);
        setTimeout(() => {
          setAccessCode(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 800);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !accessCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...accessCode];
    pastedData.split("").forEach((digit, i) => {
      if (i < 4) newCode[i] = digit;
    });
    setAccessCode(newCode);

    if (newCode.every((digit) => digit !== "")) {
      const enteredCode = newCode.join("");
      if (enteredCode === "7447") {
        setIsCodeValid(true);
        setTimeout(() => {
          setShowWalletStep(true);
        }, 2000);
      } else {
        setIsCodeInvalid(true);
        setTimeout(() => {
          setAccessCode(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 800);
      }
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-50"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(236,168,214,0.4) 0%, transparent 70%)",
            top: "10%",
            left: "-20%",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(168,216,236,0.4) 0%, transparent 70%)",
            bottom: "0%",
            right: "-10%",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Logo */}
      <div
        className={`absolute top-8 left-8 z-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-display text-white tracking-tight">Eclipse Finance</span>
          <span className="text-[10px] font-mono text-white/40 mt-0.5">™</span>
        </a>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6">
        {!showWalletStep ? (
          // Access Code Step
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Decorative eclipse symbol */}
            <div className={`relative mb-12 transition-all duration-700 ${isCodeValid ? "scale-90 opacity-0" : ""}`}>
              <div className="relative w-24 h-24 mx-auto">
                {/* Outer ring */}
                <div 
                  className="absolute inset-0 rounded-full border border-white/10"
                  style={{ animation: "spin 30s linear infinite" }}
                />
                {/* Middle ring */}
                <div 
                  className="absolute inset-2 rounded-full border border-white/5"
                  style={{ animation: "spin 25s linear infinite reverse" }}
                />
                {/* Inner glow */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#eca8d6]/60" />
                </div>
              </div>
            </div>

            {/* Success state */}
            {isCodeValid && (
              <div className="mb-12 animate-fadeIn">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            )}

            {/* Title */}
            <div className="overflow-hidden mb-2">
              <h1 
                className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight transition-all duration-700 ${
                  isCodeValid ? "text-emerald-400" : "text-white"
                }`}
                style={{ 
                  fontWeight: 300,
                  letterSpacing: "-0.02em"
                }}
              >
                {isCodeValid ? "Access granted" : "Eclipse"}
              </h1>
            </div>

            {/* Subtitle */}
            <p 
              className={`text-lg md:text-xl font-light tracking-wide mb-16 transition-all duration-500 ${
                isCodeValid ? "text-emerald-400/60" : "text-white/30"
              }`}
            >
              {isCodeValid ? "Initializing secure connection" : "Private access protocol"}
            </p>

            {/* Code Input */}
            <div className="relative mb-12">
              {/* Decorative line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2" />
              
              <div
                className={`relative flex justify-center gap-4 ${isCodeInvalid ? "animate-shake" : ""}`}
                onPaste={handlePaste}
              >
                {accessCode.map((digit, index) => (
                  <div key={index} className="relative">
                    {/* Glow effect on focus */}
                    {focusedIndex === index && !isCodeValid && (
                      <div className="absolute -inset-2 bg-[#eca8d6]/10 rounded-2xl blur-xl animate-pulse" />
                    )}
                    <input
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setFocusedIndex(null)}
                      disabled={isCodeValid}
                      className={`relative w-16 h-20 md:w-20 md:h-24 text-center text-3xl md:text-4xl font-light bg-white/[0.03] backdrop-blur-sm border rounded-2xl outline-none transition-all duration-500 ${
                        isCodeValid
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                          : isCodeInvalid
                          ? "border-red-500/40 text-red-400 bg-red-500/5"
                          : digit
                          ? "border-white/20 text-white"
                          : "border-white/[0.08] text-white/80"
                      } focus:border-white/30 focus:bg-white/[0.06]`}
                      style={{ caretColor: "transparent" }}
                    />
                    {/* Bottom indicator */}
                    <div 
                      className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full transition-all duration-300 ${
                        digit ? "bg-white/40" : "bg-white/10"
                      } ${isCodeValid ? "bg-emerald-500/40" : ""}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Status text */}
            <div className="h-6">
              <p className={`text-sm font-mono tracking-wider uppercase transition-all duration-500 ${
                isCodeInvalid 
                  ? "text-red-400/80" 
                  : isCodeValid 
                  ? "text-emerald-400/60" 
                  : "text-white/20"
              }`}>
                {isCodeInvalid
                  ? "Invalid access code"
                  : isCodeValid
                  ? "Welcome to Eclipse Finance"
                  : "Enter 4-digit code"}
              </p>
            </div>
          </div>
        ) : (
          // Wallet Connection Step
          <div className="text-center animate-fadeIn">
            {/* Decorative wallet icon */}
            <div className="relative mb-12">
              <div className="relative w-28 h-28 mx-auto">
                {/* Animated rings */}
                <div 
                  className="absolute inset-0 rounded-full border border-white/5"
                  style={{ animation: "spin 20s linear infinite" }}
                />
                <div 
                  className="absolute inset-3 rounded-full border border-dashed border-white/10"
                  style={{ animation: "spin 15s linear infinite reverse" }}
                />
                {/* Icon container */}
                <div className="absolute inset-5 rounded-full bg-gradient-to-br from-white/[0.08] to-transparent flex items-center justify-center">
                  <Wallet className="w-10 h-10 text-white/50" strokeWidth={1} />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display text-white mb-3 tracking-tight"
              style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
            >
              Verify
            </h1>
            <p className="text-lg md:text-xl font-light text-white/30 tracking-wide mb-16">
              Wallet ownership required
            </p>

            {/* Info card */}
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-3xl p-8 mb-8">
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Connect your Solana wallet to verify ownership and unlock access to eclipse vaults. This is a read-only signature request.
              </p>

              {/* Connect Button */}
              <Button
                size="lg"
                className="relative bg-white hover:bg-white/90 text-black px-10 h-14 text-base font-medium rounded-full group w-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>

            {/* Supported wallets */}
            <div className="flex items-center justify-center gap-6 text-xs text-white/20 font-mono tracking-wider">
              <span>Phantom</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>Solflare</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>Backpack</span>
            </div>

            {/* Security note */}
            <div className="mt-16 pt-8 border-t border-white/[0.04]">
              <p className="text-[11px] text-white/15 leading-relaxed tracking-wide">
                By connecting, you agree to our Terms of Service.
                <br />
                This verification does not grant transaction permissions.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom decoration */}
      <div
        className={`absolute bottom-8 left-0 right-0 flex justify-center transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-6 text-[11px] text-white/15 font-mono tracking-widest uppercase">
          <span>Eclipse</span>
          <span className="w-px h-3 bg-white/10" />
          <span>Private</span>
          <span className="w-px h-3 bg-white/10" />
          <span>v1.0.0</span>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>
    </main>
  );
}
