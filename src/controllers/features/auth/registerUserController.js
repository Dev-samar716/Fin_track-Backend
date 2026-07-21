import pool from "../../../config/db.js";
import bcrypt from 'bcrypt'
import generateToken from "../../../utils/generateJWT.js";

const registerUser = async(req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await pool.query("SELECT FROM users WHERE username=$1", [username]);

    if(existingUser.rows.length > 0) {
        return res.status(409).json({
            success: false,
            message: "Username already exists!"
        })
    }

    const hashedPassword = bcrypt.hash(password, 10);

    try {
        const registeredUser = await pool.query("INSERT INTO users (created_at, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [Date.now(),email, username, hashedPassword]
        )

        const token = generateToken(registeredUser.rows[0].id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
        })

        res.status(201).json({
            success: true,
            userInfo: registeredUser.rows[0]
        })

    } catch(error) {
        console.log(error); 
        res.status(500).json({
            success: false,
            message: "Failed to register user due to internal server error!"
        })
    }
}

export default registerUser;