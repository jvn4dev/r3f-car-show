import { MeshReflectorMaterial } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from 'three';
import { useEffect } from 'react';
import { LinearEncoding } from '@react-three/drei/helpers/deprecated';

export function Ground() {
  const [roughness, normal] = useLoader(TextureLoader, [
    '/texture/terrain-normal.jpg',
    '/texture/terrain-roughness.jpg',
  ]);

  useEffect(() => {
    [normal, roughness].forEach(texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(5, 5);
    });
    // @ts-ignore
    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        // @ts-ignore
        normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}
