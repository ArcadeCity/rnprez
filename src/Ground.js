import * as THREE from 'three'
import { Html, useTexture } from '@react-three/drei'
import grass from '../assets/grass.jpg'

export const Ground = (props) => {
  // const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  const texture = useTexture(grass)
  console.log(texture)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  // texture.side = THREE.DoubleSide
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <circleGeometry args={[200, 200]} />
      <meshStandardMaterial
        map={texture}
        map-repeat={[240, 240]}
        color='green'
        side={THREE.DoubleSide}
      />
      <Html center>
        <h1 style={{ fontFamily: 'monospace', color: 'white' }}>React Native for Noobs</h1>
      </Html>
    </mesh>
  )
}
