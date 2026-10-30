import type { SceneData } from "./interfaces";

import {
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  HemisphericLight,
  PointLight,
  SpotLight,
  DirectionalLight,
  Color3,
  ShadowGenerator,
  Engine,
  SceneComponentConstants,
  Size,
  CreateIcoSphere,
  IcoSphereBlock,
} from "@babylonjs/core";



function createPointLight(scene: Scene) {
  const light = new PointLight("light", new Vector3(-1, 1, 0), scene);
  light.position = new Vector3(5, 20, 10);
  light.intensity = 0.3;
  light.diffuse = new Color3(0.5, 1, 1);
  light.specular = new Color3(0.8, 1, 1);
  return light;
}

function createDirectionalLight(scene: Scene) {
  const light = new DirectionalLight("light", new Vector3(0.2, -1, 0.2), scene);
  light.position = new Vector3(20, 40, 20);
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 0, 0);
  light.specular = new Color3(0, 1, 0);
  return light;
}

function createSpotLight(scene: Scene) {
  const light = new SpotLight(
    "light",
    new Vector3(1, 5, -3),
    new Vector3(0, -1, 0),
    Math.PI / 3,
    20,
    scene
  );
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 0, 0);
  light.specular = new Color3(0, 1, 0);
  return light;
}

function createHemisphericLight(scene: Scene) {
  const light: HemisphericLight = new HemisphericLight(
    "light",
    new Vector3(1, 10, 0),
    scene
  );
  light.intensity = 0.3;
  light.diffuse = new Color3(1, 0, 0);
  light.specular = new Color3(0, 1, 0);
  light.groundColor = new Color3(0, 1, 0);
  return light;
}

function createShadows(light: DirectionalLight, sphere: Mesh, box: Mesh) {
  const shadower = new ShadowGenerator(1024, light);
  const shadowmap: any = shadower.getShadowMap();
  shadowmap.renderList.push(sphere, box);

  shadower.setDarkness(0.2);
  shadower.useBlurExponentialShadowMap = true;
  shadower.blurScale = 4;
  shadower.blurBoxOffset = 1;
  shadower.useKernelBlur = true;
  shadower.blurKernel = 64;
  shadower.bias = 0;
  return shadower;
}

function createBox(scene:Scene) {
  let box = MeshBuilder.CreateBox("box", {size: 1.5}, scene);
  box.position.y = 1;
  box.position.x = -4;
  box.position.z = 4;
  return box;
}

function createSphere(scene: Scene) {
  let sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 64 },
    scene
  );
  sphere.position.y = 1;
  sphere.position._x = 4;
  sphere.position.z = -4;
  return sphere;
}

function createIco(scene: Scene){
  let ico = MeshBuilder.CreateIcoSphere("ico", {radius: 1, radiusX: 1,radiusY: 1.5,radiusZ:1.5,subdivisions: 32},scene);
  ico.position.y = 2;
  ico.position.x = 4;
  ico.position.z = 4;

  return ico;
}

function createCylinder(scene: Scene) {
  let cylinder = MeshBuilder.CreateCylinder(
    "cylinder",
    { diameter: 2, height: 1, tessellation: 32 },
    scene
  );
  cylinder.position.y = 1;
  cylinder.position.x = -4;
  cylinder.position.z = -4;
  return cylinder;
}

function createGround(scene: Scene) {
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 12, height: 12},
    scene
  );
  var groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.backFaceCulling = false;
  ground.material = groundMaterial;
  ground.receiveShadows = true;
  return ground;
}

function CreateWall(scene: Scene) {
  let wall = MeshBuilder.CreatePlane("Wall", { width: 12, height:12 }, scene);

  var wallMaterial = new StandardMaterial("wallMaterial", scene);
 wallMaterial.backFaceCulling = false;
  wall.material =wallMaterial;
  wall.receiveShadows = true;
 
  
  
  return wall;
}

function CreatSecondWall(scene:Scene){
  let Secondwall = MeshBuilder.CreatePlane("Secondwall", { width: 12, height: 12 }, scene);
  var wallMaterial = new StandardMaterial("wallMaterial", scene);
  Secondwall.rotation.set(0, Math.PI / 2, Math.PI / 2);
 wallMaterial.backFaceCulling = false;
  Secondwall.material = wallMaterial;
  Secondwall.receiveShadows = true;

  return Secondwall;
  
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 10,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );
  camera.attachControl(true);
  return camera;
}

export default function createStartScene(engine: Engine) {
  let scene = new Scene(engine);
  let box = createBox(scene);
  let lightBulb = createPointLight(scene);
  let lightDirectional = createDirectionalLight(scene);
  let lightSpot = createSpotLight(scene);
  let lightHemispheric = createHemisphericLight(scene);
  let sphere = createSphere(scene);
  let cylinder = createCylinder(scene);
  let ground = createGround(scene);
  let wall = CreateWall(scene);
  let SecondWall = CreatSecondWall(scene);
  let ico = createIco(scene);
  let camera = createArcRotateCamera(scene);

  let shadowGenerator = createShadows(lightDirectional, sphere, box);

  let that: SceneData = {
    scene,
    box,
    lightBulb,
    lightDirectional,
    lightSpot,
    lightHemispheric,
    sphere,
    cylinder,
    ground,
    wall,
    SecondWall,
   ico,
    camera,
    shadowGenerator,
  };
  return that;
}