"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setFilteredPosts(handleFilter());
  };
  const handleFilter = () => {
    const filteredPost = posts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    return filteredPost;
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };
  const handleTagClick=(tagName)=>{
    setSearchText(tagName)
    setFilteredPosts(handleFilter());
  }
  useEffect(() => {
    fetchPosts();
    setFilteredPosts(handleFilter());
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText? 
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      : 
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
      }
    </section>
  );
};

export default Feed;
