// imports
import { createPointerLock } from "./pointerLock.js";

// function to create scene
var createScene = async function (engine) {
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.1, 0);
    scene.enablePhysics(scene.gravity, new BABYLON.CannonJSPlugin());
    scene.collisionsEnabled = true;
    scene.workerCollisions = true;

    var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    
    return scene;
}

// function to create camera
var createCamera = function (scene, canvas) {

    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(-30, 2, 25), scene);
    camera.attachControl(canvas, true);
    camera.setTarget(new BABYLON.Vector3(0,2,0));

    // Setting up wasd camera movement control 
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);

    camera.speed = 2;
    camera.fov = 0.8;
    camera.inertia = 0.2;

    // Create pointer lock so that no need to click
    createPointerLock(scene)

    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.checkCollisions = true;
    camera.applyGravity = true;

    return camera;
}

// function to create plane
var createPlane = function(scene){
    var plane = BABYLON.MeshBuilder.CreatePlane("ground", {height: 200, width: 200}, scene)
    plane.position = new BABYLON.Vector3(-10, -0.1, 0);
    plane.rotation.x = Math.PI / 2;
    plane.collisionsEnabled = true;
    plane.checkCollisions = true;
    
    var grassMat = new BABYLON.StandardMaterial("grassMat", scene);
    grassMat.diffuseTexture = new BABYLON.Texture("./Textures/grass.jpg", scene);
    grassMat.diffuseTexture.uScale = 20.0;
    grassMat.diffuseTexture.vScale = 20.0;

    plane.material = grassMat;
}

var createRoad = function(scene){
    var road = BABYLON.MeshBuilder.CreatePlane("road", {height: 200, width: 12}, scene)
    road.position = new BABYLON.Vector3(-35, -0.08, 0);
    road.rotation.x = Math.PI / 2;
    
    var roadMat = new BABYLON.StandardMaterial("roadMat", scene);
    roadMat.diffuseTexture = new BABYLON.Texture("./Textures/road.jpg", scene);
    roadMat.diffuseTexture.vScale = 10.0;

    road.material = roadMat;

    var road2 = BABYLON.MeshBuilder.CreatePlane("road2", {height: 3, width: 14}, scene)
    road2.position = new BABYLON.Vector3(-24.2, -0.09, 0.1);
    road2.rotation.x = Math.PI / 2;
    
    var road2Mat = new BABYLON.StandardMaterial("road2Mat", scene);
    road2Mat.diffuseTexture = new BABYLON.Texture("./Textures/gravel.jpg", scene);
    road2Mat.diffuseTexture.uScale = 3.0;

    road2.material = road2Mat;
}

// skybox
var createSkybox = function(scene){
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:500}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./Textures/Citybox/skybox2", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
}

