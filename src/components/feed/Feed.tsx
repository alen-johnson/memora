import { Skeleton } from "antd";
import { FeedPost, RadioNav } from "../componetIndex";
import "./Feed.css";
import getFeedPosts from "../../hooks/useGetFeed";

import { Post } from "../../store/postStore";

function Feed() {
  const { isLoading, posts } = getFeedPosts();

  if (isLoading) {
    return (
      <div className="loading"> 
        <Skeleton.Button active style={{width:100, height: 50}}/>
        <Skeleton.Avatar active style={{}}/>
        <Skeleton.Button active style={{width:200, height: 30}}/>
        <Skeleton.Image active style={{width:300, height: 400}}/>
        <Skeleton.Avatar active style={{}}/>
        <Skeleton.Button active style={{width:200, height: 30}}/>
        <Skeleton.Image active style={{width:300, height: 400}}/>

      </div>
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
          <FeedPost
            key={post.id}
            post={post}
            index={index}
            lightColors={lightColors}
          />
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
