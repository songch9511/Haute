"use client";

import { useRef, useEffect, useCallback, useState } from "react";

/* ── Data ── */

interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  connections: number;
  highlight?: boolean; // green accent nodes
}

interface Edge {
  source: number;
  target: number;
}

const LABELS: { name: string; weight: number; highlight?: boolean }[] = [
  { name: "Philosophy", weight: 8 },
  { name: "Descartes", weight: 5 },
  { name: "Epistemology", weight: 6 },
  { name: "Ethics", weight: 5 },
  { name: "Aesthetics", weight: 4 },
  { name: "Hume", weight: 4 },
  { name: "Kant", weight: 5 },
  { name: "Spinoza", weight: 3 },
  { name: "Books", weight: 6, highlight: true },
  { name: "Logic", weight: 4 },
  { name: "Metaphysics", weight: 4 },
  { name: "Phenomenology", weight: 3 },
  { name: "Pragmatism", weight: 3 },
  { name: "Consciousness", weight: 4, highlight: true },
  { name: "Free Will", weight: 3 },
  { name: "Mind-Body", weight: 3, highlight: true },
  // Smaller nodes (label hidden unless hovered)
  { name: "Cogito", weight: 2 },
  { name: "Virtue", weight: 2 },
  { name: "Sublime", weight: 2 },
  { name: "Tabula Rasa", weight: 2 },
  { name: "Monad", weight: 1 },
  { name: "Categorical", weight: 1 },
  { name: "Dialectic", weight: 2 },
  { name: "Empiricism", weight: 2 },
  { name: "Rationalism", weight: 2 },
  { name: "Stoicism", weight: 2 },
  { name: "Existentialism", weight: 2 },
  { name: "Nihilism", weight: 1 },
  { name: "Dualism", weight: 2 },
  { name: "Idealism", weight: 2 },
  { name: "Materialism", weight: 1 },
  { name: "Nominalism", weight: 1 },
  { name: "Realism", weight: 2 },
  { name: "Skepticism", weight: 2 },
  { name: "Utilitarianism", weight: 2 },
  { name: "Deontology", weight: 1 },
  { name: "Plato", weight: 3 },
  { name: "Aristotle", weight: 3 },
  { name: "Nietzsche", weight: 3 },
  { name: "Wittgenstein", weight: 2 },
  { name: "Husserl", weight: 1 },
  { name: "Sartre", weight: 2 },
  { name: "Qualia", weight: 1 },
  { name: "A Priori", weight: 1 },
  { name: "Ontology", weight: 2 },
];

function buildGraph(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = LABELS.map((l, i) => ({
    id: i,
    label: l.name,
    x: 0, // Set by warm-start in component
    y: 0,
    vx: 0,
    vy: 0,
    r: 3 + l.weight * 2.5,
    connections: 0,
    highlight: l.highlight,
  }));

  const edges: Edge[] = [];
  const addEdge = (a: number, b: number) => {
    edges.push({ source: a, target: b });
    nodes[a].connections++;
    nodes[b].connections++;
  };

  // Core connections (Philosophy hub)
  addEdge(0, 1); addEdge(0, 2); addEdge(0, 3); addEdge(0, 4);
  addEdge(0, 5); addEdge(0, 6); addEdge(0, 7); addEdge(0, 8);
  addEdge(0, 9); addEdge(0, 10);
  // Cluster connections
  addEdge(1, 16); addEdge(1, 28); addEdge(1, 24); // Descartes cluster
  addEdge(2, 23); addEdge(2, 24); addEdge(2, 33); addEdge(2, 43); // Epistemology
  addEdge(3, 17); addEdge(3, 34); addEdge(3, 35); addEdge(3, 25); // Ethics
  addEdge(4, 18); addEdge(4, 29); // Aesthetics
  addEdge(5, 19); addEdge(5, 23); // Hume
  addEdge(6, 21); addEdge(6, 35); addEdge(6, 43); // Kant
  addEdge(7, 20); addEdge(7, 29); // Spinoza
  addEdge(8, 36); addEdge(8, 37); addEdge(8, 38); addEdge(8, 39); // Books
  addEdge(9, 22); addEdge(9, 40); // Logic
  addEdge(10, 28); addEdge(10, 44); addEdge(10, 29); // Metaphysics
  addEdge(11, 40); addEdge(11, 41); // Phenomenology
  addEdge(12, 23); // Pragmatism
  addEdge(13, 15); addEdge(13, 42); // Consciousness
  addEdge(14, 28); addEdge(14, 15); // Free Will
  addEdge(15, 1); // Mind-Body
  // Inter-cluster bridges
  addEdge(36, 1); addEdge(37, 6); addEdge(38, 26);
  addEdge(22, 37); addEdge(25, 38);
  addEdge(26, 41); addEdge(30, 29);
  addEdge(31, 20); addEdge(32, 29);
  addEdge(33, 5); addEdge(34, 6);
  addEdge(23, 33); addEdge(24, 28);
  addEdge(27, 26); addEdge(39, 9);

  return { nodes, edges };
}

