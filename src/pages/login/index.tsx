import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../api/auth";
import { getPlayerByUid } from "../../api/database";

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
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // 1) Login com Firebase Auth
      const userCredential = await signIn(form.email, form.password);
      const uid = userCredential.user.uid;

      console.log("Logado com UID:", uid);

      // 2) Buscar informações do Firestore
      const playerData = await getPlayerByUid(uid);
      console.log("Player data:", playerData);

      // 3) Salvar no localStorage
      localStorage.setItem("player", JSON.stringify(playerData));

      // 4) Redirecionar se quiser
      navigate("/player/");
    } catch (err: any) {
      console.error("Erro ao logar:", err);

      if (err.code === "auth/invalid-credential") {
        alert("Email ou senha incorretos.");
      } else if (err.code === "auth/user-not-found") {
        alert("Usuário não encontrado.");
      } else {
        alert("Erro ao realizar login.");
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-screen bg-gray-900 p-8">
      <div>
        <div className="flex items-center justify-center">
          <img
            src="/logo.jpeg"
            className=" w-[350px] h-[350px] rounded-full"
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-2 w-150 mx-auto"
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
            placeholder="email@example.com"
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
            value={form.password}
            onChange={handleChange}
            required
            className="block min-h-10 w-full text-white rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="*******"
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="w-150 min-h-10 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-100 mt-1 min-h-10 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm hover:text-blue-400/40 focus:outline-none focus:ring-2 focus:ring-gray-100"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
