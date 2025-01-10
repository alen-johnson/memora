export const formatTime = (timestamp:number) => {
  const now = Date.now();

  const diffInSec = Math.floor((now - timestamp) / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  const diffInDay = Math.floor(diffInHour / 24);
  const diffInWeek = Math.floor(diffInDay / 7);
  const diffInMonth = Math.floor(diffInWeek / 4);
  const diffInYear = Math.floor(diffInMonth / 12);

  switch (true) {
    case diffInSec < 60:
      return `${diffInSec} ${diffInSec === 1 ? "second" : "seconds"} ago`;

    case diffInMin < 60:
      return `${diffInMin} ${diffInMin === 1 ? "minute" : "minutes"} ago`;

    case diffInHour < 24:
      return `${diffInHour} ${diffInHour === 1 ? "hour" : "hours"} ago`;

    case diffInDay < 7:
      return `${diffInDay} ${diffInDay === 1 ? "day" : "days"} ago`;

    case diffInWeek < 4:
      return `${diffInWeek} ${diffInWeek === 1 ? "week" : "weeks"} ago`;

    case diffInMonth < 12:
      return `${diffInMonth} ${diffInMonth === 1 ? "month" : "months"} ago`;

    default:
      return `${diffInYear} ${diffInYear === 1 ? "year" : "years"} ago`;
  }
};
