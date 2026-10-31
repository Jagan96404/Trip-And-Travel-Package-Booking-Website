import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FlightPoint {
  name: string;
  lat: number;
  lng: number;
}

export const ThreeGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCity, setActiveCity] = useState<string>('India Flight Hubs');
  const [isRotating, setIsRotating] = useState<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 360);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- GLOBE GROUP ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Initial orientation: Tilt to spotlight Indian subcontinent
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.y = -1.55;

    const GLOBE_RADIUS = 110;

    // --- PROCEDURAL HIGH-RESOLUTION EARTH TEXTURE ---
    const createEarthTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Deep Space / Ocean gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      oceanGrad.addColorStop(0, '#040b19');
      oceanGrad.addColorStop(0.5, '#071630');
      oceanGrad.addColorStop(1, '#040b19');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, 2048, 1024);

      // Lat-Long Grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let y = 0; y <= 1024; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(2048, y);
        ctx.stroke();
      }
      for (let x = 0; x <= 2048; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }

      // Procedural continents representation
      // India & Asia highlight
      ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
      // Indian Subcontinent triangular shape
      ctx.beginPath();
      // Equator is at y = 512, 0 long is at x = 1024
      // India is ~Lat 8 to 35 N (y: 460 - 320), Long 68 to 90 E (x: 1410 - 1530)
      ctx.moveTo(1440, 310); // Kashmir
      ctx.lineTo(1510, 360); // Northeast / Assam
      ctx.lineTo(1495, 420); // Bengal / East Coast
      ctx.lineTo(1460, 480); // Kanyakumari South
      ctx.lineTo(1420, 410); // Goa / West Coast
      ctx.lineTo(1415, 340); // Rajasthan / Punjab
      ctx.closePath();
      ctx.fill();

      // Glowing border for India
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.stroke();

      // Golden city lights inside India
      ctx.fillStyle = '#ffb703';
      ctx.shadowColor = '#ffb703';
      ctx.shadowBlur = 8;
      const cities = [
        [1440, 320], // Srinagar
        [1438, 350], // Delhi
        [1418, 410], // Mumbai
        [1450, 445], // Bengaluru
        [1440, 465], // Kochi
        [1490, 380], // Kolkata
        [1425, 360], // Jaipur
      ];
      cities.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // World Continents (Africa, Europe, Americas, Australia stylized landmasses)
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(30, 58, 95, 0.4)';
      // Eurasia
      ctx.fillRect(1150, 200, 550, 160);
      // Africa
      ctx.fillRect(1100, 360, 220, 260);
      // Americas
      ctx.fillRect(350, 200, 300, 220);
      ctx.fillRect(480, 420, 180, 280);
      // Australia
      ctx.fillRect(1720, 520, 160, 120);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    // Sphere Mesh
    const earthGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const earthTexture = createEarthTexture();
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 1.5,
      specular: new THREE.Color(0x00f0ff),
      shininess: 25,
      transparent: true,
      opacity: 0.96,
    });
    const earthSphere = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthSphere);

    // --- ATMOSPHERIC HALO GLOW ---
    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.14, 48, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.0, 0.94, 1.0, 1.0) * intensity * 0.85;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // --- CLOUD LAYER ---
    const cloudGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.018, 48, 48);
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cctx = cloudCanvas.getContext('2d');
    if (cctx) {
      cctx.fillStyle = 'rgba(0, 0, 0, 0)';
      cctx.fillRect(0, 0, 1024, 512);
      cctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      for (let i = 0; i < 40; i++) {
        cctx.beginPath();
        cctx.arc(
          Math.random() * 1024,
          100 + Math.random() * 312,
          25 + Math.random() * 60,
          0,
          Math.PI * 2
        );
        cctx.fill();
      }
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    cloudTexture.wrapS = THREE.RepeatWrapping;
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    globeGroup.add(clouds);

    // --- COORDINATE CONVERSION UTILITY ---
    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // --- DESTINATION PINS ON GLOBE ---
    const HUB_CITIES: FlightPoint[] = [
      { name: 'Delhi (Indira Gandhi Int)', lat: 28.6139, lng: 77.2090 },
      { name: 'Mumbai (Chhatrapati Shivaji)', lat: 19.0760, lng: 72.8777 },
      { name: 'Bengaluru (Kempegowda)', lat: 12.9716, lng: 77.5946 },
      { name: 'Kochi (Kerala Gateway)', lat: 9.9312, lng: 76.2673 },
      { name: 'Srinagar (Kashmir Paradise)', lat: 34.0837, lng: 74.7973 },
      { name: 'Jaipur (Pink City)', lat: 26.9124, lng: 75.7873 },
      { name: 'Kolkata (East Hub)', lat: 22.5726, lng: 88.3639 },
      { name: 'Goa (Dabolim / Mopa)', lat: 15.3800, lng: 73.8300 },
      { name: 'Leh Ladakh', lat: 34.1526, lng: 77.5771 },
    ];

    HUB_CITIES.forEach((city) => {
      const pos = latLngToVector3(city.lat, city.lng, GLOBE_RADIUS);

      // Golden pin base
      const pinGeom = new THREE.SphereGeometry(1.6, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xffb703 });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);

      // Pulsing cyan aura ring
      const ringGeom = new THREE.RingGeometry(2.0, 3.4, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.008));
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(ringMesh);
    });

    // --- ANIMATED 3D FLIGHT ROUTES ---
    const ROUTE_PAIRS = [
      { from: HUB_CITIES[0], to: HUB_CITIES[4] }, // Delhi -> Srinagar
      { from: HUB_CITIES[0], to: HUB_CITIES[8] }, // Delhi -> Leh Ladakh
      { from: HUB_CITIES[0], to: HUB_CITIES[1] }, // Delhi -> Mumbai
      { from: HUB_CITIES[1], to: HUB_CITIES[7] }, // Mumbai -> Goa
      { from: HUB_CITIES[1], to: HUB_CITIES[3] }, // Mumbai -> Kochi
      { from: HUB_CITIES[2], to: HUB_CITIES[3] }, // Bengaluru -> Kochi
      { from: HUB_CITIES[0], to: HUB_CITIES[5] }, // Delhi -> Jaipur
      { from: HUB_CITIES[0], to: HUB_CITIES[6] }, // Delhi -> Kolkata
    ];

    const flightCurves: THREE.QuadraticBezierCurve3[] = [];

    ROUTE_PAIRS.forEach(({ from, to }) => {
      const v1 = latLngToVector3(from.lat, from.lng, GLOBE_RADIUS);
      const v2 = latLngToVector3(to.lat, to.lng, GLOBE_RADIUS);

      // Midpoint arc raised above the surface
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const distance = v1.distanceTo(v2);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      flightCurves.push(curve);

      // Static flight trajectory line
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.35,
      });
      const curveLine = new THREE.Line(geometry, material);
      globeGroup.add(curveLine);
    });

    // --- PROCEDURAL 3D AIRPLANE MODEL ---
    const airplaneGroup = new THREE.Group();

    // Fuselage
    const fuselageGeom = new THREE.CylinderGeometry(0.8, 1.2, 8, 12);
    fuselageGeom.rotateX(Math.PI / 2);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.8,
    });
    const fuselage = new THREE.Mesh(fuselageGeom, planeMat);
    airplaneGroup.add(fuselage);

    // Cockpit windscreen
    const cockpitGeom = new THREE.ConeGeometry(0.8, 2.5, 8);
    cockpitGeom.rotateX(Math.PI / 2);
    const cockpitMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00a8b5,
      roughness: 0.1,
    });
    const cockpit = new THREE.Mesh(cockpitGeom, cockpitMat);
    cockpit.position.z = 4.8;
    airplaneGroup.add(cockpit);

    // Wings
    const wingGeom = new THREE.BoxGeometry(14, 0.2, 2.2);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xffb703, metalness: 0.6 });
    const wings = new THREE.Mesh(wingGeom, wingMat);
    wings.position.set(0, 0, 0.5);
    airplaneGroup.add(wings);

    // Tail fin
    const tailGeom = new THREE.BoxGeometry(0.2, 2.8, 1.8);
    const tailMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff });
    const tail = new THREE.Mesh(tailGeom, tailMat);
    tail.position.set(0, 1.4, -3.2);
    airplaneGroup.add(tail);

    // Jet contrail glowing particle
    const jetLight = new THREE.PointLight(0x00f0ff, 2, 20);
    jetLight.position.set(0, 0, -4);
    airplaneGroup.add(jetLight);

    globeGroup.add(airplaneGroup);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    sunLight.position.set(150, 100, 200);
    scene.add(sunLight);

    const blueBackLight = new THREE.DirectionalLight(0x00f0ff, 1.2);
    blueBackLight.position.set(-150, -80, -150);
    scene.add(blueBackLight);

    // --- INTERACTIVE DRAG CONTROLS ---
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsRotating(false);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMousePos.x;
      const deltaY = clientY - prevMousePos.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      dragVelocity = { x: deltaX * 0.005, y: deltaY * 0.005 };
      prevMousePos = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsRotating(true), 2500);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domEl.addEventListener('touchstart', onPointerDown);
    window.addEventListener('touchmove', onPointerMove);
    window.addEventListener('touchend', onPointerUp);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let flightProgress = 0;
    let currentCurveIndex = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation when idle
      if (!isDragging) {
        if (isRotating) {
          globeGroup.rotation.y += 0.0018;
        } else {
          globeGroup.rotation.y += dragVelocity.x * 0.92;
          globeGroup.rotation.x += dragVelocity.y * 0.92;
          dragVelocity.x *= 0.92;
          dragVelocity.y *= 0.92;
        }
      }

      // Clouds rotation at subtle independent rate
      clouds.rotation.y += 0.0006;

      // Animate 3D Airplane along Indian flight curves
      if (flightCurves.length > 0) {
        flightProgress += 0.005;
        if (flightProgress > 1) {
          flightProgress = 0;
          currentCurveIndex = (currentCurveIndex + 1) % flightCurves.length;
          const pair = ROUTE_PAIRS[currentCurveIndex];
          setActiveCity(`${pair.from.name.split(' ')[0]} ✈️ ${pair.to.name.split(' ')[0]}`);
        }

        const activeCurve = flightCurves[currentCurveIndex];
        const point = activeCurve.getPoint(flightProgress);
        airplaneGroup.position.copy(point);

        // Orient airplane forward along the path
        const tangent = activeCurve.getTangent(flightProgress).normalize();
        const lookTarget = point.clone().add(tangent);
        airplaneGroup.lookAt(lookTarget);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE LISTENER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating 3D Interaction Badge */}
      <div className="absolute top-4 right-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-md border border-turquoise-500/30 text-xs text-turquoise-300 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-turquoise-400 animate-ping" />
        <span>Drag to rotate 3D Earth</span>
      </div>

      {/* Live Flight Route Display */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-navy-950/90 backdrop-blur-md border border-gold-500/40 text-xs sm:text-sm text-gold-300 font-medium shadow-xl">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        <span>Active Air Route: <strong className="text-white ml-1">{activeCity}</strong></span>
      </div>
    </div>
  );
};

