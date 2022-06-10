var status = "";
var canvas = "";
var object_detector = "";
var img = "";
var objects = [];
var percent = 0;
function draw(){
    image(img, 0, 0, 640, 420);
    if(status != ""){
        for(i=0; i < objects.length; i++){
            fill(255, 0, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function preload(){
    img = loadImage('LADA.png');
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
    object_detector.detect(img, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
  }