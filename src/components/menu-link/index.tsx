// src/components/MenuLink.tsx
import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  end?: boolean;
};

export default function MenuLink({ to, children, className = "", activeClassName = "text-white font-semibold", end = false }: Props) {
  const resolved = useResolvedPath(to);
  // Checa se a rota corresponde (end true = match exact)
  const match = useMatch({ path: resolved.pathname, end });

  return (
    <Link to={to} className={`${className} ${match ? activeClassName : "text-gray-200"}`}>
      {children}
    </Link>
  );
}
