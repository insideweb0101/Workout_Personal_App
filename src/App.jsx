import { useEffect, useState } from 'react';
import { EXERCISES, ROUTINES } from './data/exercises.js';
import { PROGRAMS, PROGRAM_EXERCISES, PROGRAM_EXERCISES_BY_ID } from './data/programs.js';
import ExerciseGuide from './components/ExerciseGuide.jsx';
import ProfilePanel from './components/ProfilePanel.jsx';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const LOG_KEY = 'workout-app-log-v1';
const PROGRESS_KEY = 'workout-app-progress-v1';
const PROGRAM_KEY = 'workout-app-program-v1';
const PROFILE_KEY = 'workout-app-profile-v1';
const WEIGHT_TRAINING_MET = 3.5;
const ALL_EXERCISES = [...EXERCISES, ...PROGRAM_EXERCISES];
const DEFAULT_PROFILE = { name: '', heightCm: '', weight: '', weightUnit: 'lb', bodyFat: '', musclePercent: '', waistCm: '', proteinGoal: '' };

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
}
function restDurationInSeconds(rest) {
  const match = rest?.match(/(\d+)\s*(min|sec)/i);
  if (!match) return 60;
  return Number(match[1]) * (match[2].toLowerCase() === 'min' ? 60 : 1);
}
function formatTime(seconds) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }
function getRepTarget(reps) {
  if (!reps || /amrap|min|sec|easy|steady|hard|brisk|interval/i.test(reps)) return null;
  const range = reps.match(/\d+\s*[–-]\s*(\d+)/);
  if (range) return Number(range[1]);
  const exact = reps.match(/^\s*(\d+)\s*$/);
  return exact ? Number(exact[1]) : null;
}
function getRepLabel(reps) { return /min|sec/i.test(reps || '') ? 'seconds' : 'reps'; }
function getWeightKg(profile) {
  const value = Number(profile.weight);
  if (!Number.isFinite(value) || value <= 0) return null;
  return profile.weightUnit === 'lb' ? value / 2.20462 : value;
}
function estimateCalories(profile, seconds) {
  const weightKg = getWeightKg(profile);
  if (!weightKg || seconds <= 0) return null;
  return Math.round((WEIGHT_TRAINING_MET * 3.5 * weightKg / 200) * (seconds / 60));
}

