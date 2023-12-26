import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "./pages/Loader";
import Island from "./models/Island";
import Sky from "./models/Sky";
import Bird from "./models/Bird";
import Plane from "./models/Plane";
import Homeinfo from "./pages/Homeinfo";
import Flying_Dragon from "./models/Flying_Dragon";
{
  /*<div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        Popup
  </div>*/
}
const Home = () => {
  const [isRotating, setisRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustPlaneforScreeSize = () => {
    let screenScale, screenPosition;
    if (window.innerwidth < 768) {
      screenScale = [0.05, 0.05, 0.05];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [0.02, 0.02, 0.02];
      screenPosition = [0, -1.5, 0];
    }
    return [screenScale, screenPosition];
  };

  const adjustIslandforScreenSize = () => {
    let screenScale = null,
      screenPosition = [0, -6.5, -43],
      rotation = [0.1, 4.7, 0];

    if (window.innerwidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandforScreenSize();

  const [planeScale, planeposition] = adjustPlaneforScreeSize();

  return (
    <section
      className={`w-full h-screen relative ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <Homeinfo currentStage={currentStage} />}
      </div>
      <Canvas
        className="w-full h-screen relative"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          {/* <pointLight />
          <spotLight />*/}
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#00000"
            intensity={1}
          />
          {<Bird rotation={[0, 20.1, 0]} />}
          {/* <Flying_Dragon />*/}
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setisRotating={setisRotating}
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planeposition}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
