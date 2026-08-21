import jwt from 'jsonwebtoken'
import pool from "../../../../config/db.js";

const deleteExpense = async(req, res) => {
    const token = req.cookies.token;
    const { expense_id} = req.body;
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

        // DELETING the expense record from the DB

        try {
            const queryToDeleteExpenseRecord = `DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *`;
            const deletedExpense = await pool.query(queryToDeleteExpenseRecord, [expense_id, user_id]);

            if(deletedExpense.rows.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: "Expense record not found or you are not authorized to delete this record!"
                })
            }

            res.status(201).json({
                success: true,
                message: "Expense record deleted successfully!"
            })
        } catch(error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Server faced internal error while trying to delete expense record!"
            })
        }
}

export default deleteExpense;