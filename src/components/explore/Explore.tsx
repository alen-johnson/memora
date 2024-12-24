import "./Explore.css";
import getExplorePosts from "../../hooks/useGetExplore";
import { Posts } from "../componetIndex";
import { Post } from "../../store/postStore";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { lightColors } from "../../helpers/lightColours";

function Explore() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { isLoading, posts, isFetchingMore, fetchMore, hasMore } = getExplorePosts();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      },1000); 
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore && 
        !isFetchingMore
      ) {
        fetchMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMore, hasMore, isFetchingMore]);

  if (showSkeleton || isLoading) {
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
    <div className="explore">
      <h2>Explore</h2>
      <div>
        {posts.map((post: Post, index: number) => (
          <Posts
            key={post.id}
            post={post}
            index={index}
            lightColors={lightColors}
          />
        ))}
      </div>

      {isFetchingMore && <p>Loading more posts...</p>}
      {!hasMore && <p>No more posts to load</p>}
    </div>
  );
}

export default Explore;
