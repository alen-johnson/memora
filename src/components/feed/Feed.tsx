import {Skeleton } from "antd";
import { FeedPost, RadioNav } from "../componetIndex";
import "./Feed.css";
import getFeedPosts from "../../hooks/useGetFeed";

import { Post } from "../../store/postStore";

function Feed() {
  const { isLoading, posts } = getFeedPosts();
  console.log("=======>", posts[0]?.caption);

  if (isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <div className="feed-wrapper">
      <div className="feed__radionav">
        <h2>Feeds</h2>
        <RadioNav />
      </div>

      {!isLoading && posts.length > 0 ? (
        posts.map((post: Post, index: number) => (
          <FeedPost key={post.id} post={post} index={index} lightColors={lightColors} />
        ))
      ) : (
        <div>Follow users to see posts</div>
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
