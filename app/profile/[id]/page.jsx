'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
  const router = useRouter();
  const [userPosts, setUserPosts] = useState([]);
  const searchParams=useSearchParams()
  const userName=searchParams.get('name')
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile`}
      data={userPosts}
    />
  );
};

export default UserProfile;