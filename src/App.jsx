import { useEffect, useState } from 'react';
import { EXERCISES, ROUTINES } from './data/exercises.js';
import ExerciseGuide from './components/ExerciseGuide.jsx';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const LOG_KEY = 'workout-app-log-v1';
const PROGRESS_KEY = 'workout-app-progress-v1';
const PROGRAM_KEY = 'workout-app-program-v1';

const FULL_BODY_PROGRAM = {
  id: 'full-body-alternative',
  name: '3-day full-body alternative',
  routines: [
    { day: 'Monday', title: 'Full Body A', focus: 'A balanced full-body session. Choose a manageable load and keep every rep controlled.', exercises: ['goblet-squat', 'db-bench-press', 'seated-row', 'db-lateral-raise', 'swiss-ball-crunch'] },
    { day: 'Tuesday', title: 'Recovery day', focus: 'Rest, take an easy walk, or do comfortable mobility.', exercises: [] },
    { day: 'Wednesday', title: 'Full Body B', focus: 'Train the whole body with a hip hinge, press, pull, and single-leg movement.', exercises: ['romanian-deadlift', 'military-press', 'lat-pulldown', 'walking-lunge', 'plank'] },
    { day: 'Thursday', title: 'Recovery day', focus: 'Rest and allow your body to recover.', exercises: [] },
    { day: 'Friday', title: 'Full Body C', focus: 'A different full-body session. Use a comfortable range and steady technique.', exercises: ['incline-bench-press', 'close-grip-cable-row', 'lying-leg-curl', 'ez-bar-bicep-curl', 'dips'] },
    { day: 'Saturday', title: 'Optional light activity', focus: 'Choose an easy walk, bike ride, or full rest day.', exercises: [] },
    { day: 'Sunday', title: 'Rest day', focus: 'Rest and prepare for the next week.', exercises: [] },
  ],
};

const PROGRAMS = [
  { id: 'current', name: 'Current weekly routine', routines: ROUTINES },
  FULL_BODY_PROGRAM,
];

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
}

function getRepTarget(reps) {
  if (!reps || /amrap|min|sec/i.test(reps)) return null;
  const range = reps.match(/\d+\s*[–-]\s*(\d+)/);
  if (range) return Number(range[1]);
  const exact = reps.match(/^\s*(\d+)\s*$/);
  return exact ? Number(exact[1]) : null;
}

