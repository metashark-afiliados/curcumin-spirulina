"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

export interface BenefitPillProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export function BenefitPill({ icon: Icon, title, subtitle }: BenefitPillProps) {
  return (
    <motion.div
      className="flex items-center gap-4 rounded-lg border border-brand-border bg-white/90 p-4 shadow-md backdrop-blur-sm"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex-shrink-0">
        <Icon className="h-10 w-10 text-brand-primary" />
      </div>
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </motion.div>
  );
}
