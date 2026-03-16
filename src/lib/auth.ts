import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const encryptedToken = (await cookies()).get(
    "next-auth.session-token",
  )?.value;
  const decryptedToken = await decode({
    token: encryptedToken,
    secret: process.env.AUTH_SECRET!,
  });
  return decryptedToken?.token as string;
}

export async function getUserId() {
  const encryptedToken = (await cookies()).get(
    "next-auth.session-token",
  )?.value;
  const decryptedToken = await decode({
    token: encryptedToken,
    secret: process.env.AUTH_SECRET!,
  });

  return decryptedToken?.sub as string;
}

export async function getUserData() {
  const encryptedToken = (await cookies()).get(
    "next-auth.session-token",
  )?.value;
  const decryptedToken = await decode({
    token: encryptedToken,
    secret: process.env.AUTH_SECRET!,
  });

  return decryptedToken?.user;
}
