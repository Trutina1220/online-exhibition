var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
const createScene =  () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI/2, Math.PI/2, 0, new BABYLON.Vector3(0,2,0));
    //2nd param is horizontal rotation
    //3rd param is vertical rotation
    //4th param is radius
    camera.attachControl(canvas, true);

    const light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1));
    const light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0));   
    light1.intensity =0.75;
    light2.intensity =0.5;

    var room = BABYLON.SceneLoader.Append("Assets/Room/", "scene.gltf", scene, function (a) {
        // Create a default arc rotate camera and light.
        //scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        //scene.activeCamera.alpha += Math.PI;
        console.log(a);
        for (mesh in a.meshes){
            // x
            a.meshes[mesh].position.x = 1.5
            a.meshes[mesh].position.y = 0
        }
    });

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