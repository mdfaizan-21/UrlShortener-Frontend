import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';
import toast from "react-hot-toast";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdTime }) => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState("");
    const [analyticsData, setAnalyticsData] = useState([]);

    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
    );

    const analyticsHandler = (shortUrl) => {
        if (!analyticToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticToggle(!analyticToggle);
    }

    const fetchMyShortUrl = async () => {
        setLoader(true);
        try {
            const { data } = await api.get(`/api/urls/analytics/${selectedUrl}?startDate=2026-01-01T00:00:00&endDate=2026-12-31T23:59:59`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setAnalyticsData(data);
            setSelectedUrl("");
        } catch (error) {
            navigate("/error");
        } finally {
            setLoader(false);
        }
    }


    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

    return (
        <div className={`glass-panel mb-6 px-6 sm:py-2 py-4 rounded-2xl transition-all duration-200 hover:bg-white/[0.04]`}>
            <div className={`flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-5 `}>
                <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden ">
                    <div className="text-white pb-1 sm:pb-0 flex items-center gap-2 ">
                        <Link
                            target='_'
                            className='text-[17px] font-semibold text-violet-400 hover:text-violet-300 transition-colors'
                            to={import.meta.env.VITE_REACT_FRONT_END_URL + "/" + `${shortUrl}`}>
                            {subDomain + "/" + `${shortUrl}`}
                        </Link>
                        <FaExternalLinkAlt className="text-violet-400 text-sm" />
                    </div>

                    <div className="flex items-center gap-1 ">
                        <h3 className=" text-gray-400 font-medium text-[16px] truncate max-w-lg">
                            {originalUrl}
                        </h3>
                    </div>

                    <div className="flex items-center gap-8 pt-6 ">
                        <div className="flex gap-1 items-center font-semibold text-emerald-400">
                            <span>
                                <MdOutlineAdsClick className="text-[22px] me-1" />
                            </span>
                            <span className="text-[16px]">{clickCount}</span>
                            <span className="text-[15px] ">
                                {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 font-medium text-[15px] text-gray-400">
                            <span>
                                <FaRegCalendarAlt />
                            </span>
                            <span>

                                {dayjs(createdTime).format("MMM DD, YYYY")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 sm:justify-end items-center gap-4">
                    <CopyToClipboard
                        onCopy={() => {
                            setIsCopied(true)
                            toast.success("Short URL Copied to Clipboard", {
                                position: "top-center",
                                className: "mb-5 text-sm",
                                duration: 3000,
                            });
                        }
                        }
                        text={`${import.meta.env.VITE_REACT_FRONT_END_URL + `/${shortUrl}`}`}
                    >
                        <div className="flex cursor-pointer gap-2 items-center bg-white/10 hover:bg-white/20 transition-colors py-2 px-6 rounded-xl text-white font-medium">
                            <button className="">{isCopied ? "Copied" : "Copy"}</button>
                            {isCopied ? (
                                <LiaCheckSolid className="text-lg" />
                            ) : (
                                <IoCopy className="text-lg" />
                            )}
                        </div>
                    </CopyToClipboard>

                    <div
                        onClick={() => analyticsHandler(shortUrl)}
                        className="flex cursor-pointer gap-2 items-center bg-violet-600 hover:bg-violet-500 transition-colors py-2 px-6 rounded-xl text-white font-medium"
                    >
                        <button className="cursor-pointer">Analytics</button>
                        <MdAnalytics className="text-lg cursor-pointer" />
                    </div>
                </div>
            </div>
            <React.Fragment>
                <div className={`${analyticToggle ? "flex" : "hidden"
                    } max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t border-white/10 w-[100%] overflow-hidden pt-6`}>
                    {loader ? (
                        <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
                            <div className="flex flex-col items-center gap-3">
                                <Hourglass
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="hourglass-loading"
                                    colors={['#8b5cf6', '#c084fc']}
                                />
                                <p className='text-gray-400 font-medium'>Fetching Data...</p>
                            </div>
                        </div>
                    ) : (
                        <>{analyticsData.length === 0 && (
                            <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                                <h1 className="text-white font-bold sm:text-2xl text-lg mb-2">
                                    No Data For This Time Period
                                </h1>
                                <h3 className="sm:w-96 w-[90%] text-center sm:text-base text-sm text-gray-400">
                                    Share your short link to view where your engagements are
                                    coming from.
                                </h3>
                            </div>
                        )}
                            <Graph graphData={analyticsData} />
                        </>
                    )}
                </div>
            </React.Fragment>
        </div>
    )
}

export default ShortenItem