import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carosel.css";


export default function Carousel() {
  var settings = {
    className: "center",
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 1,
  };
  return (
    <div className="slider-container" style={{height: "720px", width: "1000px", display:"block", textAlign: "center"}}>
    <Slider {...settings}>
      <div style={{display: "flex",justifyContent: "center", alignItems: "center"}}>
        <video width={720} height={480} controls>
          <source src="https://www.cs.mun.ca/~etcrann/GameJams/Growth.mp4" type="video/mp4"></source>
        </video>
      </div>
      <div style={{display: "flex",justifyContent: "center", alignItems: "center"}}>
        <video width={720} height={480} controls>
          <source src="https://www.cs.mun.ca/~etcrann/GameJams/GumpJam.mp4" type="video/mp4"></source>
        </video>
      </div>
      <div>
        <video width={720} height={480} controls>
          <source src="https://www.cs.mun.ca/~etcrann/GameJams/CEO.mp4" type="video/mp4"></source>
        </video>
      </div>
      <div>
        <video width={720} height={480} controls>
          <source src="https://www.cs.mun.ca/~etcrann/GameJams/CardJam.mp4" type="video/mp4"></source>
        </video>
      </div>
    </Slider>
    </div>
  );
}