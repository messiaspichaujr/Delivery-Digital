import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';

const fireFragmentShader = `
  uniform vec2 u_resolution;
  uniform float u_time;
  
  // Função de ruído (noise)
  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
  }
  
  float fbm (in vec2 st) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      for (int i = 0; i < 5; ++i) {
          v += a * noise(st);
          st = st * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    
    vec2 q = vec2(0.0);
    q.x = fbm(st + 0.1*u_time);
    q.y = fbm(st + vec2(1.0));
    
    vec2 r = vec2(0.0);
    r.x = fbm(st + 1.0*q + vec2(1.7, 9.2) + 0.15*u_time);
    r.y = fbm(st + 1.0*q + vec2(8.3, 2.8) + 0.12*u_time);
    
    float f = fbm(st+r);
    
    // 1. A cor base (Preto)
    vec3 color = vec3(0.0, 0.0, 0.0);
    
    // 2. Cor das "Brasas" (Laranja BEM escuro)
    color = mix(color, vec3(0.25, 0.05, 0.0), smoothstep(0.4, 0.6, f));
    
    // 3. Cor do "Fogo" (Laranja Acento, mais sutil)
    color = mix(color, vec3(0.6, 0.3, 0.1), smoothstep(0.6, 0.7, f));
    
    // 4. Cor das "Faíscas" (Amarelo, mais fraco)
    color = mix(color, vec3(0.8, 0.5, 0.2), smoothstep(0.8, 0.85, f));

    gl_FragColor = vec4(color, 1.0);
  }
`;

class FireShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
      },
      fragmentShader: fireFragmentShader,
    });
  }
}

const ShaderPlane = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.material.uniforms.u_time.value = clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={ref} scale={[window.innerWidth, window.innerHeight, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={new FireShaderMaterial()} attach="material" />
    </mesh>
  );
};

export const FireBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
      <ShaderPlane />
    </Canvas>
  );
};