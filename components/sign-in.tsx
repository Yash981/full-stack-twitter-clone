"use client"
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
// import { Button } from "@/components/ui/button";

interface Props{
  text: string
}
export function SignIn({text}: Props) {
  const onclick = (provider: string) => {
    signIn(provider, { callbackUrl: '/' })
  }
  return (

    <button type="submit" onClick={() => onclick('google')} className="m-2 flex justify-center items-center gap-2 bg-slate-800 text-white font-semibold rounded-full px-5 py-2">{text} <FcGoogle /> </button>
  )
}
