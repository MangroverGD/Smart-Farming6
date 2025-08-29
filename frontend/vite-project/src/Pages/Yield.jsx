import { useState } from "react";
import { predict_yeild } from "../Api/Api"

import '../CSS/Yield.css'

export const Yield = () => {

    const [formData, setFormData] = useState({
        rainfall_mm: "",
        soil_quality_index: "",
        farm_size_hectares: "",
        sunlight_hours: "",
        fertilizer_kg: ""
    });

    const [predict, setPredict] = useState("");

    const handleChange = (e) => {
        setFormData(prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await predict_yeild(formData);
            if (res.status === 200) {
                console.log(res);
                setPredict(res.data.prediction_crop);
            }
            else {
                console.log("Something went wrong with yield prediction")
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return <>
        <form action="" onSubmit={e => handleSubmit(e)} className="yield-form">
            <label htmlFor="rainfall_mm">Rainfall (mm)</label>
            <input type="text" name="rainfall_mm" id="rainfall_mm" onChange={e => handleChange(e)} value={formData.rainfall_mm} />

            <label htmlFor="soil_quality_index">Soil Quality Index</label>
            <input type="text" name="soil_quality_index" id="soil_quality_index" onChange={e => handleChange(e)} value={formData.soil_quality_index} />

            <label htmlFor="farm_size_hectares">Farm Size (hectares)</label>
            <input type="text" name="farm_size_hectares" id="farm_size_hectares" onChange={e => handleChange(e)} value={formData.farm_size_hectares} />

            <label htmlFor="sunlight_hours">Sunlight hours</label>
            <input type="text" name="sunlight_hours" id="sunlight_hours" onChange={e => handleChange(e)} value={formData.sunlight_hours} />

            <label htmlFor="fertilizer_kg">Fertilizer (kg)</label>
            <input type="text" name="fertilizer_kg" id="fertilizer_kg" onChange={e => handleChange(e)} value={formData.fertilizer_kg} />

            <button>
                Submit
            </button>
        </form>
        {
            predict && 
            <div className="yield-result">
                Result: {predict}
            </div>
        }
    </>
}