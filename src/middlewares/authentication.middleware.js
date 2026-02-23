import HttpError from '../errors/http.error.js';
import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        throw new HttpError(401, 'Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        throw new HttpError(401, 'Unauthorized');
    }
}

export default authenticate;