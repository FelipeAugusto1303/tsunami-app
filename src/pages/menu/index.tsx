import React from "react";
import { Outlet } from "react-router-dom";
import MenuLink from "../../components/menu-link";
import logo from "../../../public/logo.jpeg";

const Menu: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full m-0 p-0 bg-gray-900">
      <nav className="w-48 min-h-screen bg-blue-900 p-2 flex flex-col items-start ">
        {/* imagem */}
        <div className="flex items-center justify-center w-full">
          <img
            src={logo}
            alt="logo"
            className="w-32 h-32 object-cover rounded-full mb-2"
          />
        </div>

        {/* bloco de opções: gap garante espaçamento entre os itens */}
        <div className="flex flex-col items-center w-full">
          <MenuLink
            to=""
            end
            className="flex h-10 block w-full text-start px-2 py-2 rounded hover:bg-white hover:font-bold hover:text-black"
          >
            Perfil
          </MenuLink>
          <MenuLink
            to="about"
            className="flex h-10 block w-full text-left px-2 py-2 rounded hover:bg-white hover:font-bold hover:text-black"
          >
            Treino
          </MenuLink>
          <MenuLink
            to="dashboard"
            className="flex h-10 block w-full text-left px-2 py-2 rounded hover:bg-white hover:font-bold hover:text-black"
          >
            Ranking
          </MenuLink>
        </div>
        <div className="flex flex-1 items-end justify-center w-full">
          <button
            className="text-white font-bold bg-red-800 w-[100px] h-[50px] rounded"
            onClick={() => console.log("aqui")}
          >
            Sair
          </button>
        </div>
      </nav>

      <main className="flex-1 min-h-screen m-0 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Menu;
