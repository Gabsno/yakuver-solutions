import { motion } from 'motion/react';

export type IconKind =
  | 'architecture' | 'civil' | 'pm'
  | 'hvac' | 'electrical' | 'plumbing' | 'fire';

// =============================================================================
// 3D-feel SVG service icons - isometric perspective, gradients, depth,
// multi-layer shadows. Animated rotate-y + scale + glow on hover via motion.
// =============================================================================

interface Props {
  kind: IconKind;
  accent: string;
  size?: number;
}

export function ServiceIcon3D({ kind, accent, size = 64 }: Props) {
  return (
    <motion.div
      className="relative grid place-items-center"
      style={{
        width: size,
        height: size,
        perspective: 600,
      }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
    >
      {/* Floor shadow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{
          bottom: 2,
          width: size * 0.7,
          height: 8,
          background: `radial-gradient(ellipse at center, ${accent}55 0%, transparent 70%)`,
          filter: 'blur(4px)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* 3D tilted plate behind the icon */}
      <motion.div
        className="absolute inset-0 rounded-[14px]"
        style={{
          background: `linear-gradient(145deg, ${accent}28, ${accent}08)`,
          border: `1px solid ${accent}44`,
          transform: 'rotateX(8deg) rotateY(-8deg) translateZ(-6px)',
          boxShadow: `0 8px 20px -6px ${accent}40, inset 0 1px 0 0 ${accent}30`,
        }}
        whileHover={{
          transform: 'rotateX(12deg) rotateY(-14deg) translateZ(-10px)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
      />
      {/* Glow ring (visible on hover) */}
      <motion.div
        className="absolute inset-[-4px] rounded-[18px] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent}55, transparent 65%)`,
          opacity: 0,
        }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.4 }}
      />
      {/* The icon itself */}
      <motion.svg
        width={size * 0.7}
        height={size * 0.7}
        viewBox="0 0 64 64"
        className="relative z-[1]"
        whileHover={{ rotateY: 15, rotateX: -5, y: -2 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {ICON_SVG[kind](accent)}
      </motion.svg>
    </motion.div>
  );
}

// =============================================================================
// Per-kind SVG drawings - isometric building blocks, beveled edges,
// gradient shading to imply depth. No external dependencies.
// =============================================================================

const ICON_SVG: Record<IconKind, (a: string) => React.ReactElement> = {
  architecture: (a) => (
    <>
      <defs>
        <linearGradient id={`arch-${a}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} stopOpacity="0.95" />
          <stop offset="1" stopColor={a} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Drafting triangle (isometric) */}
      <g>
        {/* back face */}
        <path d="M12 50 L32 12 L52 50 Z" fill={a} opacity="0.15" transform="translate(3 -3)" />
        {/* front face */}
        <path d="M12 50 L32 12 L52 50 Z" fill={`url(#arch-${a})`} stroke={a} strokeWidth="1.5" strokeLinejoin="round" />
        {/* compass marks */}
        <circle cx="32" cy="32" r="3" fill="#fff" opacity="0.95" />
        <circle cx="32" cy="32" r="1.5" fill={a} />
        <line x1="20" y1="50" x2="44" y2="50" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <line x1="32" y1="20" x2="32" y2="40" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
    </>
  ),
  civil: (a) => (
    <>
      <defs>
        <linearGradient id={`civ-top-${a}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} stopOpacity="0.9" />
          <stop offset="1" stopColor={a} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`civ-right-${a}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} stopOpacity="0.7" />
          <stop offset="1" stopColor={a} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {/* Isometric building stack - 3 cubes */}
      <g transform="translate(8 6)">
        {/* bottom cube */}
        <polygon points="0,42 24,30 48,42 24,54" fill={`url(#civ-top-${a})`} />
        <polygon points="0,42 24,54 24,40 0,28" fill={`url(#civ-right-${a})`} opacity="0.7" />
        <polygon points="48,42 24,54 24,40 48,28" fill={a} opacity="0.4" />
        {/* mid cube */}
        <polygon points="4,32 24,22 44,32 24,42" fill={`url(#civ-top-${a})`} />
        <polygon points="4,32 24,42 24,32 4,22" fill={`url(#civ-right-${a})`} opacity="0.7" />
        <polygon points="44,32 24,42 24,32 44,22" fill={a} opacity="0.4" />
        {/* top cube */}
        <polygon points="10,22 24,14 38,22 24,30" fill={`url(#civ-top-${a})`} />
        <polygon points="10,22 24,30 24,22 10,14" fill={`url(#civ-right-${a})`} opacity="0.7" />
        <polygon points="38,22 24,30 24,22 38,14" fill={a} opacity="0.4" />
      </g>
    </>
  ),
  pm: (a) => (
    <>
      <defs>
        <linearGradient id={`pm-${a}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} stopOpacity="0.9" />
          <stop offset="1" stopColor={a} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Clipboard with 3D depth */}
      <g>
        {/* back/depth */}
        <rect x="14" y="14" width="36" height="42" rx="4" fill={a} opacity="0.2" transform="translate(3 3)" />
        {/* front clipboard */}
        <rect x="12" y="12" width="36" height="42" rx="4" fill={`url(#pm-${a})`} stroke={a} strokeWidth="1.5" />
        {/* clip */}
        <rect x="24" y="8" width="12" height="6" rx="2" fill={a} />
        {/* bar chart bars */}
        <rect x="18" y="40" width="4" height="8"  rx="1" fill="#fff" opacity="0.85" />
        <rect x="24" y="34" width="4" height="14" rx="1" fill="#fff" opacity="0.85" />
        <rect x="30" y="28" width="4" height="20" rx="1" fill="#fff" opacity="0.95" />
        <rect x="36" y="32" width="4" height="16" rx="1" fill="#fff" opacity="0.85" />
        {/* check */}
        <path d="M18 22 L22 26 L30 18" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  ),
  hvac: (a) => (
    <>
      <defs>
        <linearGradient id={`hv-${a}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} stopOpacity="0.95" />
          <stop offset="1" stopColor={a} stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={`hv-fan-${a}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* VRF outdoor unit (isometric) */}
      <g>
        {/* shadow plinth */}
        <rect x="10" y="50" width="44" height="6" rx="1" fill={a} opacity="0.2" />
        {/* cabinet back/depth */}
        <rect x="14" y="14" width="36" height="38" rx="3" fill={a} opacity="0.25" transform="translate(3 -3)" />
        {/* cabinet front */}
        <rect x="14" y="14" width="36" height="38" rx="3" fill={`url(#hv-${a})`} stroke={a} strokeWidth="1.5" />
        {/* two fan grilles */}
        <circle cx="32" cy="24" r="7" fill="#0a0a0a" opacity="0.4" />
        <motion.g style={{ transformOrigin: '32px 24px' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
          <circle cx="32" cy="24" r="6.5" fill={`url(#hv-fan-${a})`} />
          <path d="M32 18 L34 24 L32 30 L30 24 Z" fill="#fff" opacity="0.85" />
          <path d="M26 24 L32 22 L38 24 L32 26 Z" fill="#fff" opacity="0.55" />
        </motion.g>
        <circle cx="32" cy="42" r="7" fill="#0a0a0a" opacity="0.4" />
        <motion.g style={{ transformOrigin: '32px 42px' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}>
          <circle cx="32" cy="42" r="6.5" fill={`url(#hv-fan-${a})`} />
          <path d="M32 36 L34 42 L32 48 L30 42 Z" fill="#fff" opacity="0.85" />
          <path d="M26 42 L32 40 L38 42 L32 44 Z" fill="#fff" opacity="0.55" />
        </motion.g>
        {/* refrigerant pipe */}
        <path d="M50 50 L56 50 L56 38" stroke={a} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </>
  ),
  electrical: (a) => (
    <>
      <defs>
        <linearGradient id={`el-${a}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7d6" stopOpacity="0.95" />
          <stop offset="0.4" stopColor={a} stopOpacity="0.95" />
          <stop offset="1" stopColor={a} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* 3D lightning bolt with depth */}
      <g>
        {/* depth shadow */}
        <path d="M34 6 L14 36 L26 36 L22 58 L48 24 L34 24 L40 6 Z"
              fill={a} opacity="0.3" transform="translate(3 3)" />
        {/* front bolt */}
        <path d="M34 6 L14 36 L26 36 L22 58 L48 24 L34 24 L40 6 Z"
              fill={`url(#el-${a})`}
              stroke={a} strokeWidth="1.5" strokeLinejoin="round" />
        {/* highlight stripe */}
        <path d="M32 12 L20 32 L28 32"
              stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
      </g>
      {/* spark dots */}
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="52" cy="14" r="1.5" fill="#fff" />
        <circle cx="56" cy="22" r="1" fill={a} />
        <circle cx="10" cy="48" r="1.5" fill="#fff" />
      </motion.g>
    </>
  ),
  plumbing: (a) => (
    <>
      <defs>
        <linearGradient id={`pl-${a}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="0.4" stopColor={a} stopOpacity="0.95" />
          <stop offset="1" stopColor={a} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* 3D water droplet with depth */}
      <g>
        <path d="M32 6 C32 16, 18 22, 18 38 A14 14 0 0 0 46 38 C46 22, 32 16, 32 6 Z"
              fill={a} opacity="0.3" transform="translate(3 3)" />
        <path d="M32 6 C32 16, 18 22, 18 38 A14 14 0 0 0 46 38 C46 22, 32 16, 32 6 Z"
              fill={`url(#pl-${a})`} stroke={a} strokeWidth="1.5" strokeLinejoin="round" />
        {/* shine */}
        <ellipse cx="26" cy="30" rx="3" ry="6" fill="#fff" opacity="0.65" />
      </g>
      {/* ripple */}
      <motion.g
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        style={{ transformOrigin: '32px 52px' }}
      >
        <ellipse cx="32" cy="52" rx="14" ry="3" fill="none" stroke={a} strokeWidth="1.5" />
      </motion.g>
    </>
  ),
  fire: (a) => (
    <>
      <defs>
        <linearGradient id={`fr-${a}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff5d6" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#facc15" stopOpacity="0.95" />
          <stop offset="0.75" stopColor={a} stopOpacity="0.95" />
          <stop offset="1" stopColor={a} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Flame with 3D depth and inner flame */}
      <g>
        {/* depth */}
        <path d="M32 6 C28 14, 22 18, 22 30 C22 38, 22 42, 16 46 A16 16 0 0 0 48 46 C42 42, 42 38, 42 30 C42 22, 38 18, 36 14 C34 18, 32 16, 32 12 C32 9, 32 7, 32 6 Z"
              fill={a} opacity="0.35" transform="translate(3 3)" />
        {/* main flame */}
        <path d="M32 6 C28 14, 22 18, 22 30 C22 38, 22 42, 16 46 A16 16 0 0 0 48 46 C42 42, 42 38, 42 30 C42 22, 38 18, 36 14 C34 18, 32 16, 32 12 C32 9, 32 7, 32 6 Z"
              fill={`url(#fr-${a})`} stroke={a} strokeWidth="1.2" strokeLinejoin="round" />
        {/* inner flicker */}
        <motion.path
          d="M32 24 C30 30, 28 32, 28 38 A4 4 0 0 0 36 38 C36 32, 34 30, 32 24 Z"
          fill="#fff"
          opacity="0.75"
          animate={{ scaleY: [1, 1.1, 0.95, 1], opacity: [0.7, 0.95, 0.6, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '32px 38px' }}
        />
      </g>
    </>
  ),
};
