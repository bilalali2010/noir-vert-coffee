import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Procedurally-built coffee cup: no external GLTF assets, everything
 * is primitive geometry so the scene loads instantly and stays light.
 */
function CoffeeCup() {
  const group = useRef(null)

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Saucer */}
      <mesh position={[0, -0.62, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.55, 1.65, 0.08, 64]} />
        <meshPhysicalMaterial color="#0e2018" roughness={0.25} metalness={0.1} clearcoat={0.6} />
      </mesh>

      {/* Cup body */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 0.72, 1.05, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#F6F2E8"
          roughness={0.3}
          metalness={0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cup base ring */}
      <mesh position={[0, -0.47, 0]} castShadow>
        <torusGeometry args={[0.7, 0.05, 20, 48]} />
        <meshPhysicalMaterial color="#F6F2E8" roughness={0.3} clearcoat={0.7} />
      </mesh>

      {/* Rim */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <torusGeometry args={[0.92, 0.045, 20, 64]} />
        <meshPhysicalMaterial color="#F6F2E8" roughness={0.25} clearcoat={0.9} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.87, 64]} />
        <meshPhysicalMaterial color="#2a1408" roughness={0.15} metalness={0.2} clearcoat={1} />
      </mesh>

      {/* Handle */}
      <mesh position={[1.05, 0.05, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.36, 0.075, 16, 48, Math.PI * 1.3]} />
        <meshPhysicalMaterial color="#F6F2E8" roughness={0.3} clearcoat={0.7} />
      </mesh>

      {/* Gold rim accent */}
      <mesh position={[0, 0.58, 0]} scale={1.002}>
        <torusGeometry args={[0.92, 0.012, 12, 64]} />
        <meshStandardMaterial color="#D9B66F" metalness={0.9} roughness={0.25} emissive="#D9B66F" emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

function CoffeeBean({ position, scale = 1, speed = 1 }) {
  const ref = useRef(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime() * speed
    ref.current.rotation.x = t * 0.6
    ref.current.rotation.y = t * 0.4
    ref.current.position.y = position[1] + Math.sin(t * 1.4) * 0.18
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshPhysicalMaterial color="#3a2416" roughness={0.4} clearcoat={0.5} />
      </mesh>
      <mesh scale={[0.05, 1.02, 1.02]}>
        <boxGeometry args={[0.02, 0.2, 0.03]} />
        <meshStandardMaterial color="#1b110a" />
      </mesh>
    </group>
  )
}

function FloatingBeans() {
  const beans = useMemo(
    () => [
      { position: [-2.1, 0.8, -0.6], scale: 1, speed: 0.8 },
      { position: [2.2, 1.1, -0.3], scale: 1.3, speed: 0.6 },
      { position: [-1.6, -0.6, 0.9], scale: 0.8, speed: 1.1 },
      { position: [1.9, -0.9, 0.7], scale: 1, speed: 0.9 },
      { position: [0.2, 1.6, -1.2], scale: 0.9, speed: 0.7 },
      { position: [-2.5, -0.1, 0.2], scale: 0.7, speed: 1.2 },
    ],
    []
  )

  return (
    <>
      {beans.map((b, i) => (
        <Float key={i} speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
          <CoffeeBean {...b} />
        </Float>
      ))}
    </>
  )
}

function Steam() {
  const ref = useRef(null)
  const count = 40
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.5
      arr[i * 3 + 1] = Math.random() * 1.4 + 0.6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + delta * 0.25
      if (y > 2.2) y = 0.6
      pos.setY(i, y)
      const t = state.clock.getElapsedTime() + i
      pos.setX(i, Math.sin(t * 0.6) * 0.18)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#F6F2E8" transparent opacity={0.35} depthWrite={false} />
    </points>
  )
}

function CameraRig({ pointer }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0.1, 0))

  useFrame(() => {
    const px = pointer.current.x * 0.6
    const py = pointer.current.y * 0.35
    camera.position.x += (px - camera.position.x) * 0.04
    camera.position.y += (0.4 - py - camera.position.y) * 0.04
    camera.lookAt(target.current)
  })

  return null
}

export default function Scene({ ready }) {
  const pointer = useRef({ x: 0, y: 0 })

  const handlePointerMove = (e) => {
    pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
  }

  return (
    <div className="hero-canvas" onPointerMove={handlePointerMove}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#07120D']} />
        <fog attach="fog" args={['#07120D', 6, 12]} />

        <ambientLight intensity={0.35} color="#2E8B57" />
        <spotLight
          position={[3, 5, 4]}
          angle={0.35}
          penumbra={0.8}
          intensity={2.2}
          color="#D9B66F"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, 1, -2]} intensity={0.6} color="#2E8B57" />

        <group visible={ready}>
          <CoffeeCup />
          <FloatingBeans />
          <Steam />
        </group>

        <ContactShadows position={[0, -0.68, 0]} opacity={0.55} scale={6} blur={2.4} far={2} color="#000000" />
        <Sparkles count={30} scale={4} size={1.5} speed={0.3} color="#D9B66F" opacity={0.35} />

        <Environment preset="city" environmentIntensity={0.4} />
        <CameraRig pointer={pointer} />
      </Canvas>
    </div>
  )
}
