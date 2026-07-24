"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Globe, Activity } from "lucide-react";
import { FOOTER_SECTIONS } from "./footer.constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-background/90 backdrop-blur-xl border-t border-neutral-border/80 pt-12 sm:pt-16 pb-8 select-none relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-border/60">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-foreground self-start">
              <Image
                src="/images/logo.svg"
                alt="Siklo Logo"
                width={70}
                height={70}
                priority
              />
            </Link>

            <p className="text-xs text-neutral-subtext leading-relaxed font-normal max-w-sm">
              The 100% transparent digital notebook built for Philippine Paluwagan savings circles. Track turns, verify contributions, and eliminate ledger errors.
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Transparent
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Activity className="w-3 h-3 animate-pulse text-emerald-500" /> Systems Operational
              </span>
            </div>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {FOOTER_SECTIONS.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
                className="flex flex-col gap-3"
              >
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-2 text-xs">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-neutral-subtext hover:text-brand-accent font-medium transition-colors duration-150 inline-block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-subtext font-medium">
          <p className="text-center sm:text-left">
            Copyright &copy; {currentYear}{" "}
            <span className="text-foreground font-bold">Siklo</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-table-stripe border border-neutral-border text-[11px] font-bold text-foreground">
            <Globe className="w-3.5 h-3.5 text-brand-accent" />
            <span>Philippines (PH)</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
