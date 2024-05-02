import TwitterLayout from "@/components/TwitterLayout/twitterlayout";
import SideBar from "@/components/sidebar";
import { SignIn } from "@/components/sign-in";
import { auth } from "@/auth";
import FetchUserRecommendation from "@/components/FetchUserRecommendation";



export default async function Home() {

  const session  =  await auth();
  

  return (
    <main>
      <div className="grid grid-cols-12 h-screen w-screen px-4">
        <SideBar />
        <div className="lg:col-span-6 border-l-2 border-r-2 border-gray-600 h-screen overflow-y-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:col-span-9 sm:col-span-10 max-sm:col-span-10">
          <TwitterLayout />
        </div>
        <div className="col-span-3 ">
          {session ? <FetchUserRecommendation/> : <SignIn text="Signin with Google"/>}
        </div>
      </div>
    </main>
  )
}

//   const fetchTweets = async () => {
//     try {
//       setLoading(true);
//       if (!session?.user?.id) {
//         return null;
//       }
//       const posts = await fetchPost();
//       const tweetsss = posts.map((post) => {
//         return post
//       }) as Post[];
//       console.log(tweetsss, 'kkk')
//       setTweets(tweetsss);
//     } catch (error) {
//       setError(error ? error.toString() : 'Unknown error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchTweets();
// }, [session]);
// const handleSelectFile = useCallback(() => {
//   const input = document.createElement('input')
//   input.type = 'file'
//   input.accept = 'image/*'
//   input.click();
//   console.log(input)
// }, [])
// const handleCreateTweet = async () => {
//   if (!session?.user?.id) {
//     return;
//   }
//   try {
//     const newPost: CreateTweetData = await createpost({
//       content: createTweet,
//       image: "",
//     })
//     if (!newPost) {
//       return;
//     }
//     const newPostObject: Post = {
//       id: '',
//       content: newPost.content,
//       ImageURL: newPost.image || '',
//       authorId: session.user.id,
//       author: session.user?.id ? { ...session.user, posts: [] } as User : undefined,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     setTweets(prevTweets => [newPostObject, ...prevTweets]);
//     setCreateTweet('');
//   } catch (error) {
//     console.error('Error creating tweet:', error);
//   }
// };
// console.log(tweets)

// const [tweets, setTweets] = useState<Post[]>([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState<string | null>(null);
// const [createTweet, setCreateTweet] = useState<string>('');