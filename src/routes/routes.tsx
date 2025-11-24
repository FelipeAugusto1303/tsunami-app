import { createBrowserRouter, type RouteObject } from "react-router";
import Register from "../pages/register";
import Login from "../pages/login";
import Menu from "../pages/menu";
import About from "../pages/about";
import GeneralInfo from "../pages/generalInfo";

export const UserRole = {
  ADM: "ADM",
  PLAYER: "PLAYER",
} as const;

export type AppRouteObject = RouteObject & {
  usersPermitted?: string[];
  active?: boolean;
  label?: string;
  children?: AppRouteObject[];
};

const routes: AppRouteObject[] = [
  {
    path: "/",
    element: <Login />,
    usersPermitted: [UserRole.ADM, UserRole.PLAYER],
    active: true,
    label: "Informacoes gerais",
  },
  {
    path: "/register",
    element: <Register />,
    usersPermitted: [UserRole.ADM, UserRole.PLAYER],
    active: true,
    label: "cadastro de usuarios",
  },
  {
    path: "/player",
    element: <Menu />,
    usersPermitted: [UserRole.ADM, UserRole.PLAYER],
    active: true,
    children: [
      {
        index: true,
        path: "",
        element: <GeneralInfo />,
        usersPermitted: [UserRole.ADM, UserRole.PLAYER],
        active: true,
      },
      {
        path: "about",
        element: <About />,
        usersPermitted: [UserRole.ADM, UserRole.PLAYER],
        active: true,
      },
    ],
  },
];

const filteredRoutes: AppRouteObject[] = routes.filter((route) => {
  //TODO: Pegar a role do usuario logado no local storage ou api context
  return route.active && route.usersPermitted?.includes(UserRole.ADM);
});

export const router = createBrowserRouter(filteredRoutes);
