import React from "react";
import planeScene from "../assets/3d/f16_plane.glb";
import { useGLTF } from "@react-three/drei";
const Plane = () => {
  const { scene, animations } = useGLTF(planeScene);
  return (
    <mesh scale={[0.02, 0.02, 0.02]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
