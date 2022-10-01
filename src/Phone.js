import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import url from '../assets/iphone.glb'

export function Phone(props) {
  const { scene } = useGLTF(url)
  useFrame(() => (scene.rotation.y += 0.01))
  return <primitive {...props} object={scene} />
}
