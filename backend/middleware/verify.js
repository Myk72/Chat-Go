import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = decoded.userId;
    next();
  } catch {
    console.log("error in auth middleware");
    res.status(401).json({ error: "Unauthorized" });
  }
};
