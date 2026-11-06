import { useEffect, useState } from 'react';
import { EXERCISES, ROUTINES } from './data/exercises.js';
import ExerciseGuide from './components/ExerciseGuide.jsx';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const KEY = 'workout-app-log-v1';

function restDurationInSeconds(rest) {
  const match = rest?.match(/(\d+)\s*(min|sec)/i);
  if (!match) return 60;
  return Number(match[1]) * (match[2].toLowerCase() === 'min' ? 60 : 1);
}

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function App() {
  const [day, setDay] = useState(DAYS[(new Date().getDay() + 6) % 7]);
  const [log, setLog] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
  });
  const [focusMode, setFocusMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => localStorage.setItem(KEY, JSON.stringify(log)), [log]);
  useEffect(() => {
    if (!timer) return undefined;
    const interval = window.setInterval(() => setTimer((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [timer > 0]);

  const routine = ROUTINES.find((item) => item.day === day) || ROUTINES[0];
  const exercises = routine.exercises.map((id) => EXERCISES.find((item) => item.id === id)).filter(Boolean);
  const isRestDay = exercises.length === 0;
  const done = log[day] || [];
  const percent = exercises.length ? Math.round((done.length / exercises.length) * 100) : 0;
  const displayedExercises = focusMode ? [exercises[activeIndex]].filter(Boolean) : exercises;

  function selectDay(name) {
    setDay(name);
    setActiveIndex(0);
    setTimer(0);
    setFocusMode(false);
  }

  function toggle(id) {
    setLog((current) => {
      const list = current[day] || [];
      return { ...current, [day]: list.includes(id) ? list.filter((value) => value !== id) : [...list, id] };
    });
  }

  function startRest(exercise) {
    setTimer(restDurationInSeconds(exercise.rest));
  }

  return <main className="wrap">
    <header className="header"><div><p className="kicker">YOUR TRAINING COMPANION</p><h1>Workout Personal</h1></div>{!isRestDay && <div className="badge">{percent}% complete</div>}</header>
    <section className="hero"><div><p className="kicker">TODAY'S PLAN</p><h2>{routine.title}</h2><p>{routine.focus}</p></div>{!isRestDay && <div className="count"><strong>{done.length}/{exercises.length}</strong><span>exercises done</span></div>}</section>
    <nav className="days" aria-label="Choose workout day">{DAYS.map((name) => <button key={name} onClick={() => selectDay(name)} className={day === name ? 'selected' : ''}>{name.slice(0, 3)}</button>)}</nav>
    {!isRestDay && <>
      <section className="section"><div className="section-head"><h2>{day}'s workout</h2><span>{percent}% complete</span></div><div className="progress"><span style={{ width: `${percent}%` }} /></div>
        <div className="workout-controls"><button className={`mode-toggle ${focusMode ? 'active' : ''}`} onClick={() => setFocusMode((value) => !value)}>{focusMode ? 'Show all exercises' : 'Start focused workout'}</button>{focusMode && <span>Exercise {activeIndex + 1} of {exercises.length}</span>}</div>
        {focusMode && <div className="exercise-navigation"><button onClick={() => { setActiveIndex((index) => Math.max(0, index - 1)); setTimer(0); }} disabled={activeIndex === 0}>← Previous</button><button onClick={() => { setActiveIndex((index) => Math.min(exercises.length - 1, index + 1)); setTimer(0); }} disabled={activeIndex === exercises.length - 1}>Next exercise →</button></div>}
        <div className="cards">{displayedExercises.map((exercise) => <article className={`exercise ${done.includes(exercise.id) ? 'completed' : ''}`} key={exercise.id}>
          <ExerciseGuide exercise={exercise} />
          <div className="details"><div className="exercise-title"><div><span className="category">{exercise.category}</span><h3>{exercise.name}</h3></div><button className="complete" onClick={() => toggle(exercise.id)}>{done.includes(exercise.id) ? 'Done ✓' : 'Mark done'}</button></div>
            <div className="prescription"><span>{exercise.sets} sets</span><span>{exercise.reps} reps</span>{exercise.rest && <span>Rest: {exercise.rest}</span>}<span>Start: {exercise.startingWeight}</span></div>
            {exercise.rest && <div className="rest-controls"><button className="timer-button" onClick={() => startRest(exercise)}>{timer > 0 ? 'Restart rest timer' : `Start ${exercise.rest} rest timer`}</button><span className="timer-readout" aria-live="polite">{timer > 0 ? formatTime(timer) : 'Rest timer ready'}</span></div>}
            <p><b>Works:</b> {exercise.benefits}</p><p><b>Technique:</b> {exercise.technique}</p><p><b>Beginner tip:</b> {exercise.tip}</p>
          </div></article>)}</div>
      </section>
      {!focusMode && <section className="section"><div className="section-head"><h2>Exercise library</h2><span>{EXERCISES.length} exercises</span></div><div className="library">{EXERCISES.map((exercise) => <article className="library-card" key={exercise.id}><ExerciseGuide exercise={exercise} compact /><div><span className="category">{exercise.category}</span><h3>{exercise.name}</h3><p>{exercise.benefits}</p><p><b>Technique:</b> {exercise.technique}</p></div></article>)}</div></section>}
      <p className="note">Choose a manageable weight that lets you keep good form. Stop if you feel sharp pain, and ask a qualified trainer to check your technique.</p>
    </>}
  </main>;
}
