import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "../../../hooks/auth/useSignIn.hook";
import { IoInformationCircleSharp, IoEyeOff, IoEye } from "react-icons/io5";

const SignInAuthComponent = () => {
    const { fields, setField, errorMessages, handleSignIn } = useSignIn();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    return (
        <>
            <div className="w-full max-w-100 border rounded-lg border-separator shadow-card">
                <div className="bg-surface p-5 sm:p-10 flex flex-col gap-6 border-b rounded-lg border-separator">
                    <div className="flex flex-col items-center">
                        <img
                            src="/images/site_logo_w5_black.svg"
                            alt="Profile X Logo"
                            className="w-12 h-12 mb-4"
                        />
                        <h2 className="text-t-primary text-lg font-semibold">
                            Sign in to Profile X
                        </h2>
                        <p className="text-t-secondary text-sm ">
                            Welcome Back! Please sign in to continue.
                        </p>
                    </div>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSignIn}
                    >
                        {errorMessages.form ? (
                            <div className="flex justify-center items-center gap-0.5 text-xs text-accent-red">
                                <IoInformationCircleSharp />
                                <span>{errorMessages.form}</span>
                            </div>
                        ) : null}

                        <div className="flex flex-col gap-0.5">
                            <p className="text-t-primary text-sm">Email</p>
                            <input
                                name="email"
                                type="text"
                                autoComplete="email"
                                className="h-9 w-full tracking-wide text-sm border rounded-md border-separator text-t-primary px-4 focus:outline-none focus:border-primaryS"
                                placeholder="Enter your email."
                                value={fields.email}
                                onChange={(e) => setField.email(e.target.value)}
                                required
                            />

                            {errorMessages.email ? (
                                <div className="flex items-center gap-0.5 text-xs text-accent-red">
                                    <IoInformationCircleSharp />
                                    <span>{errorMessages.email}</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <p className="text-t-primary text-sm">Password</p>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="password"
                                    className="h-9 w-full tracking-wide text-sm border rounded-md border-separator text-t-primary px-4 focus:outline-none focus:border-primaryS"
                                    placeholder="Enter your password."
                                    value={fields.password}
                                    onChange={(e) =>
                                        setField.password(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-t-secondary"
                                >
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>&nbsp;</p>
                            <button
                                name="sign-in"
                                type="submit"
                                className="h-9 bg-primary rounded-md font-medium text-t-onAccent hover:bg-primaryS hover:cursor-pointer"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                <div className="h-12 flex flex-col items-center justify-evenly">
                    <div className="flex gap-2 text-sm">
                        <span className="text-t-secondary">
                            Don't have an account?
                        </span>
                        <span
                            className="text-primary font-semibold hover:underline hover:cursor-pointer"
                            onClick={() => navigate("/auth/sign-up")}
                        >
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignInAuthComponent;
