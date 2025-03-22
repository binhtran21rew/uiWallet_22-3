import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";


import { listNav } from "../../../constant";

import './swiperNav.scss';
function SwiperNav() {
    return (
        <div className="SwiperNav">
            <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
            >
                {listNav.map((item, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <div className="action-button">
                            {item.icon}
                            <span className="ms-2">{item.name}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SwiperNav;
