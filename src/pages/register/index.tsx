import React, { useState } from "react";

type FormState = {
  full_name: string;
  email: string;
  nickname: string;
  current_elo: string;
  entry_time: string;
  role_primary: string;
  role_secondary: string;
  status: string;
  system_role: string;
};

const initialState: FormState = {
  full_name: "",
  email: "",
  nickname: "",
  current_elo: "",
  entry_time: "",
  role_primary: "",
  role_secondary: "",
  status: "STARTER",
  system_role: "PLAYER",
};

const ROLE_OPTIONS = [
  { value: "", label: "Selecione" },
  { value: "TOP", label: "TOP" },
  { value: "JUNGLE", label: "JUNGLE" },
  { value: "MID", label: "MID" },
  { value: "ADC", label: "ADC" },
  { value: "SUPPORT", label: "SUPPORT" },
];

const ELO_OPTIONS = [
  { value: "", label: "Selecione" },
  { value: "IRON", label: "Ferro" },
  { value: "BRONZE", label: "Bronze" },
  { value: "SILVER", label: "Prata" },
  { value: "GOLD", label: "Ouro" },
  { value: "PLATINUM", label: "Platina" },
  { value: "EMERALD", label: "Esmeralda" },
  { value: "DIAMOND", label: "Diamante" },
  { value: "MASTER", label: "Mestre" },
  { value: "GRANDMASTER", label: "Grao-Mestre" },
  { value: "CHALLENGER", label: "Desafiante" },
];

const Register: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Player saved:", form);
    alert("Jogador cadastrado!");
    setForm(initialState);
  }

  return (
    <div className="flex flex-col gap-10 items-center w-full h-screen bg-gray-900 p-8">
      <div>
        <h1 className="text-3xl text-white font-semibold mb-4">
          Formulario de cadastro de Jogador
        </h1>
        <p className="text-sm text-gray-300 mb-10">
          Preencha os dados do jogador.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 space-y-12 w-4/5 mx-auto"
      >
        {/* Nome */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Nome Completo
          </label>
          <input
            id="full_name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="block w-full rounded-md min-h-10 w-full text-white border border-gray-200 px-5 py-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Felipe da Silva"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="block min-h-10 w-full text-white rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>

        {/* Nickname */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Nickname
          </label>
          <input
            id="nickname"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            className="block min-h-10 w-full text-white rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="nick123"
          />
        </div>

        {/* Current Elo */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Elo Atual
          </label>

          <select
            id="role_primary"
            name="role_primary"
            value={form.role_primary}
            onChange={handleChange}
            className="block w-full min-h-10 rounded-md border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ELO_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Role primary */}
          <div className="flex flex-col items-start gap-2 w-full">
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Função Primária
            </label>
            <select
              id="role_primary"
              name="role_primary"
              value={form.role_primary}
              onChange={handleChange}
              className="block w-full min-h-10 rounded-md border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ROLE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Role secondary */}
          <div className="flex flex-col items-start gap-2 w-full">
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Função Secundária
            </label>
            <select
              id="role_secondary"
              name="role_secondary"
              value={form.role_secondary}
              onChange={handleChange}
              className="block w-full min-h-10 rounded-md border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ROLE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full min-h-10 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Salvar Jogador
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
