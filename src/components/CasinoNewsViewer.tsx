'use client';

import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from './VideoPlayer';

interface NewsItem {
  title: string;
  description: string;
  video: string;
}

interface CasinoNewsViewerProps {
  newsItems: NewsItem[];
}

const CasinoNewsViewer: React.FC<CasinoNewsViewerProps> = ({ newsItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [key, setKey] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
    
    if (videoContainerRef.current) {
      videoContainerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeIndex]);
  
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };
  
  const currentItem = newsItems[activeIndex];
  
  const getThumbnailForVideo = (videoPath: string) => {
    const baseName = videoPath.split('/').pop()?.split('.')[0];
    
    const thumbnailMap: Record<string, string> = {
      'col-promo-news-meme': '/images/col-promo-dumbs-liberties.png',
      'liberties-de-chica-promo': '/images/liberties-de-chica.png',
      'col-news-promo-vid-3': '/images/col-banner.png'
    };
    
    return baseName && thumbnailMap[baseName] 
      ? thumbnailMap[baseName] 
      : '/images/col-promo-dumbs-liberties.png';
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Video Display - Card Style */}
      <div 
        ref={videoContainerRef}
        className="card bg-base-300 shadow-xl mb-8"
      >
        <div className="w-full aspect-video bg-black">
          <VideoPlayer 
            key={key}
            src={currentItem.video} 
            title={currentItem.title} 
            poster={getThumbnailForVideo(currentItem.video)}
          />
        </div>
        <div className="card-body">
          <h3 className="card-title text-2xl text-primary">{currentItem.title}</h3>
          <p className="text-base-content opacity-80">{currentItem.description}</p>
          <div className="card-actions justify-between mt-4">
            <button 
              onClick={handlePrevious}
              className="btn btn-primary"
            >
              ❮ Previous
            </button>
            <button 
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next ❯
            </button>
          </div>
        </div>
      </div>
      
      {/* Thumbnail Navigation - Card Style */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {newsItems.map((item, index) => (
          <div 
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`card bg-base-200 cursor-pointer transition-all hover:shadow-lg ${
              index === activeIndex ? 'ring-4 ring-primary' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <figure className="relative aspect-video">
              <img 
                src={getThumbnailForVideo(item.video)} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </figure>
            <div className="card-body p-3">
              <h4 className="card-title text-sm">{item.title}</h4>
              {index === activeIndex && (
                <div className="badge badge-primary">Now Playing</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasinoNewsViewer; 