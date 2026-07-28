let video = null;
let stream = null;

async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not available. Use HTTPS.");
    }

    const constraints = {
        audio: false,
        video: {
            facingMode: {
                exact: "environment"
            },
            width: {
                ideal: 1280
            },
            height: {
                ideal: 720
            }
        }
    };

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (e) {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: "environment"
            }
        });
    }

    video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");

    video.srcObject = stream;

    await video.play();

    document.body.appendChild(video);

    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100vw";
    video.style.height = "100vh";
    video.style.objectFit = "cover";
    video.style.zIndex = "-1";

    return video;
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    if (video) {
        video.remove();
        video = null;
    }
}

window.startCamera = startCamera;
window.stopCamera = stopCamera;