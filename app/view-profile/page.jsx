'use client'
import Profie from "@components/Profie";
import { useSearchParams } from "next/navigation";
import { useState ,useEffect } from "react";

const Viewprofile = () => {
    const searchParams = useSearchParams();
    const userid = searchParams.get('userId');
    const name = searchParams.get('name');
    const [posts , setPosts] = useState([]);
    useEffect( ()=>{
        const fetchPost = async function(){  
          try{   
            const response = await fetch(`/api/users/${userid}/posts`);
            const data = await response.json();
            setPosts(data);
          } catch(err){
            console.log("error occured in fetching prompts",err);
          }
        }
        fetchPost();
      }, []);
  return (
   <div>
    <Profie
    name={name}
    desc={"You are viewing profile"}
    data={posts}
    />
   </div>
  )
}

export default Viewprofile