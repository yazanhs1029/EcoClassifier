"use client";
import { useState } from "react";

export default function Home() {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [selectedImgData, setSelectedImgData] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      setSelectedImg(file);
      setSelectedImgData(URL.createObjectURL(file));
    } else {
      alert("Please select an image in JPG or PNG format.");
    }
  };

  const handleClear = () => {
    setSelectedImg(null);
    setSelectedImgData(null);
    setPredictionResult(null);
    const input = document.getElementById("realFileInput") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleUploadClick = () => {
    const input = document.getElementById("realFileInput") as HTMLInputElement;
    input?.click();
  };

  const sendData = () => {
    if (!selectedImg) return;

    const formData = new FormData();
    formData.append("image", selectedImg);

    fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setPredictionResult(data.prediction);
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("An error occurred while sending the image. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 flex flex-col items-center justify-center px-2 py-6">
      <h1 className="text-white text-4xl font-extrabold mb-8 drop-shadow-lg">
        Organic / Non-Organic Classifier
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg flex flex-col items-center space-y-6">
        <div className="border-4 border-indigo-300 rounded-2xl w-full h-56 flex items-center justify-center bg-indigo-50 overflow-hidden">
          {selectedImgData ? (
            <img
              src={selectedImgData}
              alt="Selected"
              className="max-h-full max-w-full object-contain rounded-xl shadow-md"
            />
          ) : (
            <p className="text-indigo-400 text-lg select-none">
              No image selected
            </p>
          )}
        </div>

        {selectedImg && (
          <div className="text-indigo-700 w-full px-4">
            <p className="font-semibold">📁 Name: {selectedImg.name}</p>
            <p>📏 Size: {(selectedImg.size / 1024).toFixed(2)} KB</p>
            <p>🧾 Type: {selectedImg.type}</p>
          </div>
        )}

        <div className="flex gap-6 w-full justify-center">
          <input
            type="file"
            id="realFileInput"
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />

          <button
            onClick={handleUploadClick}
            className="bg-amber-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-amber-600 active:scale-95 transition-transform"
          >
            Upload
          </button>

          <button
            onClick={handleClear}
            disabled={!selectedImg && !predictionResult}
            className="bg-red-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-red-600 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>

        <button
          onClick={sendData}
          disabled={!selectedImg || !!predictionResult}
          className={`mt-8 w-[360px] bg-blue-900 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-800 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Predict
        </button>
      </div>

      {predictionResult && (
        <div className="mt-8 bg-indigo-100 text-indigo-900 rounded-xl p-6 w-full max-w-lg text-center font-semibold text-xl shadow-inner">
          Prediction Result: {predictionResult}
        </div>
      )}
    </div>
  );
}
