import React from 'react';

// Simple, original line diagrams show a setup and a movement position for each exercise.
const poses = {
  'goblet-squat': [
    { head:[80,30], shoulder:[80,48], hip:[80,83], arms:[[[80,52],[68,64],[77,68]],[[80,52],[92,64],[83,68]]], legs:[[[80,83],[68,105],[67,128]],[[80,83],[92,105],[93,128]]] },
    { head:[80,47], shoulder:[80,64], hip:[80,91], arms:[[[80,66],[68,75],[77,78]],[[80,66],[92,75],[83,78]]], legs:[[[80,91],[65,104],[63,127]],[[80,91],[95,104],[97,127]]] },
  ],
  'incline-press': [
    { head:[48,77], shoulder:[65,78], hip:[103,83], arms:[[[65,78],[73,61],[76,47]],[[68,78],[80,61],[85,48]]], legs:[[[103,83],[120,98],[139,103]],[[103,83],[121,108],[143,111]]], bench:true },
    { head:[48,77], shoulder:[65,78], hip:[103,83], arms:[[[65,78],[69,57],[70,37]],[[68,78],[76,57],[78,37]]], legs:[[[103,83],[120,98],[139,103]],[[103,83],[121,108],[143,111]]], bench:true },
  ],
  'incline-bench-press': [
    { head:[48,77], shoulder:[65,78], hip:[103,83], arms:[[[65,78],[73,61],[76,47]],[[68,78],[80,61],[85,48]]], legs:[[[103,83],[120,98],[139,103]],[[103,83],[121,108],[143,111]]], bench:true },
    { head:[48,77], shoulder:[65,78], hip:[103,83], arms:[[[65,78],[69,57],[70,37]],[[68,78],[76,57],[78,37]]], legs:[[[103,83],[120,98],[139,103]],[[103,83],[121,108],[143,111]]], bench:true },
  ],
  'lat-pulldown': [
    { head:[80,49], shoulder:[80,67], hip:[80,91], arms:[[[80,68],[63,51],[57,38]],[[80,68],[97,51],[103,38]]], legs:[[[80,91],[68,108],[64,124]],[[80,91],[95,108],[100,124]]], seated:true },
    { head:[80,49], shoulder:[80,67], hip:[80,91], arms:[[[80,68],[66,67],[62,76]],[[80,68],[94,67],[98,76]]], legs:[[[80,91],[68,108],[64,124]],[[80,91],[95,108],[100,124]]], seated:true },
  ],
  'wide-grip-lat-pulldown': [
    { head:[80,49], shoulder:[80,67], hip:[80,91], arms:[[[80,68],[52,49],[42,37]],[[80,68],[108,49],[118,37]]], legs:[[[80,91],[68,108],[64,124]],[[80,91],[95,108],[100,124]]], seated:true },
    { head:[80,49], shoulder:[80,67], hip:[80,91], arms:[[[80,68],[58,67],[52,76]],[[80,68],[102,67],[108,76]]], legs:[[[80,91],[68,108],[64,124]],[[80,91],[95,108],[100,124]]], seated:true },
  ],
  'romanian-deadlift': [
    { head:[80,28], shoulder:[80,47], hip:[80,81], arms:[[[76,51],[72,75],[72,99]],[[84,51],[88,75],[88,99]]], legs:[[[80,81],[69,104],[68,128]],[[80,81],[92,104],[93,128]]] },
    { head:[103,48], shoulder:[91,62], hip:[75,82], arms:[[[89,63],[81,83],[78,101]],[[94,65],[87,85],[84,103]]], legs:[[[75,82],[69,105],[68,128]],[[75,82],[91,105],[93,128]]] },
  ],
  'seated-row': [
    { head:[80,47], shoulder:[80,65], hip:[80,89], arms:[[[78,67],[61,78],[50,84]],[[82,67],[100,78],[111,84]]], legs:[[[80,89],[67,105],[63,121]],[[80,89],[98,105],[102,121]]], seated:true },
    { head:[80,47], shoulder:[80,65], hip:[80,89], arms:[[[78,67],[68,67],[76,77]],[[82,67],[92,67],[84,77]]], legs:[[[80,89],[67,105],[63,121]],[[80,89],[98,105],[102,121]]], seated:true },
  ],
  'shoulder-press': [
    { head:[80,38], shoulder:[80,57], hip:[80,89], arms:[[[77,58],[67,70],[67,83]],[[83,58],[93,70],[93,83]]], legs:[[[80,89],[68,108],[65,127]],[[80,89],[92,108],[95,127]]], seated:true },
    { head:[80,38], shoulder:[80,57], hip:[80,89], arms:[[[77,58],[67,41],[67,23]],[[83,58],[93,41],[93,23]]], legs:[[[80,89],[68,108],[65,127]],[[80,89],[92,108],[95,127]]], seated:true },
  ],
  'db-lateral-raise': [
    { head:[80,36], shoulder:[80,55], hip:[80,89], arms:[[[76,57],[69,70],[65,82]],[[84,57],[91,70],[95,82]]], legs:[[[80,89],[68,108],[65,128]],[[80,89],[92,108],[95,128]]] },
    { head:[80,36], shoulder:[80,55], hip:[80,89], arms:[[[76,57],[57,52],[43,47]],[[84,57],[103,52],[117,47]]], legs:[[[80,89],[68,108],[65,128]],[[80,89],[92,108],[95,128]]] },
  ],
  'db-hammer-curl': [
    { head:[80,36], shoulder:[80,55], hip:[80,89], arms:[[[76,57],[68,76],[67,94]],[[84,57],[92,76],[93,94]]], legs:[[[80,89],[68,108],[65,128]],[[80,89],[92,108],[95,128]]] },
    { head:[80,36], shoulder:[80,55], hip:[80,89], arms:[[[76,57],[67,68],[67,79]],[[84,57],[93,68],[93,79]]], legs:[[[80,89],[68,108],[65,128]],[[80,89],[92,108],[95,128]]] },
  ],
  'db-skull-crusher': [
    { head:[48,77], shoulder:[65,78], hip:[103,83], arms:[[[65,78],[70,60],[76,42]],[[68,78],[76,60],[84,42]]], legs:[[[103,83],[120,98],[139,103]],[[103,83],[121,108],[143,111]]], bench:true },
    { head:[48,77], shoulder:[65,78], hip:[103,83], arms:[[[65,78],[78,65],[84,82]],[[68,78],[85,65],[91,82]]], legs:[[[103,83],[120,98],[139,103]],[[103,83],[121,108],[143,111]]], bench:true },
  ],
  'walking-lunge': [
    { head:[80,36], shoulder:[80,55], hip:[80,83], arms:[[[76,57],[70,73],[69,84]],[[84,57],[90,73],[91,84]]], legs:[[[80,83],[69,104],[67,128]],[[80,83],[92,104],[94,128]]] },
    { head:[80,36], shoulder:[80,55], hip:[80,82], arms:[[[76,57],[70,73],[69,84]],[[84,57],[90,73],[91,84]]], legs:[[[80,82],[56,97],[47,128]],[[80,82],[105,96],[128,128]]] },
  ],
  'swiss-ball-crunch': [
    { head:[49,59], shoulder:[65,65], hip:[99,83], arms:[[[65,65],[58,49],[55,42]],[[68,66],[75,50],[78,43]]], legs:[[[99,83],[117,96],[130,111]],[[99,83],[119,101],[139,111]]], bench:true },
    { head:[52,46], shoulder:[67,57], hip:[99,83], arms:[[[67,57],[59,43],[55,36]],[[70,58],[78,44],[81,37]]], legs:[[[99,83],[117,96],[130,111]],[[99,83],[119,101],[139,111]]], bench:true },
  ],
  plank: [
    { head:[31,76], shoulder:[49,78], hip:[91,82], arms:[[[50,78],[43,94],[42,108]],[[52,79],[59,95],[60,108]]], legs:[[[91,82],[121,85],[148,86]],[[91,82],[121,87],[148,88]]], floor:true },
    { head:[31,76], shoulder:[49,78], hip:[91,82], arms:[[[50,78],[43,94],[42,108]],[[52,79],[59,95],[60,108]]], legs:[[[91,82],[121,85],[148,86]],[[91,82],[121,87],[148,88]]], floor:true },
  ],
  'push-up': [
    { head:[35,59], shoulder:[51,66], hip:[91,83], arms:[[[51,66],[58,84],[61,103]],[[53,67],[68,84],[71,103]]], legs:[[[91,83],[119,89],[146,94]],[[91,83],[119,90],[146,95]]], floor:true },
    { head:[35,54], shoulder:[51,60], hip:[91,78], arms:[[[51,60],[55,77],[57,94]],[[53,61],[65,77],[67,94]]], legs:[[[91,78],[119,84],[146,89]],[[91,78],[119,85],[146,90]]], floor:true },
  ],
};

