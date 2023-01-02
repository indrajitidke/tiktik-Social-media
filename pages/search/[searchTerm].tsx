import React,{useState} from 'react'
import axios from 'axios' 
import { BASE_URL } from '../../utils'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import Image from 'next/image'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser,Video } from '../../types'
import { useRouter } from 'next/router'
import useAuthStore from '../../store/authStore'



const Search = ({videos}:{videos:Video[]}) => {
    const router=useRouter();
    const [isAccounts, setIsAccounts] = useState(false);
    const {searchTerm}:any =router.query;
   
    const Accounts= isAccounts? 'border-b-2 border-black': 'text-gray-400';
    const isVideos = !isAccounts? 'border-b-2 border-black': 'text-gray-400';
  
    const {allUsers}: { allUsers: IUser[]} = useAuthStore();

    const searchAccounts = allUsers.filter((user:IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))
  


    return (
    <div className='w-full'>
        <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
      <p className={`text-xl font-semibold cursor-pointer ${Accounts} mt-2`} onClick={()=>setIsAccounts(true)} >Accounts</p>
      <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={()=>setIsAccounts(false)} >Videos</p>

    </div >
    {
        isAccounts?(
            <div className='md:mt-16'>
                {
                    searchAccounts.length > 0 ?(
                        searchAccounts.map((user:IUser,idx:number)=>(
                            <Link
                            href={`/profile/${user._id}`}
                            key={idx}
                            >
                            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>

                                        
                                    <div>
                                    <Image
                                    src={user.image}
                                    width={50}
                                    height={50}
                                    className='rounded-full'
                                    alt='user profile'
                                    />

                                    </div>
                                    <div>

                                    <div>
                                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>{user.userName.replaceAll(' ','')}<GoVerified className='text-blue-400'/></p>
                                    <p className='capitalize text-gray-400 text-xs'>{user.userName}</p>

                                    </div>
                                    </div>
                                </div>

                                
                            </Link>
                                    ))

                    ):(
                        <NoResults text={`No Account Results for ${searchTerm}`} />    
                   
                    )
                }
            </div>
        ):(
            <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                {isVideos.length ?
                (
                    videos.map(
                        (video:Video,idx:number)=>(
                            <VideoCard post={video} key={idx} />
                        )
                    )
                ):<NoResults text={`No Video Results for ${searchTerm}`} />    
            }
                </div>
        )
    }
        </div>

    </div>
  )
}


export const getServerSideProps =async ({params:{searchTerm}}:{params:{searchTerm:string}}) => {
   
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
     
    
    return{
      props:{
        videos:res.data,
      }
    }
    
    }

export default Search