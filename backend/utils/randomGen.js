import jwt from 'jsonwebtoken';

export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const generateToken  = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token,{
        httpOnly : true,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        secure : process.env.NODE_ENV === "production",
        sameSite : "lax"
    }
    );
    // console.log(token," token");
    return token;
    
}