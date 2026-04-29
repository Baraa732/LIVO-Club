'use client'
import { Suspense, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ── Radar Grid (لم يتم تعديله) ────────────────────────────── */
function RadarGrid() {
  const ref = useRef<THREE.Group>(null)

  const { rings, lines } = useMemo(() => {
    const ringGeo: THREE.BufferGeometry[] = []
    for (let i = 1; i <= 5; i++) {
      const geo = new THREE.RingGeometry(i * 0.8, i * 0.8 + 0.012, 64)
      ringGeo.push(geo)
    }
    const lineGeo: THREE.BufferGeometry[] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const pts = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * 4, 0, Math.sin(angle) * 4),
      ]
      lineGeo.push(new THREE.BufferGeometry().setFromPoints(pts))
    }
    return { rings: ringGeo, lines: lineGeo }
  }, [])

  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#00E6FF', transparent: true, opacity: 0.13, side: THREE.DoubleSide }),
    []
  )
  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#00E6FF', transparent: true, opacity: 0.1 }),
    []
  )

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.18
  })

  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      {rings.map((geo, i) => <mesh key={i} geometry={geo} material={mat} />)}
      {lines.map((geo, i) => <line key={i} geometry={geo} material={lineMat} />)}
    </group>
  )
}

/* ── 1. تعريف مادة التدرج اللوني المخصصة (Shader) ── */
// هذه المادة تحسب لون كل بكسل بناءً على موقعه الأفقي (X)
class LivoGradientMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      // الـ Uniforms هي متغيرات نرسلها من الـ JavaScript إلى الـ Shader
      uniforms: {
        // نحدد حدود الكلمة لضبط التدرج عليها بدقة
        uMinX: { value: -2.0 }, 
        uMaxX: { value: 2.0 },
        // الألوان المأخوذة من الصورة (من اليسار إلى اليمين)
        colorL: { value: new THREE.Color("#8689e6") }, // أزرق غامق
        colorI: { value: new THREE.Color("#a2d1ff") }, // أزرق فاتح
        colorV: { value: new THREE.Color("#5efbcc") }, // فيروزي/أخضر
        colorO: { value: new THREE.Color("#eb9779") }, // برتقالي
      },
      // Vertex Shader: يحدد موقع كل نقطة ويمرر إحداثيات الموقع العالمي إلى الـ Fragment Shader
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      // Fragment Shader: يحسب اللون النهائي لكل بكسل
      fragmentShader: `
        varying vec3 vWorldPosition;
        uniform float uMinX;
        uniform float uMaxX;
        uniform vec3 colorL;
        uniform vec3 colorI;
        uniform vec3 colorV;
        uniform vec3 colorO;

        void main() {
          // 1. تحويل موقع X العالمي إلى نسبة بين 0.0 و 1.0 عبر الكلمة
          float normX = clamp((vWorldPosition.x - uMinX) / (uMaxX - uMinX), 0.0, 1.0);
          
          vec3 finalColor;
          
          // 2. تقسيم المجال (0-1) إلى 3 مناطق للدمج بين الـ 4 ألوان
          if (normX < 0.33) {
            // بين الأزرق الغامق والفاتح (L و I)
            finalColor = mix(colorL, colorI, normX / 0.33);
          } else if (normX < 0.66) {
            // بين الأزرق الفاتح والفيروزي (I و V)
            finalColor = mix(colorI, colorV, (normX - 0.33) / 0.33);
          } else {
            // بين الفيروزي والبرتقالي (V و O)
            finalColor = mix(colorV, colorO, (normX - 0.66) / 0.34);
          }
          
          // إضافة القليل من الإضاءة الأساسية لجعلها تبدو ثلاثية الأبعاد
          // (الـ ShaderMaterial الأساسي لا يتفاعل مع أضواء المشهد تلقائيًا)
          finalColor += 0.15; // Ambient simple
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }
}

/* ── LIVO Model (تم تعديل منطق الألوان) ───────────────────────── */
function Model() {
  const { scene } = useGLTF('/models/LIVO.glb')
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  // ── 2. إنشاء المادة وتطبيقها ──
  const gradientMaterial = useMemo(() => new LivoGradientMaterial(), []);

  useEffect(() => {
    // نحتاج أولاً لحساب حدود المجسم (Bounding Box) لتحديد uMinX و uMaxX بدقة
    const box = new THREE.Box3().setFromObject(scene);
    
    // تحديث قيم الـ Shader uniforms بناءً على حجم المجسم الحقيقي
    if (gradientMaterial.uniforms) {
      gradientMaterial.uniforms.uMinX.value = box.min.x;
      gradientMaterial.uniforms.uMaxX.value = box.max.x;
    }

    // تطبيق المادة الجديدة على جميع الأجزاء
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        // استبدال المادة القديمة بـ ShaderMaterial المخصص
        mesh.material = gradientMaterial;
        mesh.castShadow = true;
      }
    });

    console.log('[LIVO Shader Applied]');
  }, [scene, gradientMaterial]);

  // ── DO NOT TOUCH camera/position numbers (كما طلبت) ──
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
    const fitHeightDistance = size.y / (2 * Math.tan(fov / 2))
    const fitWidthDistance = size.x / (2 * Math.tan(fov / 2) * (camera as THREE.PerspectiveCamera).aspect)
    const dist = Math.max(fitHeightDistance, fitWidthDistance) * 1.5

    const angle = 1.5
    camera.position.set(0, Math.sin(angle) * dist, Math.cos(angle) * dist)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [scene, camera])

  return <primitive ref={groupRef} object={scene} />
}

/* ── Canvas (لم يتم تعديله) ─────────────────────────────────── */
export default function LivoModel() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 4, 10], fov: 42 }}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 8, 6]}  intensity={2.5} color="#ffffff" castShadow />
      <directionalLight position={[6, 4, 2]}  intensity={1.2} color="#00E6FF" />
      <directionalLight position={[-6, 4, 2]} intensity={0.8} color="#7A3CFF" />
      <pointLight       position={[0, 6, 0]}  intensity={1.0} color="#00E6FF" distance={20} />

      <Suspense fallback={null}>
        <Model />
        <RadarGrid />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/LIVO.glb')