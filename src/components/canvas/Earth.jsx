import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useFrame } from "@react-three/fiber";

const Earth = () => {
  const { scene } = useGLTF("./planet/scene.gltf");

  // Rotate the Earth continuously
  useFrame(() => {
    scene.rotation.y += 0.01; // Rotate the Earth slowly
  });

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, 0, 0]}
    />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
