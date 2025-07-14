# Image_Recognition_Model.py

import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

# Load pre-trained CNN model (make sure the path is correct)
model = tf.keras.models.load_model('models/produce_quality_cnn.h5')
labels = ['Low', 'Medium', 'High']  # Quality categories

def assess_quality(img_path):
    """Return quality score for uploaded crop image."""
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)[0]
    label_index = np.argmax(predictions)
    return labels[label_index]

# INPUT FORMAT
# quality = assess_quality("uploads/tomato_1.jpg")
# print(f"Crop Quality: {quality}")
