import React, { useRef, useState, useEffect } from "react";
import "./banner.css";

export default function Banners({ banners }) {
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {

        setScrollPosition(
          (scrollPosition) => scrollPosition + slider.offsetWidth
        );
        if (scrollPosition >= slider.scrollWidth - slider.offsetWidth) {
          setScrollPosition(0);
        }
        slider.scrollLeft = scrollPosition;
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [scrollPosition]);

  return (
    <div className="slider-wrapper">
      <div className="slider" ref={sliderRef}>
        {banners?.map((banner, index) => {
          return <img id={`slider-${index}`} src={banner} alt="" key={index} />;
        })}
      </div>
    </div>
  );
}
