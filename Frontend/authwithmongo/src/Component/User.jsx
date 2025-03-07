import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthContext from "../Component/context/AuthContext"; // Import AuthContext
import { toast, ToastContainer } from "react-toastify";

const UpdateUser = () => {
    const { id } = useParams();  // Get user ID from URL
    const navigate = useNavigate();
    const { user, getUserById, updateUser } = useContext(AuthContext);
    const [updatedUser, setUpdatedUser] = useState({ username: user?.username || "", 
        email: user?.email || "", 
        password: "", });
    console.log("getUserById",getUserById);
    console.log("id",id);
    // Fetch user when component loads
    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUserById(id); // Fetch user from API
            console.log("fetchedUser",fetchedUser);
            if (fetchedUser) {
                setUpdatedUser({
                    username: fetchedUser.username || "",
                    email: fetchedUser.email || "",
                    password: fetchedUser.password || "",
                });
            }
        };
    
        fetchUser(); // Call the function
    }, []);


    // Update state when user data is available
    useEffect(() => {
        if (user) {
            setUpdatedUser({ username: user.username, email: user.email, password: "" }); // Keep password empty initially
        }
    }, [user]);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        
        updateUser(id, updatedUser, navigate);
        const res= await updateUser(id, updatedUser, navigate);
        console.log("user res",res)
        if(res.success){
            console.log("update successful")
            toast.success(res.message);
            setTimeout(() => {
                navigate("/dashboard");  
            }, 2000);
    }else{
        console.log("update failed")
        toast.error(res.message)
    }
}

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer position="top-center" />
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Update User</h2>
                <form onSubmit={handleUpdate}>
                    <label className="block mb-2">Username:</label>
                    <input
                        type="text"
                        value={updatedUser.username}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <label className="block mb-2">Email:</label>
                    <input
                        type="email"
                        value={updatedUser.email}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <label className="block mb-2">New Password:</label>
                    <input
                        type="password"
                        value={updatedUser.password}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Leave empty to keep the same password"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                        Update
                    </button>
                    <Link to="/dashboard" className="block text-center w-38 text-blue-500 border-b hover:border-none mt-4">
                        Back to dashboard
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
