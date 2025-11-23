import { useMemo } from "react";
import type { FormState } from "../pages/register";


type FormErrors = Partial<Record<keyof FormState, string>>;

function isEmailValid(email: string) {
  // regex simples e eficaz para validação básica
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateForm(form: FormState, options?: {
  required?: (keyof FormState)[];
  requirePasswordMatch?: boolean;
}): { valid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};
  const required = options?.required ?? [
    "full_name",
    "email",
    "riotId",
    "puuid",
    "role_primary",
    "status",
    "system_role",
  ];

  // Check required fields
  for (const key of required) {
    const value = (form[key] ?? "") as unknown as string;
    if (!value || value.trim() === "") {
      errors[key] = "Campo obrigatório";
    }
  }

  // Email format
  if (form.email && !isEmailValid(form.email)) {
    errors.email = "Email inválido";
  }

  // RiotId basic structure check (ex: "nick#TAG")
  if (form.riotId && !/^[^#]{1,64}#?[A-Za-z0-9-_]{0,16}$/.test(form.riotId)) {
    // permissivo: aceita com ou sem tag; ajuste conforme desejar
    errors.riotId = "RiotID com formato inválido";
  }

  // PUUID length check (puuid geralmente é uma string longa)
  if (form.puuid) {
    errors.puuid = "PUUID parece inválido";
  }

//   // Password rules (opcional)
//   if (!form.password && form.password.length === 0) {
//     if (form.password.length < 6) {
//       errors.password = "Senha muito curta (mín 6 caracteres)";
//     }
//   }

//   // confirm password
//   if (options?.requirePasswordMatch ?? true) {
//     if (form.password !== form.confirmPassword) {
//       errors.confirmPassword = "As senhas não coincidem";
//     }
//   }

  const valid = Object.keys(errors).length === 0;
  return { valid, errors };
}

export function useFormValidation(form: FormState, opts?: {
  required?: (keyof FormState)[];
  requirePasswordMatch?: boolean;
}) {
  const { valid, errors } = useMemo(
    () => validateForm(form, opts),
    // memoiza com base na stringificação (simples e suficiente)
    [JSON.stringify(form), JSON.stringify(opts)]
  );

  return { valid, errors };
}
