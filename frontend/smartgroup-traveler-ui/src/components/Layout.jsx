import React from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ agent, loading }) => {
  const logoSrc = loading
    ? "/fallback-logo.png"
    : agent?.logo_path
    ? `http://localhost:8000/uploads/${agent.logo_path}`
    : "/default-agent-logo.png";

  return (
    <>
      <img
        src={logoSrc}
        alt="Agent Logo"
        className="fixed top-4 left-4 w-24 h-auto z-50 shadow-md bg-white p-1 rounded"
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
