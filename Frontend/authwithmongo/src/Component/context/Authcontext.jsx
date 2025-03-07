import { createContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("Loading...");
    useEffect(() => {
        axios.get("http://localhost:5000/new")
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Error connecting to backend:", error));
    }, []);


    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         const decoded = jwtDecode(token);
    //         setUser(decoded);
    //     }
    // }, []);

    // Register function
    const register = async (username, email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/users", { username, email, password });
            console.log(res); // Show success message
            return { success: true, message: res.data.message };
        } catch (error) {
            console.log("error", error.response.data.message)
            return { success: false, message: error.response?.data?.message || "registration failed" };
        }
    };


    // const login = async (email, password,navigate) => {

    //     try {
    //         console.log(" Attempting login with:", email);

    //         const res = await axios.post("http://localhost:5000/login", { email, password });

    //         console.log("Server Response:", res.status, res.data);

    //         if (res.status === 200) {
    //             const token = res.data.token;
    //             localStorage.setItem("token", token);

    //             const decoded = jwtDecode(token);
    //             setUser(decoded);

    //             console.log("🚀 Login successful! Navigating to dashboard...");
    //             navigate("/dashboard");  // ✅ Redirect only if successful
    //         }
    //     } catch (error) {
    //         console.error("Login failed:", error);

    //         if (error.response && error.response.status === 401) {
    //             alert("Invalid email or password"); // ✅ Handle incorrect credentials
    //         } else {
    //             alert("Something went wrong. Please try again.");
    //         }
    //     }
    // };

    const login = async (email, password, navigate) => {
        try {
            console.log("Attempting login with:", email);

            const res = await axios.post("http://localhost:5000/login", { email, password });
            console.log("reslogin", res)

            console.log("Server Response:", res.status, res.data);

            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem("token", token);

                const decoded = jwtDecode(token);
                setUser(decoded);

                // ✅ Store user role
                if (decoded.role === "admin") {
                    localStorage.setItem("username", decoded.username);
                } else {
                    localStorage.setItem("username", res.data.user.username);
                }
                localStorage.setItem("role", decoded.role);
                if (decoded.role === "user") {
                    setTimeout(() => {
                        navigate("/website");  // ✅ Redirect only if successful
                    }, 2000);
                } else {
                    setTimeout(() => {
                        navigate("/dashboard");  // ✅ Redirect only if successful
                    }, 2000);
                }

                console.log("🚀 Login successful! Navigating to dashboard...");


                return { success: true, message: "Login successful!" };
            }
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response && error.response.status === 401) {
                // alert("Invalid email or password"); // ✅ Handle incorrect credentials
                return { success: false, message: "Invalid email or password" };
            } else {
                // alert("Something went wrong. Please try again.");
                return { success: false, message: "Something went wrong. Please try again." };
            }
        }
    };


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
    };
    /// update delete and get user form db and display in dashboard
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/user");
            const data = await response.json();
            console.log("datauser", data)
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Delete user
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    // Fetch user by ID
    const getUserById = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/getuser/${id}`);
            console.log("getuser", res)
            const data = await res.json();
            console.log("data", data)
            setUser({ username: data.username, email: data.email });
            return data;  // Return user data for use in components
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    // Update user details
    const updateUser = async (id, updatedUser, navigate) => {
        try {
            const check = await fetch(`http://localhost:5000/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });
            console.log("check", check)
            if (check.status === 401 || check.status === 400) {
                return { success: false, message: "Email already used" };
            }
            // alert("User updated successfully!");

            return { success: true, message: "User updated successfully!" };
        } catch (err) {
            console.error("Error updating user:", err);
            return { success: false, message: "Error updating user" };
        }
    };
    // Update user (Navigate to update page)

    //get user by id




    useEffect(() => {
        fetchUsers(); // Load users when the component mounts
    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout, register, users, fetchUsers, deleteUser, getUserById, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