function point([x,y]) { return `${x},${y}`; }
function Person({ pose }) {
  return <g fill="none" stroke="#174431" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    {pose.floor && <path d="M16 112 H154" stroke="#b6c8bc" strokeWidth="2" />}
    {pose.bench && <path d="M36 100 L112 87 M50 100 L45 119 M104 91 L110 115" stroke="#789785" strokeWidth="4" />}
    {pose.seated && !pose.bench && <path d="M63 96 H101 M67 96 V121 M98 96 V121" stroke="#789785" strokeWidth="3" />}
    <circle cx={pose.head[0]} cy={pose.head[1]} r="8" fill="#f2c7a5" stroke="#174431" />
    <path d={`M${point(pose.shoulder)} L${point(pose.hip)}`} />
    {pose.arms.map((arm, i) => <g key={`arm-${i}`}><path d={`M${point(arm[0])} L${point(arm[1])} L${point(arm[2])}`} /><circle cx={arm[2][0]} cy={arm[2][1]} r="3" fill="#174431" /></g>)}
    {pose.legs.map((leg, i) => <path key={`leg-${i}`} d={`M${point(leg[0])} L${point(leg[1])} L${point(leg[2])}`} />)}
    {pose.floor && <path d="M42 107 H61" stroke="#d99838" strokeWidth="3" />}
  </g>;
}

