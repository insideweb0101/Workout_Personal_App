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

// Original vector anatomy: paired front/back muscle shapes, drawn over a neutral body silhouette.
const ANATOMY = {
  front: {
    'Pectorals': ['M65 61 Q72 54 79 61 L78 73 Q70 76 64 69 Z', 'M81 61 Q88 54 95 61 L96 69 Q90 76 82 73 Z'],
    'Anterior deltoids': ['M61 53 Q65 49 70 54 L67 64 Q63 66 60 61 Z', 'M90 54 Q95 49 99 53 L100 61 Q97 66 93 64 Z'],
    'Deltoids': ['M60 52 Q65 47 71 53 L67 65 Q62 67 59 61 Z', 'M89 53 Q95 47 100 52 L101 61 Q98 67 93 65 Z'],
    'Biceps': ['M56 68 Q60 66 63 70 L61 83 Q58 86 55 82 Z', 'M97 70 Q100 66 104 68 L105 82 Q102 86 99 83 Z'],
    'Triceps': ['M55 68 Q58 66 60 70 L59 82 Q56 85 54 81 Z', 'M100 70 Q102 66 105 68 L106 81 Q104 85 101 82 Z'],
    'Forearm flexors': ['M52 86 Q56 83 59 86 L56 103 L52 104 Z', 'M101 86 Q104 83 108 86 L108 104 L104 103 Z'],
    'Abdominals': ['M73 77 Q79 75 80 78 L80 91 L73 91 Z', 'M82 78 Q86 75 91 77 L91 91 L82 91 Z', 'M73 93 L80 93 L80 105 L74 105 Z', 'M82 93 L91 93 L90 105 L82 105 Z'],
    'Quadriceps': ['M68 111 Q74 108 78 112 L77 132 Q74 137 69 132 Z', 'M83 112 Q88 108 94 111 L93 132 Q88 137 84 132 Z'],
    'Gluteus maximus': ['M69 99 Q74 96 79 100 L78 111 L69 111 Z', 'M82 100 Q87 96 93 99 L93 111 L83 111 Z'],
    'Hamstrings': ['M69 114 Q73 111 78 114 L77 132 L71 134 Z', 'M84 114 Q89 111 93 114 L91 134 L85 132 Z'],
    'Latissimus dorsi': ['M63 69 L71 74 L71 91 L66 94 L62 82 Z', 'M89 74 L97 69 L98 82 L94 94 L89 91 Z'],
    'Trapezius': ['M73 49 L80 54 L80 64 L73 61 Z', 'M82 54 L89 49 L89 61 L82 64 Z'],
    'Spinal erectors': ['M79 66 L81 66 L81 96 L79 96 Z'],
  },
  back: {
    'Pectorals': [],
    'Anterior deltoids': [],
    'Deltoids': ['M59 52 Q65 47 71 53 L68 64 Q63 67 59 61 Z', 'M89 53 Q95 47 101 52 L101 61 Q97 67 92 64 Z'],
    'Biceps': ['M55 68 Q59 65 62 70 L60 83 Q57 86 54 81 Z', 'M98 70 Q101 65 105 68 L106 81 Q103 86 100 83 Z'],
    'Triceps': ['M54 68 Q58 65 61 70 L60 83 Q57 86 53 81 Z', 'M99 70 Q102 65 106 68 L107 81 Q104 86 101 83 Z'],
    'Forearm flexors': ['M52 86 Q56 83 59 86 L56 103 L52 104 Z', 'M101 86 Q104 83 108 86 L108 104 L104 103 Z'],
    'Abdominals': [],
    'Quadriceps': [],
    'Gluteus maximus': ['M69 99 Q74 96 79 100 L78 111 L69 111 Z', 'M82 100 Q87 96 93 99 L93 111 L83 111 Z'],
    'Hamstrings': ['M69 113 Q74 109 78 114 L77 132 L71 134 Z', 'M83 114 Q88 109 93 113 L91 134 L85 132 Z'],
    'Latissimus dorsi': ['M66 68 Q72 63 79 67 L78 89 L72 98 L65 86 Z', 'M82 67 Q89 63 95 68 L96 86 L89 98 L82 89 Z'],
    'Trapezius': ['M74 49 L80 54 L80 72 L72 67 L68 57 Z', 'M82 54 L88 49 L94 57 L89 67 L82 72 Z', 'M73 69 L80 73 L80 79 L70 76 Z', 'M82 73 L89 69 L92 76 L82 79 Z'],
    'Spinal erectors': ['M79 63 Q80 61 81 63 L81 98 L79 98 Z', 'M76 78 L78 78 L77 96 L75 96 Z', 'M83 78 L85 78 L86 96 L84 96 Z'],
  },
};

