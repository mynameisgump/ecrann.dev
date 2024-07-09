import React, {createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carosel.css";

const names = ["Growth Jam", "Gump Jam", "CEO Mindset", "Squid Jam"];

export default function Carousel() {

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const title = <h1 style={{margin: "20px"}}>{names[currentSlide]}</h1>


  var settings = {
    className: "center",
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <>
    {title}
    <div className="slider-container" style={{height: "480px", width: "1000px", display:"block", textAlign: "center", margin: 0}}>
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
    </>
  );
}