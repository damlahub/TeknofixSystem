{/* <video muted autoplay id="webcam" width="640" height="480"></video>

<button id="start-record" disabled>Start Recording</button>
<button id="stop-record" disabled>Stop Recording</button>
<button id="download-video" download="test.webm">Download Video</button> */}
const recordVideoApp = () => {
    const videoElement = document.querySelector("#webcam");
    const startRecordButton = document.querySelector("#start-record");
    const stopRecordButton = document.querySelector("#stop-record");
    const downloadLink = document.querySelector("#download-video");

    let cameraStream = null;
    let mediaRecorder = null;
    let blobsRecorded = [];

    if (!navigator.mediaDevices || !MediaRecorder) {
        alert("Your browser does not support the required APIs for video recording.");
        return;
    }

    // Start Camera
    const startCamera = async () => {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoElement.srcObject = cameraStream;
            startRecordButton.disabled = false;
        } catch (err) {
            console.error("Camera access failed:", err);
            alert("Could not access webcam and microphone.");
        }
    }

    // Start recording
    startRecordButton.addEventListener('click', function () {
        mediaRecorder = new MediaRecorder(cameraStream, { mimeType: 'video/webm' });

        mediaRecorder.ondataavailable = function (e) {
            blobsRecorded.push(e.data);
        };

        mediaRecorder.onstop = function () {
            const videoBlob = new Blob(blobsRecorded, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(videoBlob);

            const recordUserName= document.getElementById("recordUserName").value; //UserName

            downloadLink.href = videoUrl;
            downloadLink.download = recordUserName+".webm";//UserName 

            startRecordButton.disabled = false;
            stopRecordButton.disabled = true;
            blobsRecorded = []; 
        };

        mediaRecorder.start();
        startRecordButton.disabled = true;
        stopRecordButton.disabled = false;
    });

    // Stop recording
    stopRecordButton.addEventListener('click', function () {
        mediaRecorder.stop();
        stopRecordButton.disabled = true;
    });

    startCamera(); 
}

const createRecordVideoElements = () => {
    const recordVideoSide = document.createElement("section");
    recordVideoSide.id = "recordVideoSide";
    recordVideoSide.innerHTML = `
        <video muted autoplay id="webcam" width="640" height="480"></video>
        <input type="text" id="recordUserName" placeholder="USER" class="recordVideoBtn">
        <button id="start-record" class="recordVideoBtn"  disabled>Start Recording</button>
        <button id="stop-record" class="recordVideoBtn" disabled>Stop Recording</button>
        <a id="download-video" href="#">Download Video</a>
    `;
    
    const mainContent = document.querySelector("#mainContent");
    mainContent.innerHTML = ""; 
    mainContent.appendChild(recordVideoSide);

    recordVideoApp(); 
}

const recordVideo = document.querySelector("#recordVideo"); 
recordVideo.addEventListener("click", () => {
    createRecordVideoElements(); 
});
