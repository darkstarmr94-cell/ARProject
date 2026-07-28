let videoElement;


export async function startCamera(){


if(!navigator.mediaDevices){

throw new Error(
"Camera API is not available. Use HTTPS."
);

}



videoElement =
document.createElement("video");



videoElement.autoplay = true;

videoElement.playsInline = true;



videoElement.style.position =
"fixed";

videoElement.style.top =
"0";

videoElement.style.left =
"0";

videoElement.style.width =
"100%";

videoElement.style.height =
"100%";

videoElement.style.objectFit =
"cover";

videoElement.style.zIndex =
"-1";



const stream =
await navigator.mediaDevices.getUserMedia({

video: {

facingMode:{
ideal:"environment"
}

},

audio:false

});



videoElement.srcObject =
stream;



document.body.appendChild(
videoElement
);



return videoElement;


}



export function stopCamera(){


if(videoElement &&
videoElement.srcObject){


videoElement.srcObject
.getTracks()
.forEach(track=>{

track.stop();

});


videoElement.remove();


videoElement=null;


}


}