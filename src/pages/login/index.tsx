import React, { useState } from "react";
import { useNavigate } from "react-router";

// import { Container } from './styles';

type FormState = {
  email: string;
  password: string;
};

const initialState: FormState = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const goToRegister = () => {

  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full bg-gray-900 p-8">
      <div>
        <div className="flex items-center justify-center">
          <img
            src="./logo.jpeg"
            className=" w-[350px] h-[350px] rounded-full"
          />
        </div>
        <h1 className="text-3xl text-white font-semibold mb-4">
          Formulario de cadastro de Jogador
        </h1>
        <p className="text-sm text-gray-300 mb-10">
          Preencha os dados do jogador.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 space-y-12 w-150 mx-auto"
      >
        {/* Email */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="block w-full rounded-md min-h-10 w-full text-white border border-gray-200 px-5 py-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Felipe da Silva"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.email}
            onChange={handleChange}
            required
            className="block min-h-10 w-full text-white rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="*******"
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="w-full min-h-10 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-100 mt-10 min-h-10 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:text-blue-400/40 focus:outline-none focus:ring-2 focus:ring-gray-100"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
