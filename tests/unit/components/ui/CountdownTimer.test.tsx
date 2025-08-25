// src/components/ui/CountdownTimer.tsx
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.3.0
 * @description Componente de UI atómico y de cliente que renderiza una cuenta regresiva.
 *              Gestiona su propio estado de tiempo y previene fugas de memoria.
 */

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownTimerProps {
  targetDate: Date;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = +targetDate - +new Date();
  let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    // --- LÓGICA MATEMÁTICA CORRECTA Y DEFINITIVA ---
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    // --- FIN DE LÓGICA MATEMÁTICA ---
  }

  return timeLeft;
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl font-bold text-white bg-white/20 rounded-md px-3 py-1">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs font-medium text-white mt-1">{label}</span>
  </div>
);

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const t = useTranslations("OrderForm");
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-center">
      <h3 className="text-sm font-semibold text-white mb-2">
        {t("countdownTitle")}
      </h3>
      <div className="flex justify-center items-center space-x-3">
        <TimeUnit value={timeLeft.hours} label={t("countdownOre")} />
        <span className="text-3xl font-bold text-white">:</span>
        <TimeUnit value={timeLeft.minutes} label={t("countdownMinuti")} />
        <span className="text-3xl font-bold text-white">:</span>
        <TimeUnit value={timeLeft.seconds} label={t("countdownSecondi")} />
      </div>
    </div>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.3.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.3.0 - CORREÇÃO DE LÓGICA DE TEMPO DEFINITIVA: A função `calculateTimeLeft` foi corrigida para usar o operador de módulo (`% 24`) para as horas, resolvendo a regressão funcional.
 * ((Implementada)) @version 1.0.0 - GERENCIAMENTO DE ESTADO ISOLADO E PREVENÇÃO DE VAZAMENTO DE MEMÓRIA.
 */
