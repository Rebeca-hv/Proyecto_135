noseX = 0;
noseY = 0;
diferencia = 0;
manoDerecha = 0;
manoIzquierda = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);
    canvas = createCanvas(550,500);
    canvas.position(560,150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Modelo cargado");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nariz X : "+ noseX + " Nariz Y : " + noseY);
        manoDerecha = results[0].pose.rightWrist.x;
        manoIzquierda = results[0].pose.leftWrist.x;
        diferencia = floor(manoIzquierda - manoDerecha);
        console.log("Mano I: " + manoIzquierda + " Mano D: " + manoDerecha + " Distancia: "+ diferencia);
    }
}

function draw(){
    background("#969A97");
    document.getElementById("square_side").innerHTML = "El ancho y el alto del cuadrado es " + diferencia;
    fill('#F90093');
    stroke('#F90093');
    square(noseX,noseY,diferencia);
}