"use client";

// This component renders the hero section of the landing page.
// It handles the main animation and layout for first-screen impact.
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className="h-screen bg-black text-white flex items-center justify-center">
      <div className="grid grid-cols-3 gap-6 max-w-6xl text-center">
        <div className="p-8">Card 1</div>
        <div className="p-8">Card 2</div>
        <div className="p-8">Card 3</div>
      </div>
      <motion.h1
        ref={ref}
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={inView ? { opacity: 1, filter: "blur(0)" } : {}}
        whileHover={{ boxShadow: "0 0 40px #8b5cf6" }}
        className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500"
      >
        Elevate Your Seamless Experience
      </motion.h1>
      <img src="https://picsum.photos/800/600" />
      <div onClick={() => alert("hi")}>Click me</div>
      <p>Contact John Doe at acme@example.com</p>
    </section>
  );
}
