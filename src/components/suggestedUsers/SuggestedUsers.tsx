
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import "./SuggestedUsers.css";
import useAuthStore, { User } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { Skeleton } from "antd";


function SuggestedUsers() {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const { fetchFollowStatus, handleFollowUserWithId } = useFollowUser(""); 
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user)

  if (isLoading) {
    return (
      <div className="loading-sug">
        <Skeleton.Avatar/>
        <Skeleton.Input/>
      </div>
    )
  }

const handleFollowClick = (userId: string) => {
  handleFollowUserWithId(userId) 
    .then(() => fetchFollowStatus(authUser?.uid || "")); 
};



  return (
    <div className="suggestedusers">
      <div className="suggestedusers__header">
        <h5>People you may know</h5>
      </div>
      <div className="suggestedusers__content">
        {suggestedUsers.map((user: User) => (
          <div key={user.uid} className="suggestedusers__content-item">
            <img
              src={user.profilePicURL}
              alt={user.username}
              className="suggestedusers__content-img"
              onClick={() => navigate(`/${user.username}`)} 
            />
            <p
              className="suggestedusers__content-name"
              onClick={() => navigate(`/${user.username}`)} 
            >
              {user.username}
            </p>
            <p
              onClick={()=>handleFollowClick(user.uid)} 
              className="suggestedusers__content-follow"
            >
               Follow
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedUsers;
