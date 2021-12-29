import { createPointerLock } from "./pointerLock.js";

var canvas = document.getElementById("renderCanvas");


var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
const createScene =  () => {
    const scene = new BABYLON.Scene(engine);

    // CAMERA ---------------------------

    // const camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI/2, Math.PI/2, 0, new BABYLON.Vector3(0,2,0));
    // //2nd param is horizontal rotation
    // //3rd param is vertical rotation
    // //4th param is radius
    // camera.attachControl(canvas, true);


    let camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 2, 0), scene);
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


    // adding gravity
    scene.gravity = new BABYLON.Vector3(0,0,0);
    scene.enablePhysics(scene.gravity, new BABYLON.CannonJSPlugin());

    scene.collisionsEnabled = true;
    scene.workerCollisions = true;

    camera.ellipsoid = new BABYLON.Vector3(0.9, 1, 0.9);
    camera.checkCollisions = true;
    camera.applyGravity = true;

    


    // SCENE ---------------------------
    const light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1));
    const light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0));   
    light1.intensity =0.75;
    light2.intensity =0.5;

    // PLANE
    var plane = BABYLON.MeshBuilder.CreatePlane("ground", {height: 30,width: 50}, scene)
    //plane.position.y = 0;
    //plane.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
    plane.rotation.x = Math.PI / 2;
    plane.collisionsEnabled = true;
    plane.checkCollisions = true;

    // ROOM
    var room = BABYLON.SceneLoader.Append("Assets/Room/", "scene.gltf", scene, function (a) {
        console.log(a);
        const roommesh = a.meshes[0];
        roommesh.position.x = 0;
        roommesh.position.y = -0.1;
        roommesh.position.z = 0;
        
    });

    // STANDS
    // red tablecloth
    // var redmat = new BABYLON.StandardMaterial("redmat", scene);
    // var redtexture = new BABYLON.Texture("Assets/redtablecloth.jpg", scene);
    // redmat.diffuseTexture = redtexture;

    // var StandFaceUV = [];
	// StandFaceUV[0] = new BABYLON.Vector4(1, 0, 0, 1);
    // StandFaceUV[1] = new BABYLON.Vector4(1, 0, 0.32, 1);
    // StandFaceUV[2] = new BABYLON.Vector4(0, 0, 0.25, 1);

    // var tablecloth = BABYLON.SceneLoader.Append("Assets/tablecloth/", "scene.gltf", scene, function (b) {
    //     //console.log(a);
    //     const tableclothmesh = b.meshes[0];
    //     tableclothmesh.position.x = 0;
    //     tableclothmesh.position.y = 1;
    //     tableclothmesh.position.z = 0;
        
    // });

    var stand1 = BABYLON.MeshBuilder.CreateBox("stand1", {height: 1, width: 1, depth: 3});
    stand1.checkCollisions = true;
    stand1.position = new BABYLON.Vector3(-10, 1, 0.25);
    

    return scene;
}
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene        
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});