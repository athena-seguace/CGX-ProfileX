import { useNavigate } from "react-router-dom";
import DiceBearAvatarComponent from "../../shared/DiceBearAvatar";
import useAuth from "../../../hooks/useAuth.hook";
import useSignOut from "../../../hooks/auth/useSignOut.hook";
import { FiEdit } from "react-icons/fi";
import LoadingComponent from "../../shared/Loading";
import React from "react";

const ViewProfileComponent = () => {
    const { isLoading, user } = useAuth();
    const { signOut } = useSignOut();

    const navigate = useNavigate();

    return (
        <>
            <div className="w-full max-w-150 border rounded-lg border-separator shadow-card mt-13">
                <div className="relative bg-surface flex flex-col items-center gap-8 rounded-lg border-b border-separator p-5 sm:p-10 pt-20 sm:pt-20">
                    {isLoading ? (
                        <>
                            <LoadingComponent msg="Loading Profile..." />
                        </>
                    ) : user ? (
                        <>
                            <div className="absolute -top-13 border border-separator p-2 rounded-full bg-gradient-to-br from-[#fdf0d5] via-[#e4c1f9] to-[#a9def9]">
                                <DiceBearAvatarComponent
                                    name={user?.name || ""}
                                    size={96}
                                />
                            </div>
                            <div className="text-center">
                                <h1 className="text-2xl text-t-primary">
                                    {user.name}
                                </h1>
                                <h2 className="text-md text-t-secondary">
                                    {user.email}
                                </h2>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <h4 className="text-t-primary text-lg flex gap-2 items-center">
                                    Bio{" "}
                                    <span
                                        className="text-sm hover:text-primary hover:cursor-pointer"
                                        onClick={() =>
                                            navigate("/profile/edit-bio")
                                        }
                                    >
                                        <FiEdit />
                                    </span>
                                </h4>
                                <p className="text-t-secondary text-sm p-2 px-4 border border-separator rounded-md">
                                    {!user.bio || user.bio === ""
                                        ? "Click the above pen button to add a bio."
                                        : user.bio
                                              .split("\n")
                                              .map((line, index) => (
                                                  <React.Fragment key={index}>
                                                      {line}
                                                      <br />
                                                  </React.Fragment>
                                              ))}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-t-primary">User not found</p>
                        </>
                    )}
                </div>
                <div className="flex h-12 items-center justify-between px-2 sm:px-4">
                    <p className="text-xs text-t-secondary">{user?.id}</p>
                    <button
                        name="sign-out"
                        className="h-8 w-16 text-xs bg-primary rounded-md text-t-onAccent hover:bg-primaryS hover:cursor-pointer"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    );
};

export default ViewProfileComponent;
