import React from 'react';
import YouTube from 'react-youtube';

const VideoComponent = () => {
  // Video options
  const opts = {
    height: '315',
    width: '560',
    playerVars: {
      autoplay: 0,
    },
  };
  // YouTube video ID
  const videoId = 'JXHV5xdQAWo';

  return (
    <div className="video-container" style={{marginTop: "4rem"}}>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default VideoComponent;
