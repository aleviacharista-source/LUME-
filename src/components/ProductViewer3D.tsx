import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, ZoomIn, Eye } from 'lucide-react';

interface ProductViewer3DProps {
  productModel?: 'serum' | 'lipstick' | 'foundation' | 'compact' | 'cream';
  productColor?: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  fallbackImage?: string;
  className?: string;
  interactive?: boolean;
}

// Procedural Cosmetic Models using Three.js geometry & PBR materials
function CosmeticModel({
  model = 'serum',
  color = '#E8C8CC',
  isHero = false,
}: {
  model?: 'serum' | 'lipstick' | 'foundation' | 'compact' | 'cream';
  color?: string;
  isHero?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && isHero) {
      // Subtle float & mouse responsiveness
      const mouse = state.pointer;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.4,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.2,
        0.05
      );
    }
  });

  const parsedColor = new THREE.Color(color);

  // Render model based on type
  switch (model) {
    case 'lipstick':
      return (
        <group ref={groupRef} position={[0, -0.6, 0]} dispose={null}>
          {/* Base outer casing - matte black */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.8, 32]} />
            <meshStandardMaterial color="#141414" metalness={0.8} roughness={0.25} />
          </mesh>

          {/* Luxury gold accent ring */}
          <mesh position={[0, 0.82, 0]}>
            <cylinderGeometry args={[0.385, 0.385, 0.05, 32]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Inner swivel cylinder - brushed gold */}
          <mesh position={[0, 1.05, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.5, 32]} />
            <meshStandardMaterial color="#E5C158" metalness={0.92} roughness={0.2} />
          </mesh>

          {/* Slanted lipstick bullet with user shade */}
          <group position={[0, 1.45, 0]}>
            <mesh castShadow position={[0, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.28, 0.55, 32]} />
              <meshStandardMaterial
                color={parsedColor}
                roughness={0.4}
                metalness={0.05}
              />
            </mesh>
            {/* Slanted tip */}
            <mesh position={[0, 0.28, 0]} rotation={[0.4, 0, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.26, 0.3, 32]} />
              <meshStandardMaterial
                color={parsedColor}
                roughness={0.4}
                metalness={0.05}
              />
            </mesh>
          </group>

          {/* Magnetic Base weight */}
          <mesh position={[0, -0.02, 0]}>
            <cylinderGeometry args={[0.39, 0.39, 0.04, 32]} />
            <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      );

    case 'foundation':
      return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
          {/* Frosted thick glass bottle */}
          <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.52, 1.3, 32]} />
            <meshPhysicalMaterial
              color="#FAF8F5"
              transmission={0.88}
              opacity={1}
              transparent
              roughness={0.2}
              ior={1.48}
              thickness={0.6}
            />
          </mesh>

          {/* Inside Liquid foundation matching shade */}
          <mesh position={[0, 0.58, 0]}>
            <cylinderGeometry args={[0.44, 0.46, 1.22, 32]} />
            <meshStandardMaterial color={parsedColor} roughness={0.35} metalness={0.05} />
          </mesh>

          {/* Bottle shoulder and collar */}
          <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.3, 0.5, 0.12, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.3} />
          </mesh>

          {/* Sleek pump head */}
          <mesh position={[0, 1.48, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.25, 32]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.1, 1.55, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.05, 0.2, 16]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Frosted luxury acrylic cap */}
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.48, 0.48, 0.65, 32]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.92}
              transparent
              roughness={0.1}
              thickness={0.4}
            />
          </mesh>
        </group>
      );

    case 'compact':
      return (
        <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0.4, 0.3, 0]}>
          {/* Bottom compact base */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.85, 0.85, 0.14, 48]} />
            <meshStandardMaterial color="#141414" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Powder / Cushion pan */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.04, 48]} />
            <meshStandardMaterial color={parsedColor} roughness={0.7} metalness={0.02} />
          </mesh>

          {/* Gold inner bezel */}
          <mesh position={[0, 0.075, 0]}>
            <ringGeometry args={[0.72, 0.76, 48]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
          </mesh>

          {/* Top lid open at angle */}
          <group position={[0, 0.08, -0.8]} rotation={[-1.7, 0, 0]}>
            <mesh position={[0, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.85, 0.85, 0.1, 48]} />
              <meshStandardMaterial color="#141414" metalness={0.85} roughness={0.25} />
            </mesh>
            {/* Mirror interior */}
            <mesh position={[0, 0.8, -0.06]}>
              <circleGeometry args={[0.74, 48]} />
              <meshStandardMaterial color="#E8E8E8" metalness={0.99} roughness={0.02} />
            </mesh>
          </group>
        </group>
      );

    case 'cream':
      return (
        <group ref={groupRef} position={[0, -0.3, 0]}>
          {/* Heavy glass jar base */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.78, 0.75, 0.65, 40]} />
            <meshPhysicalMaterial
              color="#FAF7F2"
              transmission={0.85}
              transparent
              roughness={0.15}
              thickness={0.8}
            />
          </mesh>

          {/* Inner luxury cream swirl */}
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.66, 0.64, 0.58, 32]} />
            <meshStandardMaterial color={parsedColor} roughness={0.3} metalness={0.02} />
          </mesh>

          {/* Metallic rose-gold lid */}
          <mesh position={[0, 0.82, 0]} castShadow>
            <cylinderGeometry args={[0.8, 0.8, 0.22, 40]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.2} />
          </mesh>
        </group>
      );

    case 'serum':
    default:
      return (
        <group ref={groupRef} position={[0, -0.6, 0]}>
          {/* Frosted luxury glass bottle body */}
          <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.42, 0.44, 1.25, 36]} />
            <meshPhysicalMaterial
              color="#FAF8F5"
              transmission={0.85}
              opacity={1}
              transparent
              roughness={0.18}
              ior={1.5}
              thickness={0.7}
            />
          </mesh>

          {/* Serum liquid core */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.36, 0.38, 1.15, 32]} />
            <meshStandardMaterial
              color={parsedColor}
              roughness={0.25}
              metalness={0.08}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* Shoulder ring */}
          <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.26, 0.42, 0.12, 32]} />
            <meshStandardMaterial color="#E8DED2" metalness={0.3} roughness={0.3} />
          </mesh>

          {/* Metallic black/gold collar */}
          <mesh position={[0, 1.44, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.18, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Rubber pipette bulb */}
          <mesh position={[0, 1.66, 0]} castShadow>
            <sphereGeometry args={[0.22, 32, 24]} />
            <meshStandardMaterial color="#2B2B2B" roughness={0.75} metalness={0.1} />
          </mesh>

          {/* Glass dropper tube inside */}
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.3, 16]} />
            <meshPhysicalMaterial color="#FFFFFF" transmission={0.95} transparent roughness={0.1} />
          </mesh>
        </group>
      );
  }
}

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({
  productModel = 'serum',
  productColor = '#E8C8CC',
  autoRotate = true,
  enableZoom = true,
  fallbackImage,
  className = '',
  interactive = true,
}) => {
  const [rotating, setRotating] = useState(autoRotate);
  const [zooming, setZooming] = useState(enableZoom);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const controlsRef = useRef<any>(null);

  // Check WebGL availability safely
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Graceful Fallback if WebGL unavailable
  if (!webglSupported && fallbackImage) {
    return (
      <div className={`relative flex items-center justify-center bg-[#F7F4EF] ${className}`}>
        <img
          src={fallbackImage}
          alt="Product visual"
          className="max-h-full max-w-full object-contain"
        />
        <span className="absolute bottom-4 left-4 text-xs tracking-widest text-[#777777] uppercase">
          3D View (Fallback)
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[350px] bg-[#F7F4EF] select-none ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.5, 3.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Soft Studio Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 8, 4]} intensity={1.4} castShadow shadow-mapSize={1024} />
        <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#E8DED2" />
        <spotLight position={[0, 5, 2]} intensity={0.9} angle={0.6} penumbra={0.8} />
        <pointLight position={[2, 3, 2]} intensity={0.6} color="#FFF8F0" />

        <Suspense fallback={null}>
          <Float speed={rotating ? 1.5 : 0} rotationIntensity={0.2} floatIntensity={0.3}>
            <CosmeticModel model={productModel} color={productColor} isHero={!interactive} />
          </Float>

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.4}
            scale={4}
            blur={2.5}
            far={2}
            color="#111111"
          />
        </Suspense>

        {/* Orbit Controls with dampening for luxurious feel */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={zooming}
          minDistance={1.8}
          maxDistance={5.5}
          autoRotate={rotating}
          autoRotateSpeed={1.8}
          dampingFactor={0.06}
          enableDamping={true}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>

      {/* Floating 3D Controls Overlay for immersive interaction */}
      {interactive && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={() => setRotating(!rotating)}
            title={rotating ? 'Pause rotation' : 'Auto-rotate'}
            className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#111111] hover:bg-white shadow-sm transition-all border border-[#E8DED2]/60 hover:scale-105"
            aria-label="Toggle auto rotation"
          >
            {rotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setZooming(!zooming)}
            title="Toggle zoom permission"
            className={`p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all border border-[#E8DED2]/60 hover:scale-105 ${
              zooming ? 'bg-white text-[#111111]' : 'bg-white/50 text-[#777777]'
            }`}
            aria-label="Toggle zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetCamera}
            title="Reset perspective"
            className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#111111] hover:bg-white shadow-sm transition-all border border-[#E8DED2]/60 hover:scale-105"
            aria-label="Reset camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Badge indicating 3D interactive mode */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-1.5 px-3 py-1 bg-white/70 backdrop-blur-md rounded-full border border-[#E8DED2]/60 text-[11px] font-medium tracking-wider text-[#111111] uppercase">
        <Eye className="w-3 h-3 text-[#111111]" />
        <span>3D Studio</span>
      </div>
    </div>
  );
};

export default ProductViewer3D;
