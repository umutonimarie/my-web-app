// auth.js
const jwt = require("jsonwebtoken");

// SECRET KEY (in real projects put this in .env)
const SECRET_KEY = "mysecretkey123";

// -----------------------------
// 1. Create Token (Login)
// -----------------------------
function loginUser(req, res) {
  const { username, password } = req.body;

  // Dummy user (replace with real database later)
  const user = {
    username: "admin",
    password: "1234",
  };

  if (username === user.username && password === user.password) {
    // Generate token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    return res.json({
      message: "Login successful",
      token: token,
    });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
}

// -----------------------------
// 2. Middleware: Verify Token
// -----------------------------
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; // add user info to request
    next();
  });
}

module.exports = {
  loginUser,
  authenticateToken,
};
