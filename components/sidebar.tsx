"use client"
import React, { useMemo } from 'react'
import { BiBell, BiEnvelope } from 'react-icons/bi'
import { CiUser } from 'react-icons/ci';
import { FaHome } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6';
import { IoBookmarkSharp } from "react-icons/io5";
import { LuSearch } from 'react-icons/lu';
import { SignOut } from './sign-out';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { FcGoogle } from 'react-icons/fc';
import { SignIn } from './sign-in';


type Props = {}

interface SidebarOption {
    title: string,
    icon: React.ReactNode,
    link?: string
}


const SideBar = (props: Props) => {
    const { data: session } = useSession();

    const SidebarOptions: SidebarOption[] = useMemo(() => [
        {
            title: "Home",
            icon: <FaHome />,
            link: '/'
        },
        {
            title: "Explore",
            icon: <LuSearch />,
            link: '/'
        },
        {
            title: "Notifications",
            icon: <BiBell />,
            link: '/'
        },
        {
            title: "Messages",
            icon: <BiEnvelope />,
            link: '/'
        },
        {
            title: "Bookmarks",
            icon: <IoBookmarkSharp />,
            link: '/'
        },
        {
            title: "Profile",
            icon: <CiUser />,
            link: `/${session?.user?.id}`
        }
    ], [session?.user?.id])
    return (
        <div className='md:col-span-3 pt-8 md:px-4  lg:pl-16 flex flex-col justify-between  pb-10 items-center col-span-2'>
            <div className="flex justify-center flex-col items-center ">
                <div className='text-3xl h-fit w-fit hover:bg-slate-800 rounded-full p-3 cursor-pointer transition-all'>
                    <FaXTwitter />
                </div>
                <div className="mt-4 text-xl  w-fit">
                    <ul className='flex flex-col gap-4  w-fit '>
                        {
                            SidebarOptions.map((item, index) => (
                                <Link href={item.link!} key={index} className='flex md:justify-start items-center gap-3 hover:bg-slate-800 rounded-full px-4 py-2 transition-all justify-center'>
                                    <span>{item.icon}</span>
                                    <span className='md:block hidden'>{item.title}</span>
                                </Link>

                            ))
                        }
                    </ul>
                    <div className="mt-5">
                        <button className='bg-[#1d9bf0] w-full text-white font-semibold rounded-full px-5 py-2 max-md:text-sm'>Post</button>
                    </div>
                </div>
            </div>
            {session ? (
                <div className="md:bg-slate-800 rounded-full w-fit md:px-8 md:py-2 flex justify-center items-center md:flex-row flex-col ">
                    <div className="w-10 h-10 rounded-full flex justify-center items-center mr-4 ">
                        {session.user?.image ? <Image src={session.user?.image} width={50} height={50} alt={'profile'} className='rounded-full' /> : <CiUser />}
                    </div>
                    <div className="">
                        <h1 className='md:block hidden '>{session.user?.name}</h1>
                        <SignOut />
                    </div>
                </div>) : (<div className=''>
                    <SignIn text={''}/>
                </div>)}
        </div>
    )
}

export default SideBar