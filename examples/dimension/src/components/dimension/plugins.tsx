"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const plugins = [
  {
    name: "SolidWorks Sync",
    desc: "Bi-directional sync with SolidWorks assemblies. Push edits from Dimension directly into your SLDPRT files without re-importing.",
    icon: "SW",
  },
  {
    name: "Revit Bridge",
    desc: "Stream BIM-ready geometry into Autodesk Revit. Walls, floors, and structural elements map automatically to Revit families.",
    icon: "RV",
  },
  {
    name: "FBX Exporter",
    desc: "One-click FBX export with embedded materials and rigging data for Unreal Engine, Unity, and Blender pipelines.",
    icon: "FX",
  },
  {
    name: "Material Library",
    desc: "Access 2,400+ physically-based materials. Apply steel, aluminum, wood, or composites with accurate weight and thermal properties.",
    icon: "ML",
  },
  {
    name: "Version Control",
    desc: "Git-style branching for CAD. Fork a design, experiment freely, then merge changes back with visual diff and conflict resolution.",
    icon: "VC",
  },
  {
    name: "Team Annotations",
    desc: "Pin review comments directly on 3D surfaces. Tag teammates, set priority, and track resolution status across design reviews.",
    icon: "TA",
  },
];

export function Plugins() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="plugins" className="bg-bg-primary py-12 md:py-16">
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "0 24px" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <p className="text-[12px] font-medium tracking-[0.1em] uppercase text-text-secondary mb-3">
            Plugins
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.1] font-heading text-text-primary">
            Extend your workflow.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {plugins.map((p, i) => {
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07, ease }}
                className={`w-full md:w-[65%] ${
                  isEven ? "ml-auto mr-0" : "ml-0 mr-auto"
                }`}
              >
                <div className="bg-bg-elevated rounded-xl border border-border p-6 md:p-8 flex items-start gap-5 group hover:border-accent/20 transition-colors duration-200">
                  {/* Icon badge */}
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-bg-surface flex items-center justify-center text-[11px] font-mono font-bold text-text-secondary">
                    {p.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-[16px] font-semibold text-text-primary font-heading">
                        {p.name}
                      </h3>
                      <button className="shrink-0 text-[12px] font-medium text-accent border border-accent/30 rounded-md px-3 py-1 hover:bg-accent/10 transition-colors">
                        Install
                      </button>
                    </div>
                    <p className="text-[14px] leading-[1.65] text-text-secondary">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
