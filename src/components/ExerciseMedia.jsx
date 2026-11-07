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

// Each region is drawn as a distinct, non-overlapping patch and clipped to the
// body silhouette. Front and back views have their own anatomically visible groups.
const BODY_SHAPE = 'M80 34 C67 34 58 41 51 47 L42 52 C34 54 29 61 26 70 L13 105 Q11 111 16 113 Q20 114 23 108 L37 82 L43 69 L47 88 L42 119 Q41 126 47 131 L51 153 L45 191 L40 238 L39 257 Q46 261 54 257 L64 216 L76 169 L80 153 L84 169 L96 216 L106 257 Q114 261 121 257 L120 238 L115 191 L109 153 L113 131 Q119 126 118 119 L113 88 L117 69 L123 82 L137 108 Q140 114 144 113 Q149 111 147 105 L134 70 Q131 61 123 52 L114 47 C107 41 98 34 86 34 Z';

const REGIONS = {
  front: [
    { name: 'Anterior deltoids', paths: ['M49 51 Q57 45 64 51 L61 68 Q54 72 47 65 Z', 'M97 51 Q104 45 112 51 L114 65 Q107 72 99 68 Z'] },
    { name: 'Deltoids', paths: ['M47 50 Q56 43 65 50 L62 68 Q54 73 46 65 Z', 'M96 50 Q105 43 114 50 L115 65 Q107 73 99 68 Z'] },
    { name: 'Pectorals', paths: ['M64 57 Q72 52 79 56 L79 78 Q69 80 61 72 Z', 'M81 56 Q89 52 97 57 L100 72 Q91 80 81 78 Z'] },
    { name: 'Biceps', paths: ['M43 72 Q48 69 52 73 L49 91 L42 99 L39 94 Z', 'M108 73 Q112 69 117 72 L121 94 L118 99 L111 91 Z'] },
    { name: 'Forearm flexors', paths: ['M37 99 L43 101 L39 119 L33 126 L31 121 Z', 'M117 101 L123 99 L129 121 L127 126 L121 119 Z'] },
    { name: 'Abdominals', paths: ['M68 81 L79 81 L79 96 L68 96 Z', 'M81 81 L92 81 L92 96 L81 96 Z', 'M68 99 L79 99 L79 113 L68 113 Z', 'M81 99 L92 99 L92 113 L81 113 Z', 'M70 116 L79 116 L79 128 L70 128 Z', 'M81 116 L90 116 L90 128 L81 128 Z'] },
    { name: 'Latissimus dorsi', paths: ['M59 77 L67 82 L66 107 L61 112 L55 94 Z', 'M93 82 L101 77 L105 94 L99 112 L94 107 Z'] },
    { name: 'Quadriceps', paths: ['M53 151 Q64 154 77 151 L74 174 L64 207 L54 226 L49 211 L51 183 Z', 'M83 151 Q96 154 107 151 L109 183 L111 211 L106 226 L96 207 L86 174 Z'] },
  ],
  back: [
    { name: 'Deltoids', paths: ['M47 50 Q56 43 65 50 L62 68 Q54 73 46 65 Z', 'M96 50 Q105 43 114 50 L115 65 Q107 73 99 68 Z'] },
    { name: 'Triceps', paths: ['M43 72 Q48 69 52 73 L49 91 L42 99 L39 94 Z', 'M108 73 Q112 69 117 72 L121 94 L118 99 L111 91 Z'] },
    { name: 'Trapezius', paths: ['M72 48 L80 54 L80 81 L67 70 L64 57 Z', 'M88 48 L96 57 L93 70 L81 81 L81 54 Z'] },
    { name: 'Latissimus dorsi', paths: ['M64 72 L79 81 L77 119 L65 126 L57 101 Z', 'M96 72 L103 72 L110 101 L102 126 L81 119 L81 81 Z'] },
    { name: 'Spinal erectors', paths: ['M78 83 L80 83 L80 127 L78 127 Z', 'M81 83 L83 83 L83 127 L81 127 Z'] },
    { name: 'Gluteus maximus', paths: ['M52 130 Q64 126 79 131 L78 151 Q66 157 52 150 Z', 'M82 131 Q96 126 108 130 L108 150 Q94 157 82 151 Z'] },
    { name: 'Hamstrings', paths: ['M53 155 Q65 159 77 155 L73 179 L64 207 L55 226 L50 211 Z', 'M83 155 Q95 159 107 155 L110 211 L105 226 L96 207 L87 179 Z'] },
  ],
};

