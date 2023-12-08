"use client";
import { useState, useEffect } from "react";
import PromptBox from "./PromptBox";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [original, setOriginal] = useState([]);

  useEffect(() => {
    const fetchPost = async function () {
      try {
        const response = await fetch("/api/prompt", { cache: "no-cache" });
        const data = await response.json();
        setPosts(data);
        setOriginal(data);
      } catch (err) {
        console.log("error occured in fetching prompts");
      }
    };
    fetchPost();
  }, []);

  function searchHelper(searchValue) {
    const filteredPost = original.filter((pst) => {
      return (
        pst.prompt.toLowerCase().includes(searchValue) ||
        pst.creator.username.toLowerCase().includes(searchValue) ||
        pst.tag.toLowerCase().includes(searchValue)
      );
    });
    setPosts(filteredPost);
  }

  function handleTagclick(val) {
    setSearch(val);
    searchHelper(val.toLowerCase());
  }

  return (
    <div>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="search for a tag or username"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchHelper(e.target.value.toLowerCase());
            }}
            className="search_input peer"
          />
        </form>
        <PromptCardList data={posts} handleTagclick={handleTagclick} />
      </section>
    </div>
  );
};

export default Feed;
