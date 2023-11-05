from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io
import uvicorn
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
# Define CORS policies
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/hello/{name}')
def hello_name(name: str):
    return f'Hello {name}!'


@app.post('/upload/image/')
async def upload_image(image: UploadFile):
    image_bytes = await image.read()
    img = Image.open(io.BytesIO(image_bytes)).convert('L')
    img.show()
    return {"data": "whatever"}

@app.post('/update_timestamp')
async def update_timestamp(data: dict):
    # Process the data as needed
    # You can save it to a database or perform any other desired actions
    print(data)

    # Create a response with a JSON message
    response = {"message": "Timestamp received and processed"}

    # Return the response with appropriate CORS headers
    return response



# Run the FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
