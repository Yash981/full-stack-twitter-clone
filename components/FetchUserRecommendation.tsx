import { fetchRecommendations } from "@/actions/Recommendations.action";
import { getUserById } from "@/data/user";
import { useCurrentUser } from "@/hooks/customHooks";
import { Link } from "next-view-transitions";
import Image from "next/image";
import FollowUnfollowBtn from "./followUnfollowBtn";
import { Followers } from "@/app/[id]/page"


export default async function FetchUserRecommendation() {
    const userId = await useCurrentUser();
    if (!userId) {
        return null;
    }
    const RecommendedUsersId = await fetchRecommendations(userId)
    const recommendedUsers = await Promise.all(RecommendedUsersId.map(async (recommendedUserId: string) => {
        const user = await getUserById(recommendedUserId);
        return user;
    }));
    // console.log(recommendedUsers)
    return (
        <div className="m-4 lg:block hidden">
            <div className="w-full min-h-72 bg-transparent rounded-3xl border border-gray-600">
                <h1 className="ml-4 mt-4 text-xl font-bold">Who to follow</h1>
                {recommendedUsers && recommendedUsers.map((user) => (
                    <div className="m-4 h-16 border-2 border-gray-600 flex justify-between items-center rounded-full bg-slate-800 p-4 gap-2 " key={user?.id}>
                        <div className="flex items-center gap-2">
                        <Image
                            src={user?.image || ""}
                            width={30}
                            height={30}
                            alt={'profile'}
                            className='rounded-full object-cover object-center'
                        />

                        <h1 className="text-md font-semibold">{user?.name}</h1>
                        </div>

                        <Link href={`/${user?.id}`}>
                            <button className=" text-black font-semibold rounded-full px-5 py-2  bg-white ">View</button>
                        </Link>
                        {/* <FollowUnfollowBtn  followers={} pathname={user?.id as string} currentUser={userId as string}/> */}
                    </div>
                ))}
            </div>
        </div>
    )
}