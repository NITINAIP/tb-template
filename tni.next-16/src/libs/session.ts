import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export const sessionOptions: SessionOptions = {
  password: `${process.env.NEXT_PUBLIC_SESSION_SECRET}`,
  cookieName: "data_service_web_back_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
};

export async function getSession() {
  const cookie = await cookies();
  return getIronSession<{ accessToken: string }>(cookie, sessionOptions);
}

export async function setAccessToken(accessToken: string) {
  const session = await getSession();
  session.accessToken = accessToken;
  await session.save();
}

export async function getAccessToken() {
  const session = await getSession();
  return session.accessToken || null;
}

export async function clearSession() {
  const session = await getSession();
  session.destroy();
  await session.save();
}
