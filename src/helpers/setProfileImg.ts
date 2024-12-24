import { cover, profile } from "../assets/imageIndex";

export const setProfileImg = (userProfile: string | undefined) => {
  if (userProfile == undefined) return profile;
  const profileimg = userProfile ? userProfile : profile;

  return profileimg;
};

export const setCoverImg = (userCover: string | undefined) => {
  if (userCover == undefined) return cover;

  const coverimg = userCover ? userCover : cover;

  return coverimg;
};
