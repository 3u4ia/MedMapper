// Select Elements
const addImageBtn = document.getElementById('add-image-btn');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const generateAgendaBtn = document.getElementById('generate-agenda-btn');

// 1. Trigger the file picker when the custom button is clicked
addImageBtn.addEventListener('click', () => {
    fileInput.click();
});

// 2. Handle multiple file selection
fileInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);

    files.forEach(file => {
        // Ensure the file is actually an image
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            
            // Create a temporary URL for the image
            const blobURL = URL.createObjectURL(file);
            img.src = blobURL;
            
            // Add to the preview gallery
            imagePreview.appendChild(img);

            // Optional: Clean up memory once the image is loaded
            img.onload = () => {
                URL.revokeObjectURL(blobURL);
            };
        }
    });
});

// 3. Generate Agenda Action
generateAgendaBtn.addEventListener('click', () => {
    const totalImages = imagePreview.querySelectorAll('img').length;
    if (totalImages === 0) {
        alert("Please add at least one image first!");
    } else {
        alert(`Processing ${totalImages} images for your agenda...`);
    }
});
