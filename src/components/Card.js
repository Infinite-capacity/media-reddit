import React, { useEffect, useState } from "react";

export default function Card(props) {
  const [img, setImg] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imageUrl = props.url;

  const fetchImage = async () => {
    if(imageUrl.includes('.mp4')){
      try{
        setIsLoading(true);
        // await fetch(imageUrl);
        setIsLoading(false);
        setImg(imageUrl);
        setIsVideo(true);
      } catch(e) {
        console.error(e);
      }
    } else{
      try{
        setIsLoading(true);
        // await fetch(imageUrl);
        setIsLoading(false);
        setImg(imageUrl);
        setIsVideo(false);
      } catch(e){
        console.error(e);
      }
    }
  }

  const displayFull = (e) => {
    //if the user clicked the div surrounding the image
    if(e.target.nodeName === 'DIV'){
      if(e.target.className === 'fullscreen'){
        e.target.className = 'myImageContainer';
      } else{
        e.target.className = 'fullscreen';
      }
    }
    //if the user clicked the image
    else if(e.target.nodeName === 'IMG' || e.target.nodeName === 'VIDEO'){
      //if already full screen, return. Else display full screen
      if(e.target.parentNode.className === 'fullscreen'){
        e.target.parentNode.className = 'myImageContainer';
      } else {
        e.target.parentNode.className = 'fullscreen';
      }
    }
  }


  useEffect(() => {
    fetchImage();
  }, [imageUrl, fetchImage]);

  return (
    <div className='myImageContainer' onClick={displayFull} >
      {isLoading? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : isVideo ? <video preload="auto" autoPlay="autoplay" muted="muted" loop="loop"><source src={img} type="video/mp4"/></video> : <img src={img} alt={imageUrl}/>}
    </div>
  );
}