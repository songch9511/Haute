"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, springs, ease } from "@/components/motion";

export function ShowcaseContact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-32 px-8 max-w-[1280px] mx-auto" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 items-start">
        <AnimatedSection>
          <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)] block mb-3">
            Get in touch
          </span>
          <h2 className="text-[2.5rem] font-normal leading-[1.15] tracking-tight mb-4">
            Start a project
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">
            Tell us about your project and we&apos;ll get back within 24 hours
            with a proposal and timeline.
          </p>
          <div className="flex flex-col gap-3 text-sm text-[var(--text-tertiary)]">
            <span>studio@atelier.design</span>
            <span>San Francisco, CA</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      aria-label="Name"
                      className="w-full px-4 py-3 min-h-[44px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors duration-150 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      aria-label="Email"
                      className="w-full px-4 py-3 min-h-[44px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors duration-150 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Project details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Brief description of your project, timeline, and budget range"
                    aria-label="Project details"
                    className="w-full px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors duration-150 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springs.snappy}
                  className="self-start px-8 py-3 min-h-[44px] bg-[var(--accent)] text-[var(--bg-primary)] text-base font-medium rounded-lg cursor-pointer border-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
                >
                  Send inquiry
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: ease.out }}
                className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...springs.bouncy, delay: 0.1 }}
                  className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-6 h-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-normal tracking-tight mb-2">
                  Message sent
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  We&apos;ll review your project details and respond within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedSection>
      </div>
    </section>
  );
}
