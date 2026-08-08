import pool from "../../../../config/db.js";
import jwt from 'jsonwebtoken';

const retrieveExpenseInfo = async(req, res) => {
      const token = req.cookies.token;
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

    // Retrieving the expense information from DB

    try {
        const query = `SELECT * FROM expenses WHERE user_id=$1 AND created_year = $2`;
        const expenseInfo = await pool.query(query, [user_id, new Date().getFullYear()]);

        res.status(200).json({
            success: true,
            expenseInfo: expenseInfo.rows
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server faced internal errors while trying to retrieve expense information!"
        })
    }
}

export default retrieveExpenseInfo;