from flask import Flask, request, jsonify
# from flask_asgi import ASGIApp
from flask_socketio import SocketIO
from PIL import Image
import torch
import torch.nn as nn
from torchvision import transforms
import cv2
import numpy as np
import io
import base64
# from app import SimpleCNN

class SimpleCNN(nn.Module):
    def __init__(self, num_classes):
        super(SimpleCNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2)
        )
        self.classifier = nn.Sequential(
            nn.Linear(32 * 56 * 56, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = x.view(x.size(0), -1)
        x = self.classifier(x)
        return x


app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/')
def home():
    return "ML API is running!"


@app.route('/predict', methods=['POST'])
def predict():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        # Read the uploaded image
        img = Image.open(file.stream).convert("RGB")

        # Convert to grayscale
        img_gray = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)
        img_gray = Image.fromarray(img_gray)

        # Apply sharpening
        kernel = np.array([[-1, -1, -1],
                           [-1,  9, -1],
                           [-1, -1, -1]])
        img_sharpened = cv2.filter2D(np.array(img_gray), -1, kernel)
        img_sharpened = cv2.cvtColor(img_sharpened, cv2.COLOR_GRAY2RGB)  # Convert back to 3 channels
        img_sharpened = Image.fromarray(img_sharpened)

        # Transform the image to a tensor
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        img_tensor = transform(img_sharpened).unsqueeze(0)

        # Load the models
        cataracts_model = SimpleCNN(num_classes=2)
        cataracts_model.load_state_dict(torch.load("cataracts_model.pth"))
        cataracts_model.eval()

        uveitis_model = SimpleCNN(num_classes=2)
        uveitis_model.load_state_dict(torch.load("uveitis_model.pth"))
        uveitis_model.eval()

        with torch.no_grad():
            output_cataracts = cataracts_model(img_tensor)
            probabilities_cataracts = torch.nn.functional.softmax(output_cataracts, dim=1)
            _, pred_cataracts = torch.max(probabilities_cataracts, 1)
            cataracts_label = "Cataracts" if pred_cataracts.item() == 0 else "Normal"
            cataracts_confidence = probabilities_cataracts[0][pred_cataracts.item()].item()

        with torch.no_grad():
            output_uveitis = uveitis_model(img_tensor)
            probabilities_uveitis = torch.nn.functional.softmax(output_uveitis, dim=1)
            _, pred_uveitis = torch.max(probabilities_uveitis, 1)
            uveitis_label = "Uveitis" if pred_uveitis.item() == 1 else "Normal"
            uveitis_confidence = probabilities_uveitis[0][pred_uveitis.item()].item()

        return jsonify({
            "cataracts_prediction": {
                "label": cataracts_label,
                "confidence": round(cataracts_confidence * 100, 2)
            },
            "uveitis_prediction": {
                "label": uveitis_label,
                "confidence": round(uveitis_confidence * 100, 2) 
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
   socketio.run(app, host="0.0.0.0", port=8000)
