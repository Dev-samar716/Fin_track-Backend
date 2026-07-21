import pool from "../../../config/db.js";
import jwt from "jsonwebtoken";
import mappedMonths from "../../../utils/mappedMonths.js";

const addIncome = async(req, res) => {
     const token = req.cookies.token;
     const { income_amount, title, category } = req.body;
     const months = mappedMonths();
     let user_id;

        // Verifying the user identity
    
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access: Token not found!"
            })
        } 
    
        try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
                if(!decoded) {
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorized access: Invalid token!"
                    })
                }
                user_id = decoded;
            } catch(error) {
                console.log(error); 
                return res.status(500).json({
                    success: false,
                    message: "Server faced internal errors while trying to verfy token!"
                })
            }

        // Adding the income into DB

        try {
            const queryToAddIncome = `INSERT INTO income (income_amount, title, category, user_id, created_at, 
            created_month, created_year, created_day) 
            VALUES ($1, $2, $3, $4, TO_TIMESTAMP($5), $6, $7, $8) RETURNING *`;
            const created_at = Date.now() / 1000; // Converting milliseconds to seconds
            const created_month = months[new Date().getMonth()]; // 0-11
            const created_year = new Date().getFullYear();
            const created_day = new Date().getDate();
            const addedIncome = await pool.query(queryToAddIncome, 
                [income_amount, title, category, user_id, created_at, created_month, created_year, created_day]);
            
            res.status(201).json({
                success: true,
                incomeInfo: addedIncome.rows[0]
            })
        } catch(error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Server faced internal errors while trying to add income!"
            })
        }
}

export default addIncome;