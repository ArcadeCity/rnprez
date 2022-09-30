import { Suspense, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PointerLockControls, Sky, Stars } from '@react-three/drei'
import { Ground } from './src/Ground'
import { Player } from './src/Player'
import { Physics } from '@react-three/cannon'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   if (mesh && mesh.current) {
  //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  //   }
  // })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Canvas shadows camera={{ fov: 45 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Sky sunPosition={[100, 20, 100]} />
        <Stars />
        <Suspense>
          <Physics gravity={[0, -30, 0]}>
            <Box position={[-1.2, 2, 0]} />
            <Box position={[1.2, 2, 0]} />
            <Player />
            <Ground />
          </Physics>
          <PointerLockControls />
        </Suspense>
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})
