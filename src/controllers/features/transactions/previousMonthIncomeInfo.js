
import pool from "../../../config/db.js";
import jwt from "jsonwebtoken";

const retrievePreviousMonthIncomeInfo = async(req, res) => {
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
        // Retrieving the income information from DB

          try {
            const queryToRetrieveIncomeInfo = `SELECT * FROM income WHERE user_id=$1 AND 
            created_at >= TO_TIMESTAMP($2) 
            AND created_at < TO_TIMESTAMP($3)`;

            // First day of previous month at 00:00:00 UTC
          const startOfMonth = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1) / 1000;
           // First day of CURRENT month at 00:00:00 UTC 
          const endOfMonth = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1) / 1000;
            
            const incomeInfo = await pool.query(queryToRetrieveIncomeInfo, 
                [user_id, startOfMonth, endOfMonth]);

            res.status(200).json({
                success: true,
                incomeInfo: incomeInfo.rows
            })
          } catch(error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Server faced internal errors while trying to retrieve income information!"
            })
          }
     }

export default retrievePreviousMonthIncomeInfo;
