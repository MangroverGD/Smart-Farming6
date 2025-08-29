import { useState } from "react"
import { CropForm } from "../Components/CropForm";
import { CropResult } from "../Components/CropResult";

export const Crop = () => {

    const [form, setForm] = useState({
        Nitrogen: "",
        Phosphorus: "",
        Potassium: "",
        Temperature: "",
        Humidity: "",
        pH_Value: "",
        Rainfall: ""
    });

    const [prediction, setPrediction] = useState(null);

    return <>
        <CropForm form={form} setForm={setForm} setPrediction={setPrediction} />
        <div className="crop-result">
            {prediction !== null ? <CropResult prediction={prediction} /> : ""}
        </div>
    </>
}