import React from "react";

// Eight-pointed star, the same shape as the site's star, drawn as a polygon.
const star = (cx, cy, outer = 13, inner = 5.5) =>
  Array.from({ length: 16 }, (_, i) => {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI * i) / 8;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

// The platform as a constellation: services on a ring, all wired to a hub.
// With `mine`, those services are lit and the rest drawn in outline.
// Decorative; the services are listed in text next to it for screen readers.
export default function Constellation({
  nodes,
  mine,
  hub,
  size = 520,
  fontSize = 13,
}) {
  const lit = (label) => !mine || mine.includes(label);
  const c = size / 2;
  const r = size * 0.3;
  const points = nodes.map((label, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / nodes.length;
    return { label, x: c + r * Math.cos(a), y: c + r * Math.sin(a), a };
  });
  const hubSize = size * 0.4;

  return (
    <svg
      className="constellation"
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
      style={{ overflow: "visible" }}
    >
      {points.map(({ label, x, y }) => (
        <line
          key={`spoke-${label}`}
          x1={c}
          y1={c}
          x2={x}
          y2={y}
          stroke={lit(label) ? "#E1FF00" : "#fff"}
          strokeOpacity={lit(label) ? ".7" : ".2"}
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
      ))}
      {points.map(({ label, x, y }, i) => {
        const next = points[(i + 1) % points.length];
        return (
          <line
            key={`ring-${label}`}
            x1={x}
            y1={y}
            x2={next.x}
            y2={next.y}
            stroke="#fff"
            strokeOpacity=".25"
          />
        );
      })}
      {hub && (
        <image
          href={hub}
          x={c - hubSize / 2}
          y={c - hubSize / 2}
          width={hubSize}
          height={hubSize}
        />
      )}
      {points.map(({ label, x, y, a }) => {
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        const dx = cos > 0.3 ? 22 : cos < -0.3 ? -22 : 0;
        const dy = sin < -0.5 ? -22 : sin > 0.5 ? 30 : 5;
        return (
          <g
            key={`node-${label}`}
            className={`constellation-node${lit(label) ? "" : " is-theirs"}`}
          >
            <polygon
              points={star(x, y)}
              fill={lit(label) ? "#FFFF00" : "none"}
              stroke={lit(label) ? "none" : "#fff"}
              strokeOpacity=".6"
              strokeWidth="1.5"
            />
            <text
              x={x + dx}
              y={y + dy}
              textAnchor={anchor}
              fontFamily="PPFuji, sans-serif"
              fontWeight="700"
              fontSize={fontSize}
              letterSpacing="2"
              fill="#fff"
              fillOpacity={lit(label) ? 1 : 0.55}
            >
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
