import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom"; 
import Atendimento from "../pages/Atendimento.jsx";
import SobreNos from "../pages/SobreNos.jsx";

function Footer() {
  const navigate = useNavigate(); 

  const handleAdminClick = (e) => {
    e.preventDefault();
    navigate('/login');
    window.scrollTo(0, 0); 
  };

  return (
    <footer className="w-full bg-[#008E9A] p-10 pb-10 pt-12 h-50">
    <div className="max-w-screen-xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="./src/assets/image/MedSyncBranco.png"
            alt="Logo MedSync"
            className="w-40 md:w-60"
          />
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
            <li>
              <Typography
                as="a"
                href="/Atendimento"
                className="font-normal text-white hover:text-[#A3DDEA] transition-colors"
                onClick={Atendimento}
              >
                Atendimentos
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="/sobre-nos"
                className="font-normal text-white hover:text-[#A3DDEA] transition-colors"
                onClick={SobreNos}
              >
                Sobre Nós
              </Typography>
            </li>
            <li>
              <Typography
               as={Link}
               to="/login"
               onClick={handleAdminClick} // Use the new handler
               className="font-normal text-white hover:text-[#A3DDEA] transition-colors"
              >
                Administração 
              </Typography>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-white" />
        <Typography className="text-center text-white font-normal">
          © 2025 MedSync.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;