export default function ExerciseGuide({ exercise, compact = false }) {
  const pair = poses[exercise.id];
  if (!pair) return <div className="guide-fallback">Follow the technique steps below.</div>;
  const caption = exercise.id === 'romanian-deadlift' ? 'Hinge at hips' : exercise.id === 'plank' ? 'Hold a straight line' : exercise.id === 'walking-lunge' ? 'Step and lower' : exercise.id === 'db-lateral-raise' ? 'Lift arms out' : exercise.id === 'db-hammer-curl' ? 'Curl without swinging' : exercise.id === 'db-skull-crusher' ? 'Bend and extend elbows' : exercise.id === 'swiss-ball-crunch' ? 'Curl ribs toward hips' : 'Move with control';
  return <div className={`exercise-guide${compact ? ' compact' : ''}`} role="img" aria-label={`${exercise.name}: setup and movement positions`}>
    <svg viewBox="0 0 360 160" aria-hidden="true">
      <rect x="4" y="4" width="164" height="150" rx="14" fill="#f2f7f2" />
      <rect x="192" y="4" width="164" height="150" rx="14" fill="#f2f7f2" />
      <text x="86" y="24" textAnchor="middle" className="guide-label">1 · SET UP</text>
      <text x="274" y="24" textAnchor="middle" className="guide-label">2 · {caption.toUpperCase()}</text>
      <g transform="translate(0 8)"><Person pose={pair[0]} /></g>
      <g transform="translate(188 8)"><Person pose={pair[1]} /></g>
      <path d="M173 78 H185 M181 73 L186 78 L181 83" fill="none" stroke="#32805a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="guide-caption">Illustration: starting position → movement</span>
  </div>;
}