//function to create boundaries
var createBoundaries = function(scene){
    // WALLS
    // left wall
    var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {height: 13, width: 20.25, depth: 0.1}, scene)
    wall1.position = new BABYLON.Vector3(-5.6, 0, 10.35);
    wall1.collisionsEnabled = true;
    wall1.checkCollisions = true;
    wall1.isVisible = false;

    // right wall
    var wall2 = BABYLON.MeshBuilder.CreateBox("wall2", {height: 9.8, width: 20.25, depth: 0.1}, scene)
    wall2.position = new BABYLON.Vector3(-5.6, 0, -9.85);
    wall2.collisionsEnabled = true;
    wall2.checkCollisions = true;
    wall2.isVisible = false;

    // back wall
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

    // ceiling wall
    var ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", {height: 20.5, width: 20.5, depth: 0.1}, scene)
    ceiling.position = new BABYLON.Vector3(-5.7, 4.8, 0);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.collisionsEnabled = true;
    ceiling.checkCollisions = true;
    ceiling.isVisible = false;

    // inside walls
    // front
    var wallinside1 = BABYLON.MeshBuilder.CreateBox("wallinside1", {height: 6, width: 10, depth: 0.2}, scene)
    wallinside1.position = new BABYLON.Vector3(-12.95, 0, 0.25);
    wallinside1.rotation.y = Math.PI / 2;
    wallinside1.collisionsEnabled = true;
    wallinside1.checkCollisions = true;
    wallinside1.isVisible = false;

    var wallinside2 = BABYLON.MeshBuilder.CreateBox("wallinside2", {height: 6, width: 6, depth: 0.2}, scene)
    wallinside2.position = new BABYLON.Vector3(-10, 0, -7.2);
    wallinside2.collisionsEnabled = true;
    wallinside2.checkCollisions = true;
    wallinside2.isVisible = false;

    var wallinside3 = BABYLON.MeshBuilder.CreateBox("wallinside3", {height: 6, width: 6, depth: 0.2}, scene)
    wallinside3.position = new BABYLON.Vector3(-1.2, 0, -7.2);
    wallinside3.collisionsEnabled = true;
    wallinside3.checkCollisions = true;
    wallinside3.isVisible = false;

    var wallinside4 = BABYLON.MeshBuilder.CreateBox("wallinside4", {height: 6, width: 6, depth: 0.2}, scene)
    wallinside4.position = new BABYLON.Vector3(-1.2, 0, 7.6);
    wallinside4.collisionsEnabled = true;
    wallinside4.checkCollisions = true;
    wallinside4.isVisible = false;

    var wallinside5 = BABYLON.MeshBuilder.CreateBox("wallinside5", {height: 6, width: 6, depth: 0.2}, scene)
    wallinside5.position = new BABYLON.Vector3(-10, 0, 7.6);
    wallinside5.collisionsEnabled = true;
    wallinside5.checkCollisions = true;
    wallinside5.isVisible = false;

    // additional railing for roof
    // front railing
    var railing1 = BABYLON.MeshBuilder.CreateBox("railing1", {height: 3, width: 7, depth: 0.1}, scene)
    railing1.position = new BABYLON.Vector3(-15.8, 5, 0);
    railing1.rotation.y = Math.PI / 2;
    railing1.collisionsEnabled = true;
    railing1.checkCollisions = true;
    railing1.isVisible = false;

    // right railings
    var railing2 = BABYLON.MeshBuilder.CreateBox("railing2", {height: 3, width: 7.5, depth: 0.1}, scene)
    railing2.position = new BABYLON.Vector3(0.8, 5, -9.85);
    railing2.collisionsEnabled = true;
    railing2.checkCollisions = true;
    railing2.isVisible = false;

    var railing3 = BABYLON.MeshBuilder.CreateBox("railing3", {height: 3, width: 7.5, depth: 0.1}, scene)
    railing3.position = new BABYLON.Vector3(-11.8, 5, -9.85);
    railing3.collisionsEnabled = true;
    railing3.checkCollisions = true;
    railing3.isVisible = false;

    //middle wall for hole
    var wallmid = BABYLON.MeshBuilder.CreateBox("wallmid", {height: 1, width: 5, depth: 5}, scene)
    wallmid.position = new BABYLON.Vector3(-5.6, 5.5, 0.3);
    wallmid.collisionsEnabled = true;
    wallmid.checkCollisions = true;
    wallmid.isVisible = false;

}

