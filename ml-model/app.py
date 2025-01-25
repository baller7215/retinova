import torch
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, utils
import numpy as np
import cv2
from PIL import Image
import matplotlib.pyplot as plt
import torchvision

#function for modifying image for better CV reading
def modify(img):
    #grayscale
    img_gray = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)
    img_gray = Image.fromarray(img_gray)

    # Apply sharpening
    kernel = np.array([[-1, -1, -1],
                       [-1,  9, -1],
                       [-1, -1, -1]])
    
    img_sharpened = cv2.filter2D(np.array(img_gray), -1, kernel)
    img_sharpened = cv2.cvtColor(img_sharpened, cv2.COLOR_GRAY2RGB)
    img_sharpened = Image.fromarray(img_sharpened)
    return img_sharpened

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.Lambda(lambda x: modify(x)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) 
])



data_path = "Dataset"

train_dataset = datasets.ImageFolder(root=f"{data_path}/Train", transform=transform)
test_dataset = datasets.ImageFolder(root=f"{data_path}/Test", transform=transform)

# Split datasets into loaders
batch_size = 15
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

# Display some images
def imshow(img):
    img = img / 2 + 0.5
    npimg = img.numpy()
    plt.imshow(np.transpose(npimg, (1, 2, 0)))
    plt.show()

data_iter = iter(train_loader)
images, labels = next(data_iter)
imshow(torchvision.utils.make_grid(images[:20]))