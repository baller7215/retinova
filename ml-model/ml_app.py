from flask import Flask, request, jsonify
# import torch
# from torchvision import transforms
# from PIL import Image
import io
import base64

app = Flask(__name__)

# Load models
# cataracts_model = torch.load('cataracts_model.pth', map_location=torch.device('cpu'))
# uveitis_model = torch.load('uveitis_model.pth', map_location=torch.device('cpu'))

# # Preprocessing
# transform = transforms.Compose([
#     transforms.Resize((224, 224)),
#     transforms.ToTensor(),
#     transforms.Normalize(mean=[0.5], std=[0.5])
# ])


@app.route('/')
def home():
    return "ML API is running!"


@app.route('/predict', methods=['POST'])
def predict():
    # data = request.json
    # if 'image' not in data:
    #     return jsonify({'error': 'No image provided'}), 400

    # # Decode the image
    # image_data = data['image']
    # image_bytes = base64.b64decode(image_data.split(",")[1])
    # image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

    # # Preprocess the image
    # input_tensor = transform(image).unsqueeze(0)

    # # Predict with both models
    # cataracts_output = cataracts_model(input_tensor)
    # uveitis_output = uveitis_model(input_tensor)

    # # Interpret resul
    # cataracts_pred = torch.argmax(cataracts_output, dim=1).item()
    # uveitis_pred = torch.argmax(uveitis_output, dim=1).item()

    # result = {
    #     'cataracts': cataracts_pred,
    #     'uveitis': uveitis_pred
    # }
    # return jsonify(result)
    return "hello"

if __name__ == '__main__':
    app.run(debug=True)
