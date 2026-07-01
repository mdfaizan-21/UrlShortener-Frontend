import React, { useState } from 'react'
import { useStoreContext } from '../../contextApi/ContextApi';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api';
import toast from 'react-hot-toast';

const CreateNewShorten = ({ setOpen, refetch }) => {
    const { token } = useStoreContext();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            originalUrl: "",
        },
        mode: "onTouched",
    });

    const createShortUrlHandler = async (data) => {
        setLoading(true);
        try {
            const { data: res } = await api.post("/api/urls/shorten", data, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });

            const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${res.shortUrl}`}`;
            navigator.clipboard.writeText(shortenUrl).then(() => {
                toast.success("Short URL Copied to Clipboard", {
                    position: "bottom-center",
                    className: "mb-5 text-sm",
                    duration: 3000,
                });
            });

            // await refetch();
            reset();
            setOpen(false);
        } catch (error) {
            toast.error("Create ShortURL Failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center w-full h-full relative z-10">
            <form
                onSubmit={handleSubmit(createShortUrlHandler)}
                className="sm:w-[450px] w-[360px] relative glass-panel pt-8 pb-6 sm:px-8 px-4 rounded-2xl overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-400/10 z-0 pointer-events-none"></div>

                <div className="relative z-10">
                    <h1 className="font-bold sm:text-2xl text-[22px] text-white tracking-tight text-center mb-6">
                        Create New Short URL
                    </h1>

                    <div>
                        <TextField
                            label="Enter Long URL"
                            required
                            id="originalUrl"
                            placeholder="https://example.com/very-long-url"
                            type="url"
                            message="Url is required"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <button
                        className="bg-white text-black font-semibold w-full py-3 hover:bg-gray-200 transition-colors rounded-xl mt-6 cursor-pointer disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Shorten URL"}
                    </button>

                    {!loading && (
                        <Tooltip title="Close">
                            <button
                                disabled={loading}
                                onClick={() => setOpen(false)}
                                className="absolute right-0 -top-2 hover:bg-white/10 p-1 rounded-full transition-colors"
                            >
                                <RxCross2 className="text-gray-400 text-2xl" />
                            </button>
                        </Tooltip>
                    )}
                </div>
            </form>
        </div>
    )
}

export default CreateNewShorten