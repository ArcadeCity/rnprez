import * as THREE from 'three'
import { Html, useTexture } from '@react-three/drei'
import { usePlane } from '@react-three/cannon'
import grass from '../assets/grass.jpg'

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  const texture = useTexture(grass)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial map={texture} map-repeat={[240, 240]} color='green' />
      <Html center>
        <h1 style={{ fontFamily: 'monospace', color: 'white' }}>React Native for Noobs</h1>
      </Html>
    </mesh>
  )
}