export default function App() {
  const [day, setDay] = useState(DAYS[(new Date().getDay() + 6) % 7]);
  const [programId, setProgramId] = useState(() => readStorage(PROGRAM_KEY, 'current'));
  const [log, setLog] = useState(() => readStorage(LOG_KEY, {}));
  const [progress, setProgress] = useState(() => readStorage(PROGRESS_KEY, { weights: {}, reps: {}, unit: 'lb' }));

  useEffect(() => localStorage.setItem(LOG_KEY, JSON.stringify(log)), [log]);
  useEffect(() => localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)), [progress]);
  useEffect(() => localStorage.setItem(PROGRAM_KEY, JSON.stringify(programId)), [programId]);

  const program = PROGRAMS.find((item) => item.id === programId) || PROGRAMS[0];
  const routine = program.routines.find((item) => item.day === day) || ROUTINES.find((item) => item.day === day) || ROUTINES[0];
  const exercises = routine.exercises.map((id) => EXERCISES.find((item) => item.id === id)).filter(Boolean);
  const isRestDay = exercises.length === 0;
  const done = log[`${programId}:${day}`] || [];
  const percent = exercises.length ? Math.round((done.length / exercises.length) * 100) : 0;

  function toggle(id) {
    const logKey = `${programId}:${day}`;
    setLog((current) => {
      const list = current[logKey] || [];
      return { ...current, [logKey]: list.includes(id) ? list.filter((value) => value !== id) : [...list, id] };
    });
  }

  function setWeight(id, value) {
    setProgress((current) => ({ ...current, weights: { ...current.weights, [id]: value } }));
  }

  function setSetReps(id, setIndex, value) {
    setProgress((current) => {
      const reps = [...(current.reps[id] || [])];
      reps[setIndex] = value;
      return { ...current, reps: { ...current.reps, [id]: reps } };
    });
  }

  function changeProgram(value) {
    setProgramId(value);
    setDay(DAYS[(new Date().getDay() + 6) % 7]);
  }

  return <main className="wrap">
    <header className="header"><div><p className="kicker">YOUR TRAINING COMPANION</p><h1>Workout Personal</h1></div>{!isRestDay && <div className="badge">{percent}% complete</div>}</header>
    <section className="program-picker"><label htmlFor="program-choice">Choose your weekly routine</label><select id="program-choice" value={programId} onChange={(event) => changeProgram(event.target.value)}>{PROGRAMS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><p>You can switch routines any time. Your exercise weights and workout checkmarks are saved on this device.</p></section>
    <section className="hero"><div><p className="kicker">TODAY'S PLAN</p><h2>{routine.title}</h2><p>{routine.focus}</p></div>{!isRestDay && <div className="count"><strong>{done.length}/{exercises.length}</strong><span>exercises done</span></div>}</section>
    <nav className="days" aria-label="Choose workout day">{DAYS.map((name) => <button key={name} onClick={() => setDay(name)} className={day === name ? 'selected' : ''}>{name.slice(0, 3)}</button>)}</nav>
    {!isRestDay && <>
      <section className="section"><div className="section-head"><h2>{day}'s workout</h2><span>{percent}% complete</span></div><div className="progress"><span style={{ width: `${percent}%` }} /></div>
        <div className="weight-unit"><label htmlFor="weight-unit">Weight units</label><select id="weight-unit" value={progress.unit || 'lb'} onChange={(event) => setProgress((current) => ({ ...current, unit: event.target.value }))}><option value="lb">Pounds (lb)</option><option value="kg">Kilograms (kg)</option></select></div>
        <div className="cards">{exercises.map((exercise) => {
          const setCount = Math.max(1, Number(exercise.sets) || 1);
          const target = getRepTarget(exercise.reps);
          const completedReps = progress.reps[exercise.id] || [];
          const reachedTarget = target && setCount >= 3 && Array.from({ length: setCount }, (_, index) => Number(completedReps[index]) >= target).every(Boolean);
          return <article className={`exercise ${done.includes(exercise.id) ? 'completed' : ''}`} key={exercise.id}>
            <ExerciseGuide exercise={exercise} />
            <div className="details"><div className="exercise-title"><div><span className="category">{exercise.category}</span><h3>{exercise.name}</h3></div><button className="complete" onClick={() => toggle(exercise.id)}>{done.includes(exercise.id) ? 'Done ✓' : 'Mark done'}</button></div>
              <div className="prescription"><span>{exercise.sets} sets</span><span>{exercise.reps} reps</span>{exercise.rest && <span>Rest: {exercise.rest}</span>}</div>
              <div className="tracking-fields"><label>Weight used ({progress.unit || 'lb'})<input type="number" min="0" step="0.5" inputMode="decimal" placeholder="e.g. 20" value={progress.weights[exercise.id] ?? ''} onChange={(event) => setWeight(exercise.id, event.target.value)} /></label></div>
              {target && <div className="rep-tracking"><p>Log reps completed in each set (target: {target} reps per set)</p><div className="set-inputs">{Array.from({ length: setCount }, (_, index) => <label key={index}>Set {index + 1}<input type="number" min="0" step="1" inputMode="numeric" placeholder="reps" value={completedReps[index] ?? ''} onChange={(event) => setSetReps(exercise.id, index, event.target.value)} /></label>)}</div>{reachedTarget ? <p className="progression-hint">You reached the target for every set. If all reps felt controlled and pain-free, consider a small weight increase next time.</p> : <p className="tracking-help">When you can complete all prescribed sets at the top of the rep range with good form, consider a small increase next workout.</p>}</div>}
              <p><b>Works:</b> {exercise.benefits}</p><p><b>Technique:</b> {exercise.technique}</p><p><b>Beginner tip:</b> {exercise.tip}</p>
            </div></article>;
        })}</div>
      </section>
      <section className="section"><div className="section-head"><h2>Exercise library</h2><span>{EXERCISES.length} exercises</span></div><div className="library">{EXERCISES.map((exercise) => <article className="library-card" key={exercise.id}><ExerciseGuide exercise={exercise} compact /><div><span className="category">{exercise.category}</span><h3>{exercise.name}</h3><p>{exercise.benefits}</p><p><b>Technique:</b> {exercise.technique}</p></div></article>)}</div></section>
      <p className="note">Choose a manageable weight that lets you keep good form. Increase gradually only when all prescribed sets feel controlled and pain-free. Stop if you feel sharp pain, and ask a qualified trainer to check your technique.</p>
    </>}
  </main>;
}
