import pool from '../../../../config/db.js';
import jwt from 'jsonwebtoken';

const deleteIncome = async(req, res) => {
     const income_id = req.body;
     const token = req.cookies.token;
      let user_id;

     if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access: Token does not exist!"
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

     // DELETING income records from the DB

     try {
        const queryToDeleteIncome = `DELETE FROM income WHERE id=$1 AND user_id = $2 RETURNING *`;
        const deletedIncome = pool.query(queryToDeleteIncome, [income_id, user_id]);

        if(deletedIncome.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "There are no income records in DB with the given credentials!"
            })
        }

        res.status(201).json({
            success: true
        })
     } catch(error) {
       console.log(error) 
       res.status(500).json({
        success: false,
        message: "Failed to delete income records due to internal server error!"
       })
     }
}

export default deleteIncome;