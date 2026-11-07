import React from 'react';

const MUSCLE_GROUPS = {
  'goblet-squat': { primary: ['Quadriceps', 'Gluteus maximus'], secondary: ['Abdominals'] },
  'kettlebell-goblet-squat': { primary: ['Quadriceps', 'Gluteus maximus'], secondary: ['Abdominals'] },
  'walking-lunge': { primary: ['Quadriceps', 'Gluteus maximus'], secondary: ['Hamstrings', 'Abdominals'] },
  'seated-leg-extension': { primary: ['Quadriceps'], secondary: [] },
  'lying-leg-curl': { primary: ['Hamstrings'], secondary: ['Gluteus maximus'] },
  'romanian-deadlift': { primary: ['Hamstrings', 'Gluteus maximus'], secondary: ['Spinal erectors', 'Abdominals'] },
  'incline-press': { primary: ['Pectorals'], secondary: ['Anterior deltoids', 'Triceps'] },
  'incline-bench-press': { primary: ['Pectorals'], secondary: ['Anterior deltoids', 'Triceps'] },
  'db-bench-press': { primary: ['Pectorals'], secondary: ['Anterior deltoids', 'Triceps'] },
  'standing-cable-fly': { primary: ['Pectorals'], secondary: ['Anterior deltoids'] },
  'deficit-pushup': { primary: ['Pectorals'], secondary: ['Anterior deltoids', 'Triceps', 'Abdominals'] },
  'push-up': { primary: ['Pectorals'], secondary: ['Anterior deltoids', 'Triceps', 'Abdominals'] },
  dips: { primary: ['Triceps', 'Pectorals'], secondary: ['Anterior deltoids'] },
  'lat-pulldown': { primary: ['Latissimus dorsi'], secondary: ['Trapezius', 'Biceps'] },
  'wide-grip-lat-pulldown': { primary: ['Latissimus dorsi'], secondary: ['Trapezius', 'Biceps'] },
  'seated-row': { primary: ['Trapezius', 'Latissimus dorsi'], secondary: ['Biceps'] },
  'barbell-row': { primary: ['Trapezius', 'Latissimus dorsi'], secondary: ['Biceps', 'Abdominals'] },
  'close-grip-cable-row': { primary: ['Trapezius', 'Latissimus dorsi'], secondary: ['Biceps'] },
  'inverted-row': { primary: ['Trapezius', 'Latissimus dorsi'], secondary: ['Biceps', 'Abdominals'] },
  'shoulder-press': { primary: ['Deltoids'], secondary: ['Triceps', 'Abdominals'] },
  'military-press': { primary: ['Deltoids'], secondary: ['Triceps', 'Abdominals'] },
  'db-lateral-raise': { primary: ['Deltoids'], secondary: [] },
  'cable-lateral-raise': { primary: ['Deltoids'], secondary: [] },
  'db-hammer-curl': { primary: ['Biceps'], secondary: ['Forearm flexors'] },
  'ez-bar-bicep-curl': { primary: ['Biceps'], secondary: ['Forearm flexors'] },
  'db-skull-crusher': { primary: ['Triceps'], secondary: [] },
  'hanging-knee-raise': { primary: ['Abdominals'], secondary: [] },
  'swiss-ball-crunch': { primary: ['Abdominals'], secondary: [] },
  plank: { primary: ['Abdominals'], secondary: ['Deltoids', 'Gluteus maximus'] },
  'prone-cobra-hold': { primary: ['Spinal erectors', 'Trapezius'], secondary: ['Gluteus maximus'] },
};

