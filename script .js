// Disease information
const diseaseInfo = {
    "Malaria": {
        recommendedTreatment: "Antimalarial medications such as chloroquine, artemisinin-based combination therapies (ACTs), or quinine, based on the specific strain and severity.",
        precautions: "Use mosquito repellents, wear protective clothing, and sleep under treated mosquito nets in endemic areas."
    },
    "Dengue Fever": {
        recommendedTreatment: "Supportive care, including hydration, pain relief with acetaminophen, and monitoring for severe symptoms like bleeding.",
        precautions: "Use mosquito repellents, eliminate standing water, and avoid areas with high mosquito activity."
    },
    // Add more diseases here...
};

// List of diseases
const diseases = [
    "Malaria", "Dengue Fever", "Tuberculosis (TB)", "Typhoid Fever", "Cholera",
    // Add more diseases here...
];

// Populate disease dropdown
const diseaseSelect = document.getElementById('disease');
diseases.forEach(disease => {
    const option = document.createElement('option');
    option.value = disease;
    option.textContent = disease;
    diseaseSelect.appendChild(option);
});

// Tab switching
const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        tabContents.forEach(content => {
            content.style.display = content.id === `${tabId}Tab` ? 'block' : 'none';
        });
    });
});

// Camera functionality
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const takePhotoButton = document.getElementById('takePhotoButton');
const cameraContainer = document.getElementById('cameraContainer');
const photoPreview = document.getElementById('photoPreview');
const patientPhoto = document.getElementById('patientPhoto');

captureButton.addEventListener('click', () => {
    cameraContainer.style.display = 'block';
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error("Error accessing the camera:", err));
});

takePhotoButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    patientPhoto.src = imageDataUrl;
    photoPreview.style.display = 'block';
    cameraContainer.style.display = 'none';
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
});

// Form validation
function validateForm() {
    const prescriptionFile = document.getElementById('prescription').files[0];
    const disease = document.getElementById('disease').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!prescriptionFile) {
        alert("Please upload a prescription image.");
        return false;
    }
    if (!disease) {
        alert("Please select a disease.");
        return false;
    }
    if (!name || !age || !bloodGroup || !gender || !phone || !address) {
        alert("Please fill in all patient details.");
        return false;
    }
    return true;
}

// Analyze prescription
const analyzeButton = document.getElementById('analyzeButton');
const analysisResult = document.getElementById('analysisResult');
const analysisText = document.getElementById('analysisText');

analyzeButton.addEventListener('click', async () => {
    if (!validateForm()) return;

    analyzeButton.disabled = true;
    analyzeButton.textContent = 'Analyzing...';

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const disease = document.getElementById('disease').value;
    const info = diseaseInfo[disease] || { recommendedTreatment: "Not available", precautions: "Not available" };
    
    const analysis = `Based on the prescription analysis and the selected disease (${disease}), here's the AI-generated report:

1. Diagnosis: The patient shows symptoms consistent with ${disease}.
2. Recommended Treatment: ${info.recommendedTreatment}
3. Precautions: ${info.precautions}
4. Follow-up: Schedule a follow-up appointment in 2 weeks to assess treatment efficacy.`;

    analysisText.textContent = analysis;
    analysisResult.style.display = 'block';
    analyzeButton.disabled = false;
    analyzeButton.textContent = 'Analyze Prescription';
});

// Download PDF report
const downloadButton = document.getElementById('downloadButton');