/* ── Force Simulation ── */

function simulate(nodes: Node[], edges: Edge[], w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  // Scale repulsion to canvas size so nodes spread proportionally
  const idealDist = Math.min(w, h) / 6;
  const damping = 0.92;

  // Repulsion — Coulomb-like, capped to prevent explosions
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq) || 0.1;
      const minDist = nodes[i].r + nodes[j].r + 20;
      // Stronger push when too close
      const strength = (idealDist * idealDist) / Math.max(distSq, minDist * minDist) * 1.2;
      const fx = (dx / dist) * strength;
      const fy = (dy / dist) * strength;
      nodes[i].vx += fx;
      nodes[i].vy += fy;
      nodes[j].vx -= fx;
      nodes[j].vy -= fy;
    }
  }

  // Attraction along edges — spring-like with rest length
  const restLength = idealDist * 0.8;
  for (const edge of edges) {
    const a = nodes[edge.source];
    const b = nodes[edge.target];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
    const displacement = dist - restLength;
    const force = displacement * 0.005;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    a.vx += fx;
    a.vy += fy;
    b.vx -= fx;
    b.vy -= fy;
  }

  // Center gravity — keeps the graph centered
  for (const node of nodes) {
    node.vx += (cx - node.x) * 0.005;
    node.vy += (cy - node.y) * 0.005;
  }

  // Apply velocity with damping and soft boundary
  const padX = 50;
  const padY = 40;
  for (const node of nodes) {
    node.vx *= damping;
    node.vy *= damping;
    // Cap velocity
    const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    if (speed > 8) {
      node.vx = (node.vx / speed) * 8;
      node.vy = (node.vy / speed) * 8;
    }
    node.x += node.vx;
    node.y += node.vy;
    // Soft boundary — bounce back instead of hard clamp
    if (node.x < padX) { node.x = padX; node.vx *= -0.5; }
    if (node.x > w - padX) { node.x = w - padX; node.vx *= -0.5; }
    if (node.y < padY) { node.y = padY; node.vy *= -0.5; }
    if (node.y > h - padY) { node.y = h - padY; node.vy *= -0.5; }
  }
}

/* ── Component ── */

