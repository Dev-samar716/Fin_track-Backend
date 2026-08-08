import pool from "../../../../config/db.js";
import jwt from "jsonwebtoken";
import mappedMonths from "../../../../utils/mappedMonths.js";

const addExpense = async(req, res) => {
     const token = req.cookies.token;
     const { expense_amount, title, category } = req.body;
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

        // Adding the expense into DB

        try {
            const queryToAddExpense = `INSERT INTO expenses (expense_amount, title, category, user_id, created_at, 
            created_month, created_year, created_day) 
            VALUES ($1, $2, $3, $4, TO_TIMESTAMP($5), $6, $7, $8) RETURNING *`;
            const created_at = Date.now() / 1000; // Converting milliseconds to seconds
            const created_month = months[new Date().getMonth()]; // 0-11
            const created_year = new Date().getFullYear();
            const created_day = new Date().getDate();
            const addedExpense = await pool.query(queryToAddExpense, 
                [expense_amount, title, category, user_id, created_at, created_month, created_year, created_day]);
            
            res.status(201).json({
                success: true,
                expenseInfo: addedExpense.rows[0]
            })
        } catch(error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Server faced internal errors while trying to add expense!"
            })
        }
}

export default addExpense;