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
    vertical: true,
    verticalSwiping: true,
    speed: 500,
    slidesToShow: 3,
    infinite: true,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  let settings = {};
  let videoDimensions = {width: 720, height: 480}
  if (mobile) {
    settings = mobileSettings;
    videoDimensions = {width: 200, height: 200}
  }
  else {
    settings = desktopSettings;
    videoDimensions = {width: 720, height: 480}
  }

  const lazyMobile = (
    <div style={{margin: "0px"}}>
      <div>
          <video width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/Growth.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/GumpJam.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/CEO.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/CardJam.mp4" type="video/mp4"></source>
          </video>
      </div> 
    </div>
  )

  return (
    <>
    {!mobile && title}
    {!mobile &&
    <div className="slider-container slider-wrapper">
    <Slider {...settings}>
      <div>
          <video width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/Growth.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/GumpJam.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/CEO.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/CardJam.mp4" type="video/mp4"></source>
          </video>
      </div> 
    </Slider>
    </div>
    }
    {mobile && lazyMobile }
    </>
  );
}