# EcoClassifier
A **real-time image classification system** built with a **React (TypeScript)** frontend and a **FastAPI + TensorFlow** backend.  
Objects **inside the images** are analyzed and classified as **Organic** or **Non-Organic** using a **Convolutional Neural Network (CNN)** trained on labeled datasets.  
The model handles **preprocessing, feature extraction, and prediction**, enabling fast and accurate inference through the **`/predict` API endpoint**.

#### Check the Interface
https://eco-classifier.vercel.app/

## ⚙️ Technologies & Languages

### Back-End
- **Python**
- **FastAPI** (API framework)
- **TensorFlow / Keras** (Deep learning model)
- **OpenCV (cv2)** (Image processing)
- **NumPy** (Array & tensor handling)
- **scikit-learn** (Label encoding)

### Front-End
- **React**
- **TypeScript**
- **Tailwind CSS**

### Model
- **Convolutional Neural Network (CNN)**
  - Input Shape: **128×128×3**
  - Activations: **ReLU**, **Sigmoid**
 
## 💡 How It Works

1. The user uploads an image from the frontend interface.
2. The selected file is previewed before sending.
3. When the user clicks **Predict**, the image is sent to the backend through the `/predict` endpoint.
4. The backend:
   - Reads and decodes the image using **OpenCV (cv2)**
   - Resizes it to **128×128**
   - Normalizes pixel values
   - Passes it to the **trained CNN model**
5. The model predicts whether the object in the image is **Organic** or **Non-Organic**.
6. The result is returned as JSON and displayed in the frontend UI.

---

## 🚀 How to Run the Project

### ✅ 1. Activate the Back-End Virtual Environment

Navigate to your project folder and activate the virtual environment:

```bash
Garbage_Classification\Scripts\activate
```
### ✅ 2. Activate the server
```bash
uvicorn predict:app --reload
```
### ✅ 3. Start the Front-End (React)
Navigate to **Object_Classification_Frontend/object_classification_frontend/Page.tsx** and run:
```bash
npm run dev
```



