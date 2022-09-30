import { Suspense, useRef, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, PointerLockControls, Sky, Stars } from '@react-three/drei'
import { Ground } from './src/Ground'
import { Box } from './src/Box'
import { Player } from './src/Player'
import { Physics } from '@react-three/cannon'
import { Boxes, Spheres } from './src/Instances'
import niceColors from 'nice-color-palettes'

const instancedGeometry = {
  box: Boxes,
  sphere: Spheres,
}

export default function App() {
  const [geometry, setGeometry] = useState('sphere')
  const [number] = useState(200)
  const [size] = useState(0.3)

  const colors = useMemo(() => {
    const array = new Float32Array(number * 3)
    const color = new THREE.Color()
    for (let i = 0; i < number; i++)
      color
        .set(niceColors[17][Math.floor(Math.random() * 5)])
        .convertSRGBToLinear()
        .toArray(array, i * 3)
    return array
  }, [number])

  const InstancedGeometry = instancedGeometry[geometry]

  return (
    <View style={styles.container}>
      <Canvas shadows camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Stars />
        <Suspense>
          <Physics gravity={[0, -30, 0]}>
            <Box position={[-1.2, 2, 0]} />
            <Box position={[1.2, 2, 0]} />
            <Player />
            <Ground />
            <InstancedGeometry {...{ colors, number, size }} />
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
