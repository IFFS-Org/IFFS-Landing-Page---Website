import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Hub locations: [Longitude, Latitude]
const HUBS = [
  { name: 'San Francisco', coords: [-122.4194, 37.7749] as [number, number] },
  { name: 'London', coords: [-0.1278, 51.5074] as [number, number] },
  { name: 'Tokyo', coords: [139.6503, 35.6762] as [number, number] },
  { name: 'Sydney', coords: [151.2093, -33.8688] as [number, number] },
  { name: 'Zurich', coords: [8.5417, 47.3769] as [number, number] },
  { name: 'New York', coords: [-74.0060, 40.7128] as [number, number] },
  { name: 'Singapore', coords: [103.8198, 1.3521] as [number, number] },
  { name: 'Paris', coords: [2.3522, 48.8566] as [number, number] },
  { name: 'Berlin', coords: [13.4050, 52.5200] as [number, number] },
  { name: 'Dubai', coords: [55.2708, 25.2048] as [number, number] },
  { name: 'Toronto', coords: [-79.3832, 43.6532] as [number, number] },
  { name: 'São Paulo', coords: [-46.6333, -23.5505] as [number, number] },
  { name: 'Mumbai', coords: [72.8777, 19.0760] as [number, number] },
  { name: 'Cape Town', coords: [18.4241, -33.9249] as [number, number] },
  { name: 'Seoul', coords: [126.9780, 37.5665] as [number, number] },
  { name: 'Los Angeles', coords: [-118.2437, 34.0522] as [number, number] },
  { name: 'Chicago', coords: [-87.6298, 41.8781] as [number, number] },
  { name: 'Miami', coords: [-80.1918, 25.7617] as [number, number] },
  { name: 'Seattle', coords: [-122.3321, 47.6062] as [number, number] },
  { name: 'Austin', coords: [-97.7431, 30.2672] as [number, number] },
  { name: 'Boston', coords: [-71.0589, 42.3601] as [number, number] },
];

// Connection lines spanning the globes
const LINKS = [
  { from: HUBS[0].coords, to: HUBS[4].coords }, // SF to Zurich
  { from: HUBS[1].coords, to: HUBS[2].coords }, // London to Tokyo
  { from: HUBS[2].coords, to: HUBS[3].coords }, // Tokyo to Sydney
  { from: HUBS[0].coords, to: HUBS[5].coords }, // SF to NY
  { from: HUBS[5].coords, to: HUBS[1].coords }, // NY to London
  { from: HUBS[1].coords, to: HUBS[7].coords }, // London to Paris
  { from: HUBS[7].coords, to: HUBS[8].coords }, // Paris to Berlin
  { from: HUBS[8].coords, to: HUBS[9].coords }, // Berlin to Dubai
  { from: HUBS[9].coords, to: HUBS[12].coords }, // Dubai to Mumbai
  { from: HUBS[12].coords, to: HUBS[6].coords }, // Mumbai to Singapore
  { from: HUBS[6].coords, to: HUBS[2].coords }, // Singapore to Tokyo
  { from: HUBS[2].coords, to: HUBS[14].coords }, // Tokyo to Seoul
  { from: HUBS[14].coords, to: HUBS[3].coords }, // Seoul to Sydney
  { from: HUBS[3].coords, to: HUBS[11].coords }, // Sydney to São Paulo
  { from: HUBS[11].coords, to: HUBS[13].coords }, // São Paulo to Cape Town
  { from: HUBS[13].coords, to: HUBS[9].coords }, // Cape Town to Dubai
  { from: HUBS[5].coords, to: HUBS[10].coords }, // NY to Toronto
  { from: HUBS[10].coords, to: HUBS[0].coords }, // Toronto to SF
  { from: HUBS[0].coords, to: HUBS[11].coords }, // SF to São Paulo
  { from: HUBS[6].coords, to: HUBS[3].coords }, // Singapore to Sydney
  { from: HUBS[15].coords, to: HUBS[5].coords }, // LA to NY
  { from: HUBS[16].coords, to: HUBS[20].coords }, // Chicago to Boston
  { from: HUBS[20].coords, to: HUBS[5].coords }, // Boston to NY
  { from: HUBS[18].coords, to: HUBS[0].coords }, // Seattle to SF
  { from: HUBS[15].coords, to: HUBS[2].coords }, // LA to Tokyo
  { from: HUBS[16].coords, to: HUBS[10].coords }, // Chicago to Toronto
  { from: HUBS[17].coords, to: HUBS[5].coords }, // Miami to NY
  { from: HUBS[19].coords, to: HUBS[15].coords }, // Austin to LA
  { from: HUBS[19].coords, to: HUBS[17].coords }, // Austin to Miami
  { from: HUBS[16].coords, to: HUBS[0].coords }, // Chicago to SF
];

