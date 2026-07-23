import pool from "../config/db.js";

const getUserCurrency = async(req, res) => {
     const user_id = req.params.user_id;

     try {
        const query = `SELECT * FROM currencies WHERE user_id=$1`
        const userCurrency = await pool.query(query, [user_id]);

        res.status(200).json({
            success: true,
            userCurrency: userCurrency.rows[0]
        })
     } catch(error) {
         console.log(error);
         res.status(500).json({
            success: false,
            message: 'Failed to get user currency due to internal server error!'
         })
     }
}

export default getUserCurrency