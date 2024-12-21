import { useEffect, useState } from 'react';
import './Popular.css'
import { Skeleton } from 'antd';
import { Post } from '../../store/postStore';
import { Posts } from '../componetIndex';
import getPopularPosts from "../../hooks/useGetPopular";

function Popular() {


  const [showSkeleton, setShowSkeleton] = useState(true);

  const { isLoading, posts } = getPopularPosts();

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
    <div className='popular'>
      <h2>Popular</h2>
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
  )
}

export default Popular