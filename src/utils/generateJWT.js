import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    const token = jwt.sign(id, JWT_SECRET_KEY)

    return token;
}

export default generateToken;