// High-fidelity GeoJSON representing simplified continental outlines
const CONTINENTS_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'North America' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-168.0, 65.0], [-150.0, 70.0], [-120.0, 71.0], [-100.0, 72.0],
          [-95.0, 76.0], [-80.0, 82.0], [-70.0, 82.0], [-60.0, 78.0],
          [-55.0, 60.0], [-52.0, 48.0], [-60.0, 44.0], [-65.0, 45.0],
          [-75.0, 35.0], [-80.0, 25.0], [-81.0, 25.0], [-77.0, 15.0],
          [-80.0, 9.0], [-85.0, 8.0], [-90.0, 15.0], [-100.0, 18.0],
          [-105.0, 20.0], [-110.0, 22.0], [-115.0, 30.0], [-122.0, 38.0],
          [-125.0, 48.0], [-135.0, 55.0], [-145.0, 60.0], [-160.0, 60.0],
          [-168.0, 65.0]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'South America' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-80.0, 9.0], [-75.5, 10.0], [-72.0, 12.0], [-61.0, 10.5],
          [-50.0, 4.0], [-43.0, -2.0], [-38.0, -5.0], [-35.0, -6.0],
          [-35.0, -10.0], [-41.0, -22.0], [-48.0, -28.0], [-60.0, -38.5],
          [-65.0, -42.0], [-66.0, -48.0], [-67.0, -53.0], [-71.5, -55.5],
          [-74.0, -53.0], [-75.0, -47.0], [-73.5, -42.0], [-72.0, -37.0],
          [-71.0, -30.0], [-75.0, -20.0], [-81.0, -5.0], [-81.5, 4.5],
          [-80.0, 9.0]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Africa' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-17.5, 14.5], [-17.0, 17.0], [-12.0, 28.0], [-13.0, 31.0],
          [-9.0, 31.5], [-5.5, 36.0], [5.0, 37.0], [10.0, 37.0],
          [11.5, 34.0], [15.0, 32.5], [20.0, 32.0], [25.0, 31.5],
          [31.5, 31.0], [33.5, 27.5], [34.0, 27.5], [43.0, 12.0],
          [51.2, 11.5], [49.5, 9.0], [46.0, -3.0], [40.5, -15.0],
          [33.0, -34.5], [18.0, -34.8], [12.0, -15.0], [8.5, 4.5],
          [4.0, 4.5], [-7.5, 4.0], [-13.0, 7.5], [-17.5, 14.5]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Eurasia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-9.5, 38.5], [-9.5, 43.0], [-5.0, 43.0], [1.5, 50.0],
          [5.0, 52.0], [5.0, 58.0], [10.0, 60.0], [12.0, 62.0],
          [15.0, 68.0], [20.0, 70.0], [28.0, 70.0], [31.0, 68.0],
          [40.0, 70.0], [50.0, 68.0], [60.0, 72.0], [70.0, 73.0],
          [80.0, 73.0], [90.0, 76.0], [100.0, 78.0], [110.0, 76.0],
          [120.0, 77.0], [130.0, 73.0], [140.0, 72.0], [150.0, 70.0],
          [160.0, 71.0], [168.0, 66.0], [178.0, 69.0], [180.0, 65.0],
          [170.0, 60.0], [160.0, 55.0], [150.0, 50.0], [140.0, 40.0],
          [130.0, 35.0], [125.0, 32.5], [121.0, 25.0], [115.0, 20.0],
          [108.0, 16.0], [104.0, 10.0], [100.0, 1.5], [96.0, 5.0],
          [98.0, 15.0], [92.0, 16.0], [90.0, 22.0], [80.0, 15.0],
          [77.0, 8.0], [72.0, 20.0], [68.0, 24.5], [60.0, 25.0],
          [57.0, 13.0], [45.0, 15.0], [38.0, 15.0], [34.0, 27.0],
          [26.0, 40.0], [15.0, 38.0], [5.0, 36.0], [-5.0, 36.0],
          [-9.5, 38.5]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Australia' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [113.0, -25.0], [114.0, -33.0], [120.0, -35.0], [135.0, -33.0],
          [140.0, -38.0], [148.0, -38.0], [150.0, -34.0], [153.5, -28.0],
          [145.0, -15.0], [142.0, -11.0], [136.0, -12.5], [136.0, -16.0],
          [125.0, -15.0], [122.0, -19.0], [113.0, -25.0]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Greenland' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-60.0, 60.0], [-45.0, 60.0], [-35.0, 65.0], [-30.0, 70.0],
          [-20.0, 75.0], [-12.0, 81.0], [-30.0, 83.5], [-50.0, 83.0],
          [-65.0, 80.0], [-73.0, 77.0], [-73.0, 68.0], [-60.0, 60.0]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Antarctica' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-180.0, -85.0], [-150.0, -83.0], [-120.0, -80.0], [-90.0, -81.0],
          [-60.0, -78.0], [-30.0, -82.0], [0.0, -80.0], [30.0, -81.0],
          [60.0, -83.0], [90.0, -80.0], [120.0, -82.0], [150.0, -84.0],
          [180.0, -85.0], [180.0, -90.0], [-180.0, -90.0], [-180.0, -85.0]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Madagascar' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [45.0, -25.0], [47.5, -25.5], [51.0, -12.0], [49.0, -12.0],
          [43.0, -22.0], [45.0, -25.0]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'Japan' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [130.0, 31.0], [132.0, 33.0], [136.0, 35.0], [140.0, 38.0],
          [142.0, 43.0], [145.0, 43.0], [141.0, 38.0], [138.0, 35.0],
          [130.0, 31.0]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: { name: 'New Zealand' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [166.0, -46.0], [170.0, -44.0], [175.0, -39.0], [178.0, -37.0],
          [172.0, -41.0], [166.0, -46.0]
         ]]
      }
    }
  ]
};

