"use server";

import {
  forgotPasswordSchemaType,
  loginSchemaType,
  resetPasswordSchemaType,
} from "../schema/validationSchema/auth.schema";
import { registerSchemaType } from "@/schema/validationSchema/auth.schema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function signupUser(formData: registerSchemaType) {
  const response = await fetch(`${API_URL}auth/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function signinUser(formData: loginSchemaType) {
  const response = await fetch(`${API_URL}auth/signin`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function forgotPassword(formData: forgotPasswordSchemaType) {
  const response = await fetch(`${API_URL}auth/forgotPasswords`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function verifyResetCode(resetCode: string) {
  const response = await fetch(`${API_URL}auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify({ resetCode }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function resetPassword(formData: resetPasswordSchemaType) {
  const response = await fetch(`${API_URL}auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}
