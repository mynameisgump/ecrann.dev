import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carosel.css";
import ReactPlayer from 'react-player'
import { create } from "zustand";

const names = ["Squid Jam", "Gump Jam", "CEO Mindset", "Growth Jam"];
const jamURL = [null,"https://github.com/mynameisgump/gumpjam-2023","https://github.com/mynameisgump/CEOMindsetGameJam","https://github.com/mynameisgump/Growth-Game-Jam"];

type VideoStoreState = {
  vid0Playing: boolean,
  vid1Playing: boolean,
  vid2Playing: boolean,
  vid3Playing: boolean,
  playVideo: (video: number) => void,
  pauseAll: () => void
}

const useVideoStore = create<VideoStoreState>((set) => ({
  vid0Playing: false,
  vid1Playing: false,
  vid2Playing: false,
  vid3Playing: false,
  pauseAll: () => set({vid0Playing: false, vid1Playing: false, vid2Playing: false, vid3Playing: false}),
  playVideo: (video: number) => { 
    set({vid0Playing: video == 0, vid1Playing: video == 1, vid2Playing: video == 2, vid3Playing: video == 3})
  }
}));


export default function Carousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const vid0Playing = useVideoStore((state) => state.vid0Playing);
  const vid1Playing = useVideoStore((state) => state.vid1Playing);
  const vid2Playing = useVideoStore((state) => state.vid2Playing);
  const vid3Playing = useVideoStore((state) => state.vid3Playing);
  const playVideo = useVideoStore((state) => state.playVideo);
  const pauseAll = useVideoStore((state) => state.pauseAll); 

  console.log(jamURL[currentSlide])
  const title = <h1 style={{margin: "20px"}}>{names[currentSlide]}&nbsp;{jamURL[currentSlide]&&<a href={jamURL[currentSlide] as string} target="_blank"><i className="fa-brands fa-github"></i></a>}</h1>
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
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
      pauseAll();
    },
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
    {!mobile && title }
    {!mobile &&
    <div className="slider-container slider-wrapper">
    <Slider {...settings}>
      <div>
          <ReactPlayer style={{display: "inline-block"}} playing={vid0Playing} onPlay={()=> playVideo(0)} url="https://www.cs.mun.ca/~etcrann/GameJams/CardJam.mp4" width={videoDimensions.width} height={videoDimensions.height} controls={true} />
      </div>
      <div>
          <ReactPlayer style={{display: "inline-block"}} playing={vid1Playing} onPlay={()=> playVideo(1)} url="https://www.cs.mun.ca/~etcrann/GameJams/GumpJam.mp4" width={videoDimensions.width} height={videoDimensions.height} controls={true} />
      </div>
      <div>
          <ReactPlayer style={{display: "inline-block"}} playing={vid2Playing} onPlay={()=> playVideo(2)} url="https://www.cs.mun.ca/~etcrann/GameJams/CEO.mp4" width={videoDimensions.width} height={videoDimensions.height} controls={true} />
      </div>
      <div>
          <ReactPlayer style={{display: "inline-block"}} playing={vid3Playing} onPlay={()=> playVideo(3)} url="https://www.cs.mun.ca/~etcrann/GameJams/Growth.mp4" width={videoDimensions.width} height={videoDimensions.height} controls={true} />
      </div> 
    </Slider>
    </div>
    }
    {mobile && lazyMobile }
    </>
  );
}