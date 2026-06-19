'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import type { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import { useTheme } from 'next-themes'

// Composant pour la sphère animée
const AnimatedSphere = ({ color, emissiveColor }: { color: string; emissiveColor: string }) => {
    const meshRef = useRef<Mesh | null>(null)
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.003
            meshRef.current.rotation.y += 0.005
        }
    })
    return (
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
            <MeshDistortMaterial
                color={color}
                emissive={emissiveColor}
                emissiveIntensity={0.2}
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.9}
            />
        </Sphere>
    )
}

export default function Background3D() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    // Couleurs selon le thème
    const { color, emissive, ambientIntensity, directionalIntensity } = useMemo(() => {
        if (!mounted || !resolvedTheme) {
            return {
                color: '#6C63FF',
                emissive: '#3A2E8A',
                ambientIntensity: 0.5,
                directionalIntensity: 1,
            }
        }
        if (resolvedTheme === 'dark') {
            return {
                color: '#6C63FF',
                emissive: '#2A1E6A',
                ambientIntensity: 0.5,
                directionalIntensity: 1,
            }
        } else {
            return {
                color: '#A59BFF',
                emissive: '#D4CEFF',
                ambientIntensity: 0.8,
                directionalIntensity: 1.2,
            }
        }
    }, [mounted, resolvedTheme])

    return (
        <div className="fixed inset-0 -z-10 transition-opacity duration-700 ease-in-out">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={ambientIntensity} />
                <directionalLight position={[10, 10, 5]} intensity={directionalIntensity} />
                <AnimatedSphere color={color} emissiveColor={emissive} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    )
}