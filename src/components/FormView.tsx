import React, { useState } from "react";

const FormView = () => {
    const [meAddress, setMeAddress] = useState("");
    const [battingPrize, setBattingPrize] = useState("");
    const [WithAddress, setWithAddress] = useState("");
    const [youAddress, setYouAddress] = useState("");

    const inputStyle = "w-52 h-6 border-2";
    const labelStyle = "h-6 flex items-center";

    return (
        <form className="w-full flex flex-col justify-center items-center p-8">
            <div className={labelStyle}>
                <span className="w-20">Me</span>
                <input
                    className={inputStyle}
                    type="text"
                    readOnly
                    value={meAddress}
                    onChange={(e) => setMeAddress(e.target.value)}
                />
            </div>
            <br />

            <div className={labelStyle}>
                <span className="w-20">Batting</span>
                <input
                    className={inputStyle}
                    type="text"
                    value={battingPrize}
                    onChange={(e) => setBattingPrize(e.target.value)}
                />
            </div>
            <br />

            <div className={labelStyle}>
                <span className="w-20">Withness</span>
                <input
                    className={inputStyle}
                    type="text"
                    value={WithAddress}
                    onChange={(e) => setWithAddress(e.target.value)}
                />
            </div>
            <br />

            <div className={labelStyle}>
                <span className="w-20">You</span>
                <input
                    className={inputStyle}
                    type="text"
                    value={youAddress}
                    onChange={(e) => setYouAddress(e.target.value)}
                />
            </div>
            <br />

            <div className="flex justify-center border-solid border-2 p-4 hover:">
                <button type="submit">Generate</button>
            </div>
        </form>
    );
};

export default FormView;
