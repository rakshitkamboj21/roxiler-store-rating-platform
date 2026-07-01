// =========================
// Name Validation
// =========================
export const validateName = (name) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Name is required.";
  }

  if (trimmedName.length < 20) {
    return "Name must be at least 20 characters.";
  }

  if (trimmedName.length > 60) {
    return "Name cannot exceed 60 characters.";
  }

  return "";
};

// =========================
// Email Validation
// =========================
export const validateEmail = (email) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    return "Email is required.";
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  return "";
};

// =========================
// Address Validation
// =========================
export const validateAddress = (address) => {
  const trimmedAddress = address.trim();

  if (!trimmedAddress) {
    return "Address is required.";
  }

  if (trimmedAddress.length > 400) {
    return "Address cannot exceed 400 characters.";
  }

  return "";
};

// =========================
// Password Validation
// =========================
export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  if (!passwordRegex.test(password)) {
    return "Password must be 8-16 characters with one uppercase letter and one special character.";
  }

  return "";
};