var createOuterbounds = function(scene){
    var outbound1 = BABYLON.MeshBuilder.CreateBox("outbound1", {height: 30, width: 80, depth: 1}, scene)
    outbound1.position = new BABYLON.Vector3(0, 0, 30);
    outbound1.collisionsEnabled = true;
    outbound1.checkCollisions = true;
    outbound1.isVisible = false;

    var outbound2 = BABYLON.MeshBuilder.CreateBox("outbound2", {height: 30, width: 80, depth: 1}, scene)
    outbound2.position = new BABYLON.Vector3(0, 0, -30);
    outbound2.collisionsEnabled = true;
    outbound2.checkCollisions = true;
    outbound2.isVisible = false;

    var outbound3 = BABYLON.MeshBuilder.CreateBox("outbound3", {height: 30, width: 80, depth: 1}, scene)
    outbound3.position = new BABYLON.Vector3(25, 0, 0);
    outbound3.rotation.y = Math.PI/2;
    outbound3.collisionsEnabled = true;
    outbound3.checkCollisions = true;
    outbound3.isVisible = false;

    var outbound4 = BABYLON.MeshBuilder.CreateBox("outbound4", {height: 30, width: 80, depth: 1}, scene)
    outbound4.position = new BABYLON.Vector3(-40, 0, 0);
    outbound4.rotation.y = Math.PI/2;
    outbound4.collisionsEnabled = true;
    outbound4.checkCollisions = true;
    outbound4.isVisible = false;
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

    // Stand 2 middle 
    var stand2 = BABYLON.MeshBuilder.CreateBox("stand2", {height: 2, width: 2, depth: 3});
    stand2.checkCollisions = true;
    //stand2.rotation.y = Math.PI/2;
    stand2.position = new BABYLON.Vector3(1.4, 0.5, 0);

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

var createDoor = function(scene){
    // sliding door
    var door = BABYLON.MeshBuilder.CreateBox("door", {height: 6.5, width: 5.3, depth: 0.2}, scene)
    door.position = new BABYLON.Vector3(-15.75, 0, 0.3);
    door.rotation.y = Math.PI / 2;
    door.collisionsEnabled = true;
    door.checkCollisions = true;
    door.visibility = 0.8

    var glassMat = new BABYLON.StandardMaterial("glassMat", scene);
    glassMat.diffuseTexture = new BABYLON.Texture("./Textures/glass.jpg", scene);
    door.material = glassMat;

    return door;
}

var createArt = function(scene){
    // Dino painting
    var art1 = BABYLON.MeshBuilder.CreatePlane("art1", {height: 2, width: 2}, scene)
    art1.position = new BABYLON.Vector3(-10, 1.5, 7.4);
    
    var artMat1 = new BABYLON.StandardMaterial("artMat1", scene);
    artMat1.diffuseTexture = new BABYLON.Texture("./Textures/art1.jpg", scene);

    art1.material = artMat1;

    // Train painting
    var art2 = BABYLON.MeshBuilder.CreatePlane("art2", {height: 2, width: 2}, scene)
    art2.position = new BABYLON.Vector3(-1.2, 1.5, 7.4);
    
    var artMat2 = new BABYLON.StandardMaterial("artMat2", scene);
    artMat2.diffuseTexture = new BABYLON.Texture("./Textures/art2.jpg", scene);

    art2.material = artMat2;

    // Teddy painting
    var art3 = BABYLON.MeshBuilder.CreatePlane("art3", {height: 2, width: 2}, scene)
    art3.position = new BABYLON.Vector3(-1.2, 1.5, -6.9);
    art3.rotation.y = Math.PI / 2 + Math.PI / 2;
    
    var artMat3 = new BABYLON.StandardMaterial("artMat3", scene);
    artMat3.diffuseTexture = new BABYLON.Texture("./Textures/art3.jpg", scene);

    art3.material = artMat3;

    // Teddy painting
    var art4 = BABYLON.MeshBuilder.CreatePlane("art4", {height: 2, width: 2}, scene)
    art4.position = new BABYLON.Vector3(-10, 1.5, -6.9);
    art4.rotation.y = Math.PI / 2 + Math.PI / 2;
    
    var artMat4 = new BABYLON.StandardMaterial("artMat4", scene);
    artMat4.diffuseTexture = new BABYLON.Texture("./Textures/art4.jpg", scene);

    art4.material = artMat4;
}

var createSign = function(scene){
    // sign
    var sign = BABYLON.MeshBuilder.CreatePlane("sign", {height: 1, width: 2}, scene)
    sign.position = new BABYLON.Vector3(-16, 1.7, 4.5);
    sign.rotation.y = Math.PI / 2;
    
    var signMat1 = new BABYLON.StandardMaterial("signMat1", scene);
    signMat1.diffuseTexture = new BABYLON.Texture("./Textures/sign.png", scene);

    sign.material = signMat1;
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

var carAnimation = function(scene, object){
    const frameRate = 5;

    // X ROTATE
    const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames = []; 

    keyFrames.push({
        frame: 0,
        value: -0.7
    });

    keyFrames.push({
        frame: 10,
        value: -0.7
    });

    keyFrames.push({
        frame: 20,
        value: -1.9
    });

    keyFrames.push({
        frame: 30,
        value: -1.9
    });

    keyFrames.push({
        frame: 40,
        value: -0.7
    });

    xSlide.setKeys(keyFrames);

    // Z SLIDE
    const zSlide = new BABYLON.Animation("zSlide", "position.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames2 = []; 

    keyFrames2.push({
        frame: 0,
        value: 1
    });

    keyFrames2.push({
        frame: 10,
        value: -1
    });

    keyFrames2.push({
        frame: 20,
        value: -1
    });

    keyFrames2.push({
        frame: 30,
        value: 1
    });

    keyFrames2.push({
        frame: 40,
        value: 1
    });

    zSlide.setKeys(keyFrames2);

    // X ROTATE
    const xRotate = new BABYLON.Animation("xRotate", "rotation.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames3 = []; 

    keyFrames3.push({
        frame: 0,
        value: -1.5708
    });

    keyFrames3.push({
        frame: 10,
        value: -1.5708
    });

    keyFrames3.push({
        frame: 20,
        value: -1.5708-1.5708-1.5708
    });

    keyFrames3.push({
        frame: 30,
        value: -1.5708-1.5708-1.5708
    });

    keyFrames3.push({
        frame: 40,
        value: -1.5708
    });

    xRotate.setKeys(keyFrames3);

    //object.animations.push(xSlide);
    object.animations.push(zSlide);
    object.animations.push(xRotate);

    scene.beginAnimation(object, 0, 40, true);
}

var doorAnimation = function(scene, object){
    const frameRate = 20;

    // X SLIDE
    const zSlide = new BABYLON.Animation("zSlide", "position.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    const keyFrames = []; 

    keyFrames.push({
        frame: 0,
        value: 0.3
    });

    keyFrames.push({
        frame: frameRate,
        value: 5
    });

    keyFrames.push({
        frame: 2 * frameRate,
        value: 5
    });

    keyFrames.push({
        frame: 3 * frameRate,
        value: 0.3
    });

    zSlide.setKeys(keyFrames);

    object.animations.push(zSlide);

    scene.beginAnimation(object, 0, 3 * frameRate, true);
}

var lamboAnimation = function(scene, object){
    const animCar = new BABYLON.Animation("carAnimation", "position.z", 10, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const carKeys = []; 

    carKeys.push({
    frame: 0,
    value: 100
    });


    carKeys.push({
    frame: 200,
    value: -100
    });

    animCar.setKeys(carKeys);

    object.animations = [];
    object.animations.push(animCar);

    scene.beginAnimation(object, 0, 200, true);
}

var createSensors = function(scene){
    
    // Sensor 1
    var sensor1 = BABYLON.MeshBuilder.CreateBox("sensor 1", {height: 2, width: 1, depth: 2});
    sensor1.checkCollisions = true;
    sensor1.position = new BABYLON.Vector3(-20, 1, 3);
    //sensor2.isVisible = false;

    // Sensor 2
    // var sensor2 = BABYLON.MeshBuilder.CreateBox("sensor 2", {height: 2, width: 1, depth: 2});
    // sensor2.checkCollisions = true;
    // sensor2.position = new BABYLON.Vector3(0, 1, 0);
    // //sensor2.isVisible = false;

    // var sensors = [sensor1, sensor2]

    // return sensors;
    return sensor1;
}


// main function
var main = async function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = await createScene(engine);
    var camera = createCamera(scene, canvas);

    // create objects
    createPlane(scene);
    createRoad(scene);
    createBoundaries(scene);
    createStairs(scene);
    createStands(scene);
    createSkybox(scene);
    createOuterbounds(scene);
    createArt(scene);
    createSign(scene);
    var door = createDoor(scene);
    //var sensor1 = createSensors(scene);
    // var sensorOne = sensors[0];
    // var sensorTwo = sensors[1];

    camera.onCollide = function (colMesh) {
        if (colMesh.uniqueId === door.uniqueId) {
            console.log("collision");
            doorAnimation(scene, door);
		}
	}

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

    // CAR
    var carTask = assetsManager.addMeshTask("carTask", "", "https://assets.babylonjs.com/meshes/", "car.glb");
    carTask.onSuccess = function(task){
    
        task.loadedMeshes.forEach(function(mesh, particleSystems, skeletons, animationGroups) {
            //console.log("mesh: " + mesh);

            const car = scene.getMeshByName("car");
            car.position = new BABYLON.Vector3(-1.3, 1.67, 1);
            car.rotation = new BABYLON.Vector3(Math.PI / 2, 0, -Math.PI / 2);

            //wheel animation
            const wheelRB = scene.getMeshByName("wheelRB");
            const wheelRF = scene.getMeshByName("wheelRF");
            const wheelLB = scene.getMeshByName("wheelLB");
            const wheelLF = scene.getMeshByName("wheelLF");
            
            // wheel animation dont work bruh
            //wheelAnimation(scene, car);
            // scene.beginAnimation(wheelRB, 0, 30, true);
            // scene.beginAnimation(wheelRF, 0, 30, true);
            // scene.beginAnimation(wheelLB, 0, 30, true);
            // scene.beginAnimation(wheelLF, 0, 30, true);

            carAnimation(scene, car);
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

    // tree 1
    var treeTask1 = assetsManager.addMeshTask("treeTask1", "", "./Assets/trees/OBJ/04/", "Col_1_tree_4.obj");
    treeTask1.onSuccess = function(task) {

        task.loadedMeshes.forEach(function(mesh) {
            console.log("tree mesh: " + mesh.name);
            mesh.position = new BABYLON.Vector3(-10, 0, 20);
            mesh.scaling.scaleInPlace(0.7);
            //mesh.rotation.y = -Math.PI/4;
            mesh.rotation.x = -Math.PI / 2;
        });
    }

    // tree 2
    var treeTask2 = assetsManager.addMeshTask("treeTask2", "", "./Assets/trees/OBJ/03/", "Col_1_tree_3.obj");
    treeTask2.onSuccess = function(task) {

        task.loadedMeshes.forEach(function(mesh) {
            console.log("tree mesh: " + mesh.name);
            mesh.position = new BABYLON.Vector3(-10, 0, -20);
            mesh.scaling.scaleInPlace(0.7);
            //mesh.rotation.y = -Math.PI/4;
            mesh.rotation.x = -Math.PI / 2;
        });
    }

    var lamboTask = assetsManager.addMeshTask("lamboTask", "", "./Assets/Lambo/", "copy-of-lamborghini-aventador.obj");
    lamboTask.onSuccess = function(task) {

        task.loadedMeshes.forEach(function(mesh) {
            //console.log("mesh: " + mesh.name);
            mesh.position = new BABYLON.Vector3(-38, -0.1, 0);
            //Scale the model down        
            mesh.scaling.scaleInPlace(0.9);
            mesh.rotation.y = -Math.PI/2;
        
            lamboAnimation(scene, mesh);
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


    var music = new BABYLON.Sound("Music", "Music/music1.mp3", scene, null, {
        loop: true,
        autoplay: true
      });

    BABYLON.Engine.audioEngine.setGlobalVolume(0.01);
}

main();