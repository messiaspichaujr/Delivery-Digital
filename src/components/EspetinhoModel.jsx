import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function Modelo(props) {

  const { scene } = useGLTF('/assets/espetinho.glb');
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5; 
  });


  return <primitive ref={ref} object={scene} scale={2.5} {...props} />;
}

export const EspetinhoModel = () => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>

        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -5, -5]} intensity={1} color="#EAAA49" />
        
        <Modelo />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};