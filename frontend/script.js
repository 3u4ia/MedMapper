const addImageBtn = document.getElementById('add-image-btn');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const generateAgendaBtn = document.getElementById('generate-agenda-btn');

let selectedFiles = [];

addImageBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            selectedFiles.push(file);
            const img = document.createElement('img');
            const blobURL = URL.createObjectURL(file);
            img.src = blobURL;
            imagePreview.appendChild(img);
            img.onload = () => URL.revokeObjectURL(blobURL);
        }
    });
});

generateAgendaBtn.addEventListener('click', async () => {
    if (selectedFiles.length === 0) {
        alert("Please select images first.");
        return;
    }

    const YOUR_ENDPOINT = 'localhost:8080/upload';
    const formData = new FormData();
    selectedFiles.forEach((file, index) => formData.append(`file_${index}`, file));

    try {
        generateAgendaBtn.innerText = "Processing...";
        generateAgendaBtn.disabled = true;

        const response = await fetch(YOUR_ENDPOINT, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Once successful, you could redirect to the agenda page
            // window.location.href = 'agenda.html'; 
            alert("Success! Redirecting to your agenda...");
        } else {
            alert("Upload failed. (Check console for endpoint errors)");
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server.");
    } finally {
        generateAgendaBtn.innerText = "Generate Agenda";
        generateAgendaBtn.disabled = false;
    }
});
