import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import MedSyncBranco from "../assets/image/MedSyncBranco.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (path) => {
    navigate(path);
    setMenuOpen(false); 
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[10vh] bg-[#49BBBD] py-4 shadow-lg z-50">
      <div className="px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={MedSyncBranco}
            className="h-10 w-auto mr-4 cursor-pointer"
            onClick={() => navigateTo("/")}
            alt="Logo MedSync"
          />
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-8">
          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer"
            onClick={() => navigateTo("/atendimento")}
          >
            Atendimentos
          </Typography>

          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer"
            onClick={() => navigateTo("/Convenio")}
          >
            Convênio
          </Typography>

          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer"
            onClick={() => navigateTo("/Informativo")}
          >
            Informativo
          </Typography>

          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer"
            onClick={() => navigateTo("/sobre-nos")}
          >
            Sobre Nós
          </Typography>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-[10vh] left-0 w-full bg-[#49BBBD] flex flex-col items-center space-y-4 py-4 shadow-lg">
          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer"
            onClick={() => navigateTo("/atendimento")}
          >
            Atendimentos
          </Typography>

          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer"
            onClick={() => navigateTo("/Convenio")}
          >
            Convênio
          </Typography>

          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer"
            onClick={() => navigateTo("/Informativo")}
          >
            Informativo
          </Typography>

          <Typography
            as="button"
            className="text-white hover:text-[#A3DDEA] transition-colors cursor-pointer"
            onClick={() => navigateTo("/sobre-nos")}
          >
            Sobre Nós
          </Typography>
        </div>
      )}
    </header>
  );
}

export default Header;
