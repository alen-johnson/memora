import "./Explore.css";
import getExplorePosts from "../../hooks/useGetExplore";
import { Posts } from "../componetIndex";
import { Post } from "../../store/postStore";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

function Explore() {

  const [showSkeleton, setShowSkeleton] = useState(true);
  //@ts-ignore
  const { isLoading, posts } = getExplorePosts();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 1000); 
      return () => clearTimeout(timer); 
    }
  }, [isLoading]);

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
    </div>
  );
}

export default Explore;
