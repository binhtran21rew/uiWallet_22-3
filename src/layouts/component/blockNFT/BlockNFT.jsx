import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./blockNFT.scss";
import { FixedSizeList as List } from "react-window";
import { Plus } from "lucide-react";

const BlockNFT = ({ list }) => {
    const listRef = useRef(null);
    const outerRef = useRef(null);
    const itemHeight = 300;
    const extendedList = [...list, { isAddNFT: true }];

    // Mouse state
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    // Touch & Mouse Events
    useEffect(() => {
        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartY(e.clientY);
            setScrollTop(outerRef.current.scrollTop);
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaY = e.clientY - startY;
            outerRef.current.scrollTop = scrollTop - deltaY; // Move based on drag
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        // Attach event listeners
        if (outerRef.current) {
            outerRef.current.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            if (outerRef.current) {
                outerRef.current.removeEventListener("mousedown", handleMouseDown);
            }
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, startY, scrollTop]);

    // Touch Swipe (Mobile)
    const handlers = useSwipeable({
        onSwipedUp: (eventData) => {
            outerRef.current.scrollBy({ top: itemHeight, behavior: "smooth" });
        },
        onSwipedDown: (eventData) => {
            outerRef.current.scrollBy({ top: -itemHeight, behavior: "smooth" });
        },
        trackMouse: true, // Enables swipe gestures with a mouse as well
    });

    const NFTRow = ({ index, style }) => {
        const startIndex = index * 2;
        const items = extendedList.slice(startIndex, startIndex + 2);

        return (
            <div className="row g-4" style={{ ...style, marginLeft: 0, marginRight: 0 }}>
                {items.map((item, id) => (
                    <div className="BlockNFT_wrapper col-6 d-flex justify-content-center" key={startIndex + id}>
                        {item.isAddNFT ? (
                            <div className="card shadow-lg rounded-4 overflow-hidden position-relative"
                                style={{ backgroundColor: "#e7e3f4", minWidth: "170px", height: "250px" }}>
                                <div className="card-body position-relative">
                                    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                                        <Plus size={40} className="text-secondary" />
                                        <span className="text-muted">Add NFT</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card rounded-4 overflow-hidden position-relative"
                                style={{ backgroundColor: "#e7e3f4", maxWidth: "250px" }}>
                                <img src={item.image} alt="NFT" className="card-img-top"
                                    style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px", height: "150px", objectFit: "cover" }} />
                                <div className="card-body position-relative">
                                    <h5 className="card-title fw-bold text-dark text-capitalize">{item.name}</h5>
                                    <div className="d-flex align-items-center mt-2">
                                        <img src={item.avatar} alt="Avatar" className="rounded-circle"
                                            style={{ width: "24px", height: "24px" }} />
                                        <span className="ms-2 text-secondary text-capitalize">{item.artist}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div
            className="BlockNFT container"
            style={{ height: "80vh", overflow: "hidden", cursor: isDragging ? "grabbing" : "grab" }}
        >
            <List
                ref={listRef}
                height={600}
                itemCount={Math.ceil(extendedList.length / 2)}
                itemSize={itemHeight}
                width={"100%"}
                outerRef={outerRef}
            >
                {NFTRow}
            </List>
        </div>
    );
};

export default BlockNFT;
