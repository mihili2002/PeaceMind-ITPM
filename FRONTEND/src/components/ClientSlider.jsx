import React, { useEffect, useState } from "react";

const Slide = ({ item }) => {
  const styles = {
    backgroundImage: `url(${item.img})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="slide" style={styles}>
      <div className="slide_content">
       
      </div>
    </div>
  );
};

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  
  const handlseDotClick = (index) => {
    setCurrentIndex(index);
    if (index === 0) {
      setTranslateValue(0);
    } else {
      let t = index * 100;
      setTranslateValue(-t);
    }
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < slides.length - 1) {
          setTranslateValue(-(prevIndex + 1) * 100);
          return prevIndex + 1;
        } else {
          setTranslateValue(0);
          return 0;
        }
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [slides.length]); // Add slides.length to the dependency array

  return (
    <div className="slider">
      <div
        className="slider_wrapper"
        style={{
          transform: `translateX(${translateValue}%)`,
          transition: "transform ease-out 0.4s",
        }}
      >
        {slides.map((item) => {
          return <Slide key={item.id} item={item} />;
        })}
      </div>
      <div className="dots_wrapper">
        {slides.map((item, index) => {
          return (
            <span
              key={item.id}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => {
                handlseDotClick(index);
              }}
            >
              &#8226;
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
