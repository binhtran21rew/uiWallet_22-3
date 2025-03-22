import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";

const AnimatedSphere = ({ color }) => {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002;
      sphereRef.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[2, 128, 128]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.05}
        metalness={0.5}
        clearcoat={1}
        transmission={1}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

const SmallSphere = ({ position, color }) => {
  const smallSphereRef = useRef();
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (smallSphereRef.current) {
      smallSphereRef.current.position.y = position[1] + Math.sin(time) * 0.2;
    }
  });
  
  return (
    <mesh ref={smallSphereRef} position={position}>
      <sphereGeometry args={[0.3, 64, 64]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.2}
        metalness={0.4}
        clearcoat={1}
        transmission={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const BackgroundScene = () => {
  const [color, setColor] = useState("#ff9999");

  const changeColor = () => {
    const newColor = `hsl(${Math.random() * 360}, 80%, 70%)`;
    gsap.to(".color-text", { color: newColor, duration: 0.5 });
    gsap.to(".canvas-container", { backgroundColor: newColor, duration: 1 });
    setColor(newColor);
  };

  return (
    <div className="canvas-container relative w-screen h-screen flex justify-center items-center overflow-hidden">
      {/* <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <AnimatedSphere color={color} />
        <SmallSphere position={[-2, -1, 0]} color={color} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} />
          <Noise opacity={0.2} />
        </EffectComposer>
        <SmallSphere position={[2, 1, 0]} color={color} />
      </Canvas> */}
      <button
        className="absolute text-white text-lg font-bold p-4 rounded color-text"
        onClick={changeColor}
      >
        Change Color
      </button>
    </div>
  );
};

export default BackgroundScene;
