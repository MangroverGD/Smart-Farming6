import { Component, useEffect, useState } from "react";

import { Crop } from "./Crop";
import { Disease } from "./Disease";

import '../CSS/Prediction.css';
import { useSearchParams } from "react-router-dom";
import { Yield } from "./Yield";

export const Prediction = () => {

    const [p, setP] = useSearchParams();

    console.log(p);

    const [predict, setPredict] = useState(p.get("p") ? parseInt(p.get("p")) : 0);

    const handleButtonClick = (e, q) => {
        setP({ p: q });
        setPredict(q);
    }

    useEffect(() => {
        
    }, [p.get("p")]);

    return <div className="predict">
        <div className="toggle">
            <button onClick={(e) => handleButtonClick(e, 0)} className={`${predict === 0 ? "underline-effect" : ""}`}>
                {/* <span> */}
                    Disease Prediction
                {/* </span> */}
            </button>
            <button onClick={(e) => handleButtonClick(e, 1)} className={`${predict === 1 ? "underline-effect" : ""}`}>
                {/* <span> */}
                    Crop Prediction
                {/* </span> */}
            </button>
            <button onClick={(e) => handleButtonClick(e, 2)} className={`${predict === 2 ? "underline-effect" : ""}`}>
                {/* <span> */}
                    Yield Prediction
                {/* </span> */}
            </button>
        </div>
        {predict === 0 && <Disease />}
        {predict === 1 && <Crop />}
        {predict === 2 && <Yield />}
    </div>
}