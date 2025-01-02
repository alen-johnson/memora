import { useEffect, useState } from "react";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import "./ProfilePost.css";
import { Skeleton } from "antd";
import useUserProfileStore from "../../store/userProfileStore";
import { isVideo } from "../../helpers/isVideo";

function ProfilePost() {
  const { isLoading, posts } = useGetUserPosts();
  const [userPosts, setUserPosts] = useState<
    { id: string; imgUrls: string[]; caption: string; likes: string[] }[]
  >([]);

  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    if (posts && posts.length > 0 && userProfile) {
      const filteredPosts = posts.filter(
        (post) => post.createdBy === userProfile.uid
      );
      setUserPosts(filteredPosts);
    }
  }, [posts, userProfile]);

  return (
    <div className="profile__posts">
      {isLoading ? (
        <>
          <Skeleton.Image active style={{ width: 200, height: 300 }} />
          <Skeleton.Image active style={{ width: 200, height: 300 }} />
          <Skeleton.Image active style={{ width: 200, height: 300 }} />
        </>
      ) : (
        userPosts.map((post) => (
          <div key={post.id} className="profile__posts-item">
            <div className="feed__content">
              {post.imgUrls.length > 0 && (
                <div className="profile__posts-media-container">
                  {isVideo(post.imgUrls[0]) ? (
                    <video className="profile__posts-media" controls>
                      <source src={post.imgUrls[0]} type="video/mp4" />
                      <source src={post.imgUrls[0]} type="video/webm" />
                      <source src={post.imgUrls[0]} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <>
                      <img
                        src={post.imgUrls[0]}
                        alt="Post image 1"
                        className="profile__posts-media"
                      />
                      {post.imgUrls.length > 1 && (
                        <div className="profile__posts-imgnum">{`1/${post.imgUrls.length}`}</div>
                      )}
                    </>
                  )}
                  <div className="profile__posts-likes">
                    <i className="heart-icon"> ❤️ </i>
                    {post.likes.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfilePost;
