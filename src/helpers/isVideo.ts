export const isVideo = (url: string | undefined) => {
  return (
    url &&
    (url.includes(".mp4") || url.includes(".webm") || url.includes(".ogg"))
  );
};
