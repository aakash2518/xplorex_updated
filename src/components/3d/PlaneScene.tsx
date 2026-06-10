"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { PlaneModel } from "./PlaneModel";

export default function PlaneScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none w-screen h-screen">
      <Canvas
        shadows={false}
        // Cap DPR at 1.5 — 2.0 doubles GPU pixel count for minimal visual gain
        dpr={isMobile ? 1 : [1, 1.5]}
        style={{ pointerEvents: 'none' }}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: true
        }}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow={false} />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <Suspense fallback={null}>
          <PlaneModel
            scale={isMobile ? 0.0025 : 0.0035}
            position={[0, 0, 0]}
            rotation={[0, -Math.PI / 4, 0]}
          />
          <Environment preset="city" />
          {/* ContactShadows removed — expensive shadow texture render every frame */}
        </Suspense>
      </Canvas>
    </div>
  );
}
