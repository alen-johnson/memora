import React, { useEffect, useState, useCallback } from "react";
import { Skeleton } from "antd";
import { Posts, RadioNav, ToTopButton } from "../componetIndex";
import "./Feed.css";
import useGetFeed from "../../hooks/useGetFeed";
import { Post } from "../../store/postStore";
import { lightColors } from "../../helpers/lightColours";

function Feed() {
  const { isLoading, posts, fetchMorePosts, isEndOfFeed } = useGetFeed();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [filter, setFilter] = useState<string>("Friends");

  const handleFilterChange = (selected: string) => {
    setFilter(selected);
  };

  const filteredPosts = React.useMemo(() => {
    if (filter === "Popular") {
      return [...posts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    }
    return posts;
  }, [filter, posts]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleScroll = useCallback(() => {
    if (isEndOfFeed || isLoading) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.offsetHeight - 300; 

    if (scrollPosition >= threshold) {
      fetchMorePosts();
    }
  }, [isLoading, isEndOfFeed, fetchMorePosts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (showSkeleton) {
    return (
      <div className="loading">
        <Skeleton.Button active style={{ width: 100, height: 50 }} />
        <Skeleton.Avatar active />
        <Skeleton.Button active style={{ width: 200, height: 30 }} />
        <Skeleton.Image active style={{ width: 400, height: 500, margin:10  }} />
        <Skeleton.Avatar active />
        <Skeleton.Button active style={{ width: 200, height: 30 }} />
        <Skeleton.Image active style={{ width: 400, height: 500, margin:10  }} />
      </div>
    );
  }

  return (
    <div className="feed">
      <div className="feed__radionav">
        <h2>Feeds</h2>
        <RadioNav onSelect={handleFilterChange} />
      </div>

      {filteredPosts.length > 0 ? (
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

      {!isEndOfFeed && isLoading && (
        <div className="loading-more">
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      )}

      {isEndOfFeed && (
        <div className="feed__end">
        <p className="feed__end-message">You've reached the end of the feed</p>
        <ToTopButton/>
        </div>
      )}
    </div>
  );
}

export default Feed;
