"use client";
// =============================================================================
// VillaScene — Three.js recreation of the reference Yakuver residence.
// Three-story modern villa: white volumes, stone-clad columns, wood-paneled
// accent, glass balcony rails, curved entrance canopy, gated wall, palm tree,
// cobblestone driveway, daytime sky.
//
// Scroll-linked camera dolly + sun arc, pointer parallax, reduced-motion gated.
// Live toggle controls for: Building · Canopy · Compound · Foliage · Lighting.
// =============================================================================
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScroll, useTransform, useReducedMotion } from 'motion/react';

export type VillaLayerKey = 'building' | 'canopy' | 'compound' | 'foliage' | 'lighting';

interface Props {
  visibility: Record<VillaLayerKey, boolean>;
}

export function VillaScene({ visibility }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layersRef = useRef<Record<VillaLayerKey, THREE.Group> | null>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0.6, -0.25]);
  const scrollDolly = useTransform(scrollYProgress, [0, 1], [0, -2.5]);

  useEffect(() => {
    if (!layersRef.current) return;
    (Object.keys(visibility) as VillaLayerKey[]).forEach((k) => {
      layersRef.current![k].visible = visibility[k];
    });
  }, [visibility]);

  useEffect(() => {
    if (!canvasRef.current || reducedMotion) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 22, 48);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(11, 5.5, 14);
    camera.lookAt(0, 3, 0);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    // ===== Lighting =====
    scene.add(new THREE.AmbientLight(0xb8d4ff, 0.5));
    const sun = new THREE.DirectionalLight(0xfff3d8, 1.5);
    sun.position.set(8, 14, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -16; sun.shadow.camera.right = 16;
    sun.shadow.camera.top = 16;  sun.shadow.camera.bottom = -16;
    sun.shadow.camera.near = 0.5; sun.shadow.camera.far = 40;
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    scene.add(new THREE.HemisphereLight(0xb0d8ff, 0xc9b58a, 0.55));
    const goldRim = new THREE.PointLight(0xd4af37, 0.9, 18, 2);
    goldRim.position.set(-6, 5, 6);
    scene.add(goldRim);

    // ===== Layer groups =====
    const layers: Record<VillaLayerKey, THREE.Group> = {
      building: new THREE.Group(),
      canopy: new THREE.Group(),
      compound: new THREE.Group(),
      foliage: new THREE.Group(),
      lighting: new THREE.Group(),
    };
    Object.values(layers).forEach((g) => scene.add(g));
    layersRef.current = layers;
    (Object.keys(visibility) as VillaLayerKey[]).forEach((k) => {
      layers[k].visible = visibility[k];
    });

    // ===== Sky backdrop (large hemisphere with gradient) =====
    const skyGeom = new THREE.SphereGeometry(60, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(0x6fb6e0) },
        bottomColor: { value: new THREE.Color(0xd4e3ef) },
      },
      vertexShader: `varying vec3 vWorldPos; void main() { vWorldPos = (modelMatrix * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vWorldPos; uniform vec3 topColor; uniform vec3 bottomColor; void main() { float h = clamp(normalize(vWorldPos).y, 0.0, 1.0); gl_FragColor = vec4(mix(bottomColor, topColor, pow(h, 0.7)), 1.0); }`,
    });
    const sky = new THREE.Mesh(skyGeom, skyMat);
    scene.add(sky);

    // ===== Materials =====
    const matWhite     = new THREE.MeshStandardMaterial({ color: 0xf4f3ef, roughness: 0.78, metalness: 0.02 });
    const matWhiteSoft = new THREE.MeshStandardMaterial({ color: 0xe9e7df, roughness: 0.82, metalness: 0.02 });
    const matStone     = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.92, metalness: 0.05 });
    const matStoneLite = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.95 });
    const matWood      = new THREE.MeshStandardMaterial({ color: 0x8d6240, roughness: 0.55, metalness: 0.1 });
    const matWindow    = new THREE.MeshStandardMaterial({ color: 0x1a2733, roughness: 0.12, metalness: 0.92, envMapIntensity: 1.2 });
    const matGlass     = new THREE.MeshPhysicalMaterial({ color: 0xc0d8e8, roughness: 0.05, metalness: 0.0, transmission: 0.55, transparent: true, opacity: 0.55, ior: 1.45 });
    const matMetalRail = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.45, metalness: 0.85 });
    const matDriveway  = new THREE.MeshStandardMaterial({ color: 0xa8a39a, roughness: 0.95 });
    const matFoliage   = new THREE.MeshStandardMaterial({ color: 0x274d2b, roughness: 0.9 });
    const matTrunk     = new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 0.9 });
    const matCanopy    = new THREE.MeshPhysicalMaterial({ color: 0xb8d4ec, roughness: 0.18, metalness: 0.1, transmission: 0.4, transparent: true, opacity: 0.65, ior: 1.4 });
    const matCanopyFrame = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.8 });

    // ===== Ground / driveway =====
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(40, 48),
      new THREE.MeshStandardMaterial({ color: 0x222018, roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    const driveway = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 12),
      matDriveway
    );
    driveway.rotation.x = -Math.PI / 2;
    driveway.position.set(0, 0.005, 4);
    driveway.receiveShadow = true;
    layers.compound.add(driveway);

    // Cobblestone striations
    for (let i = -8; i <= 8; i++) {
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(0.05, 12),
        new THREE.MeshStandardMaterial({ color: 0x6a6258, roughness: 1 })
      );
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(i * 1.1, 0.008, 4);
      layers.compound.add(stripe);
    }

    // ===== MAIN HOUSE — 3-story volume =====
    // Floor 1: white base with stone columns at corners
    const f1 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.6, 4.2), matWhite);
    f1.position.set(0, 1.3, 0);
    f1.castShadow = true; f1.receiveShadow = true;
    layers.building.add(f1);

    // Floor 2: same footprint with cantilever forward
    const f2 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.4, 4.6), matWhite);
    f2.position.set(0, 3.8, 0.2);
    f2.castShadow = true; f2.receiveShadow = true;
    layers.building.add(f2);

    // Floor 3: smaller cantilever upper volume
    const f3 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 2.2, 4.4), matWhite);
    f3.position.set(0, 6.1, 0.4);
    f3.castShadow = true; f3.receiveShadow = true;
    layers.building.add(f3);

    // Floor 3 parapet trim
    const parapet = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.3, 4.6), matWhiteSoft);
    parapet.position.set(0, 7.35, 0.4);
    layers.building.add(parapet);

    // === Stone-clad vertical columns at corners (front face) ===
    for (const sx of [-2.7, 2.7]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.5, 7.5, 0.5), matStone);
      col.position.set(sx, 3.75, 2.1);
      col.castShadow = true;
      layers.building.add(col);
    }
    // Stone slip along the front-right column upper
    const stoneAccent = new THREE.Mesh(new THREE.BoxGeometry(0.55, 4.8, 0.55), matStoneLite);
    stoneAccent.position.set(2.7, 5.5, 2.15);
    layers.building.add(stoneAccent);

    // === Wood-paneled vertical accent on upper floors ===
    const woodPanel = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.6, 0.08), matWood);
    woodPanel.position.set(1.5, 5.5, 2.35);
    layers.building.add(woodPanel);
    // Wood slats — thin vertical lines on the panel
    for (let i = -3; i <= 3; i++) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 4.6, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x5a3a20, roughness: 0.7 })
      );
      slat.position.set(1.5 + i * 0.18, 5.5, 2.4);
      layers.building.add(slat);
    }

    // === Windows ===
    // F1 windows (small lower)
    for (const sx of [-1.8, -0.6, 0.6, 1.8]) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.1, 0.05), matWindow);
      w.position.set(sx, 1.4, 2.11);
      layers.building.add(w);
    }
    // F2 large windows (with glass balcony rail)
    const f2win = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.9, 0.05), matWindow);
    f2win.position.set(-0.4, 3.9, 2.31);
    layers.building.add(f2win);
    // F3 large central window
    const f3win = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.8, 0.05), matWindow);
    f3win.position.set(-0.5, 6.2, 2.61);
    layers.building.add(f3win);

    // === Glass balcony rails (F2 and F3) ===
    for (const data of [
      { y: 2.95, z: 2.55, w: 4.5 },
      { y: 5.2,  z: 2.85, w: 5.0 },
    ]) {
      const railGlass = new THREE.Mesh(
        new THREE.BoxGeometry(data.w, 0.7, 0.04), matGlass
      );
      railGlass.position.set(0, data.y, data.z);
      layers.building.add(railGlass);
      const railCap = new THREE.Mesh(
        new THREE.BoxGeometry(data.w, 0.05, 0.06), matMetalRail
      );
      railCap.position.set(0, data.y + 0.36, data.z);
      layers.building.add(railCap);
    }

    // === Side wing / smaller garage block (right side) ===
    const wing = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.4, 3.4), matWhite);
    wing.position.set(4.4, 1.2, -0.3);
    wing.castShadow = true; wing.receiveShadow = true;
    layers.building.add(wing);
    // Wing stone column
    const wingCol = new THREE.Mesh(new THREE.BoxGeometry(0.45, 2.4, 0.45), matStone);
    wingCol.position.set(5.5, 1.2, 1.2);
    layers.building.add(wingCol);
    // Wing window
    const wingWin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.05), matWindow);
    wingWin.position.set(4.2, 1.4, 1.41);
    layers.building.add(wingWin);

    // ===== CURVED CANOPY at entrance =====
    {
      // Curved canopy — use a curved surface via TubeGeometry sweep
      // Build canopy as a ribbon by sampling a sine curve
      const ribbonGeom = new THREE.PlaneGeometry(3.6, 2.6, 24, 1);
      const pos = ribbonGeom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const t = (x + 1.8) / 3.6;
        const sinH = Math.sin(t * Math.PI) * 0.55;
        pos.setY(i, pos.getY(i));
        pos.setZ(i, sinH);
      }
      pos.needsUpdate = true;
      ribbonGeom.computeVertexNormals();
      const canopyMesh = new THREE.Mesh(ribbonGeom, matCanopy);
      canopyMesh.position.set(-2.5, 2.85, 3.8);
      canopyMesh.rotation.x = -Math.PI / 2;
      layers.canopy.add(canopyMesh);

      // Canopy frame ribs
      for (let i = 0; i <= 5; i++) {
        const t = i / 5;
        const sinH = Math.sin(t * Math.PI) * 0.55;
        const xPos = -2.5 + (t - 0.5) * 3.6;
        const rib = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, 2.6, 8),
          matCanopyFrame
        );
        rib.rotation.x = Math.PI / 2;
        rib.position.set(xPos, 2.85 + sinH * 0.5, 3.8);
        layers.canopy.add(rib);
      }
      // Canopy support arms (two diagonal supports)
      for (const sx of [-4.1, -0.9]) {
        const arm = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 2.6, 8),
          matCanopyFrame
        );
        arm.position.set(sx, 1.55, 3.5);
        arm.rotation.z = sx < -2.5 ? 0.25 : -0.25;
        layers.canopy.add(arm);
      }
      // Canopy front edge bar
      const frontBar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 3.6, 8),
        matCanopyFrame
      );
      frontBar.rotation.z = Math.PI / 2;
      frontBar.position.set(-2.5, 2.4, 5.05);
      layers.canopy.add(frontBar);
      // Canopy back bar (attached to building)
      const backBar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 3.6, 8),
        matCanopyFrame
      );
      backBar.rotation.z = Math.PI / 2;
      backBar.position.set(-2.5, 2.85, 2.55);
      layers.canopy.add(backBar);
    }

    // Entrance door
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.95, 0.05), matMetalRail);
    door.position.set(-2.0, 0.98, 2.11);
    layers.building.add(door);

    // ===== COMPOUND WALL =====
    // Front wall on left with stone accent
    const wallL = new THREE.Mesh(new THREE.BoxGeometry(5, 2.2, 0.25), matWhite);
    wallL.position.set(-7, 1.1, 4);
    wallL.castShadow = true;
    layers.compound.add(wallL);
    const wallLStone = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.4, 0.3), matStone);
    wallLStone.position.set(-4.5, 1.2, 4);
    layers.compound.add(wallLStone);

    // Front wall on right
    const wallR = new THREE.Mesh(new THREE.BoxGeometry(3, 2.2, 0.25), matWhite);
    wallR.position.set(7.5, 1.1, 4);
    wallR.castShadow = true;
    layers.compound.add(wallR);
    const wallRStone = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.4, 0.3), matStone);
    wallRStone.position.set(6, 1.2, 4);
    layers.compound.add(wallRStone);

    // ===== FOLIAGE =====
    // Big tree (left side) — trunk + cluster of foliage spheres
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, 3.0, 10),
      matTrunk
    );
    trunk.position.y = 1.5;
    trunk.castShadow = true;
    tree.add(trunk);
    // Foliage cluster
    const foliageCluster = new THREE.Group();
    for (const f of [
      { x: 0, y: 3.4, z: 0, s: 1.4 },
      { x: 0.8, y: 3.2, z: 0.3, s: 1.1 },
      { x: -0.7, y: 3.5, z: -0.3, s: 1.2 },
      { x: 0.3, y: 4.1, z: 0.0, s: 1.0 },
      { x: -0.4, y: 4.0, z: 0.5, s: 0.95 },
    ]) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(f.s, 12, 10),
        matFoliage
      );
      m.position.set(f.x, f.y, f.z);
      m.castShadow = true;
      foliageCluster.add(m);
    }
    tree.add(foliageCluster);
    tree.position.set(-6.5, 0, 1);
    layers.foliage.add(tree);

    // Some hedge/shrub at the front
    for (let i = -1; i <= 1; i++) {
      const shrub = new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 10, 8),
        matFoliage
      );
      shrub.position.set(-4 + i * 0.8, 0.4, 3.2);
      shrub.castShadow = true;
      layers.foliage.add(shrub);
    }

    // ===== LIGHTING accents (warm window glow at dusk-ish, plus pin lights) =====
    // Subtle warm glow inside windows
    const warmGlowMat = new THREE.MeshBasicMaterial({ color: 0xfdba74, transparent: true, opacity: 0.0 });
    const warmGlow = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 1.6, 0.02),
      warmGlowMat
    );
    warmGlow.position.set(-0.5, 6.2, 2.63);
    layers.lighting.add(warmGlow);

    // Gold accent uplights on stone columns
    for (const sx of [-2.7, 2.7]) {
      const upL = new THREE.PointLight(0xfacc15, 0.85, 5, 2);
      upL.position.set(sx, 0.6, 2.7);
      layers.lighting.add(upL);
      // Visible halo
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 6),
        new THREE.MeshBasicMaterial({ color: 0xfacc15 })
      );
      halo.position.copy(upL.position);
      layers.lighting.add(halo);
    }

    // ===== Pointer parallax =====
    let pX = 0, pY = 0, tX = 0, tY = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pX = ((e.clientX - r.left) / r.width) * 2 - 1;
      pY = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => { pX = 0; pY = 0; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      const t = clock.getElapsedTime();

      // Whole-scene rotation tied to scroll + idle sine wobble + pointer
      const scrollR = scrollRotation.get();
      const scrollD = scrollDolly.get();
      const baseRot = scrollR + Math.sin(t * 0.14) * 0.06 + tX * 0.25;
      Object.values(layers).forEach((g) => (g.rotation.y = baseRot));

      // Subtle wind sway on tree
      tree.rotation.z = Math.sin(t * 0.6) * 0.015;
      foliageCluster.rotation.y = Math.sin(t * 0.3) * 0.05;

      // Sun arc (very gentle)
      sun.position.x = 8 + Math.sin(t * 0.05) * 1;
      sun.position.y = 14 + Math.cos(t * 0.05) * 0.5;

      // Warm window glow pulse
      warmGlowMat.opacity = visibility.lighting ? 0.32 + Math.sin(t * 0.9) * 0.08 : 0;

      // Camera parallax + scroll dolly
      tX += (pX - tX) * 0.04;
      tY += (pY - tY) * 0.04;
      camera.position.x = 11 - tX * 1.8 + scrollD * 0.4;
      camera.position.y = 5.5 + tY * 0.9 + scrollD * 0.2;
      camera.position.z = 14 + scrollD * 0.6;
      camera.lookAt(0, 3 + tY * 0.4, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      renderer.dispose();
      layersRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-label="3D residential villa scene by Yakuver Solutions — modern Ghanaian residence with stone columns, glass balconies and a curved entrance canopy"
      />
    </div>
  );
}
