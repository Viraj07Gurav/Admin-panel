const express = require("express"); // Require express properly
const connectDB = require("./db");  // Import database connection function
const User = require("./model/User"); // Import User model
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const cors = require("cors"); // Optional: Allows frontend to communicate with backend

const app = express(); // Initialize express
connectDB(); // Call the function to connect to MongoDB

app.use(express.json()); // Middleware to parse JSON data
app.use(cors()); // Optional: Enable CORS for frontend requests


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
