import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    const payload = {
        userId: user.id,
        email: user.email
    };

    return jwt.sign(
        payload, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' }
    );
}

export const generateRefreshToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email
    };

    return jwt.sign(
        payload, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
    );
}