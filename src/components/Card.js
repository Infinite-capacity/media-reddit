import React, { useEffect, useState } from "react";


export default function Card(props) {
  const [img, setImg] = useState('');
  const imageUrl = props.url;

  
  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, [imageUrl]);

  return (
    <>
      <img src={img} alt="icons" />
    </>
  );
}