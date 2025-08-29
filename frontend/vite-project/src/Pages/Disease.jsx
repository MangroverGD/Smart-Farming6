import { useState } from "react"
import '../CSS/Disease.css'

import { DiseaseForm } from "../Components/DiseaseForm";

export const Disease = () => {

    const [form, setForm] = useState();
    const [predict, setPredict] = useState("");

    return <>
        <DiseaseForm form={form} setForm={setForm} setPredict={setPredict} />
        {predict && <div className="disease-result">
            Result: {predict}
        </div>}
    </>
}