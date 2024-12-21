import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { Posts, RadioNav } from "../componetIndex";
import "./Feed.css";
import getFeedPosts from "../../hooks/useGetFeed";
import { Post } from "../../store/postStore";

function Feed() {
  const { isLoading, posts } = getFeedPosts();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [filter, setFilter] = useState<string>("Friends"); 

  const handleFilterChange = (selected: string) => {
    setFilter(selected); 
  };

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 1000); 
      return () => clearTimeout(timer); 
    }
  }, [isLoading]);

  const filteredPosts = React.useMemo(() => {
    if (filter === "Popular") {
      return [...posts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    }
    return posts; 
  }, [filter, posts]);

  if (showSkeleton) {
    return (
      <div className="loading">
        <Skeleton.Button active style={{ width: 100, height: 50 }} />
        <Skeleton.Avatar active />
        <Skeleton.Button active style={{ width: 200, height: 30 }} />
        <Skeleton.Image active style={{ width: 400, height: 500, margin: 10 }} />
        <Skeleton.Avatar active />
        <Skeleton.Button active style={{ width: 200, height: 30 }} />
        <Skeleton.Image active style={{ width: 400, height: 500, margin: 10 }} />
      </div>
    );
  }

  return (
    <div className="feed-wrapper">
      <div className="feed__radionav">
        <h2>Feeds</h2>
        <RadioNav onSelect={handleFilterChange} /> {/* Pass the filter handler */}
      </div>

      {!isLoading && filteredPosts.length > 0 ? (
        filteredPosts.map((post: Post, index: number) => (
          <Posts
            key={post.id}
            post={post}
            index={index}
            lightColors={lightColors}
          />
        ))
      ) : (
        <p className="feed__p">Follow users to see posts</p>
      )}
    </div>
  );
}

const lightColors = [
  "#F7EBFF",
  "#FFFAEE",
  "#E6F7FF",
  "#D5F5E3",
  "#FFF1C1",
  "#FFEDDA",
  "#F2F3F4",
  "#F9E5D5",
  "#E6FFEB",
  "#FFF3E3",
];

export default Feed;