export default function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 300;
    let height = 300;
    let animationFrameId: number;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        const size = Math.floor(Math.min(entryWidth, entryHeight) || 280);
        width = size;
        height = size;
        canvas.width = size * window.devicePixelRatio;
        canvas.height = size * window.devicePixelRatio;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
      }
    });

    resizeObserver.observe(containerRef.current);

    // Initial projection setup with D3
    const projection = d3.geoOrthographic()
      .clipAngle(90); // Clips back-side paths beautifully

    const pathGenerator = d3.geoPath(projection, ctx);
    const graticule = d3.geoGraticule().step([15, 15])();

    let lastTime = performance.now();

    const renderLoop = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const cx = width / 2;
      const cy = height / 2;
      const radius = width * 0.43;

      // Update projection scale based on container size
      projection
        .scale(radius)
        .translate([cx, cy]);

      // Calculate dynamic rotation with extreme slow automatic spin and user scrolling offset
      const autoSpin = now * 0.0035; // extremely slow automatic spin
      const currentRotationY = 135 + autoSpin + scrollYRef.current * 0.12;
      const currentRotationX = -15 + Math.sin(now * 0.0004) * 1.5; // very subtle, elegant wobble over time to breathe life into the design

      projection.rotate([currentRotationY, currentRotationX, 0]);

      // 1. Draw back-facing graticules manually with high transparency and dashed strokes
      // We can do this by constructing a projection with clipping disabled, and drawing the background first!
      const backProjection = d3.geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .rotate([currentRotationY, currentRotationX, 0]);
      
      const backPathGenerator = d3.geoPath(backProjection, ctx);

      // We only want paths that lie on the back hemishere. In orthographic coordinates rotated,
      // a point has z < 0 if it is not visible under projection.clipAngle(90).
      // We render a faint full set of lines first for subtle background complexity.
      ctx.beginPath();
      backPathGenerator(graticule);
      ctx.strokeStyle = 'rgba(113, 113, 122, 0.05)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 5]);
      ctx.stroke();

      // 1.5 Draw back-facing continent outlines (very faint, dashed to blend into background)
      const backGeoProjection = d3.geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .rotate([currentRotationY + 180, -currentRotationX, 0])
        .clipAngle(90);
      const backGeoPath = d3.geoPath(backGeoProjection, ctx);

      ctx.beginPath();
      backGeoPath(CONTINENTS_GEOJSON as any);
      ctx.strokeStyle = 'rgba(113, 113, 122, 0.04)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 4]);
      ctx.stroke();

      // 2. Draw front-facing wireframe graticules
      ctx.beginPath();
      pathGenerator(graticule);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 0.95;
      ctx.setLineDash([]);
      ctx.stroke();

      // 2.5 Draw front-facing premium continent outlines and subtle holographic landmass fill
      ctx.beginPath();
      pathGenerator(CONTINENTS_GEOJSON as any);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.006)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // 3. Draw premium geodesic connecting arcs (curves across surface)
      LINKS.forEach((link) => {
        const line = {
          type: 'LineString' as const,
          coordinates: [link.from, link.to] as [[number, number], [number, number]]
        };

        // Draw background part of the connection first, very faint
        ctx.beginPath();
        backPathGenerator(line);
        ctx.strokeStyle = 'rgba(161, 161, 170, 0.03)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([1, 4]);
        ctx.stroke();

        // Draw foreground part (clips automatically with projection)
        // Outer glow layer
        ctx.beginPath();
        pathGenerator(line);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.lineWidth = 4.0;
        ctx.setLineDash([]);
        ctx.stroke();

        // Inner core glow layer with shadowBlur
        ctx.beginPath();
        pathGenerator(line);
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = 'rgba(52, 211, 153, 0.7)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow immediately
      });

      // 4. Draw active glowing city hubs on the globe surface
      HUBS.forEach((hub) => {
        // Find screen coordinates using orthographic projection
        const coords = projection(hub.coords);
        
        if (coords) {
          // Check if coordinate is actually on the front facing side of the sphere.
          // In D3, we can check if the point is visible using d3.geoContains on the hemisphere circle,
          // or we can test using projection's mathematically inverted calculation.
          // A clean way is to see if the distance from center is <= radius and coordinate is valid.
          const [px, py] = coords;
          const dx = px - cx;
          const dy = py - cy;
          const d = Math.sqrt(dx * dx + dy * dy);

          // Only draw if within front hemisphere boundary
          if (d <= radius) {
            // Check if coordinates represent the front hemisphere
            const rotation = projection.rotate();
            const inverted = d3.geoRotation([-rotation[0], -rotation[1], -rotation[2]])(hub.coords);
            
            // If the point's rotated longitude is within [-90, 90] degrees, it's on the front side
            const isFront = inverted[0] >= -90 && inverted[0] <= 90;

            if (isFront) {
              const pulse = Math.sin(now * 0.003 + hub.coords[0]) * 0.3 + 0.7;

              // Outer pulse glow ring
              ctx.beginPath();
              ctx.arc(px, py, 5.5 * pulse, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
              ctx.fill();
              ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
              ctx.lineWidth = 0.75;
              ctx.stroke();

              // Inner solid node with core brilliance
              ctx.beginPath();
              ctx.arc(px, py, 2.0, 0, Math.PI * 2);
              ctx.fillStyle = '#10b981';
              ctx.shadowColor = 'rgba(16, 185, 129, 0.9)';
              ctx.shadowBlur = 6;
              ctx.fill();
              ctx.shadowBlur = 0; // Reset shadow immediately

              // Tiny text label
              ctx.font = '7px Menlo, Consolas, Monaco, monospace';
              ctx.fillStyle = 'rgba(110, 231, 183, 0.8)';
              ctx.fillText(hub.name, px + 6, py - 3);
            }
          }
        }
      });

      // 5. Draw the outer sphere contour silhouette
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.06)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([]);
      ctx.stroke();

      ctx.restore();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[280px] flex items-center justify-center relative select-none pointer-events-none">
      <canvas ref={canvasRef} className="opacity-80 mix-blend-screen" />
      {/* Blueprint HUD details to maintain premium tech aesthetic */}
      <div className="absolute top-2 right-4 font-mono text-[8px] text-zinc-650 tracking-wider">
        SYS_D3: GEODESIC_RESOLUTION_OK
      </div>
      <div className="absolute bottom-2 left-4 font-mono text-[8px] text-zinc-650 tracking-wider">
        P_MODE: ORTHOGRAPHIC // GRID: [15,15]
      </div>
    </div>
  );
}
