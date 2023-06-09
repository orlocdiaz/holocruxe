'use client';

import styles from './page.module.css';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';
import {
  Environment,
  useEnvironment,
  OrbitControls,
  Stars,
  useTexture,
} from '@react-three/drei';
import { useTransform, useScroll, useTime } from 'framer-motion';
import { degreesToRadians, progress, mix } from 'popmotion';
import { Suspense, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import Main from './components/Main/Main';

function Points() {
  const circleImg =
    'https://raw.githubusercontent.com/Claeb101/3d-ripple-animation/main/src/assets/circle.png';
  const imgTex = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef();

  let t = 0;
  let f = 0.002;
  let a = 5;
  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const count = 100;
  const sep = 1.5;
  let positions = useMemo(() => {
    let positions = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z);
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep]);

  useFrame(() => {
    t += 15;
    const positions = bufferRef.current.array;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);

        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={imgTex}
        color={0x59c1bd}
        size={0.3}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1}
      />
    </points>
  );
}

function Sphere({ stars }) {
  const sphereMap = useEnvironment({ files: 'sky.hdr' });
  const texture = new THREE.CanvasTexture(new FlakesTexture());
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 10;
  texture.repeat.y = 6;
  return (
    <mesh position={[0, 0, 0]} castShadow={true}>
      <sphereGeometry args={[25, 32, 32]} />
      <meshPhysicalMaterial
        color={0x20435e}
        metalness={0.9}
        roughness={0.05}
        envMap={sphereMap}
        envMapIntensity={0.3}
        // emissive={0x20435e}
        // vertexColors={true}
        // clearcoat={1}
        // clearcoatRoughness={0.1}
        // transparent
        // transmission={0.95}
        // opacity={0.5}
        // reflectivity={0.2}
        // ior={0.9}
        // normalMap={texture}
        // normalScale={new THREE.Vector2(0.15, 0.15)}
        // fog={true}
      />
      {stars}
    </mesh>
  );
}

const Star = ({ p }) => {
  const sphereMap = useEnvironment({ files: 'sky.hdr' });
  const ref = useRef();
  const distance = mix(50, 100, Math.random());
  const yAngle = mix(degreesToRadians(360), degreesToRadians(0), Math.random());
  const xAngle = mix(degreesToRadians(360), degreesToRadians(0), Math.random());
  const time = useTime();
  const { scrollYProgress } = useScroll();
  const scrollY = scrollYProgress;

  useFrame(() => {
    if (time.get() * 0.01 + 15 < 35) {
      ref.current.position.setFromSphericalCoords(
        time.get() * 0.01 + 15,
        yAngle + time.get() * 0.0001,
        xAngle + time.get() * 0.0001
      );
    } else {
      ref.current.position.setFromSphericalCoords(
        35 + scrollY.get() * 50,
        yAngle + time.get() * 0.0001,
        xAngle + time.get() * 0.0001
      );
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[Math.random() * (4 - 1) + 1, 32, 32]} />
      <meshPhysicalMaterial
        color={0x20435e}
        metalness={0.9}
        roughness={0.05}
        envMap={sphereMap}
        envMapIntensity={0.3}
        // emissive={0x20435e}
        // vertexColors={true}
        // clearcoat={1}
        // clearcoatRoughness={0.1}
        // transparent
        // transmission={0.95}
        // opacity={0.5}
        // reflectivity={0.2}
        // ior={0.9}
      />
    </mesh>
  );
};

/* function AllStars() {
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[Math.random() * 0.25, 20, 20]} />
      <meshStandardMaterial />
    </mesh>
  );
} */

function AnimationCanvas({ numStars = 20 }) {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const time = useTime();

  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [degreesToRadians(65), degreesToRadians(80)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [130, 70]);

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.00002 + scrollYProgress.get() * 3
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => gl.setPixelRatio(1));

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(360, numStars, i)} />);
  }

  const envMap = useEnvironment({ files: 'orbital1.hdr' });

  return (
    <>
      <hemisphereLight args={['#0f1010', '#4c94d4']} intensity={1} />
      {/* <pointLight position={[10, 20, 10]} color={0x59c1bd} /> */}
      <Suspense fallback={null}>
        {/* <Ring /> */}
        <Environment map={envMap} background />
        <Sphere stars={stars} />
        <Stars map={null} radius={300} depth={50} count={2000} factor={3} />
        {/* <Points /> */}
      </Suspense>
    </>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Main />
      <div className={styles.anim}>
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas
            ortographic="true"
            camera={{ position: [100, 0, 0], zoom: 1 }}
          >
            <AnimationCanvas className={styles.bg} />
            <OrbitControls />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
