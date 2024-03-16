const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const pool = require("./config/db");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.listen(4000, () => console.log("SERVER RUNNING ON 4000"));

//Admin Login API
app.post("/api/adminlogin", async (req, res) => {
  const { email, password } = req.body;
  const getAdminData = `SELECT * FROM admin WHERE email = '${email}'`;
  try {
    const userResult = await pool.query(getAdminData);
    if (userResult.rows.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const storedHashedPassword = userResult.rows[0].password;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Return user data upon successful login
    const userData = {
      id: userResult.rows[0].aid,
      name: userResult.rows[0].name,
      email: userResult.rows[0].email,
      role: userResult.rows[0].role,
    };

    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
