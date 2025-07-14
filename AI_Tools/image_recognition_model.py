# image_recognition_model.py
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

model = load_model('produce_quality_model.h5')

def assess_quality(img_path):
    """
    img_path: Path to produce image
    """
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    categories = ['Low', 'Medium', 'High']
    return categories[np.argmax(prediction)]
