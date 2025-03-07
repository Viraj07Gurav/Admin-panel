import { useState, useContext } from "react";
import AuthContext from "../Component/context/Authcontext";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
    const { register } = useContext(AuthContext);
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (password !== confirmPassword) {
        //     alert("Passwords do not match");
        //     return;
        // } else {
        //     const res = await register(username, email, password);
        //     alert(res.message); // Show success or error message
        // }
        
        
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }else{
        const res = await register(username, email, password);
        if(res.success){
            toast.success(res.message);
        }
        else{
            console.log(res.message); // Show success or error message
            toast.error(res.message); // Show success or error message
        }
        
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ToastContainer position="top-center" />
            <div className="bg-white shadow-md rounded-lg p-6 w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                    <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500">Sign in here</Link>
        </p>
                    
                </form>
            </div>
        </div>
    );
};

export default Register;
