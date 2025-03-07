import { useContext, useState,useEffect } from "react";
import { Home, Users, Settings, LogOut, Menu } from "lucide-react";
import AuthContext from "./context/Authcontext";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const username = localStorage.getItem("username");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
   const [users, setUsers] = useState([]);
  const role=localStorage.getItem("role");

  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("username");

      // Call logout function from AuthContext
      await logout();

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Fetch all users when the component loads
      useEffect(() => {
          fetch("http://localhost:5000/users")
              .then(res => res.json())
              .then(data => setUsers(data))
              .catch(err => console.error("Error fetching users:", err));
      }, []);

  const handleUsers=()=>{
    navigate("/userdata")
}
const updatePanel=()=>{
    
}

  return (
    <div className="relative flex">
      <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-100 text-black p-5 flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <button className="mb-6 text-black" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 mb-8">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
          {isOpen && <span className="text-lg font-semibold">{username}</span>}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4 flex-grow">
          <NavItem icon={<Home size={20} />} label="Dashboard" isOpen={isOpen} />
       
          {role==="admin" && <NavItem icon={<Users size={20} />} label={`Users\u00A0\u00A0\u00A0\u00A0(${users.length})`} isOpen={isOpen} onClick={handleUsers}  />}
           

          {/* {role==="admin" && <NavItem icon={<Users size={20} />} label="Users" isOpen={isOpen} onClick={handleUsers} />} */}
          {/* <NavItem icon={<Users size={20} />} label="Users" isOpen={isOpen} /> */}
          <NavItem icon={<Settings size={20} />} label="Settings" isOpen={isOpen} onClick={updatePanel} />
        </nav>

        {/* Logout */}
        <NavItem icon={<LogOut size={20} />} label="Logout" isOpen={isOpen} onClick={handleLogout} />
      </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isOpen, onClick }) {
  return (
    <div
      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-300 cursor-pointer"
      onClick={onClick} // Fix for Logout Click
    >
      {icon}
      {isOpen && <span className="text-lg">{label}</span>}
    </div>
  );
}
