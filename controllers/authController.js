import jwt from "jsonwebtoken";

<<<<<<< HEAD
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "admin@test.com" && password === "123456") {
      const token = jwt.sign(
        { id: "1", email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    }

    return res.status(401).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login error",
      error: error.message,
    });
  }
=======
export const login = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "123456") {
    const token = jwt.sign(
      { email },
      "secretkey",
      { expiresIn: "1d" }
    );

    return res.status(200).json({ token });
  }

  return res.status(401).json({
    message: "Invalid credentials"
  });
>>>>>>> 4e8c288adfbfc0e4d75d72ad0679d672ebe5ce92
};