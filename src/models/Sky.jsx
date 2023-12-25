import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import skyscene from "../assets/3d/sky.glb";
import { useFrame } from "@react-three/fiber";

const Sky = ({ isRotating }) => {
  const sky = useGLTF(skyscene);
  const skyref = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      skyref.current.rotation.y += 0.1 * delta;
    }
  });

  return (
    <mesh ref={skyref}>
      {/*Here we are going to use a primitive element*/}
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
