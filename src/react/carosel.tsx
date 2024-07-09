import React, {createRef, useEffect, useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carosel.css";

const names = ["Growth Jam", "Gump Jam", "CEO Mindset", "Squid Jam"];


export default function Carousel() {
  const [lastSlide, setLastSlide] = React.useState(0);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const vid0 = useRef<HTMLVideoElement>(null);
  const vid1 = useRef<HTMLVideoElement>(null);
  const vid2 = useRef<HTMLVideoElement>(null);
  const vid3 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (vid0.current !== null && vid1.current !== null && vid2.current !== null && vid3.current !== null) {
      vid0.current.pause();
      vid1.current.pause();
      vid2.current.pause();
      vid3.current.pause();
    }
  },[currentSlide]);

  const title = <h1 style={{margin: "20px"}}>{names[currentSlide]}</h1>
  let mobile = false;
  if (window.matchMedia("(max-width: 768px)").matches) {
    /* the viewport is less than 768 pixels wide */
    mobile = true;
  } 

  const settings = {
    className: "center",
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 1,
    beforeChange: (current: number, next: number) => {setCurrentSlide(next);},
  };

  let videoDimensions = {width: 720, height: 480}
  if (mobile) {
    videoDimensions = {width: 200, height: 200}
  }
  else {
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
          <video ref={vid0} width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/Growth.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video ref={vid1} width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/GumpJam.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video ref={vid2} width={videoDimensions.width} height={videoDimensions.height} controls>
            <source src="https://www.cs.mun.ca/~etcrann/GameJams/CEO.mp4" type="video/mp4"></source>
          </video>
      </div>
      <div>
          <video ref={vid3} width={videoDimensions.width} height={videoDimensions.height} controls>
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