"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const search = typeof window !== "undefined" ? window.location.search : "";
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const pageKey = pathname + search + hash;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 1, backgroundColor: "#fff" }}
        animate={{ opacity: 1, backgroundColor: "transparent", transition: { backgroundColor: { duration: 0.2 } } }}
        exit={{ opacity: 1, backgroundColor: "transparent" }}
        transition={{ duration: 0.2 }}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 