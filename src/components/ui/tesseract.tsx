'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Génère les 16 sommets d'un hypercube 4D (tesseract) de rayon donné.
 */
const generateTesseractVertices = (size: number): number[][] => {
  const vertices: number[][] = [];
  for (let i = 0; i < 16; i++) {
    vertices.push([
      (i & 1 ? 1 : -1) * size,
      (i & 2 ? 1 : -1) * size,
      (i & 4 ? 1 : -1) * size,
      (i & 8 ? 1 : -1) * size,
    ]);
  }
  return vertices;
};

/**
 * Génère les 32 arêtes d'un hypercube 4D.
 */
const generateTesseractEdges = (): [number, number][] => {
  const edges: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      const xor = i ^ j;
      if (xor === 1 || xor === 2 || xor === 4 || xor === 8) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
};

/** Projection perspective 4D → 3D. */
const project4Dto3D = (v: number[], d: number): THREE.Vector3 => {
  const w = v[3];
  const scale = d / (d - w);
  return new THREE.Vector3(v[0] * scale, v[1] * scale, v[2] * scale);
};

const rotateXW = (v: number[], angle: number): number[] => {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return [v[0] * cos - v[3] * sin, v[1], v[2], v[0] * sin + v[3] * cos];
};

const rotateYZ = (v: number[], angle: number): number[] => {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return [v[0], v[1] * cos - v[2] * sin, v[1] * sin + v[2] * cos, v[3]];
};

const rotateZW = (v: number[], angle: number): number[] => {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return [v[0], v[1], v[2] * cos - v[3] * sin, v[2] * sin + v[3] * cos];
};

// --- Composant interne Three.js ---

interface TesseractMeshProps {
  color?: string;
  wireOpacity?: number;
  rotationSpeed?: number;
}

const TesseractMesh = ({ 
  color = '#d97706', 
  wireOpacity = 0.35,
  rotationSpeed = 0.15 
}: TesseractMeshProps) => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const vertexRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const baseVertices = useMemo(() => generateTesseractVertices(1.8), []);
  const edges = useMemo(() => generateTesseractEdges(), []);

  const lineMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: wireOpacity,
      depthTest: false,
    }), [color, wireOpacity]
  );

  const pointMaterial = useMemo(() =>
    new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.06,
      transparent: true,
      opacity: wireOpacity * 1.8,
      depthTest: false,
      sizeAttenuation: true,
    }), [color, wireOpacity]
  );

  useFrame((state) => {
    if (!lineRef.current || !vertexRef.current) return;

    const t = state.clock.elapsedTime * rotationSpeed;
    const mouseInfluence = pointer.x * 0.3;
    const mouseInfluenceY = pointer.y * 0.2;

    const projected: THREE.Vector3[] = baseVertices.map((v) => {
      let rotated = rotateXW(v, t * 0.7 + mouseInfluence);
      rotated = rotateYZ(rotated, t * 0.4 + mouseInfluenceY);
      rotated = rotateZW(rotated, t * 0.3);
      return project4Dto3D(rotated, 5);
    });

    // Arêtes
    const linePositions: number[] = [];
    for (const [a, b] of edges) {
      linePositions.push(projected[a].x, projected[a].y, projected[a].z);
      linePositions.push(projected[b].x, projected[b].y, projected[b].z);
    }
    const lineGeom = lineRef.current.geometry as THREE.BufferGeometry;
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeom.attributes.position.needsUpdate = true;

    // Sommets
    const pointPositions: number[] = [];
    for (const p of projected) {
      pointPositions.push(p.x, p.y, p.z);
    }
    const pointGeom = vertexRef.current.geometry as THREE.BufferGeometry;
    pointGeom.setAttribute('position', new THREE.Float32BufferAttribute(pointPositions, 3));
    pointGeom.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <lineSegments ref={lineRef} material={lineMaterial}>
        <bufferGeometry />
      </lineSegments>
      <points ref={vertexRef} material={pointMaterial}>
        <bufferGeometry />
      </points>
    </group>
  );
};

// --- Composant exporté ---

interface TesseractProps {
  className?: string;
  color?: string;
  wireOpacity?: number;
  rotationSpeed?: number;
}

/**
 * Composant Tesseract (Hypercube 4D) — version initiale, sobre et élégante.
 * Se fond naturellement dans le fond en Light Mode.
 */
export const Tesseract = ({ 
  className = '', 
  color = '#d97706',
  wireOpacity = 0.35,
  rotationSpeed = 0.15,
}: TesseractProps) => {
  const [cameraZ, setCameraZ] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setCameraZ(9);
      else if (w < 1024) setCameraZ(7.5);
      else setCameraZ(6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={`absolute inset-0 ${className}`} />;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        eventSource={typeof document !== 'undefined' ? document.documentElement : undefined}
        eventPrefix="client"
      >
        <TesseractMesh 
          color={color} 
          wireOpacity={wireOpacity}
          rotationSpeed={rotationSpeed}
        />
      </Canvas>
    </div>
  );
};
