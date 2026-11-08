const makeSession = (id, name, category, reps, technique, tip, extra = {}) => ({
  id, name, category, benefits: extra.benefits || category, technique, tip,
  sets: extra.sets || 1, reps, rest: extra.rest || '', startingWeight: 'Bodyweight / comfortable effort',
});

export const PROGRAM_EXERCISES = [
  makeSession('hyrox-easy-run', 'Easy Run', 'Running', '30–45 min easy', 'Run at a relaxed, conversational pace. Keep the effort easy enough to speak in full sentences.', 'Build aerobic fitness gradually; walk breaks are fine.', { benefits: 'Aerobic base and recovery' }),
  makeSession('hyrox-intervals', 'Run Intervals', 'Running', '6 × 3 min hard / 2 min easy', 'Warm up easily, alternate controlled hard efforts with easy recovery, then cool down. Adjust effort to your current fitness.', 'Hard means challenging but repeatable—not an all-out sprint.', { benefits: 'Running speed and repeatability' }),
  makeSession('hyrox-tempo', 'Tempo Run', 'Running', '20–30 min steady', 'After an easy warm-up, run at a comfortably hard, controlled pace, then cool down.', 'Keep the effort even and finish feeling you could do a little more.', { benefits: 'Threshold and race-pace endurance' }),
  makeSession('hyrox-sled-push', 'Sled Push Practice', 'HYROX station', '4 × 15–20 m', 'Push a manageable sled with a strong forward lean and short, steady steps. If unavailable, use a treadmill push or a heavy incline walk.', 'Keep your trunk braced and choose a load that lets you move continuously.', { benefits: 'Leg drive and station technique', rest: '90 sec' }),
  makeSession('hyrox-sled-pull', 'Sled Pull Practice', 'HYROX station', '4 × 15–20 m', 'Use a rope to pull the sled hand-over-hand, staying braced and moving backward with control. If no sled is available, use a cable pull.', 'Keep the rope path clear and use a controllable load.', { benefits: 'Back, grip and station technique', rest: '90 sec' }),
  makeSession('hyrox-ski', 'SkiErg Practice', 'HYROX station', '4 × 3 min steady', 'Use a hip hinge and pull the handles down smoothly; return under control. A banded pulldown is an alternative.', 'Practice a sustainable rhythm rather than sprinting every interval.', { benefits: 'Upper-body endurance and pacing', rest: '90 sec' }),
  makeSession('hyrox-row', 'Rowing Practice', 'HYROX station', '4 × 3 min steady', 'Drive with the legs first, then lean back slightly and pull the handle toward your lower ribs. Reverse the sequence to return.', 'Keep strokes smooth and consistent.', { benefits: 'Full-body endurance and pacing', rest: '90 sec' }),
  makeSession('hyrox-burpee', 'Burpee Broad Jumps', 'HYROX station', '4 × 8 reps', 'Step or jump down to a supported plank, return to standing, then make a controlled broad jump. Step back instead of jumping to reduce impact.', 'Use a safe clear space and scale the jump to your ability.', { benefits: 'Full-body conditioning', rest: '90 sec' }),
  makeSession('hyrox-farmers', 'Farmer Carry', 'HYROX station', '4 × 40 m', 'Walk tall holding a manageable weight at each side. Turn carefully and set weights down with control.', 'Start lighter than you think you need; avoid leaning to one side.', { benefits: 'Grip, trunk and carry endurance', rest: '90 sec' }),
  makeSession('hyrox-wallballs', 'Wall Ball Practice', 'HYROX station', '4 × 10 reps', 'Hold a light medicine ball at chest height, squat to a comfortable depth, stand and toss to a safe target. Catch softly and repeat.', 'Use a light ball and a secure target; stop if form deteriorates.', { benefits: 'Leg endurance and coordination', rest: '90 sec' }),
  makeSession('run-easy', 'Easy Run', 'Running', '25–40 min easy', 'Run at a relaxed, conversational pace. Keep the effort easy enough to speak in full sentences.', 'Build time gradually; walking breaks are welcome.', { benefits: 'Aerobic base' }),
  makeSession('run-intervals', 'Run Intervals', 'Running', '6 × 2 min brisk / 2 min easy', 'Warm up easily, run briskly for each interval, recover at an easy jog or walk, and cool down.', 'Keep the brisk repetitions controlled and consistent.', { benefits: 'Speed and running economy' }),
  makeSession('run-tempo', 'Tempo Run', 'Running', '15–25 min steady', 'Warm up, run at a comfortably hard but controlled pace, then cool down easily.', 'Avoid turning this into an all-out time trial.', { benefits: 'Threshold endurance' }),
  makeSession('run-long-10k', 'Long Easy Run', 'Running', '45–70 min easy', 'Run at an easy conversational effort on a comfortable route. Use run/walk intervals if helpful.', 'Increase duration gradually and take an easy recovery day afterward.', { benefits: 'Endurance for a 10K' }),
  makeSession('run-long-marathon', 'Long Easy Run', 'Running', '60–120 min easy', 'Run at an easy conversational effort. Plan water and familiar fueling for longer sessions; use run/walk intervals if needed.', 'Build gradually, keep most long runs easy, and take recovery seriously.', { benefits: 'Long-distance endurance' }),
  makeSession('run-recovery', 'Recovery Jog or Walk', 'Running', '20–30 min very easy', 'Jog or walk at a very relaxed pace. You should be able to talk comfortably throughout.', 'If tired or sore, take a rest day instead.', { benefits: 'Gentle recovery' }),
  makeSession('run-strength', 'Runner Strength', 'Strength', '2–3 sets of 8–12 reps', 'Choose a few controlled bodyweight or light resistance movements for hips, legs, calves and trunk.', 'Keep this moderate and prioritize good technique over fatigue.', { benefits: 'General strength and running resilience' }),
];

