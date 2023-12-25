import React, { useEffect, useRef } from "react";
import birdscene from "../assets/3d/bird.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const Bird = (...props) => {
  const { scene, animations } = useGLTF(birdscene);

  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef); //important to play animations
  console.log(actions);

  useEffect(() => {
    actions["Take 001"].play();
  }, []);
  useFrame(({ clock, camera }) => {
    // Update the Y position to simulate bird-like motion using a sine wave
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      // Moving backward
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
  });
  return (
    <mesh
      position={[-5, 1, 1]}
      scale={[0.003, 0.003, 0.003]}
      rotation={[0, 0, 0]}
      ref={birdRef}
    >
      <primitive object={scene} />
      {/*we use primitive when we want to use directlt embeded scenes*/}
    </mesh>
  );
};

export default Bird;
