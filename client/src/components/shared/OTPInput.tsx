/**
 * OTP Input Component
 *
 * Originally by: Stephen Gbolagade
 * Source: https://dev.to/stephengade/build-otp-input-field-in-react-no-package-needed-4n65
 * Accessed: August 26, 2025
 *
 * Modified for use in this project.
 */

import { useRef, useState } from "react";

type IOTPInputComponentProps = {
    length: number;
    onComplete: (pin: string) => void;
};

const OTPInputComponent: React.FC<IOTPInputComponentProps> = (props) => {
    const inputRef = useRef<HTMLInputElement[]>([]);
    const [OTP, setOTP] = useState<string[]>(Array(props.length).fill(""));

    const handleChange = (value: string, index: number) => {
        const newOTP = [...OTP];
        newOTP[index] = value;
        setOTP(newOTP);

        if (value && index < props.length - 1) {
            inputRef.current[index + 1]?.focus();
        }

        if (newOTP.every((digit) => digit !== "")) {
            props.onComplete(newOTP.join(""));
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            const newOTP = [...OTP];

            if (OTP[index]) {
                newOTP[index] = "";
                setOTP(newOTP);
            } else if (index > 0) {
                inputRef.current[index - 1]?.focus();
                newOTP[index - 1] = "";
                setOTP(newOTP);
            }
        }
    };

    return (
        <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: props.length }, (_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={OTP[index]}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(ref) => {
                        inputRef.current[index] = ref as HTMLInputElement;
                    }}
                    className="h-9 w-full border border-solid border-separator focus:border-primaryS text-sm text-center outline-none"
                />
            ))}
        </div>
    );
};

export default OTPInputComponent;
