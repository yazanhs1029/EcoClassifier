import os
import cv2
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from tf_keras.models import Sequential
from tf_keras.layers import Conv2D, MaxPooling2D, Activation, Dropout, Flatten, Dense
import numpy as np

Train_Data = r"D:\Work\datasets\Garbage_Classifation\DATASET\TRAIN"

data = []
labels = []

label_map = {
    "R": "Resycle",
    "O": "Organic"
}
R_Count=0
O_Count=0
max_images_per_folder = 2500

if os.path.exists(Train_Data):
    print(f"path name : {Train_Data} was found")
    
    for folder_name in os.listdir(Train_Data):
        print(f"Processing folder: {folder_name}")
        folder_path = os.path.join(Train_Data, folder_name)

        image_count = 0
        for file_name in os.listdir(folder_path):
            if image_count >= max_images_per_folder:
                break
            if file_name.lower().endswith(".jpg"):
                full_path = os.path.join(folder_path, file_name)
                img = cv2.imread(full_path)
                if img is not None:
                  img2 = cv2.resize(img, (128,128))
                  rgb_image = cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)
                  rgb_image = rgb_image / 255.0
                  data.append(rgb_image)
                  labels.append(label_map.get(folder_name, "unknown"))
                  image_count += 1

else:
    print(f"the path  {Train_Data} was NOT found")

print(f"Loaded {len(data)} images total.")
print(f"First image shape: {data[0].shape if data else 'No image loaded'}")

Model=Sequential([
Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)),
MaxPooling2D(2,2),
Conv2D(64,(3,3),activation='relu'),
MaxPooling2D(2,2),
Flatten(),
Dense(1,activation='sigmoid')
])
Model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(labels)

array=np.array(data)
Model.fit(array, encoded_labels, epochs=10, batch_size=5)

Model.save("garbage_classifier_model.h5")





    