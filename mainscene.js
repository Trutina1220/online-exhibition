// imports
import { createPointerLock } from "./pointerLock.js";

// function to create scene
var createScene = async function (engine, canvas) {
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.1, 0);
    scene.enablePhysics(scene.gravity, new BABYLON.CannonJSPlugin());
    scene.collisionsEnabled = true;
    scene.workerCollisions = true;

    var camera = createCamera(scene, canvas);

    var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    // Skybox
    var hdrTexture = new BABYLON.CubeTexture("./Textures/city.jpg", scene);
    scene.createDefaultSkybox(hdrTexture, true, 10000);
    
    return scene;
}

// function to create camera
var createCamera = function (scene, canvas) {

    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(-18, 2, 0), scene);
    // var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);
    //camera.setTarget(BABYLON.Vector3.Zero());
    camera.setTarget(new BABYLON.Vector3(0,2,2));

    // Setting up wasd camera movement control 
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);

    camera.speed = 2;
    camera.fov = 0.8;
    camera.inertia = 0;

    // Create pointer lock so that no need to click
    createPointerLock(scene)

    camera.ellipsoid = new BABYLON.Vector3(0.9, 1, 0.9);
    camera.checkCollisions = true;
    camera.applyGravity = true;

    return camera;
}

// function to create plane
var createPlane = function(scene){
    var plane = BABYLON.MeshBuilder.CreatePlane("ground", {height: 100, width: 100}, scene)
    plane.position = new BABYLON.Vector3(0, -0.1, 0);
    plane.rotation.x = Math.PI / 2;
    plane.collisionsEnabled = true;
    plane.checkCollisions = true;
    
    var grassMat = new BABYLON.StandardMaterial("grassMat", scene);
    grassMat.diffuseTexture = new BABYLON.Texture("./Textures/grass.jpg", scene);
    grassMat.diffuseTexture.uScale = 20.0;
    grassMat.diffuseTexture.vScale = 20.0;

    plane.material = grassMat;
}

//function to create boundaries
var createBoundaries = function(scene){
    // WALLS
    var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {height: 13, width: 20.25, depth: 0.1}, scene)
    wall1.position = new BABYLON.Vector3(-5.6, 0, 10.35);
    wall1.collisionsEnabled = true;
    wall1.checkCollisions = true;
    wall1.isVisible = false;

    var wall2 = BABYLON.MeshBuilder.CreateBox("wall2", {height: 9.8, width: 20.25, depth: 0.1}, scene)
    wall2.position = new BABYLON.Vector3(-5.6, 0, -9.85);
    wall2.collisionsEnabled = true;
    wall2.checkCollisions = true;
    wall2.isVisible = false;

    var wall3 = BABYLON.MeshBuilder.CreateBox("wall3", {height: 13, width: 20.20, depth: 0.1}, scene)
    wall3.position = new BABYLON.Vector3(4.5, 0, 0.2);
    wall3.rotation.y = Math.PI / 2;
    wall3.collisionsEnabled = true;
    wall3.checkCollisions = true;
    wall3.isVisible = false;

    // front door walls
    var wall4 = BABYLON.MeshBuilder.CreateBox("wall4", {height: 13, width: 7.7, depth: 0.1}, scene)
    wall4.position = new BABYLON.Vector3(-15.8, 0, 6.6);
    wall4.rotation.y = Math.PI / 2;
    wall4.collisionsEnabled = true;
    wall4.checkCollisions = true;
    wall4.isVisible = false;

    var wall5 = BABYLON.MeshBuilder.CreateBox("wall5", {height: 13, width: 7.7, depth: 0.1}, scene)
    wall5.position = new BABYLON.Vector3(-15.8, 0, -6.1);
    wall5.rotation.y = Math.PI / 2;
    wall5.collisionsEnabled = true;
    wall5.checkCollisions = true;
    wall5.isVisible = false;

    var ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", {height: 20.5, width: 20.5, depth: 0.1}, scene)
    ceiling.position = new BABYLON.Vector3(-5.7, 4.8, 0);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.collisionsEnabled = true;
    ceiling.checkCollisions = true;
    ceiling.isVisible = false;
}

