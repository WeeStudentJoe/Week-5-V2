import {
  Scene,
  Mesh,
  HemisphericLight,
  Camera,
  PhysicsAggregate,
} from "@babylonjs/core";

export interface SceneData {
      scene: Scene;
      light?: HemisphericLight;
      ground?: PhysicsAggregate;
      camera?: Camera;
      box1?: PhysicsAggregate;
      box2?: PhysicsAggregate;
      farmer?:TransformNode;
      farmerWalkAnimation?:AnimationGroup;
      farmerIdleAnimation?:AnimationGroup;
      
      
}