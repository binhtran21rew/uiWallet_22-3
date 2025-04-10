import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { FixedSizeList as List } from "react-window";
import { useSwipeable } from "react-swipeable";


import "./showIsToken.scss";
import BlockContentTopWallet from "../../../layouts/component/blockContentTopWallet/BlockContentTopWallet";
import {
    imageToken,
    imageNFT1,
    imageAvatar1,
    imageNFT2,
} from "../../../constant";
import BlockNFT from "../../../layouts/component/blockNFT/BlockNFT";
import Icon from "../../../component/Icon";
import ShowHistory from "../showHistory/ShowHistory";

function ShowIsToken() {
    const location = useLocation();
    const { isWallet, idWallet } = location.state;
    var walletSelector = useSelector((state) => state.wallet);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("Token");

    const listRef = useRef(null);
    const outerRef = useRef(null);
    const itemHeight = 200;
    const [isCloseNav, setIsCloseNav] = useState(false);
    const extendedList = [
        ...walletSelector.data[0].assets,
        { isAddList: true },
    ];

    

    // Mouse state
    const [isDragging, setIsDragging] = useState(false);
    const [isScrollItem, setIsScrollItem] = useState(false);
    const [isBlockOpen, setIsBlockOpen] = useState(false);

    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const blockMainRef = useRef(null);
    const blockHoldRef = useRef(null);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    const minHeight = 400;
    const maxHeight = screenHeight;
    
    useEffect(() => {
        const updateScreenHeight = () => setScreenHeight(window.innerHeight);
        window.addEventListener("resize", updateScreenHeight);

        return () => {
            window.removeEventListener("resize", updateScreenHeight);
        };
    }, []);

    useEffect(() => {
        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartY(e.clientY);
        };
        const handleStart = (e) => {
            e.preventDefault();
            setIsDragging(true);
            setStartY(e.touches ? e.touches[0].clientY : e.clientY);
        };
        const handleMove = (e) => {
            e.preventDefault();
            if (!isDragging) return;
            const currentY = e.touches ? e.touches[0].clientY : e.clientY;
            const deltaY = currentY - startY;
    
            if (deltaY < -10) {
                expandBlock();
                setIsDragging(false);
                setIsBlockOpen(true);
            } else if (deltaY > 50 && deltaY < 100 && maxHeight === blockMainRef.current.offsetHeight) {
                collapseBlock();
                setIsDragging(false);
                setIsBlockOpen(false);
            } else if (deltaY > 150) {
                closeBlock();
                setIsDragging(false);
                setIsBlockOpen(false);
            }
        };
        const handleMouseMove = (e) => {
            e.preventDefault()
            if (!isDragging) return;
            const deltaY = e.clientY - startY;
    
            if (deltaY < -100) { 
                expandBlock();
                setIsDragging(false); // Prevent further triggers
                setIsBlockOpen(true);
            }else if(deltaY > 50 && deltaY < 100 && maxHeight === blockMainRef.current.offsetHeight){
                collapseBlock();
                setIsDragging(false); 
                setIsBlockOpen(false);
            }else if(deltaY > 150){
                closeBlock();
                setIsDragging(false); 
                setIsBlockOpen(false);
            }
        };
        const expandBlock = () => {
            setIsCloseNav(false);
            gsap.to(blockMainRef.current, {
                height: maxHeight,
                backgroundColor: "#BBB3FF",
                duration: 0.4,
                ease: "power2.out",
                zIndex: 99,
            });
        };

        const collapseBlock = () => {
            setIsCloseNav(false);
            gsap.to(blockMainRef.current, {
                height: minHeight,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                duration: 0.4,
                ease: "power2.out",
            });
        };

        const closeBlock = () => {
            setIsCloseNav(true);
            gsap.to(blockMainRef.current, {
                height: 20,
                duration: 0.4,
                ease: "power2.out",
            });
        }
        const handleMouseUp = (e) => {
            e.preventDefault()
            setIsDragging(false);
        };
    

        const holdElement = blockHoldRef.current;
        holdElement.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        holdElement.addEventListener("touchstart", handleStart, { passive: true });
        holdElement.addEventListener("touchmove", handleMove);
        holdElement.addEventListener("touchend", handleMouseUp);


    
        return () => {
            holdElement.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);

            holdElement.removeEventListener("touchstart", handleStart, { passive: true });
            holdElement.removeEventListener("touchmove", handleMove);
            holdElement.removeEventListener("touchend", handleMouseUp);

        };
    }, [isDragging]);

    // Touch & Mouse Events item list
    useEffect(() => {
        const handleMouseDown = (e) => {
            setIsScrollItem(true);
            setStartY(e.clientY);
            setScrollTop(outerRef.current.scrollTop);
        };

        const handleMouseMove = (e) => {
            if (!isScrollItem) return;
            const deltaY = e.clientY - startY;
            outerRef.current.scrollTop = scrollTop - deltaY; // Move based on drag
        };

        const handleMouseUp = () => {
            setIsScrollItem(false);
        };

        // Attach event listeners
        if (outerRef.current) {
            outerRef.current.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            if (outerRef.current) {
                outerRef.current.removeEventListener(
                    "mousedown",
                    handleMouseDown
                );
            }
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isScrollItem, startY, scrollTop]);

    // Touch Swipe (Mobile)

    const ListRow = ({ index, style }) => {
        const startIndex = index * 2;
        const items = extendedList.slice(startIndex, startIndex + 2);

        return (
            <div
                className="row"
                style={{ ...style, marginLeft: 0, marginRight: 0 }}
            >
                {items.map((item, id) =>
                
                    item.isAddList ? (
                        <div className="Block_add d-flex align-items-center" key={id}>
                            <div className="iconAdd">{<Icon name="iconAdd"/>}</div>
                            <div className="text-black">Add a token</div>
                        </div>
                    ) : (
                        <div className="BlockToken_wrapper row" key={id}>
                            <div className="BlockToken_left col-7">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="me-3">{imageToken}</div>
                                    <div className="d-flex flex-column">
                                        <span className="text-uppercase">
                                            {item.name}
                                        </span>
                                        <span className="detail text-uppercase">
                                            {item.detail}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="BlockToken_right col-5 d-flex">
                                <div className="d-flex flex-row align-items-center">
                                    <span className="text-uppercase me-2">
                                        {item.quantity}
                                    </span>
                                    <span className="detail text-uppercase">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        );
    };

    
    return (
        <div className="ShowToken">
            <div className="Block_Top">
                <BlockContentTopWallet
                    showToken={true}
                    idWallet={idWallet}
                    showOption={true}
                    isWallet={isWallet}
                    isCloseNav={isCloseNav}
                    isToken={true}
                />
            {isCloseNav && (
                <ShowHistory history={3}/>
            )}
            </div>
            <div ref={blockMainRef} className="Block_main Block_bg_main" style={{height: minHeight}}>
                <div ref={blockHoldRef} className="Block_hold">
                    <div className="drag-indicator"></div>
                </div>

                <div className="tabs-container">
                    <div className="tabs">
                        <div
                            className={`tab ${
                                activeTab === "Token" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("Token")}
                        >
                            Token
                        </div>
                        <div
                            className={`tab ${
                                activeTab === "NFT" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("NFT")}
                        >
                            NFT
                        </div>
                    </div>
                    <div
                        className={`underline ${
                            activeTab === "Token" ? "left" : "right"
                        }`}
                    ></div>
                </div>

                <div className="Block_main_body">
                    {activeTab === "Token" && (
                        <List
                            ref={listRef}
                            height={ isBlockOpen ? 600 : 400}
                            itemCount={Math.ceil(extendedList.length / 2)}
                            itemSize={itemHeight}
                            width={"100%"}
                            outerRef={outerRef}
                        >
                            {ListRow}
                        </List>
                    )}

                    {activeTab === "NFT" && (
                        <BlockNFT
                            list={[
                                {
                                    image: imageNFT1,
                                    name: "Distant Galaxy",
                                    avatar: imageAvatar1,
                                    artist: "Animakid",
                                },
                                {
                                    image: imageNFT2,
                                    name: "Distant Galaxy",
                                    avatar: imageAvatar1,
                                    artist: "Animakid",
                                },
                                {
                                    image: imageNFT1,
                                    name: "Distant Galaxy",
                                    avatar: imageAvatar1,
                                    artist: "Animakid",
                                },
                                {
                                    image: imageNFT2,
                                    name: "Distant Galaxy",
                                    avatar: imageAvatar1,
                                    artist: "Animakid",
                                },
                                {
                                    image: imageNFT1,
                                    name: "Distant Galaxy",
                                    avatar: imageAvatar1,
                                    artist: "Animakid",
                                },
                                {
                                    image: imageNFT2,
                                    name: "Distant Galaxy",
                                    avatar: imageAvatar1,
                                    artist: "Animakid",
                                },
                                {
                                    image: imageNFT1,
                                    name: "Distant Galaxy",
                                    avatar: imageAvatar1,
                                    artist: "Animakid",
                                },
                                {
                                    image: imageNFT2,
                                    name: "Distant Galaxy",
                                    avatar: imageAvatar1,
                                    artist: "Animakid",
                                },
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowIsToken;