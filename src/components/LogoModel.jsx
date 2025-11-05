import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three'; 
import logoEspetinho from '../assets/LogoEspetinho.png';

function LogoPlane() {
  const ref = useRef();

  const texture = useTexture(logoEspetinho);

  useFrame((state, delta) => {

    ref.current.rotation.y += delta * 0.3;

    const targetX = (state.mouse.y * 0.2); 
    const targetY = (state.mouse.x * 0.2);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.05);
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
  });

  const logoLargura = 4;
  const logoAltura = 4; 

  return (
    <mesh ref={ref}>
      <planeGeometry args={[logoLargura, logoAltura]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export const LogoModel = () => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        
        <ambientLight intensity={3} /> 

        <LogoPlane />
        
      </Canvas>
    </div>
  );
};