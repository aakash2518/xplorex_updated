"use client";

import React, { useRef } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

export function PlaneModel(props: React.ComponentProps<"group">) {
  const { scene } = useGLTF("/assets/plane.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  
  // Dynamic Flight Path
  // X: [Right, Left, Right, Center, Left]
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [4, -4, 4, 0, -5]);
  // Y: [Middle, Top, Bottom, Middle, Middle]
  const y = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 2, -2, 0, 1]);
  // Z: [Near, Far, Near, Far, Near]
  const z = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -5, 0, -8, -2]);
  
  // Rotation (Banking and Pitching)
  const rotationY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [Math.PI / 2, Math.PI + 0.5, Math.PI * 2, Math.PI * 2.5, Math.PI * 3]);
  const rotationZ = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -0.5, 0.5, -0.3, 0.3, 0]); // Banking
  const rotationX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0.2, -0.2, 0.1, 0]); // Pitching

  // Smooth mouse rotation (subtle on top of scroll)
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;
    
    // Smoothly interpolate to scroll-linked values
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x.get(), 0.1);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y.get(), 0.1);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, z.get(), 0.1);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotationX.get() + mouseY * 0.1, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY.get() + mouseX * 0.2, 0.1);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, rotationZ.get(), 0.1);
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} {...props} dispose={null}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

// Preload the model
useGLTF.preload("/assets/plane.glb");
