import { useEffect, useRef } from "react";

interface Triangle {
  cx: number;
  cy: number;
  vertices: [number, number][];
  opacity: number;
  targetOpacity: number;
}

export function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: -9999, y: -9999 };

    // --- Config ---
    const CELL = 15;            // base grid spacing (tiny triangles)
    const JITTER = 8;           // random offset per point → non-uniform look
    const REVEAL_RADIUS = 65;   // smaller reveal area around cursor
    const FADE_SPEED = 0.14;    // slightly slower appear
    const DECAY_SPEED = 0.015;  // faster decay → shorter trail

    let triangles: Triangle[] = [];
    let W = 0;
    let H = 0;

    /** Seeded-ish deterministic random for consistent jitter across rebuilds */
    function jitterHash(r: number, c: number, axis: number): number {
      const n = Math.sin(r * 127.1 + c * 311.7 + axis * 74.3) * 43758.5453;
      return (n - Math.floor(n)) * 2 - 1; // −1 to 1
    }

    /** Build a jittered grid → split each quad into 2 triangles with random diagonal */
    function buildGrid() {
      triangles = [];
      W = canvas!.width;
      H = canvas!.height;

      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;

      // Generate jittered point grid
      const pts: [number, number][][] = [];
      for (let r = 0; r <= rows; r++) {
        pts[r] = [];
        for (let c = 0; c <= cols; c++) {
          const bx = c * CELL;
          const by = r * CELL;
          // Edge points get no jitter so the grid covers the full viewport
          const edge = r === 0 || c === 0 || r === rows || c === cols;
          const jx = edge ? 0 : jitterHash(r, c, 0) * JITTER;
          const jy = edge ? 0 : jitterHash(r, c, 1) * JITTER;
          pts[r][c] = [bx + jx, by + jy];
        }
      }

      // Split each quad cell into 2 triangles (random diagonal direction)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tl = pts[r][c];
          const tr = pts[r][c + 1];
          const bl = pts[r + 1][c];
          const br = pts[r + 1][c + 1];

          // Alternate diagonal direction based on hash for organic look
          const diagFlip = jitterHash(r, c, 2) > 0;

          let t1Verts: [number, number][];
          let t2Verts: [number, number][];

          if (diagFlip) {
            t1Verts = [tl, tr, br];
            t2Verts = [tl, br, bl];
          } else {
            t1Verts = [tl, tr, bl];
            t2Verts = [tr, br, bl];
          }

          for (const verts of [t1Verts, t2Verts]) {
            const cx = (verts[0][0] + verts[1][0] + verts[2][0]) / 3;
            const cy = (verts[0][1] + verts[1][1] + verts[2][1]) / 3;
            triangles.push({ cx, cy, vertices: verts, opacity: 0, targetOpacity: 0 });
          }
        }
      }
    }

    const resize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      buildGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const animate = () => {
      ctx!.clearRect(0, 0, W, H);

      for (let i = 0; i < triangles.length; i++) {
        const tri = triangles[i];

        // Distance from cursor to triangle centre
        const dx = tri.cx - mouse.x;
        const dy = tri.cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Target opacity: tight radius, sharp falloff
        if (dist < REVEAL_RADIUS) {
          const t = 1 - dist / REVEAL_RADIUS;
          tri.targetOpacity = t * t * 0.65;
        } else {
          tri.targetOpacity = 0;
        }

        // Snap up fast, decay slowly → trailing effect
        if (tri.opacity < tri.targetOpacity) {
          tri.opacity += FADE_SPEED;
          if (tri.opacity > tri.targetOpacity) tri.opacity = tri.targetOpacity;
        } else if (tri.opacity > tri.targetOpacity) {
          tri.opacity -= DECAY_SPEED;
          if (tri.opacity < 0) tri.opacity = 0;
        }

        // Draw only visible triangles
        if (tri.opacity > 0.004) {
          ctx!.beginPath();
          ctx!.moveTo(tri.vertices[0][0], tri.vertices[0][1]);
          ctx!.lineTo(tri.vertices[1][0], tri.vertices[1][1]);
          ctx!.lineTo(tri.vertices[2][0], tri.vertices[2][1]);
          ctx!.closePath();

          // Edge stroke
          ctx!.strokeStyle = `rgba(0, 163, 255, ${tri.opacity * 0.6})`;
          ctx!.lineWidth = 0.6;
          ctx!.stroke();

          // Subtle fill
          ctx!.fillStyle = `rgba(0, 163, 255, ${tri.opacity * 0.12})`;
          ctx!.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] hidden md:block"
    />
  );
}
