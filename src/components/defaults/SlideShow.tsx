import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

// import required modules
import { Navigation } from "swiper";

export default function SlideShow({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center w-[90vw]">
      <Swiper navigation={true} modules={[Navigation]} className="w-1/2">
        {images.map((image, key) => (
          <SwiperSlide key={key}>
            <Image alt="eventImage" src={image} width={500} height={500} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


