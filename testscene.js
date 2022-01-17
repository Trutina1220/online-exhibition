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
    
    //Light direction is directly down from a position one unit up, slow decay
	// var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-1, 1, -1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 10, scene);
	// light.diffuse = new BABYLON.Color3(1, 0, 0);
	// light.specular = new BABYLON.Color3(0, 1, 0);
	
	//Light direction is directly down from a position one unit up, fast decay
	var light1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(1, 1, 1), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 50, scene);
	light1.diffuse = new BABYLON.Color3(1, 1, 0);
	light1.specular = new BABYLON.Color3(1, 1, 0);

	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4}, scene);	

    return scene;
}

// function to create camera
var createCamera = function (scene, canvas) {

    //var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(-18, 2, 0), scene);
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);
    camera.setTarget(new BABYLON.Vector3(0,2,2));
    //camera.setTarget(BABYLON.Vector3.Zero());


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
    //plane.material = grassMat;
}

var mammothAnimation = function(scene, object){
    const frameRate = 2;
    const angle = 0.523599;

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

    object.animations.push(xRotate);

    scene.beginAnimation(object, 0, 2 * frameRate, true);
}

var main = async function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = await createScene(engine, canvas);

    createPlane(scene);

    // load meshes
    var assetsManager = new BABYLON.AssetsManager(scene);

    // SAMBA WORKS
    // var sambaTask = assetsManager.addMeshTask("sambaTask", "", "https://assets.babylonjs.com/meshes/", "HVGirl.glb");
    // sambaTask.onSuccess = function(task){
    
    //     task.loadedMeshes.forEach(function(mesh, particleSystems, skeletons, animationGroups) {
    //         console.log("mesh: " + mesh);

    //         //Scale the model down        
    //         mesh.scaling.scaleInPlace(0.1);

    //         //Get the Samba animation Group
    //         const sambaAnim = scene.getAnimationGroupByName("Samba");

    //         //Play the Samba animation  
    //         //sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
    //     });

    // }

    // MAMMOTH WORKS
    // var mammothTask = assetsManager.addMeshTask("mammothTask", "", "./Assets/Mammoth/", "woolly-mammoth-skeleton.obj");
    // mammothTask.onSuccess = function(task) {

    //     task.loadedMeshes.forEach(function(mesh) {
    //         console.log("mesh: " + mesh.name);
    //         mesh.position = new BABYLON.Vector3(0, 2, 0);
    //         //Scale the model down        
    //         mesh.scaling.scaleInPlace(0.001);

    //         if (mesh.name.includes("Plane")){
    //             mesh.visibility = 0;
    //         }
            
    //         var mammothMat = new BABYLON.StandardMaterial("mammothMat", scene);
    //         mammothMat.diffuseTexture = new BABYLON.Texture("./Assets/Mammoth/ClayColor.jpg", scene);
    //         mesh.material = mammothMat;

    //         mammothAnimation(scene, mesh);
    //     });
    // }

    

    // var jessieTask = assetsManager.addMeshTask("jessieTask", "", "./Assets/Figures/glb/", "jessie_thief_geo.glb");
    // jessieTask.onSuccess = function(task) {

    //     task.loadedMeshes.forEach(function(mesh) {
    //         console.log("mesh: " + mesh.name);
    //         mesh.position = new BABYLON.Vector3(0, 0, 0);
    //         //Scale the model down        
    //         //mesh.scaling.scaleInPlace(0.001);
            
    //         var jessieMat = new BABYLON.StandardMaterial("jessieMat", scene);
    //         //jessieMat.diffuseTexture = new BABYLON.Texture("./Assets/Figures/Textures/jessie_thief_face_1.png", scene);
    //         var myDynamicTexture = new BABYLON.DynamicTexture("./Assets/Figures/Textures/jessie_thief_face_1.png", scene);
    //         jessieMat.diffuseTexture = myDynamicTexture;
    //         mesh.material = jessieMat;
    //     });

    // }

    // var chairTask = assetsManager.addMeshTask("chairTask", "", "./Assets/Chair/", "scene.gltf");
    // chairTask.onSuccess = function(task) {
    //     //var transformNode = scene.getTransformNodeByName("chairRoot");

    //     task.loadedMeshes.forEach(function(mesh) {
    //         console.log("Chair mesh: " + mesh.name);
    //         //mesh.position = new BABYLON.Vector3(0, 0, 0);
    //         mesh.position = new BABYLON.Vector3(-20, 17.3, 10);
    //         var temp = 0.03;
    //         mesh.scaling = new BABYLON.Vector3(temp,temp,temp);
    //         mesh.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
    //         //mesh.parent = transformNode;
    //     });

    //     //transformNode.scaling = new BABYLON.Vector3(0.04, 0.04, 0.04);

    // }

    // var chairTask = assetsManager.addMeshTask("chairTask", "", "./Assets/Chair/", "scene.gltf");
    // chairTask.onSuccess = function(task) {

    //     task.loadedMeshes.forEach(function(mesh) {
    //         console.log("Chair mesh: " + mesh.name);
    //         mesh.position = new BABYLON.Vector3(0, 50, 0);
    //         mesh.scaling.scaleInPlace(0.01);
    //         //mesh.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
          
    //     });

    // }

    // BUMBLEBEE TRANSFORMER
    // var bumbleTask = assetsManager.addMeshTask("bumbleTask", "", "./Assets/Transformer/", "bumblebee-transformer-animation.obj");
    // bumbleTask.onSuccess = function(task) {

    //     task.loadedMeshes.forEach(function(mesh) {
    //         console.log("transfo mesh: " + mesh.name);
    //         mesh.position = new BABYLON.Vector3(0, 0, 0);
    //         mesh.scaling.scaleInPlace(0.01);
          
    //         if (mesh.name.includes("Plane")){
    //             mesh.visibility = 0;
    //         }
    //     });
    // }

    // Cruiser
    // var cruiserTask = assetsManager.addMeshTask("cruiserTask", "", "./Assets/Cruiser/", "light-cruiser-tenryuu.obj");
    // cruiserTask.onSuccess = function(task) {

    //     task.loadedMeshes.forEach(function(mesh) {
    //         console.log("transfo mesh: " + mesh.name);
    //         mesh.position = new BABYLON.Vector3(10, 0, 0);
    //         mesh.scaling.scaleInPlace(1);
          
    //         if (mesh.name.includes("Plane")){
    //             mesh.visibility = 0;
    //         }
    //     });
    // }

      // CAR
      var carTask = assetsManager.addMeshTask("carTask", "", "https://assets.babylonjs.com/meshes/", "car.glb");
      carTask.onSuccess = function(task){
      
          task.loadedMeshes.forEach(function(mesh, particleSystems, skeletons, animationGroups) {
              console.log("mesh: " + mesh);
  
              const car = scene.getMeshByName("car");
              car.position = new BABYLON.Vector3(0, 2, 0);
              car.scaling.scaleInPlace(1);
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