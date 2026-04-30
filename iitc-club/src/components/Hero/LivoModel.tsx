'use client'
import { Suspense, useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/models/LIVO.glb')

/* ── CSS Fallback — shown instantly, zero JS needed ── */
function TextFallback({ hidden }: { hidden: boolean }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.6s ease',
      opacity: hidden ? 0 : 1,
      pointerEvents: 'none',
    }}>
      <style>{`
        @keyframes livoFloat {
          0%   { transform: translateY(0px)   rotate(-2deg);   }
          25%  { transform: translateY(-14px) rotate(2deg);    }
          50%  { transform: translateY(-20px) rotate(-1.5deg); }
          75%  { transform: translateY(-10px) rotate(2.5deg);  }
          100% { transform: translateY(0px)   rotate(-2deg);   }
        }
      `}</style>
      <div style={{
        fontFamily: 'var(--font-rajdhani), sans-serif',
        fontSize: 'clamp(4.5rem, 22vw, 7rem)',
        fontWeight: 700,
        background: 'linear-gradient(90deg, #8689e6 0%, #a2d1ff 33%, #5efbcc 66%, #eb9779 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '0.18em',
        userSelect: 'none',
        filter: 'drop-shadow(0 0 28px rgba(94,251,204,0.4))',
        paddingRight: '0.18em',
        animation: 'livoFloat 4s ease-in-out infinite',
      }}>
        LIVO
      </div>
    </div>
  )
}

/* ── Radar Grid ── */
function RadarGrid() {
  const ref = useRef<THREE.Group>(null)

  const { rings, lines } = useMemo(() => {
    const ringGeo: THREE.BufferGeometry[] = []
    for (let i = 1; i <= 5; i++) {
      ringGeo.push(new THREE.RingGeometry(i * 0.8, i * 0.8 + 0.012, 64))
    }
    const lineGeo: THREE.BufferGeometry[] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      lineGeo.push(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * 4, 0, Math.sin(angle) * 4),
      ]))
    }
    return { rings: ringGeo, lines: lineGeo }
  }, [])

  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#00E6FF', transparent: true, opacity: 0.13, side: THREE.DoubleSide }), [])
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#00E6FF', transparent: true, opacity: 0.1 }), [])

  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.18 })

  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      {rings.map((geo, i) => <mesh key={i} geometry={geo} material={mat} />)}
      {lines.map((geo, i) => <primitive key={i} object={new THREE.Line(geo, lineMat)} />)}
    </group>
  )
}

/* ── Gradient Shader ── */
class LivoGradientMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uMinX: { value: -2.0 }, uMaxX: { value: 2.0 },
        colorL: { value: new THREE.Color('#8689e6') },
        colorI: { value: new THREE.Color('#a2d1ff') },
        colorV: { value: new THREE.Color('#5efbcc') },
        colorO: { value: new THREE.Color('#eb9779') },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        uniform float uMinX; uniform float uMaxX;
        uniform vec3 colorL; uniform vec3 colorI; uniform vec3 colorV; uniform vec3 colorO;
        void main() {
          float t = clamp((vWorldPosition.x - uMinX) / (uMaxX - uMinX), 0.0, 1.0);
          vec3 c = t < 0.33 ? mix(colorL, colorI, t / 0.33)
                 : t < 0.66 ? mix(colorI, colorV, (t - 0.33) / 0.33)
                 :             mix(colorV, colorO, (t - 0.66) / 0.34);
          gl_FragColor = vec4(c + 0.15, 1.0);
        }
      `,
    })
  }
}

/* ── 3D Model — calls onReady when fully loaded ── */
function Model({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF('/models/LIVO.glb')
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const timeRef = useRef(0)
  const readyCalled = useRef(false)
  const gradientMaterial = useMemo(() => new LivoGradientMaterial(), [])

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    if (gradientMaterial.uniforms) {
      gradientMaterial.uniforms.uMinX.value = box.min.x
      gradientMaterial.uniforms.uMaxX.value = box.max.x
    }
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).material = gradientMaterial
      }
    })
  }, [scene, gradientMaterial])

  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.x = 0
    groupRef.current.rotation.z = 0.3
    const box = new THREE.Box3().setFromObject(groupRef.current)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    groupRef.current.position.set(-center.x, -center.y, -center.z)
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 150)
    const dist = Math.max(
      size.y / (2 * Math.tan(fov / 2)),
      size.x / (2 * Math.tan(fov / 2) * (camera as THREE.PerspectiveCamera).aspect)
    ) * 1.5
    camera.position.set(0, Math.sin(1.5) * dist, Math.cos(1.5) * dist)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()

    // Signal that model is positioned and ready to show
    if (!readyCalled.current) {
      readyCalled.current = true
      onReady()
    }
  }, [scene, camera, onReady])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta
    const t = timeRef.current
    groupRef.current.position.y += Math.sin(t * 0.8) * 0.003
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.18
  })

  return <primitive ref={groupRef} object={scene} />
}

/* ── Main Export ── */
export default function LivoModel() {
  const [modelReady, setModelReady] = useState(false)

  // On mobile/low-end: skip WebGL, show only CSS fallback forever
  const isLowEnd = typeof window !== 'undefined' && (
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4) ||
    window.innerWidth < 768
  )

  if (isLowEnd) {
    return <TextFallback hidden={false} />
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {/* CSS text shows instantly, fades out when 3D is ready */}
      <TextFallback hidden={modelReady} />

      {/* 3D Canvas loads in background, fades in when ready */}
      <Canvas
        shadows={false}
        camera={{ position: [0, 4, 10], fov: 42 }}
        style={{
          width: '100%', height: '100%', position: 'absolute', inset: 0,
          transition: 'opacity 0.6s ease',
          opacity: modelReady ? 1 : 0,
        }}
        gl={{
          alpha: true,
          antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
          powerPreference: 'low-power',
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 8, 6]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[6, 4, 2]} intensity={1.2} color="#00E6FF" />
        <directionalLight position={[-6, 4, 2]} intensity={0.8} color="#7A3CFF" />
        <pointLight position={[0, 6, 0]} intensity={1.0} color="#00E6FF" distance={20} />
        <Suspense fallback={null}>
          <Model onReady={() => setModelReady(true)} />
          <RadarGrid />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
