import { Suspense, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Html, PointerLockControls, Sky, Stars } from '@react-three/drei'
import { Ground } from './Ground'
import { Box } from './Box'
import { Player } from './Player'
import { Physics } from '@react-three/cannon'
import { Boxes, Spheres } from './Instances'
import niceColors from 'nice-color-palettes'

const instancedGeometry = {
  box: Boxes,
  sphere: Spheres,
}

export default function SphereScene() {
  const [number] = useState(100)
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

  const InstancedGeometry = instancedGeometry['sphere']
  const OtherInstancedGeometry = instancedGeometry['box']

  return (
    <View style={styles.container}>
      <Canvas shadows camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Stars />
        <Suspense>
          <Physics gravity={[0, -30, 0]}>
            <Box position={[-1.2, 2, 0]} message='UR INSIDE A REACT NATIVE WORLD RIGHT NOW!' />
            <Box
              position={[1.2, 2, 0]}
              message='i am a react component! click/hover to change my state'
            />
            <Player />
            <Ground />
            <InstancedGeometry {...{ colors, number, size }} />
            <OtherInstancedGeometry {...{ colors, number, size }} />
          </Physics>
          <PointerLockControls />
        </Suspense>
      </Canvas>
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})
