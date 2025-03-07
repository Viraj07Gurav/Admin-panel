import { useContext, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import WebsiteContext from "../context/WebsiteContext";
import logo_img from "../../assets/default_logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logo, fetchLastLogo, dblogo } = useContext(WebsiteContext);
  const [preview, setPreview] = useState(logo_img); // State for image preview
  useEffect(() => {
    fetchLastLogo();

  }, []);
  console.log("logo from database", dblogo);
  // useEffect(() => {
  //   if (logo instanceof File) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result); // Set Base64 preview URL
  //     };
  //     reader.readAsDataURL(logo); // Convert file to Base64
  //   } else {
  //     setPreview(logo); // If logo is already a URL, set it directly
  //   }
  // }, [logo]);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        {/* <h1 className="text-white text-2xl font-bold">{logo}</h1> */}

        <div className="h-10 w-20">

          {/* {<img src={preview||logo_img} alt="" className="w-20 h-20 mt-2 rounded-md" />} */}
          {<img src={dblogo||logo_img} alt="" className="w-25 h-15  rounded-md" />}

        </div>
        {/* Menu for Larger Screens */}
        <ul className="hidden md:flex space-x-6 text-white">
          <NavItem name="Home" />
          <NavItem name="About Us" />
          <NavItem name="Features" />
          <NavItem name="Contact" />
          <NavItem name="Logout" />
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center mt-4 space-y-4 text-white">
          <NavItem name="Home" />
          <NavItem name="About Us" />
          <NavItem name="Features" />
          <NavItem name="Contact" />
          <NavItem name="Logout" />

        </ul>
      )}
    </nav>
  );
}

// Reusable NavItem Component
function NavItem({ name }) {
  return (
    <li className="cursor-pointer hover:text-gray-300">{name}</li>
  );
}
