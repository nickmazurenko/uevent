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
    <div className="flex flex-col items-center justify-center w-full">
      <Swiper navigation={true} modules={[Navigation]} className="w-full">
        {images.map((image, key) => (
          <SwiperSlide key={key}>
            <Image className="w-full rounded-2xl" alt="eventImage" src={image} width={500} height={500} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


