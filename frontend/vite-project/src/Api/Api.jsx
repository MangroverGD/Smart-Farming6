import axios from 'axios';

const base = "http://127.0.0.1:5000/predict";
const rag = "http://127.0.0.1:5000/rag";

export const predict_crop = (data) => {
    return axios.post(`${base}/crop`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export const predict_disease = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${base}/disease`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
}

export const predict_yeild = (data) => {
    return axios.post(`${base}/predict/yield/`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export const rag_pdf = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${rag}/pdf_upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const rag_query = (q) => {
    const data = new URLSearchParams();
    data.append("query", q);

    return axios.post(`${rag}/query`, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}