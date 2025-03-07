import React,{useState,useEffect} from 'react'
import {Link, useNavigate } from 'react-router';

function UsersData() {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0)
    const navigate=useNavigate();
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Error fetching users:", err));
    }, []);

        // Handle Update User
        const handleUpdate = (id) => {
            navigate(`/Users/${id}`);
        };

    // Handle Delete User
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
            setUsers(users.filter(user => user.id !== id)); // Remove user from UI
        }
    };
    return (
        <div>
            <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">SR/No.</th>
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className="border">
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{user.username}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">
                                <button onClick={() => handleUpdate(user.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/dashboard" className="block text-center w-35 text-blue-500 border-b hover:border-none mt-4 mx-2">
                        Back to dashboard
                    </Link>

        </div>
    )
}

export default UsersData