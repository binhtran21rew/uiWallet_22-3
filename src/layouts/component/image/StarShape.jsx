import React, { useMemo, useRef} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox, Torus } from "@react-three/drei";
import * as THREE from 'three';


function createStarShape(sides, innerRadius, outerRadius){
  const shape = new THREE.Shape();
  let theta = 0;
  const inc = ((2 * Math.PI) / sides) * 0.5;

  shape.moveTo(Math.cos(theta) * outerRadius, Math.sin(theta) * outerRadius);

  for (let i = 0; i < sides; i++) {
    theta += inc;
    shape.lineTo(Math.cos(theta) * innerRadius, Math.sin(theta) * innerRadius);
    theta += inc;
    shape.lineTo(Math.cos(theta) * outerRadius, Math.sin(theta) * outerRadius);
  }

  return shape;
}

function StarMesh({ sides = 4, innerRadius = 5, outerRadius = 15, scale = [0.02, 0.02, 0.038] }) {
  const shape = useMemo(() => createStarShape(sides, innerRadius, outerRadius), [sides, innerRadius, outerRadius]);
  const geometry = useMemo(() => new THREE.ExtrudeGeometry(shape, {
    depth: 10,
    steps: 1,
    bevelEnabled: false,
  }), [shape]);

  return (
    <mesh geometry={geometry} scale={scale}>
      <meshStandardMaterial color={"rgb(255, 254, 254)"}  />
    </mesh>
  );
}

function CircleWithStar({position, args, scale, rotation}) {
  const ref = useRef(null);

  const timeRef = useRef(0);
  
  useFrame((state, delta) => {
    const current = ref.current
    if (!current) return

    timeRef.current += delta
    current.rotation.x = Math.sin(timeRef.current * 2) * 0.3; 

    current.position.y = position[1] + Math.sin(timeRef.current * 1.5) * 0.1;
  })

  return (
    <group ref={ref} scale={scale} position={position} rotation={rotation}>
      <Torus args={args}>
        <meshStandardMaterial color="#e8e8f8" roughness={0.3} metalness={0.2} />
        <StarMesh />
      </Torus>
    </group>
  );
}

function BoxWithStar({position, args, radius, scale, rotation}){
  const ref = useRef(null);

  const timeRef = useRef(5);
  
  useFrame((state, delta) => {
    const current = ref.current
    if (!current) return

    timeRef.current += delta
    current.rotation.x = Math.sin(timeRef.current * 2) * 0.1; 

    current.position.y = position[1] + Math.sin(timeRef.current * 1.5) * 0.1;
  })
  return (
    <group ref={ref} scale={scale} position={position} rotation={rotation}>
      <RoundedBox  args={args} radius={radius} smoothness={4} >
        <meshStandardMaterial color="#e8e8f8" roughness={0.3} metalness={0.2} />
        <StarMesh />
      </RoundedBox>
    </group>
  );
}

function StarShape({...props}) {
  const degree = Math.PI / 180;
  return (
    <Canvas>
      {/* <OrbitControls/> */}
      <ambientLight intensity={props.blur || 1} />
      <directionalLight position={[1, .5, 1]} intensity={3} castShadow />
      <CircleWithStar scale={[3,3, 1.2]}  position={[-.9, 0, -.2]} args={[.4, 0.1, 10, 50]} rotation={[20 * degree,  -20*degree,  -10*degree]}/>
      <BoxWithStar scale={[4,4,1.2]} position={[1.8, .6, .8]} args={[.8, .8, .39]} radius={0.2} rotation={[-10 * degree,  10*degree,  -5*degree]}/>
    </Canvas>
  );
}

export default StarShape;