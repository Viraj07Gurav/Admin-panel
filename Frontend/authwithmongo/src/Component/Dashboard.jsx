import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Component/context/Authcontext";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import Admindashboard from "./Admindashboard/Admindashboard";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const[count,setCount]=useState(0)
    const role=localStorage.getItem("role");

    // Fetch all users when the component loads
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Error fetching users:", err));
    }, []);

    // Handle Delete User
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
            setUsers(users.filter(user => user.id !== id)); // Remove user from UI
        }
    };

    // Handle Update User
    const handleUpdate = (id) => {
        navigate(`/Users/${id}`);
    };

    // Handle Logout
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    const handleUsers=()=>{
        navigate("/userdata")
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
              
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md flex">
            <Sidebar/>
             <div className=" p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Dashboard</h2>
                <p className="text-center mb-4">Welcome to the dashboard!</p>
                <div className="text-center mb-4">
                   {role==="admin" && <h3 className="text-xl font-semibold">Total Users: {users.length}</h3>}
                    {role === "admin" && <button onClick={handleUsers} className="border bg-red-400 text-white w-30 rounded-2xl">See All Users</button>}
                </div>
                {/* Users Table */}
               

                {/* Logout Button */}
                <div className="text-center mt-4">
                    {/* <button onClick={handleLogout} className="border bg-green-400 text-white w-20 rounded-2xl">
                        Logout
                    </button> */}
                </div>
                <div>
                 {role==="admin"&&   <Admindashboard/>}
                </div>
            <Link to="/website" className="text-center text-blue-500 border-b mt-4">Go to Website</Link>

            </div>
            </div>
        </div>
    );
};

export default Dashboard;
