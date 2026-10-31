import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FlightPoint {
  name: string;
  lat: number;
  lng: number;
}

export const ThreeGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCity, setActiveCity] = useState<string>('Delhi ✈️ Srinagar');
  const [isRotating, setIsRotating] = useState<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 350);

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

    // --- HIGH-RESOLUTION EARTH TEXTURE FOR WHITE THEME ---
    const createEarthTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Clean royal navy ocean gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      oceanGrad.addColorStop(0, '#0a192f');
      oceanGrad.addColorStop(0.5, '#132c52');
      oceanGrad.addColorStop(1, '#0a192f');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, 2048, 1024);

      // Lat-Long Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
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

      // Continents stylized representation
      ctx.fillStyle = 'rgba(22, 101, 52, 0.38)';
      // Indian Subcontinent triangular shape
      ctx.beginPath();
      ctx.moveTo(1440, 310); // Kashmir
      ctx.lineTo(1510, 360); // Northeast
      ctx.lineTo(1495, 420); // Bengal
      ctx.lineTo(1460, 480); // Kanyakumari
      ctx.lineTo(1420, 410); // Goa
      ctx.lineTo(1415, 340); // Rajasthan
      ctx.closePath();
      ctx.fill();

      // Golden contour border for India
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#d4af37';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // City lights
      ctx.fillStyle = '#ffb703';
      ctx.shadowColor = '#ffb703';
      ctx.shadowBlur = 6;
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
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // World Continents (Africa, Europe, Americas, Australia)
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(1150, 200, 550, 160);
      ctx.fillRect(1100, 360, 220, 260);
      ctx.fillRect(350, 200, 300, 220);
      ctx.fillRect(480, 420, 180, 280);
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
      bumpScale: 1.2,
      specular: new THREE.Color(0xd4af37),
      shininess: 20,
    });
    const earthSphere = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthSphere);

    // Coordinate conversion utility
    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Destination pins on globe
    const HUB_CITIES: FlightPoint[] = [
      { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
      { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
      { name: 'Srinagar', lat: 34.0837, lng: 74.7973 },
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
      { name: 'Goa', lat: 15.3800, lng: 73.8300 },
      { name: 'Leh Ladakh', lat: 34.1526, lng: 77.5771 },
    ];

    HUB_CITIES.forEach((city) => {
      const pos = latLngToVector3(city.lat, city.lng, GLOBE_RADIUS);

      const pinGeom = new THREE.SphereGeometry(1.8, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xb48a3c });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);

      const ringGeom = new THREE.RingGeometry(2.2, 3.8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.008));
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(ringMesh);
    });

    // Flight routes
    const ROUTE_PAIRS = [
      { from: HUB_CITIES[0], to: HUB_CITIES[4] },
      { from: HUB_CITIES[0], to: HUB_CITIES[8] },
      { from: HUB_CITIES[0], to: HUB_CITIES[1] },
      { from: HUB_CITIES[1], to: HUB_CITIES[7] },
      { from: HUB_CITIES[1], to: HUB_CITIES[3] },
      { from: HUB_CITIES[2], to: HUB_CITIES[3] },
      { from: HUB_CITIES[0], to: HUB_CITIES[5] },
      { from: HUB_CITIES[0], to: HUB_CITIES[6] },
    ];

    const flightCurves: THREE.QuadraticBezierCurve3[] = [];

    ROUTE_PAIRS.forEach(({ from, to }) => {
      const v1 = latLngToVector3(from.lat, from.lng, GLOBE_RADIUS);
      const v2 = latLngToVector3(to.lat, to.lng, GLOBE_RADIUS);

      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const distance = v1.distanceTo(v2);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      flightCurves.push(curve);

      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.5,
      });
      const curveLine = new THREE.Line(geometry, material);
      globeGroup.add(curveLine);
    });

    // 3D Airplane
    const airplaneGroup = new THREE.Group();
    const fuselageGeom = new THREE.CylinderGeometry(0.8, 1.2, 8, 12);
    fuselageGeom.rotateX(Math.PI / 2);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
    });
    const fuselage = new THREE.Mesh(fuselageGeom, planeMat);
    airplaneGroup.add(fuselage);

    const wingGeom = new THREE.BoxGeometry(14, 0.2, 2.2);
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xb48a3c, metalness: 0.6 });
    const wings = new THREE.Mesh(wingGeom, wingMat);
    wings.position.set(0, 0, 0.5);
    airplaneGroup.add(wings);

    const tailGeom = new THREE.BoxGeometry(0.2, 2.8, 1.8);
    const tailMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const tail = new THREE.Mesh(tailGeom, tailMat);
    tail.position.set(0, 1.4, -3.2);
    airplaneGroup.add(tail);

    globeGroup.add(airplaneGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(150, 100, 200);
    scene.add(sunLight);

    // Interactive Drag Controls
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

    // Animation loop
    let animationFrameId: number;
    let flightProgress = 0;
    let currentCurveIndex = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        if (isRotating) {
          globeGroup.rotation.y += 0.002;
        } else {
          globeGroup.rotation.y += dragVelocity.x * 0.92;
          globeGroup.rotation.x += dragVelocity.y * 0.92;
          dragVelocity.x *= 0.92;
          dragVelocity.y *= 0.92;
        }
      }

      if (flightCurves.length > 0) {
        flightProgress += 0.005;
        if (flightProgress > 1) {
          flightProgress = 0;
          currentCurveIndex = (currentCurveIndex + 1) % flightCurves.length;
          const pair = ROUTE_PAIRS[currentCurveIndex];
          setActiveCity(`${pair.from.name} ✈️ ${pair.to.name}`);
        }

        const activeCurve = flightCurves[currentCurveIndex];
        const point = activeCurve.getPoint(flightProgress);
        airplaneGroup.position.copy(point);

        const tangent = activeCurve.getTangent(flightProgress).normalize();
        const lookTarget = point.clone().add(tangent);
        airplaneGroup.lookAt(lookTarget);
      }

      renderer.render(scene, camera);
    };

    animate();

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
      <div ref={containerRef} className="w-full h-full" />

      {/* 3D Interaction Badge */}
      <div className="absolute top-4 right-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-bold text-black shadow-md">
        <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
        <span>Rotate 3D Globe</span>
      </div>

      {/* Flight Route Display */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-brand-gold text-xs sm:text-sm text-black font-serif font-bold shadow-luxury">
        <span className="w-2 h-2 rounded-full bg-brand-gold" />
        <span>Active Air Corridor: <strong className="text-brand-gold ml-1">{activeCity}</strong></span>
      </div>
    </div>
  );
};
