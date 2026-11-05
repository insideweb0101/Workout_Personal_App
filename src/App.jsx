import { useEffect, useState } from 'react';
import { EXERCISES, ROUTINES } from './data/exercises.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const KEY = 'workout-app-log-v1';

export default function App() {
  const [day, setDay] = useState(DAYS[(new Date().getDay() + 6) % 7]);
  const [log, setLog] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
  });
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(log)), [log]);
  const routine = ROUTINES.find((item) => item.day === day) || ROUTINES[0];
  const exercises = routine.exercises.map((id) => EXERCISES.find((item) => item.id === id)).filter(Boolean);
  const isRestDay = exercises.length === 0;
  const done = log[day] || [];
  const percent = exercises.length ? Math.round((done.length / exercises.length) * 100) : 0;

  function toggle(id) {
    setLog((current) => {
      const list = current[day] || [];
      return { ...current, [day]: list.includes(id) ? list.filter((value) => value !== id) : [...list, id] };
    });
  }

  return <main className="wrap">
    <header className="header"><div><p className="kicker">YOUR TRAINING COMPANION</p><h1>Workout Personal</h1></div>{!isRestDay && <div className="badge">{percent}% complete</div>}</header>
    <section className="hero"><div><p className="kicker">TODAY'S PLAN</p><h2>{routine.title}</h2><p>{routine.focus}</p></div>{!isRestDay && <div className="count"><strong>{done.length}/{exercises.length}</strong><span>exercises done</span></div>}</section>
    <nav className="days" aria-label="Choose workout day">{DAYS.map((name) => <button key={name} onClick={() => setDay(name)} className={day === name ? 'selected' : ''}>{name.slice(0, 3)}</button>)}</nav>
    {!isRestDay && <>
      <section className="section"><div className="section-head"><h2>{day}'s workout</h2><span>{percent}%</span></div><div className="progress"><span style={{ width: `${percent}%` }} /></div>
        <div className="cards">{exercises.map((exercise) => <article className={`exercise ${done.includes(exercise.id) ? 'completed' : ''}`} key={exercise.id}>
          <img src={exercise.image} alt={`${exercise.name} exercise`} loading="lazy" />
          <div className="details"><div className="exercise-title"><div><span className="category">{exercise.category}</span><h3>{exercise.name}</h3></div><button className="complete" onClick={() => toggle(exercise.id)}>{done.includes(exercise.id) ? 'Done ✓' : 'Mark done'}</button></div>
            <div className="prescription"><span>{exercise.sets} sets</span><span>{exercise.reps} reps</span><span>Start: {exercise.startingWeight}</span></div>
            <p><b>Works:</b> {exercise.benefits}</p><p><b>Technique:</b> {exercise.technique}</p><p><b>Beginner tip:</b> {exercise.tip}</p>
          </div></article>)}</div>
      </section>
      <section className="section"><div className="section-head"><h2>Exercise library</h2><span>{EXERCISES.length} exercises</span></div><div className="library">{EXERCISES.map((exercise) => <article className="library-card" key={exercise.id}><img src={exercise.image} alt="" loading="lazy"/><div><span className="category">{exercise.category}</span><h3>{exercise.name}</h3><p>{exercise.benefits}</p></div></article>)}</div></section>
      <p className="note">Choose a manageable weight that lets you keep good form. Stop if you feel sharp pain, and ask a qualified trainer to check your technique.</p>
    </>}
  </main>;
}
