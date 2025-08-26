"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { submitOrder, type FormState } from "@/app/actions/order.actions";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { FormInput } from "@/components/ui/FormInput";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { clientLogger } from "@/lib/logging";

const OrderFormSchema = z.object({
  name: z.string().min(2, "Il nome è obbligatorio"),
  phone: z.string().min(10, "Il numero di telefono non è valido"),
});

type OrderFormData = z.infer<typeof OrderFormSchema>;

function SubmitButton() {
  const t = useTranslations("components.ui.OrderForm");
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full !mt-6 bg-red-600 hover:bg-red-700"
      disabled={pending}
      aria-disabled={pending}
      loading={pending} // Conecta el estado 'pending' al nuevo estado 'loading'
    >
      {t("ctaButton")}
    </Button>
  );
}

export function OrderForm() {
  const t = useTranslations("components.ui.OrderForm");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderFormSchema),
  });

  const initialState: FormState = { success: false, message: "" };
  const [formState, formAction] = useFormState(submitOrder, initialState);

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        toast.success(t(formState.message as any));
        reset();
      } else {
        toast.error(t(formState.message as any));
      }
    }
  }, [formState, t, reset]);

  const onSubmit: SubmitHandler<OrderFormData> = (data) => {
    clientLogger.info(
      "Enviando datos del formulario a la Server Action:",
      data
    );
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formAction(formData);
  };

  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 3);

  return (
    <div className="rounded-lg border border-white/20 bg-green-800 bg-opacity-80 p-6 shadow-2xl backdrop-blur-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CountdownTimer targetDate={targetDate} />
        <PriceDisplay originalPrice={78} discountedPrice={39} locale="it-IT" />

        <FormInput
          id="name"
          label={t("namePlaceholder")}
          icon={User}
          placeholder={t("namePlaceholder")}
          {...register("name")}
          error={errors.name?.message} // Pasa el mensaje de error al componente
        />

        <FormInput
          id="phone"
          label={t("phonePlaceholder")}
          icon={Phone}
          type="tel"
          placeholder={t("phonePlaceholder")}
          {...register("phone")}
          error={errors.phone?.message} // Pasa el mensaje de error al componente
        />

        <SubmitButton />

        <div className="text-center text-xs text-white/80">
          <p>{t("contactlessDelivery")}</p>
          <p className="font-bold">{t("freeDelivery")}</p>
        </div>
      </form>
    </div>
  );
}
