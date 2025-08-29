from fastapi import FastAPI, UploadFile, File, Form, APIRouter
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os

# Import from rag package
from loader import process_pdf, get_vectorstore
from retriever import get_answer

router = APIRouter()
load_dotenv()

@router.get("/")
async def shit():
    return JSONResponse(content={"test":"shitfuck"}, status_code=200)

@router.post("/pdf_upload/")
async def pdf_upload(file: UploadFile = File(...)):
    file_path = f"data/{file.filename}"
    os.makedirs("data", exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    await process_pdf(file_path)
    return {"message": f"{file.filename} uploaded and processed."}

@router.post("/query/")
async def question(query: str = Form(...)):
    vector_store = get_vectorstore()
    if vector_store is None:
        return JSONResponse(content={"error": "Upload PDF first"}, status_code=400)

    result = await get_answer(query, vector_store)
    return {"answer": result}

