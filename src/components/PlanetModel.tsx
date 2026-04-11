"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Planet = () => {
  const planet = useGLTF("/planet/scene.gltf");

  return (
    <primitive object={planet.scene} scale={2.8} position-y={0} rotation-y={0} />
  );
};

const PlanetCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='always'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 8], // Moved camera slightly back (8 instead of 6)
      }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          onStart={() => {
            window.dispatchEvent(new CustomEvent("portfolio:start-music"));
          }}
        />
        <Planet />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default PlanetCanvas;