const styles = `
.muscle-panel{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(150px,.95fr);gap:12px;align-items:center;margin-top:12px;padding:13px;border:1px solid #e3ebe4;border-radius:14px;background:#fff}
.muscle-panel h4{font-size:.92rem;margin:0 0 4px;color:#263b2d}.muscle-panel p{font-size:.78rem;color:#64776a;line-height:1.45;margin:0 0 8px}
.muscle-figures{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;justify-items:center;gap:8px;min-width:0}.muscle-figure{display:block;width:100%;max-width:145px;height:auto;min-width:0;overflow:visible}.muscle-figure-label{text-anchor:middle;font:700 8px system-ui,sans-serif;fill:#53675a}
.body-base{fill:#dce3df;stroke:#87938c;stroke-width:1.4;stroke-linejoin:round}.body-detail{fill:none;stroke:#fff;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;opacity:.95}.muscle-patch{stroke:#fff;stroke-width:.8;stroke-linejoin:round;opacity:.96}.muscle-patch.primary{fill:#dc493b}.muscle-patch.secondary{fill:#e5a545}
.muscle-legend{display:flex;flex-wrap:wrap;gap:7px;margin:6px 0}.muscle-legend span{display:inline-flex;align-items:center;gap:5px;font-size:.73rem;color:#53675a}.muscle-swatch{display:inline-block;width:10px;height:10px;border-radius:50%;background:#dc493b}.muscle-swatch.secondary{background:#e5a545}
.muscle-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.muscle-tag{border-radius:999px;background:#f8e9e7;color:#85392f;padding:5px 8px;font-size:.72rem;font-weight:700}.muscle-tag.secondary{background:#fff2dc;color:#805514}
.demo-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 12px;border-radius:10px;background:#173d2b;color:#fff;text-decoration:none;font-size:.82rem;font-weight:750;margin-top:5px}.demo-link:hover{background:#24583e}.demo-note{font-size:.7rem!important;margin-top:5px!important}
@media(max-width:520px){.muscle-panel{grid-template-columns:1fr}.muscle-figures{grid-template-columns:repeat(2,minmax(0,120px));justify-content:start}.muscle-figure{width:100%;max-width:120px}}
`;

function MuscleFigure({ side, groups }) {
  const primary = new Set(groups.primary);
  const secondary = new Set(groups.secondary);
  const patches = REGIONS[side].flatMap(({ name, paths }) => {
    const kind = primary.has(name) ? 'primary' : secondary.has(name) ? 'secondary' : null;
    if (!kind) return [];
    return paths.map((path, index) => <path className={`muscle-patch ${kind}`} key={`${name}-${index}`} d={path} />);
  });
  const clipId = `body-clip-${side}`;
  return <svg className="muscle-figure" viewBox="0 0 160 275" role="img" aria-label={`${side} muscle map`}>
    <text className="muscle-figure-label" x="80" y="12">{side === 'front' ? 'FRONT' : 'BACK'}</text>
    <defs><clipPath id={clipId}><path d={BODY_SHAPE}/></clipPath></defs>
    <circle className="body-base" cx="80" cy="25" r="12" />
    <path className="body-base" d={BODY_SHAPE} />
    <g clipPath={`url(#${clipId})`}>{patches}</g>
    <g className="body-detail" aria-hidden="true">
      {side === 'front' ? <>
        <path d="M80 43 L80 78 M64 61 Q72 66 79 63 M81 63 Q89 66 97 61 M69 82 L79 82 M81 82 L91 82 M69 97 L79 97 M81 97 L91 97 M69 114 L79 114 M81 114 L91 114" />
        <path d="M64 157 L75 174 M96 157 L85 174 M62 184 L70 207 M98 184 L90 207 M48 215 L54 226 M112 215 L106 226" />
      </> : <>
        <path d="M80 43 L80 127 M68 57 L79 70 M92 57 L81 70 M67 76 L78 85 M93 76 L82 85 M68 105 L78 112 M92 105 L82 112" />
        <path d="M61 157 L74 175 M99 157 L86 175 M62 184 L70 207 M98 184 L90 207 M48 215 L54 226 M112 215 L106 226" />
      </>}
    </g>
  </svg>;
}

export default function ExerciseMedia({ exercise }) {
  const groups = MUSCLE_GROUPS[exercise.id] || { primary: [exercise.category || 'Full body'], secondary: [] };
  const videoSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${exercise.name} exercise proper form short demo`)}`;

  return <>
    <style>{styles}</style>
    <section className="muscle-panel" aria-label={`Muscle groups worked by ${exercise.name}`}>
      <div>
        <h4>Muscles worked</h4>
        <p>Illustrative muscle map: red shows primary muscles and gold shows supporting muscles.</p>
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
