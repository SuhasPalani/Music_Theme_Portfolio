import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const CinematicScene = () => {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.025);

    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 300);
    camera.position.set(0, 1, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    mount.appendChild(renderer.domElement);

    // ====== 3D TURNTABLE WITH PLATTER ======
    const turntable = new THREE.Group();

    // Base platform
    const baseGeo = new THREE.BoxGeometry(6, 0.3, 4);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1410,
      metalness: 0.2,
      roughness: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    turntable.add(base);

    // Platter
    const platterGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.12, 96);
    const platterMat = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    platter.position.set(-0.8, 0.22, 0);
    turntable.add(platter);

    // Vinyl on platter
    const vinylGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.04, 96);
    const vinylMat = new THREE.MeshPhysicalMaterial({
      color: 0x080808,
      metalness: 0.98,
      roughness: 0.05,
      clearcoat: 0.6,
    });
    const vinyl = new THREE.Mesh(vinylGeo, vinylMat);
    vinyl.position.set(-0.8, 0.34, 0);
    turntable.add(vinyl);

    // Vinyl grooves
    for (let r = 0.5; r < 1.9; r += 0.06) {
      const grooveGeo = new THREE.TorusGeometry(r, 0.002, 4, 96);
      const grooveMat = new THREE.MeshStandardMaterial({
        color: 0x151515, metalness: 1, roughness: 0.02, transparent: true, opacity: 0.4,
      });
      const groove = new THREE.Mesh(grooveGeo, grooveMat);
      groove.rotation.x = Math.PI / 2;
      groove.position.set(-0.8, 0.37, 0);
      turntable.add(groove);
    }

    // Gold label
    const lblGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.05, 48);
    const lblMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4a853, metalness: 0.5, roughness: 0.3,
      emissive: 0xd4a853, emissiveIntensity: 0.25,
      clearcoat: 0.9,
    });
    const lbl = new THREE.Mesh(lblGeo, lblMat);
    lbl.position.set(-0.8, 0.36, 0);
    turntable.add(lbl);

    // Tonearm
    const armPivot = new THREE.Group();
    const armBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 0.35, 12),
      new THREE.MeshPhysicalMaterial({ color: 0x2a2420, metalness: 0.8, roughness: 0.2 })
    );
    armPivot.add(armBase);

    const armTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.018, 2.8, 8),
      new THREE.MeshPhysicalMaterial({ color: 0xd4a853, metalness: 0.9, roughness: 0.1 })
    );
    armTube.position.set(1.2, 0.35, 0);
    armTube.rotation.z = Math.PI / 2;
    armPivot.add(armTube);

    const cartridge = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.06, 0.18),
      new THREE.MeshPhysicalMaterial({ color: 0xd4a853, metalness: 0.7, roughness: 0.25 })
    );
    cartridge.position.set(2.5, 0.25, 0);
    armPivot.add(cartridge);

    armPivot.position.set(1.8, 0.3, -1.2);
    armPivot.rotation.y = -0.35;
    turntable.add(armPivot);

    turntable.position.set(-5, -2, -6);
    turntable.rotation.set(0.5, 0.6, 0);
    scene.add(turntable);

    // ====== FLOATING ALBUM COVERS (3D planes) ======
    const albums = [];
    const albumColors = [0xd4a853, 0xc27840, 0x4ecdc4, 0x5b8def, 0xe84057, 0x8c6e26];
    const albumPositions = [
      { x: 6, y: 3, z: -4, ry: -0.3 },
      { x: -4, y: 4, z: -5, ry: 0.2 },
      { x: 8, y: -2, z: -7, ry: -0.5 },
      { x: -7, y: -3, z: -4, ry: 0.4 },
      { x: 3, y: -4, z: -3, ry: -0.1 },
      { x: -2, y: 5.5, z: -6, ry: 0.3 },
    ];

    albumPositions.forEach((pos, i) => {
      const grp = new THREE.Group();

      // Album case
      const caseGeo = new THREE.BoxGeometry(1.4, 1.4, 0.08);
      const caseMat = new THREE.MeshPhysicalMaterial({
        color: albumColors[i],
        metalness: 0.3,
        roughness: 0.6,
        emissive: albumColors[i],
        emissiveIntensity: 0.08,
        clearcoat: 0.4,
      });
      const albumCase = new THREE.Mesh(caseGeo, caseMat);
      grp.add(albumCase);

      // Inner dark square
      const innerGeo = new THREE.PlaneGeometry(1.0, 1.0);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x111111, metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0.7,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      inner.position.z = 0.045;
      grp.add(inner);

      // Gold accent line
      const lineGeo = new THREE.PlaneGeometry(0.8, 0.015);
      const lineMat = new THREE.MeshStandardMaterial({
        color: 0xd4a853, emissive: 0xd4a853, emissiveIntensity: 0.6,
      });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.position.set(0, -0.2, 0.046);
      grp.add(line);

      grp.position.set(pos.x, pos.y, pos.z);
      grp.rotation.y = pos.ry;
      grp.userData = { baseY: pos.y, baseX: pos.x, speed: 0.15 + Math.random() * 0.3, phase: Math.random() * Math.PI * 2 };
      scene.add(grp);
      albums.push(grp);
    });

    // ====== 3D MUSIC STAFF WITH NOTES ======
    const staffGroup = new THREE.Group();
    // Staff lines (curved in 3D space)
    for (let l = 0; l < 5; l++) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-8, l * 0.25 - 0.5, 0),
        new THREE.Vector3(-3, l * 0.25 - 0.3 + Math.sin(l) * 0.2, -1),
        new THREE.Vector3(2, l * 0.25 - 0.5 + Math.cos(l) * 0.15, 0.5),
        new THREE.Vector3(7, l * 0.25 - 0.4, -0.5),
        new THREE.Vector3(12, l * 0.25 - 0.5, 0),
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 80, 0.008, 4, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0xd4a853, emissive: 0xd4a853, emissiveIntensity: 0.3,
        transparent: true, opacity: 0.25,
      });
      staffGroup.add(new THREE.Mesh(tubeGeo, tubeMat));
    }

    // Notes along the staff
    const staffNotes = [];
    for (let i = 0; i < 12; i++) {
      const nGrp = new THREE.Group();
      const headG = new THREE.SphereGeometry(0.07, 10, 10);
      const headM = new THREE.MeshPhysicalMaterial({
        color: 0xd4a853, metalness: 0.8, roughness: 0.2,
        emissive: 0xd4a853, emissiveIntensity: 0.6,
      });
      nGrp.add(new THREE.Mesh(headG, headM));

      const stemG = new THREE.CylinderGeometry(0.008, 0.008, 0.35, 4);
      const stemM = new THREE.MeshStandardMaterial({ color: 0xd4a853, emissive: 0xd4a853, emissiveIntensity: 0.3 });
      const stem = new THREE.Mesh(stemG, stemM);
      stem.position.set(0.07, 0.17, 0);
      nGrp.add(stem);

      const xPos = -6 + i * 1.3;
      const yPos = Math.sin(i * 0.7) * 0.4;
      nGrp.position.set(xPos, yPos, Math.sin(i * 0.5) * 0.3);
      nGrp.userData = { baseY: yPos, idx: i };
      staffGroup.add(nGrp);
      staffNotes.push(nGrp);
    }

    staffGroup.position.set(0, 3, -8);
    staffGroup.rotation.set(0.1, 0, 0.05);
    scene.add(staffGroup);

    // ====== 3D HEADPHONES ======
    const hpGroup = new THREE.Group();
    // Headband (curved tube)
    const hbCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 0, 0),
      new THREE.Vector3(-0.4, 0.5, 0),
      new THREE.Vector3(0, 0.65, 0),
      new THREE.Vector3(0.4, 0.5, 0),
      new THREE.Vector3(0.6, 0, 0),
    ]);
    const hbGeo = new THREE.TubeGeometry(hbCurve, 32, 0.04, 8, false);
    const hbMat = new THREE.MeshPhysicalMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2, clearcoat: 0.5 });
    hpGroup.add(new THREE.Mesh(hbGeo, hbMat));

    // Ear cups
    [-0.6, 0.6].forEach((x) => {
      const cupGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.15, 24);
      const cupMat = new THREE.MeshPhysicalMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.15, clearcoat: 0.6 });
      const cup = new THREE.Mesh(cupGeo, cupMat);
      cup.position.set(x, -0.05, 0);
      cup.rotation.z = Math.PI / 2;
      hpGroup.add(cup);
      // Gold ring on cup
      const ringG = new THREE.TorusGeometry(0.22, 0.015, 8, 32);
      const ringM = new THREE.MeshStandardMaterial({ color: 0xd4a853, metalness: 0.9, roughness: 0.1, emissive: 0xd4a853, emissiveIntensity: 0.2 });
      const ring = new THREE.Mesh(ringG, ringM);
      ring.position.set(x, -0.05, 0.08);
      hpGroup.add(ring);
      // Cushion
      const cushGeo = new THREE.TorusGeometry(0.17, 0.05, 12, 24);
      const cushMat = new THREE.MeshPhysicalMaterial({ color: 0x2a2420, roughness: 0.8, metalness: 0.1 });
      const cush = new THREE.Mesh(cushGeo, cushMat);
      cush.position.set(x, -0.05, -0.08);
      hpGroup.add(cush);
    });

    hpGroup.position.set(7, 0.5, -4);
    hpGroup.rotation.set(0.2, -0.8, 0.15);
    hpGroup.scale.set(2.5, 2.5, 2.5);
    scene.add(hpGroup);

    // ====== AMBIENT PARTICLES ======
    const pCount = 250;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 35;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xd4a853, size: 0.035, transparent: true, opacity: 0.3, sizeAttenuation: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ====== LIGHTING ======
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));

    const spot = new THREE.SpotLight(0xd4a853, 4, 35, Math.PI / 5, 0.6, 1);
    spot.position.set(-4, 10, 10);
    scene.add(spot);

    const fill = new THREE.PointLight(0xc27840, 1.5, 25);
    fill.position.set(8, -3, 6);
    scene.add(fill);

    const rim = new THREE.PointLight(0x4ecdc4, 0.4, 18);
    rim.position.set(0, 6, -10);
    scene.add(rim);

    const accent = new THREE.PointLight(0xe84057, 0.3, 12);
    accent.position.set(-6, -5, 4);
    scene.add(accent);

    // ====== ANIMATION ======
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const scroll = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Turntable
      platter.rotation.y += 0.008;
      vinyl.rotation.y += 0.008;
      turntable.position.y = -2 + Math.sin(t * 0.25) * 0.3 - scroll * 0.002;
      turntable.rotation.y = 0.6 + mx * 0.08;
      turntable.rotation.x = 0.5 + my * 0.04;
      armPivot.rotation.y = -0.35 + Math.sin(t * 0.3) * 0.02;

      // Albums float and sway
      albums.forEach((alb) => {
        alb.position.y = alb.userData.baseY + Math.sin(t * alb.userData.speed + alb.userData.phase) * 0.6;
        alb.rotation.y += 0.002;
        alb.rotation.x = Math.sin(t * 0.3 + alb.userData.phase) * 0.05;
        alb.position.y -= scroll * 0.0012;
      });

      // Staff notes bounce to "beat"
      staffNotes.forEach((n) => {
        const beat = Math.abs(Math.sin(t * 2 + n.userData.idx * 0.5));
        n.position.y = n.userData.baseY + beat * 0.25;
        n.scale.setScalar(0.8 + beat * 0.4);
        n.children[0].material.emissiveIntensity = 0.3 + beat * 0.8;
      });
      staffGroup.position.y = 3 - scroll * 0.001;
      staffGroup.rotation.y = mx * 0.05;

      // Headphones float
      hpGroup.position.y = 0.5 + Math.sin(t * 0.35) * 0.4 - scroll * 0.0015;
      hpGroup.rotation.y = -0.8 + Math.sin(t * 0.2) * 0.1 + mx * 0.1;
      hpGroup.rotation.x = 0.2 + Math.sin(t * 0.15) * 0.05;

      // Particles
      particles.rotation.y = t * 0.012;
      particles.rotation.x = t * 0.006;
      particles.position.y = -scroll * 0.0006;

      // Camera cinematic
      camera.position.x = mx * 0.6;
      camera.position.y = 1 - my * 0.4 - scroll * 0.0015;
      camera.position.z = 14 - scroll * 0.004;
      camera.lookAt(mx * 0.3, -scroll * 0.001, -3);

      spot.position.x = -4 + mx * 2;
      spot.position.y = 10 + my * 1;

      renderer.render(scene, camera);
    };

    animate();
    setTimeout(() => setVisible(true), 300);

    const handleScroll = () => { scrollRef.current = window.scrollY; };
    const handleMouse = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} aria-hidden="true"
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ zIndex: 0 }} />
  );
};

export default CinematicScene;
