from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os

# Import from rag package
from rag.loader import process_pdf, get_vectorstore
from rag.retriever import get_answer

app = FastAPI()
load_dotenv()

@app.post("/pdf_upload/")
async def pdf_upload(file: UploadFile = File(...)):
    file_path = f"data/{file.filename}"
    os.makedirs("data", exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    await process_pdf(file_path)
    return {"message": f"{file.filename} uploaded and processed."}

@app.post("/query/")
async def question(query: str = Form(...)):
    vector_store = get_vectorstore()
    if vector_store is None:
        return JSONResponse(content={"error": "Upload PDF first"}, status_code=400)

    result = await get_answer(query, vector_store)
    return {"answer": result}
