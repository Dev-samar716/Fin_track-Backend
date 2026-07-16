import pool from "../../../config/db.js";
import jwt from "jsonwebtoken";

const retrieveCurrentMonthIncomeInfo = async(req, res) => {
            const token = req.cookies();
            let user_id;
    
            // Verifying the user identity
        
            if(!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access: Token not found!"
                })
            } 
        
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
                if(!decoded) {
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorized access: Invalid token!"
                    })
                }
                user_id = decoded;
            } catch(error) {
                console.log(error); 
                res.status(500).json({
                    success: false,
                    message: "Server faced internal errors while trying to verfy token!"
                })
            }

        // Retrieving the income information from DB

          try {
            const queryToRetrieveIncomeInfo = "SELECT * FROM income WHERE user_id=$1 AND created_at >= $2 AND created_at < $3";
            const currentDate = new Date().toISOString().split('T')[0]; // current date in YYYY-MM-DD format
            const startOfDay = new Date(currentDate + 'T00:00:00Z').getTime() / 1000;
            const endOfDay = new Date(currentDate + 'T23:59:59Z').getTime() / 1000;
            const incomeInfo = await pool.query(queryToRetrieveIncomeInfo, 
                [user_id, startOfDay, endOfDay]);

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

export default retrieveCurrentMonthIncomeInfo;
