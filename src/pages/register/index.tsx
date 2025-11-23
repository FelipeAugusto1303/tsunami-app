import React, { useState } from "react";
import { signUp } from "../../api/auth";
import { createPlayer, ELO, PlayerStatus, Role } from "../../api/database";
import { useNavigate } from "react-router";

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
  password: string;
  confirmPassword: string;
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
  password: "",
  confirmPassword: "",
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
  { value: ELO.IRON, label: "Ferro" },
  { value: ELO.BRONZE, label: "Bronze" },
  { value: ELO.SILVER, label: "Prata" },
  { value: ELO.GOLD, label: "Ouro" },
  { value: ELO.PLATINUM, label: "Platina" },
  { value: ELO.EMERALD, label: "Esmeralda" },
  { value: ELO.DIAMOND, label: "Diamante" },
  { value: ELO.MASTER, label: "Mestre" },
  { value: ELO.GRANDMASTER, label: "Grao-Mestre" },
  { value: ELO.CHALLENGER, label: "Desafiante" },
];

const Register: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Player saved:", form);

    if (form.password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("As senhas devem nao sao iguais");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signUp(form.email, form.password);
      console.log("User created:", userCredential);
      const uid = userCredential.user.uid;
      const playerData = {
        current_elo: form.current_elo,
        email: form.email,
        full_name: form.full_name,
        nickname: form.nickname,
        role_primary: form.role_primary,
        role_secondary: form.role_secondary,
        status: PlayerStatus.TBD,
        system_role: Role.PLAYER,
      };

      // 3) grava no Firestore com uid como id do documento
      await createPlayer(uid, playerData);

      alert("Jogador cadastrado com sucesso!");
      setForm(initialState);
    } catch (err: any) {
      console.error("Erro ao cadastrar:", err);
      // Mensagens mais amigáveis por código (Firebase Auth)
      if (err.code === "auth/email-already-in-use") {
        alert("Esse email já está em uso.");
      } else if (err.code === "auth/invalid-email") {
        alert("Email inválido.");
      } else if (err.code === "auth/weak-password") {
        alert("Senha fraca. Use pelo menos 6 caracteres.");
      } else {
        alert(err.message || "Erro ao cadastrar usuário.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-10 items-center w-full h-screen bg-gray-900 p-8">
      <div>
        <div className="flex items-center justify-center">
          <img
            src="./logo.jpeg"
            className=" w-[150px] h-[150px] rounded-full"
          />
        </div>
        <h1 className="text-3xl text-white font-semibold mb-4">
          Formulario de cadastro de Jogador
        </h1>
        <p className="text-sm text-gray-300 mb-4">
          Preencha os dados do jogador.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-4/5 mx-auto"
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
            required
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
            required
            className="block min-h-10 w-full text-white rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="nick123"
          />
        </div>

        {/* Current Elo */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="current_elo"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Elo Atual
          </label>

          <select
            id="current_elo"
            name="current_elo"
            value={form.current_elo}
            onChange={handleChange}
            required
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
              required
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
              required
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

        {/* Password */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="block min-h-10 w-full text-white rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="*******"
          />
        </div>

        {/* Confirm password */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Confirme sua senha
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="block min-h-10 w-full text-white rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="*********"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full min-h-10 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Salvar Jogador
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-100 mt-1 min-h-10 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:text-blue-400/40 focus:outline-none focus:ring-2 focus:ring-gray-100"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
