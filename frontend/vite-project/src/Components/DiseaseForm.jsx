import { useEffect, useRef, useState } from "react";
import { predict_disease } from "../Api/Api";

export const DiseaseForm = ({ setPredict }) => {

    const label = useRef(null);
    const input = useRef(null);

    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        console.log(e.target);
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setFile(file);
            console.log("Here");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await predict_disease(file);
            if (res.status === 200) {
                console.log(res.data.predicted_class);
                setPredict(res.data.predicted_class);
                window.scrollBy({
                    top: 150,
                    behavior: "smooth"
                })
            }
            else {
                console.log("Unexpected response:", res);
            }
        } catch (err) {
            console.log("Error details:", err);
            console.log("Response:", err.response); // This will show the CORS error details
        }
    }

    const handleKey = (e) => {
        if (e.key === "Enter") {
            input.current.click();
        }
    }

    return <>
        <h1 className="heading">
            Upload an image of the plant below
        </h1>
        <form action="" className="disease-form" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="upload-image" className="image-select" tabIndex={0} onKeyDown={e => handleKey(e)} >Select File</label>
            <input id="upload-image" type="file" name="" accept="image/*" onChange={e => handleChange(e)} className="hide-input" ref={input} />
            {image && 
            <button type="submit" className="submit-button">
                Submit
            </button>
            }
        </form>
        <img src={image} alt="Image preview" className="image" />
    </>
}