export default function App() {
  const [day, setDay] = useState(DAYS[(new Date().getDay() + 6) % 7]);
  const [programId, setProgramId] = useState(() => {
    const stored = readStorage(PROGRAM_KEY, 'standard');
    return stored === 'current' ? 'standard' : stored;
  });
  const [log, setLog] = useState(() => readStorage(LOG_KEY, {}));
  const [progress, setProgress] = useState(() => readStorage(PROGRESS_KEY, { weights: {}, reps: {}, unit: 'lb' }));
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_PROFILE, ...readStorage(PROFILE_KEY, {}) }));
  const [view, setView] = useState('plan');
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [finished, setFinished] = useState(false);
  const [sessionStartedAt, setSessionStartedAt] = useState(null);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => localStorage.setItem(LOG_KEY, JSON.stringify(log)), [log]);
  useEffect(() => localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)), [progress]);
  useEffect(() => localStorage.setItem(PROGRAM_KEY, JSON.stringify(programId)), [programId]);
  useEffect(() => localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)), [profile]);
  useEffect(() => {
    if (!timer) return undefined;
    const interval = window.setInterval(() => setTimer((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [timer > 0]);
  useEffect(() => {
    if (view !== 'workout' || !sessionStartedAt) return undefined;
    const updateElapsed = () => setElapsedSeconds(Math.floor((Date.now() - sessionStartedAt) / 1000));
    updateElapsed();
    const interval = window.setInterval(updateElapsed, 1000);
    return () => window.clearInterval(interval);
  }, [view, sessionStartedAt]);

  const program = PROGRAMS.find((item) => item.id === programId) || PROGRAMS[0];
  const routine = program.routines.find((item) => item.day === day) || program.routines[0] || ROUTINES[0];
  const exercises = routine.exercises.map((id) => ALL_EXERCISES.find((item) => item.id === id)).filter(Boolean);
  const isRestDay = exercises.length === 0;
  const logKey = `${programId}:${day}`;
  const done = log[logKey] || [];
  const percent = exercises.length ? Math.round((done.length / exercises.length) * 100) : 0;
  const exercise = exercises[activeIndex];
  const currentCalories = estimateCalories(profile, elapsedSeconds);
  const finalCalories = estimateCalories(profile, sessionSeconds);

  function toggle(id) {
    setLog((current) => {
      const list = current[logKey] || [];
      return { ...current, [logKey]: list.includes(id) ? list.filter((value) => value !== id) : [...list, id] };
    });
  }
  function setWeight(id, value) { setProgress((current) => ({ ...current, weights: { ...current.weights, [id]: value } })); }
  function setSetReps(id, setIndex, value) {
    setProgress((current) => {
      const reps = [...(current.reps[id] || [])];
      reps[setIndex] = value;
      return { ...current, reps: { ...current.reps, [id]: reps } };
    });
  }
  function selectDay(name) {
    setDay(name); setView('plan'); setActiveIndex(0); setTimer(0); setFinished(false);
  }
  function changeProgram(value) {
    setProgramId(value);
    const next = PROGRAMS.find((item) => item.id === value);
    const today = DAYS[(new Date().getDay() + 6) % 7];
    setDay(next?.routines.some((item) => item.day === today) ? today : next.routines[0].day);
    setView('plan'); setActiveIndex(0); setTimer(0); setFinished(false);
  }
  function startWorkout() {
    const firstUnfinished = exercises.findIndex((item) => !done.includes(item.id));
    const started = Date.now();
    setActiveIndex(firstUnfinished < 0 ? 0 : firstUnfinished); setView('workout'); setFinished(false); setTimer(0);
    setSessionStartedAt(started); setElapsedSeconds(0); setSessionSeconds(0);
  }
  function closeWorkout(wrappedUp) {
    const seconds = sessionStartedAt ? Math.max(0, Math.floor((Date.now() - sessionStartedAt) / 1000)) : elapsedSeconds;
    setSessionSeconds(seconds); setTimer(0); setFinished(wrappedUp); setView('summary');
  }
  function advanceExercise() {
    if (!exercise) return;
    if (!done.includes(exercise.id)) toggle(exercise.id);
    setTimer(0);
    if (activeIndex === exercises.length - 1) closeWorkout(true);
    else setActiveIndex((index) => index + 1);
  }
  function finishEarly() { closeWorkout(false); }

  const setCount = exercise ? Math.max(1, Number(exercise.sets) || 1) : 0;
  const target = exercise ? getRepTarget(exercise.reps) : null;
  const completedReps = exercise ? progress.reps[exercise.id] || [] : [];
  const reachedTarget = Boolean(target && setCount >= 3 && Array.from({ length: setCount }, (_, index) => Number(completedReps[index]) >= target).every(Boolean));

  return <main className="wrap">
    <header className="header"><div><p className="kicker">YOUR TRAINING COMPANION</p><h1>Workout Personal</h1></div>{!isRestDay && <div className="badge">{percent}% complete</div>}</header>
    <ProfilePanel profile={profile} onChange={setProfile} />
    <section className="program-section" aria-labelledby="program-heading">
      <div className="section-head"><div><p className="kicker">CHOOSE YOUR FOCUS</p><h2 id="program-heading">Workout programs</h2></div><span>{PROGRAMS.length} programs</span></div>
      <div className="program-cards" role="group" aria-label="Choose a workout program">
        {PROGRAMS.map((item) => <button key={item.id} type="button" className={`program-card${programId === item.id ? ' selected' : ''}`} aria-pressed={programId === item.id} onClick={() => changeProgram(item.id)}>
          <span className="program-card-top"><span className="program-icon" aria-hidden="true">{item.icon}</span>{programId === item.id && <span className="program-selected-mark" aria-label="Selected">✓</span>}</span>
          <strong>{item.name}</strong><span className="program-card-description">{item.description}</span>
          <span className="program-meta"><span>{item.duration}</span><span>{item.level}</span></span>
        </button>)}
      </div>
    </section>
    <nav className="days" aria-label="Choose workout day">{DAYS.map((name) => <button key={name} onClick={() => selectDay(name)} className={day === name ? 'selected' : ''}>{name.slice(0, 3)}</button>)}</nav>
    <section className="hero"><div><p className="kicker">{view === 'workout' ? 'WORKOUT IN PROGRESS' : view === 'summary' ? 'SESSION COMPLETE' : program.name.toUpperCase()}</p><h2>{view === 'workout' && exercise ? exercise.name : routine.title}</h2><p>{view === 'workout' && exercise ? `Exercise ${activeIndex + 1} of ${exercises.length} · ${exercise.sets} sets · ${exercise.reps}` : view === 'summary' ? `${done.length} of ${exercises.length} exercises checked off.` : routine.focus}</p></div>{!isRestDay && <div className="count"><strong>{done.length}/{exercises.length}</strong><span>exercises done</span></div>}</section>

    {view === 'workout' && <section className="calorie-estimate" aria-live="polite"><span className="calorie-icon" aria-hidden="true">⚡</span><div><strong>{currentCalories === null ? 'Add weight to estimate calories' : `About ${currentCalories} calories so far`}</strong><span>Rough exercise estimate · session time {formatTime(elapsedSeconds)}</span></div></section>}

    {view === 'plan' && !isRestDay && <>
      <section className="section routine-overview"><div className="section-head"><h2>{routine.title}</h2><span>{exercises.length} exercises</span></div>
        <p className="routine-focus">{routine.focus}</p>
        <ol className="routine-list">{exercises.map((item) => <li key={item.id}><div><strong>{item.name}</strong><span>{item.sets} sets · {item.reps}{item.rest ? ` · ${item.rest} rest` : ''}</span></div><span className={done.includes(item.id) ? 'routine-done' : 'routine-pending'}>{done.includes(item.id) ? 'Done ✓' : 'Planned'}</span></li>)}</ol>
        <button className="start-button" onClick={startWorkout}>{done.length ? 'Continue workout' : 'Start workout'}</button>
      </section>
      <section className="section"><div className="section-head"><h2>Exercise library</h2><span>{ALL_EXERCISES.length} exercises</span></div><div className="library">{ALL_EXERCISES.map((item) => <article className="library-card" key={item.id}><ExerciseGuide exercise={item} compact /><div><span className="category">{item.category}</span><h3>{item.name}</h3><p>{item.benefits}</p><p><b>Technique:</b> {item.technique}</p></div></article>)}</div></section>
    </>}
    {view === 'plan' && isRestDay && <section className="section rest-day"><h2>{routine.title}</h2><p>{routine.focus}</p></section>}

    {view === 'workout' && exercise && <section className="section session-panel">
      <div className="session-topline"><button className="text-button" onClick={() => { setView('plan'); setTimer(0); }}>← Back to routine</button><span>Exercise {activeIndex + 1} / {exercises.length}</span></div>
      <div className="session-progress"><span style={{ width: `${Math.round(((activeIndex + (done.includes(exercise.id) ? 1 : 0)) / exercises.length) * 100)}%` }} /></div>
      <ExerciseGuide exercise={exercise} />
      <div className="details session-details">
        <div className="exercise-title"><div><span className="category">{exercise.category}</span><h3>{exercise.name}</h3></div><span className="session-prescription">{exercise.sets} × {exercise.reps}</span></div>
        <div className="prescription">{exercise.rest && <span>Rest: {exercise.rest}</span>}<span>Start: {exercise.startingWeight}</span></div>
        <div className="tracking-fields"><label>Weight used ({progress.unit || 'lb'})<input type="number" min="0" step="0.5" inputMode="decimal" placeholder="e.g. 20" value={progress.weights[exercise.id] ?? ''} onChange={(event) => setWeight(exercise.id, event.target.value)} /></label></div>
        <div className="rep-tracking"><p>Record each set {getRepLabel(exercise.reps)}{target ? ` (target: up to ${target})` : ''}</p><div className="set-inputs">{Array.from({ length: setCount }, (_, index) => <label key={index}>Set {index + 1}<input type="number" min="0" step="1" inputMode="numeric" placeholder={getRepLabel(exercise.reps)} value={completedReps[index] ?? ''} onChange={(event) => setSetReps(exercise.id, index, event.target.value)} /></label>)}</div>{target && (reachedTarget ? <p className="progression-hint">You reached the top of the rep range for each set. If all reps felt controlled and pain-free, consider a small weight increase next time.</p> : <p className="tracking-help">When all sets reach the top of the rep range with good form, consider a small increase next workout.</p>)}</div>
        {exercise.rest && <div className="rest-controls"><button className="timer-button" onClick={() => setTimer(restDurationInSeconds(exercise.rest))}>{timer > 0 ? 'Restart rest timer' : `Start ${exercise.rest} rest timer`}</button><span className="timer-readout" aria-live="polite">{timer > 0 ? formatTime(timer) : 'Rest timer ready'}</span></div>}
        <p><b>Technique:</b> {exercise.technique}</p><p><b>Tip:</b> {exercise.tip}</p>
      </div>
      <div className="session-navigation"><button className="secondary-button" onClick={() => { setActiveIndex((index) => Math.max(0, index - 1)); setTimer(0); }} disabled={activeIndex === 0}>Previous</button><button className="next-button" onClick={advanceExercise}>{activeIndex === exercises.length - 1 ? 'Finish workout' : done.includes(exercise.id) ? 'Next exercise' : 'Mark done & next'}</button></div>
      <button className="text-button finish-early" onClick={finishEarly}>Finish session early</button>
    </section>}

    {view === 'summary' && <section className="section session-summary"><div className="summary-icon">✓</div><h2>{finished ? 'Workout wrapped up' : 'Workout session ended'}</h2><p>You completed {done.length} of {exercises.length} planned activities for {day}.</p><p className="calorie-summary">{finalCalories === null ? 'Add your body weight in your profile to see a rough calorie estimate.' : `Estimated calories burned: about ${finalCalories} kcal`}</p><p className="calorie-disclaimer">This is a broad estimate based on body weight, session duration, and a general exercise value—not a measurement. Actual calories vary significantly.</p><button className="start-button" onClick={() => setView('plan')}>Back to routine</button></section>}
    {!isRestDay && <p className="note">Train at a comfortable, controlled effort. Build distance, load and training time gradually, and allow time for recovery. Stop if you feel sharp pain or feel unwell.</p>}
  </main>;
}
