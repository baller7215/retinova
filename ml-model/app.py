import torch
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, utils
import numpy as np
import cv2
from PIL import Image
import matplotlib.pyplot as plt
import torchvision
import torch.nn as nn
import torch.optim as optim

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
batch_size = 32
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

# Display class-to-index mapping
print("Class-to-Index Mapping:", train_dataset.class_to_idx)

# Display some images with labels
def imshow(img):
    mean = torch.tensor([0.485, 0.456, 0.406]).view(3, 1, 1)
    std = torch.tensor([0.229, 0.224, 0.225]).view(3, 1, 1)
    img = img * std + mean
    npimg = img.numpy()
    plt.imshow(np.transpose(npimg, (1, 2, 0)))
    plt.show()

data_iter = iter(train_loader)
images, labels = next(data_iter)

# Display images and labels
imshow(torchvision.utils.make_grid(images[:10]))
print("Labels:", [list(train_dataset.class_to_idx.keys())[label] for label in labels[:10]])

def filter_loader_by_labels(loader, valid_labels):
    filtered_images = []
    filtered_labels = []
    for images, labels in loader:
        for i, label in enumerate(labels):
            if label.item() in valid_labels:
                filtered_images.append(images[i])
                filtered_labels.append(label)
    return DataLoader(torch.utils.data.TensorDataset(torch.stack(filtered_images), torch.tensor(filtered_labels)),
                      batch_size=16, shuffle=True)

valid_labels = [train_dataset.class_to_idx['cataracts'], train_dataset.class_to_idx['normal']]
cataracts_normal_loader = filter_loader_by_labels(train_loader, valid_labels)
normal_uveitis_loader = filter_loader_by_labels(test_loader, valid_labels)
#model training
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

num_classes = 2
model = SimpleCNN(num_classes)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

def train_model(model, loader, num_epochs=10):
    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        for inputs, labels in loader:
            # Convert labels to range [0, 1] for 'cataracts' and 'normal'
            labels = torch.tensor([0 if l.item() == valid_labels[0] else 1 for l in labels])

            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

        print(f"Epoch {epoch + 1}/{num_epochs}, Loss: {running_loss / len(loader)}, Accuracy: {100 * correct / total:.2f}%")

# Train the model using cataracts_normal_loader
train_model(model, cataracts_normal_loader, num_epochs=30)

num_classes = 2 
normal_uveitis_model = SimpleCNN(num_classes)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(normal_uveitis_model.parameters(), lr=0.001)

def train_model_for_uveitis(model, loader, num_epochs=10):
    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        for inputs, labels in loader:
            labels = torch.tensor([0 if l.item() == valid_labels[0] else 1 for l in labels])

            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

        print(f"Epoch {epoch + 1}/{num_epochs}, Loss: {running_loss / len(loader)}, Accuracy: {100 * correct / total:.2f}%")

train_model_for_uveitis(normal_uveitis_model, normal_uveitis_loader, num_epochs=30)

#test models
def test_model(model, loader, valid_labels):
    model.eval()  
    correct = 0
    total = 0
    with torch.no_grad(): 
        for inputs, labels in loader:
        
            labels = torch.tensor([0 if l.item() == valid_labels[0] else 1 for l in labels])

            outputs = model(inputs) 
            _, predicted = torch.max(outputs, 1) 
            total += labels.size(0) 
            correct += (predicted == labels).sum().item()

    accuracy = 100 * correct / total
    print(f"Test Accuracy: {accuracy:.2f}%"
)
    print("Test Cataracts")
valid_labels_cataracts = [train_dataset.class_to_idx['cataracts'], train_dataset.class_to_idx['normal']]
cataracts_normal_test_loader = filter_loader_by_labels(test_loader, valid_labels_cataracts)

test_model(model, cataracts_normal_test_loader, valid_labels_cataracts)

valid_labels_uveitis = [train_dataset.class_to_idx['uveitis'], train_dataset.class_to_idx['normal']]
normal_uveitis_test_loader = filter_loader_by_labels(test_loader, valid_labels_uveitis)

test_model(normal_uveitis_model, normal_uveitis_test_loader, valid_labels_uveitis)

torch.save(model.state_dict(), "cataracts_model.pth")
torch.save(normal_uveitis_model.state_dict(), "uveitis_model.pth")