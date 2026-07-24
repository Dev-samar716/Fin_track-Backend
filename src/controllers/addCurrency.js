import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const addCurrency = async(req, res) => {
    const token = req.cookies.token;
    const {currency_code, currency_symbol} = req.body;
    let user_id;

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

   // Check if a currency preference is already set

   try {
     const query = `SELECT * FROM currencies WHERE user_id=$1`
    const user = await pool.query(query, [user_id]);

     if(user.rows.length > 0) {
        const updatePreferenceQuery = `UPDATE currencies SET currency_code=$1, currency_symbol=$2
        WHERE user_id=$3 RETURNING *`

        await pool.query(updatePreferenceQuery, [currency_code, currency_symbol, user_id]);
         return res.status(201).json({
                success: true,
            })
          } 
     }  catch(error) {
            console.log(error);
           return res.status(500).json({
                status: false,
                message: "Failed to check if currency preference already exists!"
            })
          }

   // Add the currency preference in database with correct user identity
      
          try {
            const query = `INSERT INTO currencies (currency_code, currency_symbol, user_id)
            VALUES ($1, $2, $3) RETURNING *`
            await pool.query(query, [currency_code, currency_symbol, user_id])

            res.status(201).json({
                success: true,
            })
          } catch(error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "Failed to store the currency preference due to internal server error!"
            })
          }
} 

export default addCurrency;