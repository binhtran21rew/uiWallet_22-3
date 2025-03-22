import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlockUpdateToken from "../../layouts/component/blockUpdateToken/BlockUpdateToken";
import gsap from "gsap";
import "./home.scss";
import { useGSAP } from "@gsap/react";
import NavBar from "../../layouts/component/navBar/NavBar";
import BackgroundScene from '../../layouts/component/image/image';
import BlockToken from "../../layouts/component/blockToken/BlockToken";

import {SPEED_SETTINGS} from "../../constant";
import NavBarTop from "../../layouts/component/navBarTop/NavBarTop";
function Home() {
  var cryptoSelector = useSelector((state) => state.crypto.data);
  const dispatch = useDispatch();
  
  const wrapperRef = useRef(null);
  const NavRef = useRef(null);
  const itemBlockTokenRef = useRef([]);
  const blockTokenRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const deltaY = useRef(0);
  const velocity = useRef(0);
  let animationFrame = useRef(null);



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
      visibility: "hidden",
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

  return (
    <div className="Home">
      <div  className="BlockNavTop">
        <NavBarTop />
      </div>
      <div ref={blockTokenRef} className="">
       <BlockToken isExpanded={isExpanded} />
      </div>
      <div ref={wrapperRef} className="BlockToken_wrapper">
        <BlockUpdateToken
          listToken={[
            { name: "cirus", detail: "CTH" },
            { name: "cirus", detail: "CTH" },
            { name: "cirus", detail: "CTH" },
          ]}
          ref={itemBlockTokenRef}
          
        />
      </div>

      <div ref={NavRef} className="Block_navBar">
        {isExpanded && <NavBar />}
      </div>
    </div>

  );
}

export default Home;
