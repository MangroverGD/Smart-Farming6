import { predict_crop } from "../Api/Api";

export const CropForm = ({ form, setForm, setPrediction }) => {

    const handleChange = (e) => {
        setForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        window.scrollTo({
            top: window.innerHeight/10,
            behavior: "smooth"
        });

        //! hit api endpoint
        try {
            const res = await predict_crop(form);
            if (res.status === 200) {
                console.log(res.data.predicted_crop);
                setPrediction(res.data.predicted_crop);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return <>
        <form action="" className="crop-form" onSubmit={e => handleSubmit(e)}>
            <h1>
                Find out the best planting strategy
            </h1>
            <h3>
                Enter the soil details below and our smart farming model will ???
            </h3>
            <div className="form-cell">
                <div>
                    <label htmlFor="" className="label-mod">Nitrogen (kg/ha)</label>
                    <input type="text" onChange={(e) => handleChange(e)} value={form.Nitrogen} name="Nitrogen" className="input-mod" />
                </div>

                <div>
                    <label htmlFor="" className="label-mod">Phosphorus (kg/ha)</label>
                    <input type="text" onChange={(e) => handleChange(e)} value={form.Phosphorus} name="Phosphorus" className="input-mod" />
                </div>
            </div>

            <div className="form-cell">
                <div>
                    <label htmlFor="" className="label-mod">Potassium (kg/ha)</label>
                    <input type="text" onChange={(e) => handleChange(e)} value={form.Potassium} name="Potassium" className="input-mod" />
                </div>

                <div>
                    <label htmlFor="" className="label-mod">Temperature (&#176;C)</label>
                    <input type="text" onChange={(e) => handleChange(e)} value={form.Temperature} name="Temperature" className="input-mod" />
                </div>
            </div>

            <div className="form-cell">
                <div>
                    <label htmlFor="" className="label-mod">Humidity (%)</label>
                    <input type="text" onChange={(e) => handleChange(e)} value={form.Humidity} name="Humidity" className="input-mod" />
                </div>

                <div>
                    <label htmlFor="" className="label-mod">pH Value</label>
                    <input type="text" onChange={(e) => handleChange(e)} value={form.pH_Value} name="pH_Value" className="input-mod" />
                </div>
            </div>

            <div className="cell-2">
                <label htmlFor="" className="label-mod">Rainfall (mm)</label>
                <input type="text" onChange={(e) => handleChange(e)} value={form.Rainfall} name="Rainfall" className="input-mod" />
            </div>

            <div className="btn-container">
                <button className="form-btn" type="submit">
                    Submit
                </button>
                <button className="form-btn" type="reset">
                    Clear
                </button>
            </div>
        </form>
    </>
}