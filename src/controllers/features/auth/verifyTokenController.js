import jwt from 'jsonwebtoken';

const verifyToken = async(req, res) => {
    const token = req.cookies();
    let user_id;

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

    try {
        const user = await pool.query("SELECT * FROM users WHERE id=$1", [user_id]);

        if(user.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        res.status(200).json({
            success: true,
            userInfo: user.rows[0]
        })
    } catch(error) {
        console.log(error); 
        res.status(500).json({
            success: false,
            message: "Server faced internal errors while trying to fetch user info!"
        })
    }
}

export default verifyToken;