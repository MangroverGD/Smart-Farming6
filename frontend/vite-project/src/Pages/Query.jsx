import { useState } from 'react'
import '../CSS/Query.css'

import { rag_pdf, rag_query } from '../Api/Api';

export const Query = () => {

    const [file, setFile] = useState(null);
    const [query, setQuery] = useState("");
    const [predict, setPredict] = useState("");

    const handleChange = (e) => {
        const f = e.target.files[0];
        if (f) {
            setFile(f);
            console.log(f);
        }
    }

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }

    const processQuery = async () => {
        try {
            const res = await rag_query(query);
            if (res.status === 200) {
                console.log(res);
                setPredict(res.data.answer);
            }
            else {
                console.log("Something is fishy here");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handlePDFSubmit = async (e) => {
        e.preventDefault();
        console.log(query);
        try {
            const pdf = await rag_pdf(file);
            if (pdf.status === 200) {
                processQuery();
            }
            else {
                console.log("Something is wrong in rag_pdf");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return <div className="query-container">
        <form action="" className='pdf-form' onSubmit={e => handlePDFSubmit(e)}>
            <div>
                <label htmlFor="pdf">Select PDF</label>
                <input type="file" accept='application/pdf' name="" id="pdf" className='hide-input' onChange={e => handleChange(e)} />
                {file && 
                    <span>{file.name}</span>
                }
            </div>
            <div>
                <label htmlFor="query">Enter your query:</label>
                <input type="text" id='query' onChange={e => handleQueryChange(e)} value={query} />
            </div>
            <div>
                {file && (query &&
                <button className='query-button'>
                    Submit
                </button>)
                }
            </div>
        </form>
        {
            predict && 
            <div className='query-result'>
                <p>
                    Result:
                </p>
                {predict}
            </div>
        }
    </div>
}