"use server";

import { setAccessToken } from "./session";

export const setToken = async (token: string) => await setAccessToken(token);
