import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'
import { Canvas, useFrame } from '@react-three/fiber'
import niceColors from 'nice-color-palettes'
import { useMemo, useRef, useState } from 'react'
import { Color } from 'three'

export const Spheres = ({ colors, number, size }) => {
  const [ref, { at }] = useSphere(
    () => ({
      args: [size],
      mass: 1,
      position: [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5],
    }),
    useRef(null)
  )
  useFrame(() => at(Math.floor(Math.random() * number)).position.set(0, Math.random() * 2, 0))
  return (
    <instancedMesh castShadow ref={ref} args={[undefined, undefined, number]}>
      <sphereBufferGeometry args={[size, 48]}>
        <instancedBufferAttribute attach='attributes-color' args={[colors, 3]} />
      </sphereBufferGeometry>
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  )
}

export const Boxes = ({ colors, number, size }) => {
  const args = [size, size, size]
  const [ref, { at }] = useBox(
    () => ({
      args,
      mass: 1,
      position: [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5],
    }),
    useRef(null)
  )
  useFrame(() => at(Math.floor(Math.random() * number)).position.set(0, Math.random() * 2, 0))
  return (
    <instancedMesh receiveShadow castShadow ref={ref} args={[undefined, undefined, number]}>
      <boxBufferGeometry args={args}>
        <instancedBufferAttribute attach='attributes-color' args={[colors, 3]} />
      </boxBufferGeometry>
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  )
}
