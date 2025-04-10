import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlockUpdateToken from "../../layouts/component/blockUpdateToken/BlockUpdateToken";
import gsap from "gsap";
import "./home.scss";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";



import NavBar from "../../layouts/component/navBar/NavBar";
import BackgroundScene from '../../layouts/component/image/image';
import BlockToken from "../../layouts/component/blockToken/BlockToken";

import {SPEED_SETTINGS} from "../../constant";
import NavBarTop from "../../layouts/component/navBarTop/NavBarTop";
import StarShape from "../../layouts/component/image/StarShape";
import Popup from "../../layouts/component/popup/Popup";
import Icon from "../../component/Icon";
import { current } from "@reduxjs/toolkit";


function Home() {
  var cryptoSelector = useSelector((state) => state.crypto.data);
  const dispatch = useDispatch();
  const [height, setHeight] = useState(window.innerHeight);

  const wrapperRef = useRef(null);
  const NavRef = useRef(null);
  const itemBlockTokenRef = useRef([]);
  const blockTokenRef = useRef(null);
  const popupRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const deltaY = useRef(0);
  const velocity = useRef(0);
  let animationFrame = useRef(null);
  const sceneRef = useRef(null);
  const [popup, setPopup] = useState(true);  
  const [motionActive, setMotionActive] = useState(true);
  const motionActiveRef = useRef(motionActive);
  const pathRef = useRef(null);
  const [isSetting, setIsSetting] = useState(false);
  const setttingRef = useRef(null);
  const [dayArray, setDayArray] = useState(Array.from({length: 15}, (_, i) => i+1));
  const dayRef = useRef(null);
  const lineRaceRef = useRef(null);
  const lineGroupRef = useRef(null);
  


  useGSAP(() => {
    gsap.set(wrapperRef.current, { yPercent: 100 });
    gsap.set(itemBlockTokenRef.current.slice(1), { opacity: 0, y: 0, display: "hidden"});

  }, [itemBlockTokenRef]);

  const expandPanel = (speed = SPEED_SETTINGS.slowDuration) => {
    
    gsap.to(wrapperRef.current, { yPercent: 25, duration: speed, ease: "power2.out" });
    gsap.to(itemBlockTokenRef.current.slice(1), {
      opacity: 1,
      duration: speed,
      ease: "power2.out",
      visibility: "visible",
    });

    gsap.to(NavRef.current, {
      opacity: 1,
      duration: speed,
      ease: "power2.out",
      visibility: "visible",
    });

    gsap.to(blockTokenRef.current, {
      opacity: 1,
      duration: speed,
      ease: "power2.out",
      visibility: "visible",
    })

    gsap.to(sceneRef.current, {
      duration: 0.3,
      y: "-10%",
      scale: .9,
      ease: "power1.out"
    })


    setIsExpanded(true);
  };

  const collapsePanel = (speed = SPEED_SETTINGS.slowDuration) => {

    gsap.to(itemBlockTokenRef.current.slice(1), {
      opacity: 0,
      duration: speed,
      ease: "expo.out",
      visibility: "hidden", 
    });

    gsap.to(wrapperRef.current, { yPercent: 100, duration: speed, ease: "expo.out" });

    gsap.to(NavRef.current, {
      opacity: 0,
      duration: speed,
      ease: "expo.out",
      visibility: "hidden",
    });
    gsap.to(blockTokenRef.current, {
      opacity: 1,
      duration: speed,
      ease: "power2.out",
      visibility: "visible",
    });
    
    gsap.to(sceneRef.current, {
      duration: 0.3,
      y: "0%",
      scale: 1,
      ease: "power1.out"
    })

    setIsExpanded(false);
  };

  useEffect(() => {

    const handleStart = (e) => {
      isDragging.current = true;
      startY.current = e.touches ? e.touches[0].clientY : e.clientY;
      currentY.current = startY.current;
      deltaY.current = 0;
      velocity.current = 0;

      e.preventDefault(); // Prevent unwanted scrolling behavior
    };

    const handleMove = (e) => {
      if (!isDragging.current) return;
      const newY = e.touches ? e.touches[0].clientY : e.clientY;
      deltaY.current = newY - startY.current;
      velocity.current = deltaY.current - (currentY.current - startY.current);
      currentY.current = newY;

      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(() => {
        gsap.to(wrapperRef.current, {
          yPercent: isExpanded
            ? 25 + deltaY.current * SPEED_SETTINGS.dampingFactor
            : 100 + deltaY.current * SPEED_SETTINGS.dampingFactor,
          duration: 0.1,
          ease: "power2.out",
        });
      });
    };

    const handleEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const { swipeThreshold, velocityThreshold, fastDuration, slowDuration } = SPEED_SETTINGS;

      if (Math.abs(deltaY.current) < swipeThreshold && Math.abs(velocity.current) < velocityThreshold) {
        gsap.to(wrapperRef.current, {
          yPercent: isExpanded ? 25 : 100,
          duration: slowDuration,
          ease: "power2.out",
        });
        return;
      }

      const animationSpeed = Math.abs(velocity.current) > velocityThreshold ? fastDuration : slowDuration;

      if (deltaY.current < -swipeThreshold || velocity.current < -velocityThreshold) {
        expandPanel(animationSpeed);
      } else if (deltaY.current > swipeThreshold || velocity.current > velocityThreshold) {
        collapsePanel(animationSpeed);
      } else {
        gsap.to(wrapperRef.current, {
          yPercent: isExpanded ? 25 : 100,
          duration: slowDuration,
          ease: "power2.out",
        });
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("touchstart", handleStart, { passive: false });
      wrapper.addEventListener("touchmove", handleMove, { passive: false });
      wrapper.addEventListener("touchend", handleEnd);

      wrapper.addEventListener("mousedown", handleStart);
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("touchstart", handleStart);
        wrapper.removeEventListener("touchmove", handleMove);
        wrapper.removeEventListener("touchend", handleEnd);

        wrapper.removeEventListener("mousedown", handleStart);
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
      }
      cancelAnimationFrame(animationFrame.current);
    };
  }, [isExpanded]);

  useEffect(() => {
    motionActiveRef.current = motionActive
  }, [motionActive]);

  useEffect(() => {
    if (!isSetting) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    // Chiều dài đoạn sáng bằng chính chiều dài path
    path.style.strokeDasharray = `${totalLength} ${totalLength}`;
    path.style.strokeDashoffset = totalLength;
    path.style.opacity = "1";
    path.style.transition = "none";

    requestAnimationFrame(() => {
      path.style.transition = `
        stroke-dashoffset 2s ease,
        opacity 0.5s ease 2s
      `;
      path.style.strokeDashoffset = "0";
      path.style.opacity = "0";
    });

    const timer = setTimeout(() => {
      setIsSetting(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isSetting, setIsSetting]);

  const handleClick = () => {
    const ref = dayRef.current;
    const current = popupRef.current;
    if(!current || !motionActive) return;
    setMotionActive(false);
    const tl = gsap.timeline();
    const tl2 = gsap.timeline();

    const icon = current.querySelectorAll(".Popup_wrapper_icon");
    const text = current.querySelectorAll(".Popup_wrapper_text");
    const popup = current.querySelectorAll('.Popup');
    const popupWrapper = current.querySelectorAll('.Popup_wrapper')
    const star = current.querySelectorAll('.Popup_wrapper_star');
    const button = current.querySelectorAll('.button');
    const dayArrow = current.querySelectorAll('.dayArrow');

    const progress = ref.querySelectorAll('.progressBg')
    const percent = (2 / 3) * 100;


    tl.to(current, {
      duration: .2,
      scale: 0.8,
      ease: "power2.out",
    });

    tl.to(current, {
      duration: .2,
      scale: 1,
      ease: "power2.out",
    });

    tl.to(current, {
      duration: .2,
      height: '100%',
      width: "100%",
      left: 0,
      bottom: 0,
      zIndex: 99999,
      backgroundColor: '#fff',
    })

    tl2.to(popup, {
      duration: .3,
      position: 'absolute',
      height: '75%',
      width: "100%",
      left: 0,
      bottom: "15%",
    })

    tl2.to(icon, {
      duration: 0,
      visibility: 'hidden'
    })
    tl2.to(popupWrapper, {
      duration: 0,
      flexDirection: 'column'
    })

    tl2.to(star, {
      duration: 0,
      display: 'block'
    })
    tl2.to(button, {
      duration: 0,
      display: 'block'
    })
    tl2.to(text, {
      duration: .3,
      color: 'red',
      fontSize: '18px'
    })
    tl2.to(dayArrow,{
      display: 'block'
    });
    tl2.fromTo(
      progress,
      { width: 0, left: "-32px" },
      {
        duration: 0.5,
        width: `${percent}%`,
        left: "0",
        ease: "power4.out",
      }
    );

  }

  const handleClose = () => {
    const current = popupRef.current;
    const button = current.querySelectorAll('.button');    

    const tl = gsap.timeline();
    tl.to(button, {
      duration: 0,
      scale: 0.8,
      ease: "power2.out",
    })

    tl.to(button, {
      duration: 0.2,
      scale: 1,
      ease: "power2.out",
    })

    tl.to(current, {
      duration: 0.2,
      scale: 0.8,
      opacity: .5,
      ease: "power2.out",
      onComplete: () => {
        current.style.display = 'none'; 
      }
    })
    
  }
  const runLineDrawingAnimation = () => {
    const paths = lineRaceRef.current.querySelectorAll("path, line");
    const path = pathRef.current;
    if(!lineRaceRef.current) return;
    paths.forEach((el) => {
      const length = el.getTotalLength?.() || 0;
  
      el.style.strokeDasharray = `${length} ${length}`;
      el.style.strokeDashoffset = length;
      el.style.opacity = "1";
      requestAnimationFrame(() => {
        path.style.transition = `
          stroke-dashoffset 2s ease,
          opacity 0.5s ease 2s
        `;
        path.style.strokeDashoffset = "0";
        path.style.opacity = "0";
      });
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: .2,
        ease: "power2.out",
      });
    });
  }
  const handleSetting = () =>{
    const navbar = document.querySelectorAll(".BlockNavTop");
    
    setIsSetting(true);
    setPopup(false);

    const tl = gsap.timeline();

    tl.set(lineGroupRef.current, {
      display: 'block',
      onComplete: runLineDrawingAnimation
    })

    gsap.set(navbar[0], {
      display: "none"
    })
    gsap.set(navbar[1], {
      display: "block"
    })

    tl.to(sceneRef.current, {
      duration: 0.2,
      y: "-10%",
      scale: .9,
      ease: "power1.out"
    })

    tl.to(wrapperRef.current, {
      duration: 0,
      display: "none",
      ease: "power1.out"
    })
    tl.to(setttingRef.current, {
      duration: .2,
      display: "block",
      y: "-50%",
      ease: 'power1.out'
    })
  } 

  const handleCloseSetting = () => {
    const navbar = document.querySelectorAll(".BlockNavTop");
    const paths = lineRaceRef.current.querySelectorAll("path, line");

    paths.forEach((el) => {
      const length = el.getTotalLength?.() || 0;
  
      gsap.to(el, {
        strokeDashoffset: length,
        duration: .2,
        ease: "power2.in",
        onComplete: () => {
          el.style.opacity = "0";
        },
      });
    });


    const tl = gsap.timeline();

    gsap.to(sceneRef.current, {
      duration: .2,
      y: "0",
      scale: 1,
      ease: "power1.out"
    })
    tl.to(setttingRef.current, {
      duration: .5,
      display: "block",
      y: "100%",
      display: "none",
      ease: 'power1.out'
    })
    
    gsap.set(navbar[0], {
      display: "block"
    })
    gsap.set(navbar[1], {
      display: "none"
    })
    gsap.fromTo(wrapperRef.current, {
      duration: 0.6,
      scale: 0.7,
      opacity: .5,
      display: "block"
    }, {
      duration: 0.2,
      scale: 1,
      opacity: 1,
      ease: 'power1.out'
    })

  }

  
  return (
    <div className="Home" style={{height: height}}>
      <div className="BlockNavTop">
          <NavBarTop onClick={handleSetting}/>
      </div>
      <div  className="BlockNavTop" style={{display: "none"}}>
        <div className='NavBarTop d-flex justify-content-between w-100 px-4'>
            <div className="NavBarTop_icon" onClick={() => handleCloseSetting()}>
            <Icon name={"iconArrowLeftDirection"} width={16} color={"rgb(109, 109, 109)"}/>
            </div>
        </div>
      </div>
      <div ref={lineGroupRef}  className="" style={{
        position: "absolute",
        left: "25%",
        bottom: "70%",
        zIndex: 1,
        display: `none`
      }}>
        <svg width="200" height="100" viewBox="0 0 200 100">
          <defs>
            <linearGradient id="trailGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255, 100, 100, .3)" />
              <stop offset="100%" stopColor="rgba(255, 100, 100, .7)" />
            </linearGradient>
          </defs>
          <g ref={lineRaceRef}>

            <path
              d="M10,100 A90,90 0 0,1 190,100"
              fill="none"
              stroke="rgba(247, 121, 121, 0.1)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              ref={pathRef}
              d="M10,100 A90,90 0 0,1 190,100"
              fill="none"
              stroke="url(#trailGradient)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {Array.from({ length: 70 }).map((_, i) => {
              const totalLines = 70;
              const angle = (-180 + (i * 180) / (totalLines - 1)) * (Math.PI / 180);
              const radius = 94;
              const lineLength = 9;
              const cx = 100;
              const cy = 100;

              const x1 = cx + radius * Math.cos(angle);
              const y1 = cy + radius * Math.sin(angle);
              const x2 = cx + (radius - lineLength) * Math.cos(angle);
              const y2 = cy + (radius - lineLength) * Math.sin(angle);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(138, 138, 138, 0.3)"
                  strokeWidth="1"
                />
              );
            })}

          </g>

        </svg>

      </div>
      <div ref={sceneRef} className="bg_scene" style={{height: "100%", width: "100%"}} >
        <BackgroundScene isExpanded={isExpanded}/>
      </div>
      <div ref={blockTokenRef} className="">
        <BlockToken isExpanded={isExpanded} />
      </div>
      <>
        <div ref={wrapperRef} className="BlockToken_wrapper">
          <BlockUpdateToken
            ref={itemBlockTokenRef}
          />
        </div>
        <div ref={NavRef} className="Block_navBar">
          {isExpanded && <NavBar color="black"/>}
        </div>
      </>

      <div ref={setttingRef} style={{
        width: "100%",
        height: "500px",
        position: "fixed",
        bottom: "-25%",
        padding: "10px",
        display:"none"
      }}>
        <div className="d-flex flex-column align-items-center bg-white pt-5 rounded-4" >
          <span className="text-capitalize fw-bold fs-5">well done!</span>
          <span className="col-8 text-center">Your Cirus Orb has evolved to the new 5 level</span>
          <div className="bg-button-blur text-center align-content-center my-4" style={{width: "70px", height: "40px", borderRadius: "30px"}} onClick={() => handleCloseSetting()}>
            <span className="text-capitalize fs-5 text-black-blur">cool</span>
          </div>
        </div>

        <div className="d-flex bg-white-blur rounded-4" style={{
            marginTop: "50px"
        }}>
          <div className="col-4 d-flex flex-column justify-content-center align-items-center">
            <span className="text-capitalize" style={{color: "rgba(140, 140, 140, 0.5)"}}>cirus score</span>
            <span className="fs-5" style={{color: "rgba(140, 140, 140, 0.5)"}}>568</span>
          </div>
          <div className="">
            <StarShape blur={5}/>
          </div>
        </div>
      </div>

      {popup && (
        <div ref={popupRef} style={{position: 'absolute',  width: "90%", bottom: "1.2%", left: "5%"}} onClick={() => handleClick()}>
          <motion.div
              initial={{ y: "100%" }}
              animate={motionActive ? { y: 0 } : false}
              exit={motionActive ? { y: "100%" } : false}
              drag={motionActive ? "y" : false}
              dragConstraints={motionActive ?{ top: 0, bottom: 200 } : false}
              dragElastic={ motionActive ? 0.5 : undefined}
              onDragEnd={(e, info) => {
                  if (info.offset.y > 100) setPopup(false); 
              }}
              className={`Popup px-3 py-2 rounded-4 shadow-lg `}
              style={{ touchAction: "none", backgroundColor: "rgb(255, 255, 255)" }} 
          >
            <div className="Popup_wrapper d-flex justify-content-between align-items-center">
              <div className="Popup_wrapper_icon bg-white-blur text-center align-content-center " 
              style={{width: "40px", height: "36px",borderRadius: "50%", boxShadow:" 0 0 20px rgba(137, 137, 137, 0.3)", visibility: 'visible'}}>
                <Icon name="iconStar"/>
              </div>
              <div className="Popup_wrapper_star" style={{display: 'none'}}>
                  <StarShape />
              </div>
              <div className="col-7 text-center">
                <span className="fs-small text-black fs-medium">Come back tomorrow and earn an </span>
                <span className="Popup_wrapper_text fs-small" style={{color: 'green'}}>100 score</span>
              </div>
              <div className="Popup_wrapper_icon text-end" style={{visibility: 'visible'}}>
                <Icon name="iconArrowRight" color={"rgba(137, 137, 137, 0.7)"}/>
              </div>
              <div className="dayArrow w-100 text-center">
                <div ref={dayRef} className="dayArrow_wrapper row">

                  <div className="progressBg" />
                    {dayArray.slice(0,3).map((item,id) => {
                      return(
                        <div className={`dayArrow_item col-${12 / 3}`} key={item}>{item}</div>
                      )
                    })}
                </div>

                <div className="my-4">
                  <span>7 days + 150 score</span>
                </div>
                <div className="dayArrow_wrapper row">
                  {dayArray.slice(3,7).map(item => {
                    return(
                      <div className={`dayArrow_item col-${12 / 4}`} key={item}>{item}</div>
                    )
                  })}
                </div>
                <div className="my-4">
                  <span>15 days + 300 score</span>
                </div>
                <div className="dayArrow_wrapper row">
                  {dayArray.slice(7,11).map(item => {
                    return(
                      <div className={`dayArrow_item col-${12 / 4}`} key={item}>{item}</div>
                    )
                  })}
                </div>
                <div className="dayArrow_wrapper row">
                  {dayArray.slice(11,15).map(item => {
                    return(
                      <div className={`dayArrow_item col-${12 / 4}`} key={item}>{item}</div>
                    )
                  })}
                </div>

              </div>
            </div>

          </motion.div>

          <div className="button" style={{position: 'absolute', bottom: "5%", left: "50%", boxShadow:"0 0 10px rgb(145, 145, 145)", borderRadius: "50%", display: 'none'}} onClick={() => handleClose()}>
            <Icon name={"iconClear"} color={"rgba(217, 217, 217, .5)"} width={32}/>
          </div>
        </div>
      )}
    </div>

  );
}

export default Home;