// Original, simplified anatomy. Front/back-specific regions avoid painting the same
// arm or leg area twice (for example, biceps and triceps on top of each other).
const ANATOMY = {
  front: {
    'Pectorals': ['M65 60 C68 56 75 56 79 61 L78 72 C73 75 67 72 64 68 Z', 'M81 61 C85 56 92 56 96 60 L97 68 C94 72 87 75 82 72 Z'],
    'Anterior deltoids': ['M60 51 C63 48 68 49 71 53 L67 63 C63 65 60 62 59 58 Z', 'M89 53 C92 49 97 48 100 51 L101 58 C100 62 97 65 93 63 Z'],
    'Deltoids': ['M59 51 C63 47 69 48 72 53 L68 64 C63 66 59 62 58 57 Z', 'M88 53 C91 48 97 47 101 51 L102 57 C101 62 97 66 92 64 Z'],
    'Biceps': ['M55 67 C58 65 62 67 63 71 L61 81 C59 84 56 83 54 80 Z', 'M97 71 C98 67 102 65 105 67 L106 80 C104 83 101 84 99 81 Z'],
    'Forearm flexors': ['M52 85 L58 84 L56 101 L52 103 Z', 'M102 84 L108 85 L108 103 L104 101 Z'],
    'Abdominals': ['M73 77 Q76 75 79 77 L79 89 L73 89 Z', 'M82 77 Q86 75 89 77 L89 89 L82 89 Z', 'M73 92 L79 92 L79 102 L73 102 Z', 'M82 92 L89 92 L89 102 L82 102 Z'],
    'Quadriceps': ['M68 111 C71 108 76 109 78 113 L76 131 Q73 135 69 132 Z', 'M83 113 C85 109 90 108 94 111 L93 132 Q88 135 84 131 Z'],
    'Latissimus dorsi': ['M63 68 L71 72 L70 88 L66 92 L62 81 Z', 'M90 72 L97 68 L98 81 L94 92 L90 88 Z'],
  },
  back: {
    'Deltoids': ['M59 51 C63 47 69 48 72 53 L68 64 C63 66 59 62 58 57 Z', 'M88 53 C91 48 97 47 101 51 L102 57 C101 62 97 66 92 64 Z'],
    'Triceps': ['M54 68 C57 65 61 67 62 71 L60 81 C58 84 55 83 53 80 Z', 'M98 71 C99 67 103 65 106 68 L107 80 C105 83 102 84 100 81 Z'],
    'Gluteus maximus': ['M68 98 Q73 95 79 99 L78 109 Q73 112 68 108 Z', 'M82 99 Q87 95 93 98 L93 108 Q87 112 82 109 Z'],
    'Hamstrings': ['M68 113 C71 110 76 111 78 115 L76 131 Q73 134 69 132 Z', 'M83 115 C85 111 90 110 94 113 L93 132 Q88 134 84 131 Z'],
    'Latissimus dorsi': ['M66 66 Q72 62 79 66 L78 87 Q74 94 70 96 L65 82 Z', 'M82 66 Q89 62 95 66 L96 82 L90 96 Q85 94 82 87 Z'],
    'Trapezius': ['M74 47 L80 52 L80 69 L73 65 L69 56 Z', 'M82 52 L88 47 L93 56 L87 65 L82 69 Z', 'M72 68 L79 71 L79 77 L70 74 Z', 'M82 71 L89 68 L92 74 L82 77 Z'],
    'Spinal erectors': ['M79 62 Q80 60 81 62 L81 96 L79 96 Z'],
  },
};

const muscleStyles = `
.muscle-panel{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(150px,.95fr);gap:12px;align-items:center;margin-top:12px;padding:13px;border:1px solid #e3ebe4;border-radius:14px;background:#fff}
.muscle-panel h4{font-size:.92rem;margin:0 0 4px;color:#263b2d}.muscle-panel p{font-size:.78rem;color:#64776a;line-height:1.45;margin:0 0 8px}
.muscle-figures{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;justify-items:center;gap:8px;min-width:0}.muscle-figure{display:block;width:100%;max-width:132px;height:auto;min-width:0}.muscle-figure-label{text-anchor:middle;font:700 8px system-ui,sans-serif;fill:#53675a}
.anatomy-muscle{stroke:#fff;stroke-width:.7;stroke-linejoin:round;opacity:.97}.anatomy-muscle.unused{fill:#d9e1dc}.anatomy-muscle.primary{fill:#bf4b43}.anatomy-muscle.secondary{fill:#e5a545}.anatomy-contour{fill:none;stroke:#8c9b91;stroke-width:.55;stroke-linecap:round;opacity:.9}
.muscle-legend{display:flex;flex-wrap:wrap;gap:7px;margin:6px 0}.muscle-legend span{display:inline-flex;align-items:center;gap:5px;font-size:.73rem;color:#53675a}.muscle-swatch{display:inline-block;width:10px;height:10px;border-radius:50%;background:#bf4b43}.muscle-swatch.secondary{background:#e5a545}
.muscle-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.muscle-tag{border-radius:999px;background:#f8e9e7;color:#85392f;padding:5px 8px;font-size:.72rem;font-weight:700}.muscle-tag.secondary{background:#fff2dc;color:#805514}
.demo-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 12px;border-radius:10px;background:#173d2b;color:#fff;text-decoration:none;font-size:.82rem;font-weight:750;margin-top:5px}.demo-link:hover{background:#24583e}.demo-note{font-size:.7rem!important;margin-top:5px!important}
@media(max-width:520px){.muscle-panel{grid-template-columns:1fr}.muscle-figures{grid-template-columns:repeat(2,minmax(0,110px));justify-content:start}.muscle-figure{width:100%;max-width:110px}}
`;

