"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
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
        shadows={!isMobile} 
        dpr={isMobile ? 1 : [1, 2]} 
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
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow={!isMobile} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Suspense fallback={null}>
          <PlaneModel 
            scale={isMobile ? 0.0025 : 0.0035} 
            position={[0, 0, 0]} 
            rotation={[0, -Math.PI / 4, 0]} 
          />
          <Environment preset="city" />
          {!isMobile && (
            <ContactShadows 
              position={[0, -1.5, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4.5} 
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
