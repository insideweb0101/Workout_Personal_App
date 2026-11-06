import React from 'react';

const MUSCLE_GROUPS = {
  'goblet-squat': { primary: ['Quads', 'Glutes'], secondary: ['Core'] },
  'kettlebell-goblet-squat': { primary: ['Quads', 'Glutes'], secondary: ['Core'] },
  'walking-lunge': { primary: ['Quads', 'Glutes'], secondary: ['Hamstrings', 'Core'] },
  'seated-leg-extension': { primary: ['Quads'], secondary: [] },
  'lying-leg-curl': { primary: ['Hamstrings'], secondary: ['Glutes'] },
  'romanian-deadlift': { primary: ['Hamstrings', 'Glutes'], secondary: ['Back', 'Core'] },
  'incline-press': { primary: ['Chest'], secondary: ['Shoulders', 'Triceps'] },
  'incline-bench-press': { primary: ['Chest'], secondary: ['Shoulders', 'Triceps'] },
  'db-bench-press': { primary: ['Chest'], secondary: ['Shoulders', 'Triceps'] },
  'standing-cable-fly': { primary: ['Chest'], secondary: ['Shoulders'] },
  'deficit-pushup': { primary: ['Chest'], secondary: ['Shoulders', 'Triceps', 'Core'] },
  'push-up': { primary: ['Chest'], secondary: ['Shoulders', 'Triceps', 'Core'] },
  dips: { primary: ['Triceps', 'Chest'], secondary: ['Shoulders'] },
  'lat-pulldown': { primary: ['Lats'], secondary: ['Upper back', 'Biceps'] },
  'wide-grip-lat-pulldown': { primary: ['Lats'], secondary: ['Upper back', 'Biceps'] },
  'seated-row': { primary: ['Upper back', 'Lats'], secondary: ['Biceps'] },
  'barbell-row': { primary: ['Upper back', 'Lats'], secondary: ['Biceps', 'Core'] },
  'close-grip-cable-row': { primary: ['Upper back', 'Lats'], secondary: ['Biceps'] },
  'inverted-row': { primary: ['Upper back', 'Lats'], secondary: ['Biceps', 'Core'] },
  'shoulder-press': { primary: ['Shoulders'], secondary: ['Triceps', 'Core'] },
  'military-press': { primary: ['Shoulders'], secondary: ['Triceps', 'Core'] },
  'db-lateral-raise': { primary: ['Shoulders'], secondary: [] },
  'cable-lateral-raise': { primary: ['Shoulders'], secondary: [] },
  'db-hammer-curl': { primary: ['Biceps'], secondary: ['Forearms'] },
  'ez-bar-bicep-curl': { primary: ['Biceps'], secondary: ['Forearms'] },
  'db-skull-crusher': { primary: ['Triceps'], secondary: [] },
  'hanging-knee-raise': { primary: ['Core'], secondary: [] },
  'swiss-ball-crunch': { primary: ['Core'], secondary: [] },
  plank: { primary: ['Core'], secondary: ['Shoulders'] },
  'prone-cobra-hold': { primary: ['Back'], secondary: ['Glutes'] },
};

const REGION_SHAPES = {
  front: {
    Chest: [[35, 49, 7, 5], [45, 49, 7, 5]],
    Shoulders: [[26, 42, 5, 5], [54, 42, 5, 5]],
    Biceps: [[19, 57, 4, 8], [61, 57, 4, 8]],
    Triceps: [[19, 57, 4, 8], [61, 57, 4, 8]],
    Forearms: [[15, 72, 3, 9], [65, 72, 3, 9]],
    Core: [[40, 67, 8, 12]],
    Quads: [[34, 102, 5, 13], [46, 102, 5, 13]],
    Glutes: [[35, 84, 5, 5], [45, 84, 5, 5]],
    Hamstrings: [[34, 106, 5, 12], [46, 106, 5, 12]],
    Back: [[40, 56, 9, 8]],
    Lats: [[31, 59, 5, 9], [49, 59, 5, 9]],
    'Upper back': [[40, 53, 8, 7]],
  },
  back: {
    Chest: [],
    Shoulders: [[26, 42, 5, 5], [54, 42, 5, 5]],
    Biceps: [[19, 57, 4, 8], [61, 57, 4, 8]],
    Triceps: [[19, 57, 4, 8], [61, 57, 4, 8]],
    Forearms: [[15, 72, 3, 9], [65, 72, 3, 9]],
    Core: [[40, 67, 7, 12]],
    Quads: [],
    Glutes: [[35, 84, 5, 6], [45, 84, 5, 6]],
    Hamstrings: [[34, 106, 5, 12], [46, 106, 5, 12]],
    Back: [[40, 56, 9, 8]],
    Lats: [[31, 62, 5, 10], [49, 62, 5, 10]],
    'Upper back': [[40, 53, 8, 7]],
  },
};

