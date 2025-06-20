import { useNavigate } from "react-router-dom";
import useEditBio from "../../../hooks/profile/useEditBio.hook";
import { IoInformationCircleSharp } from "react-icons/io5";

const EditBioProfileComponent = () => {
    const { bio, setBio, errorMessages, handleUpdateBio } = useEditBio();

    const navigate = useNavigate();

    return (
        <>
            <div className="w-full max-w-100 border rounded-lg border-separator shadow-card">
                <div className="bg-surface p-5 sm:p-10 flex flex-col gap-6 border-b rounded-lg border-separator">
                    <div className="flex flex-col items-center">
                        <h2 className="text-t-primary text-lg font-semibold">
                            Update your bio.
                        </h2>
                        <p className="text-t-secondary text-sm ">
                            Note: Bio cannot be empty or whitespaces.
                        </p>
                    </div>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            handleUpdateBio(e);
                        }}
                    >
                        {errorMessages.form ? (
                            <div className="flex justify-center items-center gap-0.5 text-xs text-accent-red">
                                <IoInformationCircleSharp />
                                <span>{errorMessages.form}</span>
                            </div>
                        ) : null}

                        <div className="flex flex-col gap-0.5">
                            <p className="text-t-primary text-sm">Bio</p>
                            <textarea
                                name="bio"
                                className="h-50 w-full tracking-wide text-sm border rounded-md border-separator text-t-primary p-2 px-4 focus:outline-none focus:border-primaryS"
                                placeholder="Enter your bio."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p>&nbsp;</p>
                            <button
                                name="sign-in"
                                type="submit"
                                className="h-9 bg-primary rounded-md font-medium text-t-onAccent hover:bg-primaryS hover:cursor-pointer"
                            >
                                Update Bio
                            </button>
                        </div>
                    </form>
                </div>
                <div className="h-12 flex flex-col items-center justify-evenly">
                    <div className="flex gap-2 text-sm">
                        <span className="text-t-secondary">
                            Don't want to update?
                        </span>
                        <span
                            className="text-primary font-semibold hover:underline hover:cursor-pointer"
                            onClick={() => navigate("/profile")}
                        >
                            Cancel Process
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditBioProfileComponent;