function MuscleFigure({ side, groups }) {
  const primary = new Set(groups.primary);
  const secondary = new Set(groups.secondary);
  const shapes = ANATOMY[side];
  const muscles = Object.entries(shapes).flatMap(([name, paths]) => paths.map((path, index) => {
    const className = primary.has(name) ? 'primary' : secondary.has(name) ? 'secondary' : 'unused';
    return <path className={`anatomy-muscle ${className}`} key={`${name}-${index}`} d={path} />;
  }));

  return <svg className="muscle-figure" viewBox="0 0 160 175" role="img" aria-label={`${side} anatomical muscle illustration`}>
    <text className="muscle-figure-label" x="80" y="10">{side === 'front' ? 'FRONT' : 'BACK'}</text>
    <defs><linearGradient id={`skin-${side}`} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f3f4ef"/><stop offset=".55" stopColor="#c7d0ca"/><stop offset="1" stopColor="#eef0ec"/></linearGradient></defs>
    <g fill={`url(#skin-${side})`} stroke="#738278" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="80" cy="24" r="11" />
      {/* Torso ends at the pelvis; legs are drawn only once in the separate limb paths below. */}
      <path d="M72 35 Q64 37 58 42 L53 53 L60 61 L63 78 L67 96 L64 105 Q70 111 80 111 Q90 111 96 105 L93 96 L97 78 L100 61 L107 53 L102 42 Q96 37 88 35 L85 41 L75 41 Z" />
      <path d="M59 42 Q51 42 46 49 L38 67 L34 85 Q36 90 40 87 L47 72 L58 58 Z M101 42 Q109 42 114 49 L122 67 L126 85 Q124 90 120 87 L113 72 L102 58 Z" />
      {/* Separate left and right legs prevent doubled silhouettes and the visible overlap. */}
      <path d="M68 106 Q73 109 79 108 L78 120 L73 141 L69 164 L61 165 L62 141 L64 119 Z" />
      <path d="M81 108 Q87 109 92 106 L96 119 L98 141 L99 165 L91 164 L87 141 L82 120 Z" />
      <path d="M63 164 Q58 165 54 169 L54 172 L74 172 L75 168 Z M97 164 Q102 165 106 169 L106 172 L86 172 L85 168 Z" />
    </g>
    <g>{muscles}</g>
    <g className="anatomy-contour">
      {side === 'front' ? <>
        <path d="M80 42 L80 76 M64 60 Q72 64 79 61 M81 61 Q89 64 97 60 M74 78 L74 103 M86 78 L86 103 M73 88 L79 89 M82 89 L89 88 M73 98 L79 99 M82 99 L89 98" />
        <path d="M68 114 Q72 119 76 115 M84 115 Q89 119 93 114 M70 133 L75 137 M85 137 L91 133 M57 70 L48 83 M103 70 L112 83" />
      </> : <>
        <path d="M80 43 L80 99 M68 58 Q73 67 79 70 M92 58 Q87 67 81 70 M67 74 Q73 79 78 81 M93 74 Q87 79 82 81 M70 91 Q75 94 78 93 M90 93 Q85 94 82 91" />
        <path d="M68 113 Q72 118 77 115 M83 115 Q88 118 92 113 M70 134 L75 138 M85 138 L91 134 M48 73 L56 83 M112 73 L104 83" />
      </>}
    </g>
  </svg>;
}

export default function ExerciseMedia({ exercise }) {
  const groups = MUSCLE_GROUPS[exercise.id] || { primary: [exercise.category || 'Full body'], secondary: [] };
  const videoSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${exercise.name} exercise proper form short demo`)}`;

  return <>
    <style>{muscleStyles}</style>
    <section className="muscle-panel" aria-label={`Muscle groups worked by ${exercise.name}`}>
      <div>
        <h4>Muscles worked</h4>
        <p>Original anatomy-style illustration. Red marks main muscles; gold marks supporting muscles.</p>
        <div className="muscle-legend"><span><i className="muscle-swatch" /> Main</span><span><i className="muscle-swatch secondary" /> Supporting</span></div>
        <div className="muscle-tags">{groups.primary.map((name) => <span className="muscle-tag" key={`main-${name}`}>{name}</span>)}{groups.secondary.map((name) => <span className="muscle-tag secondary" key={`support-${name}`}>{name}</span>)}</div>
      </div>
      <div className="muscle-figures"><MuscleFigure side="front" groups={groups} /><MuscleFigure side="back" groups={groups} /></div>
      <div>
        <h4>See the movement</h4>
        <p>Open a video search for this exercise and choose a short demonstration that matches your equipment.</p>
        <a className="demo-link" href={videoSearchUrl} target="_blank" rel="noopener noreferrer">▶ Find a video demo</a>
        <p className="demo-note">Opens YouTube; internet connection required.</p>
      </div>
    </section>
  </>;
}
