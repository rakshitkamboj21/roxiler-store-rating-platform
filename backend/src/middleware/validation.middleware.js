export const validateRegister = (req, res, next) => {
  const { name, email, password, address } = req.body;

  // Name
  if (!name || name.length < 20 || name.length > 60) {
    return res.status(400).json({
      success: false,
      message: "Name must be between 20 and 60 characters.",
    });
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  // Password
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be 8-16 characters with one uppercase letter and one special character.",
    });
  }

  // Address
  if (!address || address.length > 400) {
    return res.status(400).json({
      success: false,
      message: "Address cannot exceed 400 characters.",
    });
  }

  next();
};