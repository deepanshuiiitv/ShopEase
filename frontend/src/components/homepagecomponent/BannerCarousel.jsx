// components/BannerCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slide1 from "@/assets/slides/slide1.png";
import slide2 from "@/assets/slides/slide2.png";
import slide3 from "@/assets/slides/slide3.png";

const slides = [
  {
    id: 1,
    img: slide1, // Place your images in public/images
    alt: "Slide 1",
  },
  {
    id: 2,
    img: slide2,
    alt: "Slide 2",
  },
  {
    id: 3,
    img: slide3,
    alt: "Slide 3",
  },
];

export default function BannerCarousel() {
  return (
    <div className="w-full p-5" >
      <div className="max-h-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="rounded-md"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img src={slide.img} alt={slide.alt} className="w-full h-auto" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
