"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copy, setCopy] = useState("");
  const { data: session } = useSession();
  const router=useRouter()
  const pathName = usePathname();
  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopy(""), 3000);
  };
  const handleProfileClick=()=>{
    if(post.creator._id===session?.user.id) router.push(`/profile`)
    else router.push(`/profile/${post?.creator._id}?name=${post?.creator.username}`)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between gap-5 items-start">
        <div className="flex-1 justify-start gap-3 cursor-pointer items-center" onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-gray-900 font-satoshi font-semibold">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div
          className="copy_btn"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-gray-700 text-sm">{post.prompt}</p>
      <p
        className="text-sm blue_gradient cursor-pointer font-inter"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
