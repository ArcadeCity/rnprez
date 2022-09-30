import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import grass from '../assets/grass.jpg'

export const Ground = (props) => {
  // const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  const texture = useTexture(grass)
  console.log(texture)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  // texture.side = THREE.DoubleSide
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[700, 700]} />
      <meshStandardMaterial
        map={texture}
        map-repeat={[240, 240]}
        color='green'
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
