"use client";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Autoplay, Zoom } from "swiper/modules";
import "swiper/css";

// type SliderProps: SwiperProps = {
//     slide
// }

export default function AppSlider({
    slidesPerView = 2,
    breakpoints = {
        320: { slidesPerView: 2, spaceBetween: 15 },
        650: { slidesPerView: 3, spaceBetween: 15 },
        1200: { slidesPerView: 4, spaceBetween: 15 },
    },
    loop = true,
    autoplay = true,
    className,
    direction = "horizontal",
    // childClassName,
    items,
    ...props
}: SwiperProps & {
    childClassName?: string;
    items: React.ReactNode[];
}) {
    return (
        <>
            <Swiper
                {...props}
                slidesPerView={slidesPerView}
                modules={autoplay ? [Autoplay] : [Zoom]}
                breakpoints={breakpoints}
                autoplay={{ delay: 4000 }}
                fadeEffect={{ crossFade: true }}
                loop={loop}
                direction={direction}
                draggable
                className={`overflow-x-hidden w-full items-stretch py-5 ${className}`}
            >
                {items.map((item, i) => (
                    <SwiperSlide key={i} className="relative min-h-full w-full py-4">
                        {item}
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