const day = (dayName, title, focus, exercises) => ({ day: dayName, title, focus, exercises });
const rest = (dayName) => day(dayName, 'Recovery day', 'Rest, take an easy walk, or do comfortable mobility. Skip training if you feel unwell or unusually fatigued.', []);

export const PROGRAMS = [
  {
    id: 'standard', name: 'Standard One', icon: '🏋️', duration: 'Strength plan', level: 'General fitness',
    description: 'Your current strength routine for balanced full-body training and recovery.', routines: ROUTINES,
  },
  {
    id: 'hyrox', name: 'HYROX Preparation', icon: '🏃', duration: 'Weekly template', level: 'Hybrid fitness',
    description: 'Build running endurance and practice functional race stations. Scale distances, loads and volume to your experience.',
    routines: [
      day('Monday', 'HYROX · Run intervals + SkiErg', 'Controlled run work followed by sustainable station practice.', ['hyrox-intervals', 'hyrox-ski']),
      rest('Tuesday'),
      day('Wednesday', 'HYROX · Strength stations', 'Practice sled patterns and carries with manageable loads and full control.', ['hyrox-sled-push', 'hyrox-sled-pull', 'hyrox-farmers']),
      rest('Thursday'),
      day('Friday', 'HYROX · Tempo + stations', 'A steady run and short station practice. Keep the total effort moderate.', ['hyrox-tempo', 'hyrox-row', 'hyrox-wallballs']),
      day('Saturday', 'HYROX · Easy aerobic', 'Easy conversational running; add burpee broad jumps only if you are comfortable with the movement.', ['hyrox-easy-run', 'hyrox-burpee']),
      rest('Sunday'),
    ],
  },
  {
    id: 'marathon', name: 'Marathon Base', icon: '🎽', duration: 'Weekly template', level: 'Endurance',
    description: 'A balanced running week with easy mileage, quality work, strength and a longer easy run. Not a personalized race plan.',
    routines: [
      day('Monday', 'Marathon · Easy run', 'Keep this relaxed and conversational.', ['run-easy']),
      day('Tuesday', 'Marathon · Quality', 'Warm up and cool down easily around controlled interval work.', ['run-intervals']),
      rest('Wednesday'),
      day('Thursday', 'Marathon · Easy + strength', 'Easy running followed by a short, moderate strength session.', ['run-easy', 'run-strength']),
      rest('Friday'),
      day('Saturday', 'Marathon · Long easy run', 'Gradually build long-run time over training; keep the pace easy and plan recovery.', ['run-long-marathon']),
      day('Sunday', 'Marathon · Recovery', 'Very easy jog or walk only if you feel recovered.', ['run-recovery']),
    ],
  },
  {
    id: '10k', name: '10K Training', icon: '🏁', duration: 'Weekly template', level: 'Beginner-friendly',
    description: 'A flexible week with easy running, intervals, tempo, strength and a longer easy session. Adapt the effort to your current fitness.',
    routines: [
      day('Monday', '10K · Easy run', 'Relaxed conversational running; take walk breaks as needed.', ['run-easy']),
      rest('Tuesday'),
      day('Wednesday', '10K · Intervals', 'Warm up and cool down; keep every brisk interval controlled.', ['run-intervals']),
      rest('Thursday'),
      day('Friday', '10K · Tempo + strength', 'A controlled steady effort followed by moderate runner strength.', ['run-tempo', 'run-strength']),
      rest('Saturday'),
      day('Sunday', '10K · Long easy run', 'Build duration gradually at an easy pace. Run/walk is a valid approach.', ['run-long-10k']),
    ],
  },
];

export const PROGRAM_EXERCISES_BY_ID = Object.fromEntries(PROGRAM_EXERCISES.map((exercise) => [exercise.id, exercise]));
