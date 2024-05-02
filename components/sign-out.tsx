"use client"
// import { logout } from "@/actions/logout"
import { signOut } from "next-auth/react"
// import { Button } from "@/components/ui/button"
//import { useRouter } from "next/navigation"


export function SignOut() {
    return (
        <button type="submit" onClick={()=>signOut()} className="underline 
          w-fit text-[#1d9bf0] font-semibold rounded-full ">Signout</button>
    )
}