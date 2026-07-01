import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';
const Login = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { setToken } = useStoreContext();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            toast.success("Login Successful!")
            localStorage.setItem("token", response.token);
            setToken(response.token);
            reset();
            navigate("/dashboard");
        } catch (error) {
            toast.error("Login Failed!")
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center relative z-10'>
            <form onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] glass-panel py-8 sm:px-8 px-4 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-400/10 z-0 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h1 className="text-center font-bold text-white text-3xl mb-2 tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-center text-gray-400 mb-8 text-sm">
                        Enter your credentials to access your account
                    </p>

                    <div className="flex flex-col gap-5">
                        <TextField
                            label="Username"
                            required
                            id="username"
                            type="text"
                            message="*Username is required"
                            placeholder="Type your username"
                            register={register}
                            errors={errors}
                        />

                        <TextField
                            label="Password"
                            required
                            id="password"
                            type="password"
                            message="*Password is required"
                            placeholder="Type your password"
                            register={register}
                            min={6}
                            errors={errors}
                        />
                    </div>

                    <button
                        disabled={loader}
                        type='submit'
                        className='w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200 my-6 disabled:opacity-50'>
                        {loader ? "Authenticating..." : "Sign in"}
                    </button>
                    
                    {loader && (
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#0A0A0A]/80 backdrop-blur-sm">
                            <div className="bg-[#111] border border-white/10 p-10 rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-4">
                                <span className="flex h-10 w-10 rounded-full bg-violet-500 animate-pulse mb-2"></span>
                                <h1 className="text-white text-2xl font-bold tracking-tight">Waking up server</h1>
                                <p className="text-gray-400 font-medium text-sm text-center max-w-xs leading-relaxed">
                                    Our backend is on a free tier and might take a minute to spin up. Hang tight!
                                </p>
                            </div>
                        </div>
                    )}

                    <p className='text-center text-sm text-gray-400'>
                        Don't have an account?
                        <Link
                            className='font-semibold text-white ml-2 hover:underline'
                            to="/register">
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login