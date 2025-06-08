'use client';

import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  title: string;
  autoPlay?: boolean;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  title, 
  autoPlay = false,
  poster = '/images/col-promo-dumbs-liberties.png'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // If autoPlay is enabled and the video element exists
    if (autoPlay && videoRef.current) {
      // Try to play the video when component mounts
      const playPromise = videoRef.current.play();
      
      // Handle potential play() rejection (browsers may block autoplay)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay was prevented:', error);
        });
      }
    }
  }, [autoPlay, src]);

  return (
    <div className="relative pt-[56.25%]">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
        controls
        playsInline
        preload="metadata"
        title={title}
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer; 