const muscleStyles = `
.muscle-panel{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(150px,.85fr);gap:12px;align-items:center;margin-top:12px;padding:13px;border:1px solid #e3ebe4;border-radius:14px;background:#fff}
.muscle-panel h4{font-size:.92rem;margin:0 0 4px;color:#263b2d}.muscle-panel p{font-size:.78rem;color:#64776a;line-height:1.45;margin:0 0 8px}
.muscle-figures{display:flex;justify-content:center;gap:8px}.muscle-figure{width:min(42%,110px);height:auto}.muscle-figure-label{text-anchor:middle;font:700 8px system-ui,sans-serif;fill:#53675a}
.muscle-legend{display:flex;flex-wrap:wrap;gap:7px;margin:6px 0}.muscle-legend span{display:inline-flex;align-items:center;gap:5px;font-size:.73rem;color:#53675a}.muscle-swatch{display:inline-block;width:10px;height:10px;border-radius:50%;background:#32805a}.muscle-swatch.secondary{background:#e5a545}
.muscle-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.muscle-tag{border-radius:999px;background:#e8f4ec;color:#24623e;padding:5px 8px;font-size:.72rem;font-weight:700}.muscle-tag.secondary{background:#fff2dc;color:#805514}
.demo-link{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 12px;border-radius:10px;background:#173d2b;color:#fff;text-decoration:none;font-size:.82rem;font-weight:750;margin-top:5px}.demo-link:hover{background:#24583e}.demo-note{font-size:.7rem!important;margin-top:5px!important}
@media(max-width:520px){.muscle-panel{grid-template-columns:1fr}.muscle-figures{justify-content:flex-start}.muscle-figure{width:82px}}
`;

function MuscleFigure({ side, highlighted }) {
  const active = new Set(highlighted);
  return <svg className="muscle-figure" viewBox="0 0 80 165" role="img" aria-label={`${side} muscle map`}>
    <text className="muscle-figure-label" x="40" y="10">{side === 'front' ? 'FRONT' : 'BACK'}</text>
    <g fill="#dce5de" stroke="#718378" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="40" cy="23" r="8" />
      <path d="M34 32 L27 36 L23 42 L28 47 L30 61 L33 78 L30 88 L34 93 L31 119 L29 149 L36 151 L40 122 L44 151 L51 149 L49 119 L46 93 L50 88 L47 78 L50 61 L52 47 L57 42 L53 36 L46 32 Z" />
      <path d="M27 37 L18 43 L13 64 L11 75 L16 77 L21 64 L30 49 Z M53 37 L62 43 L67 64 L69 75 L64 77 L59 64 L50 49 Z" />
    </g>
    {Object.entries(REGION_SHAPES[side]).flatMap(([muscle, shapes]) => shapes.filter(() => active.has(muscle)).map(([cx, cy, rx, ry], index) => <ellipse key={`${muscle}-${index}`} cx={cx} cy={cy} rx={rx} ry={ry} fill={highlighted.indexOf(muscle) < 2 ? '#32805a' : '#e5a545'} fillOpacity=".88" stroke="#fff" strokeWidth=".6" />))}
  </svg>;
}

export default function ExerciseMedia({ exercise }) {
  const groups = MUSCLE_GROUPS[exercise.id] || { primary: [exercise.category || 'Full body'], secondary: [] };
  const selected = [...groups.primary, ...groups.secondary];
  const query = encodeURIComponent(`${exercise.name} exercise proper form short demo`);
  const videoSearchUrl = `https://www.youtube.com/results?search_query=${query}`;

  return <>
    <style>{muscleStyles}</style>
    <section className="muscle-panel" aria-label={`Muscle groups worked by ${exercise.name}`}>
      <div>
        <h4>Muscles worked</h4>
        <p>Illustrative muscle map — highlighted areas show the main and supporting muscles.</p>
        <div className="muscle-legend"><span><i className="muscle-swatch" /> Main</span><span><i className="muscle-swatch secondary" /> Supporting</span></div>
        <div className="muscle-tags">{groups.primary.map((name) => <span className="muscle-tag" key={`main-${name}`}>{name}</span>)}{groups.secondary.map((name) => <span className="muscle-tag secondary" key={`support-${name}`}>{name}</span>)}</div>
      </div>
      <div className="muscle-figures"><MuscleFigure side="front" highlighted={selected} /><MuscleFigure side="back" highlighted={selected} /></div>
      <div>
        <h4>See the movement</h4>
        <p>Open a video search for this exercise and choose a short demonstration that matches your equipment.</p>
        <a className="demo-link" href={videoSearchUrl} target="_blank" rel="noopener noreferrer">▶ Find a video demo</a>
        <p className="demo-note">Opens YouTube; internet connection required.</p>
      </div>
    </section>
  </>;
}
