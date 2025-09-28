from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware  # ✅ جديد
import numpy as np
import cv2
from tensorflow.keras.models import load_model

# إنشاء تطبيق FastAPI
app = FastAPI()

# ✅ إضافة CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # أو ["http://localhost:3000"] إذا بدك تحدد فقط فرونت إندك
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# تحميل النموذج مرّة وحدة عند بدء السيرفر
model = load_model("garbage_classifier_model.h5")

# تعاريف التصنيف
answer_map = {
    0: "Organic",
    1: "Non_Organic",
}

# معالجة الصورة: Resize + Normalize + Convert to RGB
def preprocess_image(image_bytes):
    npimg = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (128, 128))
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_rgb = img_rgb / 255.0
    img_rgb = np.expand_dims(img_rgb, axis=0)
    return img_rgb

# الراوت اللي يستقبل الصورة ويرجع التوقع
@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    contents = await image.read()
    input_data = preprocess_image(contents)
    prediction = model.predict(input_data)[0][0]
    set_answer = 1 if prediction >= 0.5 else 0
    final_answer = answer_map.get(set_answer, "Unknown")
    return JSONResponse(content={"prediction": final_answer})
