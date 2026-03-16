"use server";

import { getUserToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export async function addAddress(formData) {
//   const token = await getUserToken();
//   const response = await fetch(`${API_URL}addresses`, {
//     method: "POST",
//     body: JSON.stringify({ formData }),
//     headers: {
//       token,
//       "Content-Type": "application/json",
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const data = await response.json();
//   return data;
// }

// export async function getLoggedUserAddress() {
//   const token = await getUserToken();
//   const response = await fetch(`${API_URL}addresses`, {
//     headers: {
//       token,
//       "Content-Type": "application/json",
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const data = await response.json();
//   return data;
// }
