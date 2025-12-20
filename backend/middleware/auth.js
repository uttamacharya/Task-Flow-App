const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // console.log("AuthHeader:", authHeader); // ✅ header check
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  // Agar Bearer prefix hai to split karo, warna direct token use karo
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;
  // console.log("Token used for verify:", token); // ✅ token check
  // console.log("JWT_SECRET:", process.env.JWT_SECRET); // ✅ secret check

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ab controller me req.user.id available hoga
    next();
  } catch (err) {
    // console.error("JWT Error:", err.message); // ✅ error reason
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