var createStairs = function(scene){
    var stairs1 = BABYLON.MeshBuilder.CreateBox("stairs1", {height: 8, width: 4, depth: 4}, scene)
    stairs1.position = new BABYLON.Vector3(-17.7, -0.7, -6.8);
    stairs1.rotation.x = 1.2; //Math.PI / 4;
    stairs1.rotation.y = Math.PI / 2 + Math.PI / 2;
    stairs1.collisionsEnabled = true;
    stairs1.checkCollisions = true;
    stairs1.isVisible = false;

    var stairsbox = BABYLON.MeshBuilder.CreateBox("stairsbox", {height: 3.3, width: 16.5, depth: 3.8}, scene)
    stairsbox.position = new BABYLON.Vector3(-11.5, 1, -11.75);
    stairsbox.collisionsEnabled = true;
    stairsbox.checkCollisions = true;
    stairsbox.isVisible = false;

    var stairs2 = BABYLON.MeshBuilder.CreateBox("stairs2", {height: 8, width: 3.8, depth: 4}, scene)
    stairs2.position = new BABYLON.Vector3(-13.7, 1.5, -11.75);
    stairs2.rotation.x = 1.2; //Math.PI / 4;
    stairs2.rotation.y = Math.PI / 2;
    stairs2.collisionsEnabled = true;
    stairs2.checkCollisions = true;
    stairs2.isVisible = false;

    var stairsbox2 = BABYLON.MeshBuilder.CreateBox("stairsbox2", {height: 7.8, width: 7.5, depth: 3.8}, scene)
    stairsbox2.position = new BABYLON.Vector3(-6.8, 1, -11.75);
    stairsbox2.collisionsEnabled = true;
    stairsbox2.checkCollisions = true;
    stairsbox2.isVisible = false;
}

var createStands = function(scene){
    // Stand 1
    var stand1 = BABYLON.MeshBuilder.CreateBox("stand1", {height: 1.5, width: 1.5, depth: 3});
    stand1.checkCollisions = true;
    stand1.rotation.y = Math.PI/2;
    stand1.position = new BABYLON.Vector3(-5.6, 0.5, -5.5);

    // Stand 2
    var stand2 = BABYLON.MeshBuilder.CreateBox("stand2", {height: 2, width: 2, depth: 3});
    stand2.checkCollisions = true;
    //stand2.rotation.y = Math.PI/2;
    stand2.position = new BABYLON.Vector3(1.5, 0.5, 0);

    // Stand 3
    var stand3 = BABYLON.MeshBuilder.CreateBox("stand3", {height: 1.5, width: 1.5, depth: 3});
    stand3.checkCollisions = true;
    stand3.rotation.y = Math.PI/2;
    stand3.position = new BABYLON.Vector3(-5.6, 0.5, 5.5);

    // Stand 4
    var stand4 = BABYLON.MeshBuilder.CreateBox("stand4", {height: 1.5, width: 1.5, depth: 1.5});
    stand4.checkCollisions = true;
    stand4.rotation.y = Math.PI/2;
    stand4.position = new BABYLON.Vector3(-1, 0.5, 4.5);

    // Stand 5
    var stand5 = BABYLON.MeshBuilder.CreateBox("stand5", {height: 1.5, width: 1.5, depth: 1.5});
    stand5.checkCollisions = true;
    stand5.rotation.y = Math.PI/2;
    stand5.position = new BABYLON.Vector3(-1, 0.5, -4.5);

    var marbleMat = new BABYLON.StandardMaterial("marbleMat", scene);
    marbleMat.diffuseTexture = new BABYLON.Texture("./Textures/marble.jpg", scene);
    
    stand1.material = marbleMat;
    stand2.material = marbleMat;
    stand3.material = marbleMat;
    stand4.material = marbleMat;
    stand5.material = marbleMat;
}

