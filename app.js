const button =
document.getElementById("startButton");


button.onclick = async function(){


if(!navigator.mediaDevices){

alert(
"NO CAMERA API"
);

return;

}



try{


const stream =
await navigator.mediaDevices.getUserMedia({

video:true,

audio:false

});



const video =
document.createElement("video");


video.srcObject =
stream;


video.autoplay = true;


video.playsInline = true;


video.style.position="fixed";

video.style.width="100%";

video.style.height="100%";

video.style.top="0";

video.style.left="0";


document.body.appendChild(video);



alert(
"CAMERA OK"
);


}

catch(e){


alert(

e.name + " : " + e.message

);


}


};