const muscleStyles = `
.muscle-panel{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(150px,.95fr);gap:12px;align-items:center;margin-top:12px;padding:13px;border:1px solid #e3ebe4;border-radius:14px;background:#fff}
.muscle-panel h4{font-size:.92rem;margin:0 0 4px;color:#263b2d}.muscle-panel p{font-size:.78rem;color:#64776a;line-height:1.45;margin:0 0 8px}
.muscle-figures{display:flex;justify-content:center;gap:8px}.muscle-figure{width:min(46%,132px);height:auto}.muscle-figure-label{text-anchor:middle;font:700 8px system-ui,sans-serif;fill:#53675a}
.anatomy-muscle{stroke:#fff;stroke-width:.7;stroke-linejoin:round;opacity:.97}.anatomy-muscle.unused{fill:#d9e1dc}.anatomy-muscle.primary{fill:#bf4b43}.anatomy-muscle.secondary{fill:#e5a545}.anatomy-contour{fill:none;stroke:#8c9b91;stroke-width:.55;stroke-linecap:round;opacity:.9}
.muscle-legend{display:flex;flex-wrap:wrap;gap:7px;margin:6px 0}.muscle-legend span{display:inline-flex;align-items:center;gap:5px;font-size:.73rem;color:#53675a}.muscle-swatch{display:inline-block;width:10px;height:10px;border-radius:50%;background:#bf4b43}.muscle-swatch.secondary{background:#e5a545}
.muscle-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.muscle-tag{border-radius:999px;background:#f8e9e7;color:#85392f;padding:5px 8px;font-size:.72rem;font-weight:700}.muscle-tag.secondary{background:#fff2dc;color:#805514}
.demo-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 12px;border-radius:10px;background:#173d2b;color:#fff;text-decoration:none;font-size:.82rem;font-weight:750;margin-top:5px}.demo-link:hover{background:#24583e}.demo-note{font-size:.7rem!important;margin-top:5px!important}
@media(max-width:520px){.muscle-panel{grid-template-columns:1fr}.muscle-figures{justify-content:flex-start}.muscle-figure{width:82px}}
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
      <path d="M72 35 Q64 37 58 42 L53 53 L60 61 L63 78 L67 96 L64 105 L69 111 L65 139 L63 164 Q68 168 75 165 L80 140 L85 165 Q92 168 97 164 L95 139 L91 111 L96 105 L93 96 L97 78 L100 61 L107 53 L102 42 Q96 37 88 35 L85 41 L75 41 Z" />
      <path d="M59 42 Q51 42 46 49 L38 67 L34 85 Q36 90 40 87 L47 72 L58 58 Z M101 42 Q109 42 114 49 L122 67 L126 85 Q124 90 120 87 L113 72 L102 58 Z" />
      <path d="M69 108 Q62 109 60 119 L55 144 L54 164 Q58 168 63 164 L70 144 L76 116 Z M91 108 Q98 109 100 119 L105 144 L106 164 Q102 168 97 164 L90 144 L84 116 Z" />
      <path d="M64 164 Q58 165 54 169 L54 172 L74 172 L75 168 Z M96 164 Q102 165 106 169 L106 172 L86 172 L85 168 Z" />
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
