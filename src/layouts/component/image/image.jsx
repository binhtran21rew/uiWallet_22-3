import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame,  useThree } from "@react-three/fiber";

import * as THREE from 'three';
import gsap from "gsap";



import {vertexShaderShpere, fragmentShaderShpere, vertexShaderShpereColor, fragmentShaderShpereColor} from '../../../component/shader';

const positon = [0,0.7,0];

const Sphere = () => {
  
  const meshRef = useRef();

  const icosahedronGeometry = useMemo(() => new THREE.IcosahedronGeometry(.6, 50), []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: vertexShaderShpere,
    fragmentShader: fragmentShaderShpere,
    uniforms: { uTime: { value: 0 } },
    toneMapped: true,
    depthWrite: true,

  }), []);

  const boderIcoGeometry = useMemo(() => new THREE.SphereGeometry(1), []);

  const boderIcoGeometryColor = useMemo(() => new THREE.MeshBasicMaterial({
    color: "rgb(255, 255, 255)",
  }), []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() / 5;
    }
    material.uniforms.uTime.value = clock.getElapsedTime() / 10;
    material.needsUpdate = true;
  });

  
  return (
    <>
      <mesh renderOrder={10} position={positon} castShadow ref={meshRef} material={material} geometry={icosahedronGeometry} />
      <mesh renderOrder={10} position={[0,0.71,0]} scale={[0.62, 0.62, 0.5]} material={boderIcoGeometryColor} geometry={boderIcoGeometry} />
    </>
  );
};


const DissolveMaterial = () => {
  const pointsRef = useRef(null);
  const count = 500;
  const yMax = 1.5;


  const generateGeometry = () => {
    const particle = new THREE.BufferGeometry();
    const posArray = new Float32Array(count * 3);
    const radius = 0.8;
  
    for(let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius; // sqrt for even distribution
  
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (Math.random() + 0.5) * 1; // slight vertical variation
  
      const index = i * 3;
      posArray[index] = x;
      posArray[index + 1] = y;
      posArray[index + 2] = z;
    }
  
    particle.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    return particle;
  };

  const [geometry, setGeometry] = useState(() => generateGeometry());
  const scaleRef = useRef({ x: 0.8, y: 0.8, z: 0.8 });
  const [scale, setScale] = useState([.8, .8, .8]);


  useEffect(() => {
    const grow = setInterval(() => {
      gsap.to(scaleRef.current, {
        x: 1, y: 1, z: 1,
        duration: 1,
        onUpdate: () => {
          setScale([scaleRef.current.x, scaleRef.current.y, scaleRef.current.z]);
        }
      });
    }, 15000);
    const shrink = setInterval(() => {
      gsap.to(scaleRef.current, {
        x: 0.8, y: 0.8, z: 0.8,
        duration: 1,
        onUpdate: () => {
          setScale([scaleRef.current.x, scaleRef.current.y, scaleRef.current.z]);
        }
      });
    }, 18000);

    const interval = setInterval(() => {
      const newGeom = generateGeometry();
      setGeometry(prev => {
        prev.dispose(); 
        return newGeom;
      });
    }, 15800);

    return () => {
      clearInterval(interval);
      clearInterval(grow);
      clearInterval(shrink);
    };
  }, []);

  const material = useMemo(() => new THREE.PointsMaterial({
    color: "rgb(255, 101, 101)",
    size: 0.02,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  }), []);
  
  useFrame(() => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const positions = posAttr.array;

    for (let i = 0; i < count; i++) {
      const index = i * 3 + 1;
      positions[index] += Math.random() * 0.004;

      if (positions[index] > yMax) {
        positions[index] = 9999;
      }
    }

    posAttr.needsUpdate = true;
  });


  const materialColor = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: vertexShaderShpereColor,
    fragmentShader: fragmentShaderShpereColor,
    transparent: true,
    depthWrite: false,
    toneMapped: false, 
    uniforms: {
      color: { value: new THREE.Color("#ff0000") }
    }
  }), []);

  return (
    <>
      <mesh renderOrder={5} scale={scale} position={[0, .7, 0]} material={materialColor}  geometry={new THREE.RingGeometry(0)}/>
      <points 
        ref={pointsRef} 
        renderOrder={1} 
        position={[0, -0.6, -1]} 
        scale={[1.22, 1.5, 1]} 
        geometry={geometry} 
        material={material} 
      />
    </>
  );
}


const LineSphere = ({scale}) => {
  const lineSphere = useMemo(() => new THREE.RingGeometry(1, 1.04, 200, 10), []);

  const boderlineSphereColor = useMemo(() => new THREE.MeshStandardMaterial({
    color: "rgb(255, 255, 255)",
    wireframe: true,
    opacity: 0.03,
    transparent: true,
    toneMapped: false,

  }), []);


  return(
    <>
      <mesh position={positon} scale={scale} material={boderlineSphereColor} geometry={lineSphere}/>
    </>
  )
}

const Circle = ({positon}) => {
  const ref = useRef();


  const geometry = useMemo(() => new THREE.SphereGeometry(0.2, 32, 32), []);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "rgb(195, 195, 195)",
    opacity: 0.4,
    transparent: true,
  }),[]);



  return (
    <mesh  position={positon} geometry={geometry} material={material}   castShadow/>
  );
}



const BackgroundScene = () => {

  
  return (
    <Canvas shadows>

      <directionalLight
        intensity={10}
        position={[10, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={3}/>

      <Sphere />
      <Circle positon={[-0.6, 1.6, 0]}/>
      <Circle positon={[1, -0.5, 0]}/>

      <LineSphere scale={[1.6, 1.6, 0.1]}/>
      <LineSphere scale={[1, 1, 0.1]}/>
      <DissolveMaterial />

    </Canvas>
  );
};

export default BackgroundScene;
