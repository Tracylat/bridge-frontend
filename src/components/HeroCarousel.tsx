import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const HeroCarousel = () => {
  const slides = [
    {
      image: "/images/france-1.jpg",
      title: "Aidons ensemble à changer des vies",
      subtitle: "Un petit geste peut faire une grande différence.",
    },
    {
      image: "/images/benin-2.jpg",
      title: "Construisons un avenir meilleur",
      subtitle: "Chaque don compte, chaque action inspire.",
    },
    {
      image: "/images/benin-1.jpg",
      title: "Agir pour notre communauté",
      subtitle: "Parce que le changement commence par chacun de nous.",
    },
  ];

  return (
    <div className="relative w-full h-[90vh]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="bg-black bg-opacity-50 p-8 rounded-xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
