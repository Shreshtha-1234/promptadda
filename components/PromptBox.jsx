"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const PromptBox = ({ post, handleTagclick, handleEdit, handleDelete }) => {
  const pathName = usePathname();
  const {data : session} = useSession();
  const router = useRouter();

  const [copy, setCopy] = useState("");
  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy("");
    }, 5000);
  };

  return (
    <div className="prompt_card ">
      <div className="flex justif-between items-start gap-5">
        <div 
          onClick={()=>{
            router.push(`/view-profile/?userId=${post.creator._id}&name=${post.creator.username}`)
          }}
          className="flex-1 flex flex-start item-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            width={40}
            height={40}
            alt="user iamge"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => {}}>
          <Image
            onClick={handleCopy}
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "assets/icons/copy.svg"
            }
            alt="image user"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi font-sm text-gray-500">{post.prompt}</p>
      <p
        onClick={() => {
          handleTagclick && handleTagclick(post.tag);
        }}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>
      {
        session?.user.id == post.creator._id && pathName==='/profile' && 
        (
          <div className="flex-center gap-4 border-t pt-3 border-gray-100">
          <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
          >Edit</p>  
          <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
          >Delete</p> 
          </div>
        )
      }
    </div>
  );
};

export default PromptBox;
