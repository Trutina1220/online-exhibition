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

    return scene;
}

// function to create camera
var createCamera = function (scene, canvas) {

    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);
    camera.setTarget(BABYLON.Vector3.Zero());


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
    var plane = BABYLON.MeshBuilder.CreatePlane("ground", {height: 50, width: 50}, scene)
    plane.position = new BABYLON.Vector3(0, -0.1, 0);
    plane.rotation.x = Math.PI / 2;
    plane.collisionsEnabled = true;
    plane.checkCollisions = true;
}

//function to create boundaries
var createBoundaries = function(scene){
    // WALLS
    var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {height: 13, width: 20.25, depth: 0.1}, scene)
    //plane.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
    wall1.position = new BABYLON.Vector3(-5.6, 0, 10.35);
    //plane.rotation.x = Math.PI / 2;
    wall1.collisionsEnabled = true;
    wall1.checkCollisions = true;
    wall1.isVisible = false;

    var wall2 = BABYLON.MeshBuilder.CreateBox("wall2", {height: 10, width: 20.25, depth: 0.1}, scene)
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

    var wall4 = BABYLON.MeshBuilder.CreateBox("wall4", {height: 13, width: 20.20, depth: 0.1}, scene)
    wall4.position = new BABYLON.Vector3(-15.8, 0, 0.2);
    wall4.rotation.y = Math.PI / 2;
    wall4.collisionsEnabled = true;
    wall4.checkCollisions = true;
    wall4.isVisible = false;

    var ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", {height: 20.5, width: 20.5, depth: 0.1}, scene)
    ceiling.position = new BABYLON.Vector3(-5.7, 4.5, 0);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.collisionsEnabled = true;
    ceiling.checkCollisions = true;
    ceiling.isVisible = false;
}

// main function
var main = async function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = await createScene(engine, canvas);

    createPlane(scene);
    //createBoundaries(scene);
    var stand1 = BABYLON.MeshBuilder.CreateBox("stand1", {height: 1, width: 1.1, depth: 3.5});
    stand1.checkCollisions = true;
    stand1.rotation.y = Math.PI/2;
    stand1.position = new BABYLON.Vector3(-9.5, 0.5, -5.5);

    // load meshes
    var assetsManager = new BABYLON.AssetsManager(scene);

    // load room
    // var roomTask = assetsManager.addMeshTask("roomTask", "", "./Assets/Room/", "scene.gltf");
    // roomTask.onSuccess = function(task) {

    //     task.loadedMeshes.forEach(function(mesh) {
    //         console.log("Room mesh: " + mesh.name);
    //         mesh.position = new BABYLON.Vector3(0, 0, 0);
    //     });

    // }

    var chairTask = assetsManager.addMeshTask("roomTask", "", "./Assets/Chair/", "scene.gltf");
    chairTask.onSuccess = function(task) {
        var transformNode = scene.getTransformNodeByName("chairRoot");

        task.loadedMeshes.forEach(function(mesh) {
            console.log("Chair mesh: " + mesh.name);
            mesh.position = new BABYLON.Vector3(0, 0, 0);
            //mesh.position = new BABYLON.Vector3(-20, 17.3, 10);
            //var temp = 0.04;
            //mesh.scaling = new BABYLON.Vector3(temp,temp,temp);
            //mesh.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
            mesh.parent = transformNode;
        });

        

        transformNode.scaling = new BABYLON.Vector3(0.04, 0.04, 0.04);

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