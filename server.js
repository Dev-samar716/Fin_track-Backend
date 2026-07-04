import app from './src/app.js';
import pool from './src/config/db.js';
import authRouter from './src/routers/authRouter.js';

// Connecting to DB
try {
    pool.query("SELECT 1")

    console.log("Successfully connected to DB!")
} catch(error) {
    console.log(error);
}

// API middlewares

app.use("/auth", authRouter)

// Starting the server in port 3000
app.listen(3000, () => {
    console.log("Your server is live at http://localhost:3000")
})