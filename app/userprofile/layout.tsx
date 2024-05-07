import { auth } from '@/auth'
import FetchUserRecommendation from '@/components/FetchUserRecommendation'
import SideBar from '@/components/sidebar'
import { SignIn } from '@/components/sign-in'
import React from 'react'

type Props = {
    children: React.ReactNode
}

async function layout({ children }: Props) {
    const session = await auth()
    return (
        <main>
            <div className="grid grid-cols-12 h-screen w-screen px-4">
                <SideBar />
                <div className="lg:col-span-6 border-l-2 border-r-2 border-gray-600 h-screen overflow-y-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:col-span-9 sm:col-span-10 max-sm:col-span-10">
                    {children}
                </div>
                <div className="col-span-3 ">
                    {session ? <FetchUserRecommendation /> : <SignIn text="Signin with Google" />}
                </div>
            </div>
        </main>
    )
}

export default layout