export function InteractiveGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null);
  const frameRef = useRef<number>(0);
  const dragRef = useRef<{ nodeIdx: number; offsetX: number; offsetY: number } | null>(null);
  const hoverRef = useRef<number>(-1);
  const [settled, setSettled] = useState(false);
  const tickRef = useRef(0);
  const dprRef = useRef(1);

  const getCanvasXY = useCallback(
    (e: MouseEvent | Touch, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (canvas.width / dprRef.current / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / dprRef.current / rect.height),
      };
    },
    []
  );

  const findNode = useCallback((mx: number, my: number): number => {
    if (!graphRef.current) return -1;
    const { nodes } = graphRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const dx = mx - nodes[i].x;
      const dy = my - nodes[i].y;
      const hitR = Math.max(nodes[i].r + 6, 14);
      if (dx * dx + dy * dy < hitR * hitR) return i;
    }
    return -1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    graphRef.current = buildGraph();

    // Warm-start: distribute in concentric rings from center
    const { nodes } = graphRef.current;
    // Sort by weight (connections) — heavier nodes closer to center
    const sortedIndices = nodes
      .map((_, i) => i)
      .sort((a, b) => nodes[b].r - nodes[a].r);
    sortedIndices.forEach((nodeIdx, rank) => {
      const n = nodes[nodeIdx];
      const ring = Math.floor(rank / 8); // 8 nodes per ring
      const posInRing = rank % 8;
      const ringCount = Math.min(8, sortedIndices.length - ring * 8);
      const angle = (posInRing / ringCount) * Math.PI * 2 + ring * 0.4;
      const radius = 40 + ring * (Math.min(w, h) * 0.12);
      n.x = w / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 20;
      n.y = h / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 20;
    });

    // Pre-simulate 150 ticks offscreen for a stable starting layout
    for (let i = 0; i < 150; i++) {
      simulate(nodes, graphRef.current.edges, w, h);
    }
    // Zero out velocities after pre-simulation
    for (const n of nodes) { n.vx = 0; n.vy = 0; }

    const accentR = 153, accentG = 126, accentB = 241; // hsl(254,80%,72%) approx
    const greenR = 68, greenG = 207, greenB = 110; // green accent

    function draw() {
      if (!ctx || !graphRef.current) return;
      const { nodes: n, edges: e } = graphRef.current;

      ctx.clearRect(0, 0, w, h);

      const hovIdx = hoverRef.current;
      const hovConnected = new Set<number>();
      if (hovIdx >= 0) {
        for (const edge of e) {
          if (edge.source === hovIdx) hovConnected.add(edge.target);
          if (edge.target === hovIdx) hovConnected.add(edge.source);
        }
      }

      // Draw edges
      for (const edge of e) {
        const a = n[edge.source];
        const b = n[edge.target];
        const isHighlighted =
          hovIdx >= 0 &&
          (edge.source === hovIdx || edge.target === hovIdx);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isHighlighted
          ? `rgba(${accentR},${accentG},${accentB},0.5)`
          : `rgba(${accentR},${accentG},${accentB},0.08)`;
        ctx.lineWidth = isHighlighted ? 1.5 : 0.5;
        ctx.stroke();
      }

      // Draw nodes
      for (let i = 0; i < n.length; i++) {
        const node = n[i];
        const isHov = i === hovIdx;
        const isConnected = hovConnected.has(i);
        const isDim = hovIdx >= 0 && !isHov && !isConnected;

        let alpha = isDim ? 0.12 : isHov ? 0.85 : 0.4;
        let r: number, g: number, b: number;
        if (node.highlight) {
          r = greenR; g = greenG; b = greenB;
          alpha = isDim ? 0.15 : isHov ? 0.9 : 0.6;
        } else {
          r = accentR; g = accentG; b = accentB;
        }

        // Glow on hover
        if (isHov) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r + 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.12)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();

        // Label — show if node is big enough, hovered, or connected to hovered
        const showLabel = node.r >= 10 || isHov || isConnected;
        if (showLabel) {
          const fontSize = isHov ? 13 : node.r >= 12 ? 12 : 10;
          ctx.font = `${isHov ? 600 : 400} ${fontSize}px Inter, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillStyle = isDim
            ? "rgba(186,186,186,0.2)"
            : isHov
            ? "rgba(248,248,248,0.95)"
            : "rgba(186,186,186,0.7)";
          ctx.fillText(node.label, node.x, node.y + node.r + fontSize + 2);
        }
      }
    }

    setSettled(true); // Already pre-simulated
    tickRef.current = 300;

    function tick() {
      if (!graphRef.current) return;
      // Only simulate when dragging (to let other nodes react)
      if (dragRef.current) {
        simulate(graphRef.current.nodes, graphRef.current.edges, w, h);
      }
      draw();
      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);

    // --- Interaction handlers ---
    const onMouseMove = (e: MouseEvent) => {
      if (!graphRef.current) return;
      const { x, y } = getCanvasXY(e, canvas);

      if (dragRef.current) {
        const node = graphRef.current.nodes[dragRef.current.nodeIdx];
        node.x = x + dragRef.current.offsetX;
        node.y = y + dragRef.current.offsetY;
        node.vx = 0;
        node.vy = 0;
        return;
      }

      const idx = findNode(x, y);
      hoverRef.current = idx;
      canvas.style.cursor = idx >= 0 ? "grab" : "default";
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!graphRef.current) return;
      const { x, y } = getCanvasXY(e, canvas);
      const idx = findNode(x, y);
      if (idx >= 0) {
        dragRef.current = {
          nodeIdx: idx,
          offsetX: graphRef.current.nodes[idx].x - x,
          offsetY: graphRef.current.nodes[idx].y - y,
        };
        canvas.style.cursor = "grabbing";
      }
    };

    const onMouseUp = () => {
      dragRef.current = null;
      canvas.style.cursor = hoverRef.current >= 0 ? "grab" : "default";
    };

    const onMouseLeave = () => {
      hoverRef.current = -1;
      dragRef.current = null;
      canvas.style.cursor = "default";
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (!graphRef.current || e.touches.length !== 1) return;
      const { x, y } = getCanvasXY(e.touches[0], canvas);
      const idx = findNode(x, y);
      if (idx >= 0) {
        e.preventDefault();
        dragRef.current = {
          nodeIdx: idx,
          offsetX: graphRef.current.nodes[idx].x - x,
          offsetY: graphRef.current.nodes[idx].y - y,
        };
        hoverRef.current = idx;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!graphRef.current || !dragRef.current) return;
      e.preventDefault();
      const { x, y } = getCanvasXY(e.touches[0], canvas);
      const node = graphRef.current.nodes[dragRef.current.nodeIdx];
      node.x = x + dragRef.current.offsetX;
      node.y = y + dragRef.current.offsetY;
      node.vx = 0;
      node.vy = 0;
    };

    const onTouchEnd = () => {
      dragRef.current = null;
      hoverRef.current = -1;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [findNode, getCanvasXY]);

  return (
    <div
      className="rounded-2xl border overflow-hidden mb-20"
      style={{
        backgroundColor: "#1a1a1a",
        borderColor: "#363636",
        boxShadow:
          "0px 1px 2px rgba(0,0,0,0.12), 0px 3.4px 6.7px rgba(0,0,0,0.18), 0px 15px 30px rgba(0,0,0,0.3)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: "500px", display: "block" }}
      />
      <div className="px-5 py-3 flex items-center justify-between border-t border-[#363636]">
        <span className="text-[12px] text-[#929292]">
          {settled ? "Drag nodes to explore" : "Simulating layout..."}
        </span>
        <span className="text-[12px] text-[#929292]">
          45 notes &middot; 58 connections
        </span>
      </div>
    </div>
  );
}
