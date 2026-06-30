import bcrypt from "bcrypt";

import { ROLES } from "../constants/roles.js";
import generateToken from "../utils/generateToken.js";

import {
  createUser,
  findUserByEmail,
  findUserById,
  updatePassword,
} from "../repositories/auth.repository.js";

// =========================
// Register User
// =========================
export const registerUser = async (data) => {
  const { name, email, password, address } = data;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(
    name,
    email,
    hashedPassword,
    address,
    ROLES.USER
  );

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
  };

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    user: userData,
    token,
  };
};

// =========================
// Login User
// =========================
export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid Email or Password");
  }

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
  };

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    user: userData,
    token,
  };
};

// =========================
// Change Password
// =========================
export const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }
  const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

if (!passwordRegex.test(newPassword)) {
  throw new Error(
    "Password must be 8-16 characters with one uppercase letter and one special character."
  );
}

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  await updatePassword(userId, hashedPassword);
};