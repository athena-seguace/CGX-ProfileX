import React from "react";

interface IDiceBearAvatarComponentProps {
    name: string;
    size: number;
}

const DiceBearAvatarComponent: React.FC<IDiceBearAvatarComponentProps> = (
    props
) => {
    const getAvatarUrl = (name: string) => {
        if (!name || name.trim() === "") {
            return `https://api.dicebear.com/9.x/bottts/svg?seed=placeholder`;
        }

        const encodedSeed = encodeURIComponent(name.trim().toLowerCase());
        return `https://api.dicebear.com/9.x/bottts/svg?seed=${encodedSeed}`;
    };

    return (
        <img
            src={getAvatarUrl(props.name)}
            alt={props.name}
            width={props.size}
            height={props.size}
            className="rounded-full"
        />
    );
};

export default DiceBearAvatarComponent;
