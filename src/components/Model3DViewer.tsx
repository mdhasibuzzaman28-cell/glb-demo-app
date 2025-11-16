import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Model3DProps {
  modelPath: string;
}

function Model({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  return (
    <group ref={groupRef}>
      <primitive object={scene.clone()} scale={1.5} />
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#22d3ee" wireframe />
    </mesh>
  );
}

export default function Model3DViewer({ modelPath }: Model3DProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={0.8} />

      <Suspense fallback={<Loader />}>
        <Model modelPath={modelPath} />
        <ContactShadows
          opacity={0.5}
          scale={20}
          blur={2}
          far={4}
          resolution={256}
          color="#000000"
        />
        <Environment preset="sunset" />
      </Suspense>

      <OrbitControls
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={20}
      />
    </Canvas>
  );
}
