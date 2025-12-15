import React, { useEffect, useState } from "react";
import fallbackImage from "../brokenImage.jpeg"; // make sure path is correct

const ImageComponent = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(fallbackImage);

  useEffect(()=>{
    if (!src) {
        setImgSrc(fallbackImage)
    } else {
        setImgSrc(src);
    }
  },[])
  const handleError = (e) => {
    setImgSrc(fallbackImage) // set fallback directly on the DOM element
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      style={{ width: "200px", height: "200px" }}
    />
  );
};

export default ImageComponent;
