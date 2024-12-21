export const formatTime = (timetamp: number) => {
    const now = Date.now();
    const diffInSec = Math.floor((now - timetamp) / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHour = Math.floor(diffInMin / 60);
    const diffInDay = Math.floor(diffInHour / 24);

    if (diffInSec < 60) {
      return `${diffInSec} seconds ago`;
    } else if (diffInMin < 60) {
      return `${diffInMin} minutes ago`;
    } else if (diffInHour < 24) {
      return `${diffInHour} hours ago`;
    } else {
      if (diffInDay === 1) return `${diffInDay} day ago`;
      else return `${diffInDay} days ago`;
    }
  };