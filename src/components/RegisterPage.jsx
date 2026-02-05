import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

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

    const registerHandler = async (data) => {
        setLoader(true);

        try {
            const { data: response } = await api.post(
                "/api/auth/public/register",
                data
            );
            toast.success("Registeration Successful!")
            reset();
            navigate("/login");
        } catch (error) {
            toast.error("Registeration Failed!")
        } finally {
            setLoader(false);
        }
    };

    return (
        <div
            className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
            <form onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4 rounded-md">
                <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
                    Register Here
                </h1>

                <hr className='mt-2 mb-5 text-blue-500' />

                <div className="flex flex-col gap-3">
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
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Type your email"
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
                    className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                    {loader ? "Loading..." : "Register"}
                </button>

                {loader && (
                    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
                        <div className="bg-white p-10 rounded-md shadow-lg flex flex-col justify-center items-center gap-4">
                            <h1 className="text-red-500 text-2xl font-bold">Please Wait!</h1>
                            <p className="text-slate-800 font-semibold text-lg text-center max-w-xs">
                                Our backend server is on free tier, so it takes 1-2 min to wake up.
                            </p>
                        </div>
                    </div>
                )}

                <p className='text-center text-sm text-slate-700 mt-6'>
                    Already have an account?
                    <Link
                        className='font-semibold underline hover:text-black'
                        to="/login">
                        <span className='text-btnColor'> Login</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage