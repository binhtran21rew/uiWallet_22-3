import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    generateWallets,
    generateAssets,
} from "../../../component/generateWallet";

import {
    iconArrowDown,
    iconWallet,
    linkShowWallet,
    iconArrowUp,
} from "../../../constant";

import { addWalletData } from "../../../context/slice/updateWallet";

import "./blockWallet.scss";
import FilterDropDown from "../filterDropDown/FilterDropDown";

function BlockWallet({ ...props }) {
    const { data } = props;
    const dispatch = useDispatch();

    var walletSelector = useSelector((state) => state.wallet);

    const [coldWallet, setColdWallet] = useState(
        generateWallets(data.typeWallet)
    );

    

    const [assets, setAssets] = useState(generateAssets(data.transaction));
    const [isOpen, setIsOpen] = useState(false);
    const [changeIdWallet, setChangeIdWallet] = useState(0);

    useEffect(() => {
        const form = {
            name: data.name,
            addressWallet: data.address,
            coldWallet: coldWallet,
            assets: assets,
        };

        if (walletSelector.data.length === 0) {
            dispatch(addWalletData(form));
        }
    }, [data]);

    return (
        walletSelector.data[0] && (
            <div className="BlockWallet">
                <div className="BlockWallet_wrapper row flex-column justify-content-evenly h-100 m-2">
                    <div className="BlockWallet_top col h-100 d-flex flex-column justify-content-evenly">
                        <div className="BlockWallet_name d-flex flex-column">
                            <span className="text-uppercase ">name</span>
                            <span className="text-capitalize  pt-2">
                                {walletSelector.data[0].name}
                            </span>
                        </div>
                        <div className="BlockWallet_address d-flex flex-column w-25">
                            <span className="text-uppercase ">address</span>
                            <span className="text-capitalize  pt-3">
                                {walletSelector.data[0].addressWallet}
                            </span>
                        </div>
                    </div>
                    <div className="BlockWallet_bottom col d-flex flex-column justify-content-evenly">
                        <div className="BlockWallet_wallet row d-flex">
                            <div className="col-7 d-flex align-items-center">
                                <div className="me-2">
                                    <svg
                                        width="20"
                                        height="18"
                                        viewBox="0 0 20 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17.5781 7.03125C16.2855 7.03125 15.2344 8.08238 15.2344 9.375C15.2344 10.6676 16.2855 11.7188 17.5781 11.7188H20V7.03125H17.5781ZM12.3047 9.96094C12.3047 8.34559 10.9904 7.03125 9.375 7.03125C7.75965 7.03125 6.44531 8.34559 6.44531 9.96094V11.7188H5.27344V17.5781H13.4766V11.7188H12.3047V9.96094ZM7.61719 9.96094C7.61719 8.99164 8.4057 8.20312 9.375 8.20312C10.3443 8.20312 11.1328 8.99164 11.1328 9.96094V11.7188H7.61719V9.96094ZM11.1328 15.2344H7.61719V14.0625H11.1328V15.2344ZM1.17188 2.34375H16.4062V0H1.17188C0.524648 0 0 0.524648 0 1.17188C0 1.81902 0.524648 2.34375 1.17188 2.34375ZM14.6484 11.3112V16.4062H18.75V12.8906H17.5781C16.3551 12.8906 15.2784 12.2614 14.6484 11.3112Z"
                                            fill="white"
                                            fillOpacity={0.88}
                                        />
                                        <path
                                            d="M17.5781 5.85938H18.75V3.51563H1.17188C0.743086 3.51563 0.346094 3.39153 0 3.18969V14.6484C0 15.6177 0.788516 16.4062 1.75781 16.4062H4.10156V10.5469H5.27344V9.96094C5.27344 7.69957 7.11363 5.85938 9.375 5.85938C11.6364 5.85938 13.4766 7.69957 13.4766 9.96094V10.5469H14.2785C14.1472 10.1785 14.0625 9.78793 14.0625 9.375C14.0625 7.43637 15.6395 5.85938 17.5781 5.85938Z"
                                            fill="white"
                                            fillOpacity={0.88}
                                        />
                                    </svg>
                                </div>

                                <span>cold wallet</span>
                            </div>
                            <Link
                                to={linkShowWallet}
                                state={{ isWallet: false, idWallet: changeIdWallet }}
                                className="col-5"
                            >
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="me-1">{iconWallet}</div>
                                    <span className="fs-6">
                                        {
                                            walletSelector.data[0].coldWallet[0]
                                                .totalWallet
                                        }
                                    </span>

                                    <div className="d-flex align-items-center">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.33469 8L6.512 5.17732C6.24268 4.90799 6.24268 4.47132 6.512 4.202C6.78133 3.93267 7.218 3.93267 7.48732 4.202L10.7977 7.51234C11.067 7.78167 11.067 8.21833 10.7977 8.48766L7.48732 11.798C7.218 12.0673 6.78133 12.0673 6.512 11.798C6.24268 11.5287 6.24268 11.092 6.512 10.8227L9.33469 8Z"
                                                fill="white"
                                                fillOpacity={0.88}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="BlockWallet_section row d-flex">
                            <div
                                className=" col-7 d-flex align-items-center"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <div className="me-2">{iconWallet}</div>
                                <div className="BlockWallet_box d-flex align-items-center">
                                    <span className="me-2">
                                        {
                                            walletSelector.data[0].assets[
                                                changeIdWallet
                                            ].name
                                        }
                                    </span>
                                    {isOpen ? iconArrowUp : iconArrowDown}

                                    <FilterDropDown
                                        isOpen={isOpen}
                                        list={walletSelector.data[0].assets}
                                        onClick={setChangeIdWallet}
                                    />
                                </div>
                            </div>
                            <Link
                                to={linkShowWallet}
                                state={{ isWallet: true, idWallet: changeIdWallet }}
                                className="col-5 d-flex"
                            >
                                <div className="d-flex align-items-center">
                                    <span className="fs-6">
                                        {
                                            walletSelector.data[0].assets[
                                                changeIdWallet
                                            ].quantity
                                        }
                                    </span>
                                    <div className="d-flex align-items-center">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.33469 8L6.512 5.17732C6.24268 4.90799 6.24268 4.47132 6.512 4.202C6.78133 3.93267 7.218 3.93267 7.48732 4.202L10.7977 7.51234C11.067 7.78167 11.067 8.21833 10.7977 8.48766L7.48732 11.798C7.218 12.0673 6.78133 12.0673 6.512 11.798C6.24268 11.5287 6.24268 11.092 6.512 10.8227L9.33469 8Z"
                                                fill="white"
                                                fillOpacity={0.88}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default BlockWallet;
