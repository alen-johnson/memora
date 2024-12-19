import { useEffect, useState } from "react";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import "./ProfilePost.css";
import { Skeleton } from "antd";
import useUserProfileStore from "../../store/userProfileStore"; 

function ProfilePost() {
  const { isLoading, posts } = useGetUserPosts();
  const [userPosts, setUserPosts] = useState<
    { id: string; imgUrl?: string; caption: string }[]
  >([]);

  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    if (posts && posts.length > 0 && userProfile) {
      const filteredPosts = posts.filter((post) => post.createdBy === userProfile.uid);
      setUserPosts(filteredPosts);
    }
  }, [posts, userProfile]); 

  const isVideo = (url: string | undefined) => {
    return (
      url &&
      (url.includes(".mp4") || url.includes(".webm") || url.includes(".ogg"))
    );
  };

  return (
    <div className="profile__posts">
      {isLoading ? (
        <>
          <Skeleton.Image />
          <Skeleton.Image />
          <Skeleton.Image />
        </>
      ) : (
        userPosts.map((post) => (
          <div key={post.id} className="profile__posts-item">
            {post.imgUrl ? (
              isVideo(post.imgUrl) ? (
                <video className="profile__posts-media" controls>
                  <source src={post.imgUrl} type="video/mp4" />
                  <source src={post.imgUrl} type="video/webm" />
                  <source src={post.imgUrl} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={post.imgUrl}
                  alt="Browser Does Not Support Video"
                  className="profile__posts-media"
                />
              )
            ) : (
              <p>No media available</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ProfilePost;
