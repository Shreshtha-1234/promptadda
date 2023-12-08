"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profie from "@components/Profie";

const Profile = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async function () {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.log("error occured in fetching prompts", err);
      }
    };
    if (session?.user.id) {
      fetchPost();
    } else {
      return router.push("/");
    }
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete the prompt ? "
    );
    if (hasConfirmed) {
      try {
        const res = await fetch(`api/prompt/${post._id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.log(err);
      }
      const filterPost = posts.filter((p) => p._id !== post._id);
      setPosts(filterPost);
    }
  };

  return (
    <div>
      <Profie
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Profile
;
