from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.runnables import RunnableParallel, RunnableLambda, RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import os

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

async def get_answer(query: str, vector_store):
    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 2}
    )

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        google_api_key=""
    )

    prompt = PromptTemplate(
        template="""
You are a helpful assistant.
Answer only from the provided transcript context.
If the context is insufficient, just say "I don't know."

Context:
{context}

Question: {question}
""",
        input_variables=['context', 'question']
    )

    chain = RunnableParallel({
        'context': retriever | RunnableLambda(format_docs),
        'question': RunnablePassthrough()
    })

    parser = StrOutputParser()
    main_chain = chain | prompt | llm | parser

    return main_chain.invoke(query)
