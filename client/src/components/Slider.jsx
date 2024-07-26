import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Mousewheel, Pagination } from "swiper/modules";
const Slider = () => {
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper w-full h-full"
      >
        <SwiperSlide className="bg-red-100 w-full">Slide 1</SwiperSlide>
        <SwiperSlide className="bg-red-100 w-full">Slide 2</SwiperSlide>
        <SwiperSlide className="bg-red-100 w-full">Slide 3</SwiperSlide>
        <SwiperSlide className="bg-red-100 w-full">Slide 4</SwiperSlide>
        <SwiperSlide className="bg-red-100 w-full">Slide 5</SwiperSlide>
        <SwiperSlide className="bg-red-100 w-full">Slide 6</SwiperSlide>
        <SwiperSlide className="bg-red-100 w-full">Slide 7</SwiperSlide>
        <SwiperSlide className="bg-red-100 w-full">Slide 8</SwiperSlide>
        <SwiperSlide className="bg-red-100 w-full">Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
