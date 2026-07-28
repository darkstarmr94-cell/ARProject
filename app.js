import * as THREE from "three";

import { MindARThree } from "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js";

import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";


let mindarThree;
let anchor;
let model;

let locked = false;

let savedPosition;
let savedRotation;


const startButton = document.querySelector("#scanButton");
const rescanButton = document.querySelector("#rescanButton");


async function startAR(){


    mindarThree = new MindARThree({

        container: document.querySelector("#ar-container"),

        imageTargetSrc:
        "./assets/targets.mind",

        uiScanning: false,

        filterMinCF:0.0001,

        filterBeta:0.001

    });



    const {
        renderer,
        scene,
        camera
    } = mindarThree;



    scene.add(
        new THREE.HemisphereLight(
            0xffffff,
            0xbbbbff,
            1
        )
    );



    anchor = mindarThree.addAnchor(0);



    const loader = new GLTFLoader();



    loader.load(

        "./assets/model.glb",

        (gltf)=>{


            model = gltf.scene;


            model.scale.set(
                0.3,
                0.3,
                0.3
            );


            model.visible=false;


            anchor.group.add(model);


        }

    );




    anchor.onTargetFound = ()=>{


        if(!locked && model){


            model.visible=true;


        }


    };




    anchor.onTargetLost = ()=>{


        if(!locked && model){


            savedPosition =
            anchor.group.position.clone();


            savedRotation =
            anchor.group.rotation.clone();



            locked=true;



            anchor.group.position.copy(
                savedPosition
            );


            anchor.group.rotation.copy(
                savedRotation
            );



        }


    };



    await mindarThree.start();



    renderer.setAnimationLoop(()=>{


        if(locked && model){


            anchor.group.position.copy(
                savedPosition
            );


            anchor.group.rotation.copy(
                savedRotation
            );


        }



        renderer.render(
            scene,
            camera
        );


    });


}




startButton.onclick=()=>{


    startButton.style.display="none";

    startAR();


};





rescanButton.onclick=()=>{


    locked=false;


    if(model){

        model.visible=false;

    }


};