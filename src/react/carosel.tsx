import React, {createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carosel.css";

const names = ["Growth Jam", "Gump Jam", "CEO Mindset", "Squid Jam"];


export default function Carousel() {

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const title = <h1 style={{margin: "20px"}}>{names[currentSlide]}</h1>
  let mobile = false;
  if (window.matchMedia("(max-width: 768px)").matches) {
    /* the viewport is less than 768 pixels wide */
    mobile = true;
  } 

  const desktopSettings = {
    className: "center",
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };
  
  const mobileSettings = {
    className: "center",
    adaptiveHeight: true,
    vertical: true,
    verticalSwiping: true,
    speed: 500,
    slidesToShow: 4,
    infinite: true,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };
  let settings = {};
  if (mobile) {
    settings = mobileSettings;
  }
  else {
    settings = desktopSettings;
  }

  return (
    <>

    {!mobile && title}
    <div className="slider-container slider-wrapper">
    <Slider {...mobileSettings}>
      <div>
        <div className="video-wrapper">
          {/* {!mobile && names[0]} */}
          <video width={"100%"} height={"100%"} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/Growth.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>
      <div>
        <div className="video-wrapper">
          {/* {!mobile && names[1]} */}
          <video width={"100%"} height={"100%"} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/GumpJam.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>
      <div>
        <div className="video-wrapper">
          {/* {!mobile && names[2]} */}
          <video width={"100%"} height={"100%"} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/CEO.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>
      <div>
        <div className="video-wrapper">
          {/* {!mobile && names[3]} */}
          <video width={"100%"} height={"100%"} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/CardJam.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>
    </Slider>
    </div>
    </>
  );
}