var mammothAnimation = function(scene, object){
    const frameRate = 5;
    const angle = 0.523599;

    // X ROTATE
    const xRotate = new BABYLON.Animation("xRotate", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames = []; 

    keyFrames.push({
        frame: 0,
        value: -angle
    });

    keyFrames.push({
        frame: frameRate,
        value: 0
    });

    keyFrames.push({
        frame: 2 * frameRate,
        value: -angle
    });

    xRotate.setKeys(keyFrames);

    // Y SLIDE
    const ySlide = new BABYLON.Animation("ySlide", "position.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames2 = []; 

    keyFrames2.push({
        frame: 0,
        value: 2.3
    });

    keyFrames2.push({
        frame: frameRate,
        value: 1.95
    });

    keyFrames2.push({
        frame: 2 * frameRate,
        value: 2.3
    });

    ySlide.setKeys(keyFrames2);

    object.animations.push(xRotate);
    object.animations.push(ySlide);

    scene.beginAnimation(object, 0, 2 * frameRate, true);
}

var createSensors = function(scene){
    
    // Sensor 1
    var sensor1 = BABYLON.MeshBuilder.CreateBox("sensor 1", {height: 2, width: 1, depth: 2});
    sensor1.checkCollisions = true;
    sensor1.position = new BABYLON.Vector3(0, 1, 3);
    //sensor2.isVisible = false;

    // Sensor 2
    var sensor2 = BABYLON.MeshBuilder.CreateBox("sensor 2", {height: 2, width: 1, depth: 2});
    sensor2.checkCollisions = true;
    sensor2.position = new BABYLON.Vector3(0, 1, 0);
    //sensor2.isVisible = false;

    var sensors = [sensor1, sensor2]

    return sensors;
}

// main function
var main = async function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = await createScene(engine, canvas);

    // create objects
    createPlane(scene);
    createBoundaries(scene);
    createStairs(scene);
    createStands(scene);
    // var sensors = createSensors(scene);
    // var sensorOne = sensors[0];
    // var sensorTwo = sensors[1];

   

    // load meshes
    var assetsManager = new BABYLON.AssetsManager(scene);

    // ROOM
    var roomTask = assetsManager.addMeshTask("roomTask", "", "./Assets/Room/", "scene.gltf");
    roomTask.onSuccess = function(task) {

        task.loadedMeshes.forEach(function(mesh) {
            //console.log("Room mesh: " + mesh.name);
            mesh.position = new BABYLON.Vector3(0, 0, 0);
            //mesh.visibility = 0.3;
        });

    }

    // MAMMOTH 
    var mammothTask = assetsManager.addMeshTask("mammothTask", "", "./Assets/Mammoth/", "woolly-mammoth-skeleton.obj");
    mammothTask.onSuccess = function(task) {

        task.loadedMeshes.forEach(function(mesh) {
            //console.log("mesh: " + mesh.name);
            mesh.position = new BABYLON.Vector3(-5.65, 1.95, 5.5);
            //Scale the model down        
            mesh.scaling.scaleInPlace(0.0004);
            mesh.rotation.y = -Math.PI/2;

            if (mesh.name.includes("Plane")){
                mesh.visibility = 0;
            }
            
            var mammothMat = new BABYLON.StandardMaterial("mammothMat", scene);
            mammothMat.diffuseTexture = new BABYLON.Texture("./Assets/Mammoth/ClayColor.jpg", scene);
            mesh.material = mammothMat;

            mammothAnimation(scene, mesh);
        });
    }

     // SAMBA 
    var sambaTask = assetsManager.addMeshTask("sambaTask", "", "https://assets.babylonjs.com/meshes/", "HVGirl.glb");
    sambaTask.onSuccess = function(task){
    
        task.loadedMeshes.forEach(function(mesh, particleSystems, skeletons, animationGroups) {
            //console.log("mesh: " + mesh);

            //Scale the model down        
            mesh.scaling.scaleInPlace(0.05);
            mesh.position = new BABYLON.Vector3(-5.6, 1.25, -5.5);

            //Get the Samba animation Group
            const sambaAnim = scene.getAnimationGroupByName("Samba");

            //Play the Samba animation  
            sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
        });

    }

    // BUMBLEBEE
    var bumbleTask = assetsManager.addMeshTask("bumbleTask", "", "./Assets/Transformer/", "bumblebee-transformer-animation.obj");
    bumbleTask.onSuccess = function(task) {

        task.loadedMeshes.forEach(function(mesh) {
            //console.log("transfo mesh: " + mesh.name);
            mesh.position = new BABYLON.Vector3(-1, 1.25, 4.5);
            mesh.scaling.scaleInPlace(0.002);
            mesh.rotation.y = -Math.PI/2 -Math.PI/4;
          
            if (mesh.name.includes("Plane")){
                mesh.visibility = 0;
            }
        });
    }

    // CRUISER
    var cruiserTask = assetsManager.addMeshTask("cruiserTask", "", "./Assets/Cruiser/", "light-cruiser-tenryuu.obj");
    cruiserTask.onSuccess = function(task) {

        task.loadedMeshes.forEach(function(mesh) {
            //console.log("transfo mesh: " + mesh.name);
            mesh.position = new BABYLON.Vector3(-1, 1.25, -4.5);
            mesh.scaling.scaleInPlace(0.9);
            mesh.rotation.y = -Math.PI/4;
        });
    }

    assetsManager.onFinish = function(tasks) {
        // run engine loop
        engine.runRenderLoop(function () {
            scene.render();
        });
        window.addEventListener("resize", function () {
            engine.resize();
        });
    }

    assetsManager.load();
}

main();