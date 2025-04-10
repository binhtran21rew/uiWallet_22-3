import React, { use, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import { listNav, listNav2, listNavReport } from "../../../constant";

import "./swiperNav.scss";
import { useGSAP } from "@gsap/react";
import Icon from "../../../component/Icon";
function SwiperNav({ ...props }) {
    const { isCloseNav, showIdWallet} = props;
    const navRef = useRef(null);
    const navigate = useNavigate();

    useGSAP(() => {
        const nav1 = navRef.current.querySelectorAll(".swiper_tab_1");
        const nav2 = navRef.current.querySelectorAll(".swiper_tab_2");

        !isCloseNav && nav1.forEach((nav, id) => {
            gsap.to(nav, {
                animation: "fadeBottomToTop 1s ease-in-out",
            })
        })

        isCloseNav && nav2.forEach((nav, id) => {
            gsap.to(nav,{
                animation: "fadeBottomToTop 1s ease-in-out",
            })

        })


    }, [isCloseNav]);

    const handleClick = (name, link) => {
        if(name === 'top up'){
            navigate("/transaction", {state: {name: 'topup', idWallet: showIdWallet}});
            
        }else if(name === "withdraw"){
            navigate("/transaction", {state: {name: 'withdraw', idWallet: showIdWallet}});
            
        }else{
            navigate(link);
        }

        
    }

    
    return (
        <div className="SwiperNav" ref={navRef}>
            <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
                className={`${isCloseNav && "closeNav"} custom-swiper`}
                style={{zIndex: 1}}
            >
                {!isCloseNav && listNav.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="swiper_tab_1 swiper-slide"
                        onClick={() => handleClick(item.name, item.link)}

                    >
                        <div className="action-button">
                            <Icon name={item.icon}/>
                            <span className="ms-2">{item.name}</span>
                        </div>
                    </SwiperSlide>
                ))}

                {isCloseNav && listNav2.map((item, index) => {
                    
                    return(
                        <SwiperSlide
                            key={index}
                            className="swiper_tab_2 swiper-slide"
                            onClick={() => handleClick(item.name)}
                        >
                            <div className="action-button">
                                <Icon name={item.icon}/>
                                <span className="ms-2">{item.name}</span>
                            </div>
                        </SwiperSlide>

                    )
                })}
            </Swiper>
        </div>
    );
}

export default SwiperNav;
