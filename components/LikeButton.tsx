import React,{useState,useEffect} from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '../store/authStore'
import { Video } from '../types'


interface IProps{
    handleLike:()=>void;
    handleDislike:()=>void;
    likes:any;
}

const LikeButton = ({ likes,handleLike,handleDislike}:IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false)
    const {userProfile}:any = useAuthStore();
    let filterLikes = likes?.filter((item:any)=>item._ref===userProfile?._id)

    useEffect(()=>{
        if(filterLikes?.length >0){
            setAlreadyLiked(true)
        }else{
            setAlreadyLiked(false)
        }
    },[filterLikes,likes])
  
    return (
    <div className='flex gap-6 ' >
        <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
            {
                alreadyLiked ?(
                    <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]' >

                        <MdFavorite className='text-lg md:text-2xl' onClick={handleDislike} />
                    </div>
                ):(
                    
                    <div className='bg-primary rounded-full p-2 md:p-4' >

                        <MdFavorite className='text-lg md:text-2xl' onClick={handleLike} />
                    </div>
                    )
            }
            <p className='text-md font-semibold'>{likes?.length || 0}</p>
        </div>
    </div>
  );
}

export default LikeButton