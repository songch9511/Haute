"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { springs } from "@/components/motion";

function MagneticLink({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      animate={pos}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * 0.08,
          y: (e.clientY - rect.top - rect.height / 2) * 0.08,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      transition={springs.standard}
      className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 min-h-[44px] inline-flex items-center"
    >
      {children}
    </motion.a>
  );
}

export function ShowcaseNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-8 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <a href="/showcase" className="font-semibold text-[var(--text-primary)] text-lg tracking-tight min-h-[44px] inline-flex items-center">
        Atelier
      </a>
      <div className="hidden md:flex gap-8 items-center">
        <MagneticLink href="#work">Work</MagneticLink>
        <MagneticLink href="#services">Services</MagneticLink>
        <MagneticLink href="#about">About</MagneticLink>
        <MagneticLink href="#contact">Contact</MagneticLink>
      </div>
      <motion.a
        href="#contact"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={springs.snappy}
        className="px-6 py-3 min-h-[44px] bg-[var(--accent)] text-[var(--bg-primary)] text-sm font-medium rounded-lg no-underline"
      >
        Let&apos;s talk
      </motion.a>
    </nav>
  );
}
