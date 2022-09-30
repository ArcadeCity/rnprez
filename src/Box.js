import { useRef, useState } from 'react'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'
import { Html } from '@react-three/drei'

export function Box({ message = 'messgage', ...props }) {
  // This reference will give us direct access to the mesh
  // const ref = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   if (mesh && mesh.current) {
  //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  //   }
  // })

  const [ref, { at }] = useBox(
    () => ({
      // args,
      mass: 1,
      position: [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5],
    }),
    useRef(null)
  )

  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? [1.25, 1.25, 1.25] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color={hovered ? 'hotpink' : 'orange'} />
      <Html center>
        <h1 style={{ fontFamily: 'monospace', color: 'white' }}>{message}</h1>
      </Html>
    </mesh>
  )
}
