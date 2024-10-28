'use client'

import { signOut } from "next-auth/react";

interface Props {
  status: number,
}

//TODO Se que esto es una cerdada, hay que ver una mejor forma de lograr esto
export function LogOut({status}: Props) {

  if(status === 401){
    signOut({ callbackUrl: "/login" });
  }

  return (
    <></>
  );
}