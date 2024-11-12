'use client'

import { signOut } from "next-auth/react";

const TOTEM_HOST = process.env.NEXT_PUBLIC_TOTEM_HOST ? process.env.NEXT_PUBLIC_TOTEM_HOST : ''

export const userSignOut = () => {
  signOut({ callbackUrl: TOTEM_HOST + "login" });
};