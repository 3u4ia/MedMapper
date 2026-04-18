const addImageBtn = document.getElementById('add-image-btn');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const generateAgendaBtn = document.getElementById('generate-agenda-btn');

// Array to store the actual File objects
let selectedFiles = [];

// 1. Trigger the file picker
addImageBtn.addEventListener('click', () => {
    fileInput.click();
});

// 2. Handle file selection and preview
fileInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);

    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            // Store file for later upload
            selectedFiles.push(file);

            // Create Preview
            const img = document.createElement('img');
            const blobURL = URL.createObjectURL(file);
            img.src = blobURL;
            imagePreview.appendChild(img);

            // Free memory after load
            img.onload = () => URL.revokeObjectURL(blobURL);
        }
    });
});

// 3. Send images to the endpoint
generateAgendaBtn.addEventListener('click', async () => {
    if (selectedFiles.length === 0) {
        alert("Please add at least one image first!");
        return;
    }

    // Replace this with your actual URL later
    const YOUR_ENDPOINT_URL = 'https://your-api-endpoint.com/upload';

    // Create a FormData object to "package" the files
    const formData = new FormData();
    
    // Append each file to the formData
    selectedFiles.forEach((file, index) => {
        formData.append(`image_${index}`, file);
    });

    try {
        generateAgendaBtn.innerText = "Processing...";
        generateAgendaBtn.disabled = true;

        const response = await fetch(localhost:8080/upload, {
            method: 'POST',
            body: formData, // Fetch automatically sets the correct Content-Type for FormData
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Success:", result);
            alert("Agenda generated successfully!");
        } else {
            throw new Error('Server responded with an error.');
        }

    } catch (error) {
        console.error("Error uploading images:", error);
        alert("Upload failed. (Check console for details - this is normal if the endpoint isn't live yet!)");
    } finally {
        generateAgendaBtn.innerText = "Generate Agenda";
        generateAgendaBtn.disabled = false;
    }
});
