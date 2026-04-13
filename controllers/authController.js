import jwt from "jsonwebtoken";

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
};