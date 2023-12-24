import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "./pages/Loader";
import Island from "./models/Island";
import Sky from "./models/Sky";
import Bird from "./models/Bird";
import Plane from "./models/Plane";
{
  /*<div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        Popup
  </div>*/
}
const Home = () => {
  const [isRotating, setisRotating] = useState(false);

  const adjustPlaneforScreeSize = () => {
    let screenScale, screenPosition;
    if (window.innerwidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
    } else {
      screenScale = [3, 3, 3];
    }
    return screenScale;
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

  return (
    <section
      className={`w-full h-screen relative ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
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
          <Bird />
          <Sky />
          <Island
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setisRotating={setisRotating}
          />
          <Plane />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
