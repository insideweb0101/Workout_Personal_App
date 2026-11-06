import React from 'react';

const styles = `
.profile-menu{margin:12px 0 18px;border:1px solid #dfe8e0;border-radius:18px;background:#fff;box-shadow:0 6px 20px #263b2b08;overflow:hidden}
.profile-menu summary{list-style:none;display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer;min-height:72px}
.profile-menu summary::-webkit-details-marker{display:none}
.profile-avatar{width:46px;height:46px;flex:none;border-radius:50%;display:grid;place-items:center;background:#173d2b;color:#fff;font-size:1.05rem;font-weight:800}
.profile-summary-copy{min-width:0;flex:1}.profile-summary-copy strong,.profile-summary-copy span{display:block}.profile-summary-copy strong{color:#24382b}.profile-summary-copy span{color:#64776a;font-size:.8rem;margin-top:3px}.profile-chevron{color:#32805a;font-size:1.15rem;transition:transform .2s}.profile-menu[open] .profile-chevron{transform:rotate(180deg)}
.profile-content{border-top:1px solid #e8eee8;padding:16px}.profile-intro{font-size:.83rem;color:#64776a;line-height:1.5;margin:0 0 13px}.profile-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.profile-fields label{display:grid;gap:5px;color:#385442;font-size:.8rem;font-weight:700}.profile-fields input,.profile-fields select{width:100%;min-height:43px;border:1px solid #cbd9ce;border-radius:10px;background:#fff;color:#17231d;padding:9px 10px;font:inherit}.profile-field-wide{grid-column:1/-1}.profile-metrics{display:flex;flex-wrap:wrap;gap:8px;margin-top:13px}.profile-metric{background:#f1f5f1;border-radius:10px;padding:9px 11px;color:#466151;font-size:.8rem}.profile-privacy{font-size:.75rem;color:#748479;margin:12px 0 0;line-height:1.45}
@media(max-width:520px){.profile-fields{grid-template-columns:1fr}.profile-field-wide{grid-column:auto}.profile-content{padding:13px}}
`;

function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.length ? parts.slice(0, 2).map((part) => part[0].toUpperCase()).join('') : '👤';
}

function numeric(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export default function ProfilePanel({ profile, onChange }) {
  const weight = numeric(profile.weight);
  const heightCm = numeric(profile.heightCm);
  const weightKg = weight ? (profile.weightUnit === 'lb' ? weight / 2.20462 : weight) : null;
  const bmi = weightKg && heightCm ? weightKg / ((heightCm / 100) ** 2) : null;
  const displayName = profile.name.trim() || 'Your profile';

  function update(field, value) {
    onChange({ ...profile, [field]: value });
  }

  return <>
    <style>{styles}</style>
    <details className="profile-menu">
      <summary aria-label="Open your fitness profile">
        <span className="profile-avatar" aria-hidden="true">{initials(profile.name)}</span>
        <span className="profile-summary-copy"><strong>{displayName}</strong><span>{weight ? `${weight} ${profile.weightUnit || 'lb'}` : 'Add your details'}{heightCm ? ` · ${heightCm} cm` : ''}</span></span>
        <span className="profile-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="profile-content">
        <p className="profile-intro">Your optional fitness details help personalize estimates. Fill in only what you want to track.</p>
        <div className="profile-fields">
          <label className="profile-field-wide">Name
            <input type="text" autoComplete="name" maxLength="50" placeholder="Name or nickname" value={profile.name} onChange={(event) => update('name', event.target.value)} />
          </label>
          <label>Height (cm)
            <input type="number" min="1" max="260" step="0.1" inputMode="decimal" placeholder="e.g. 170" value={profile.heightCm} onChange={(event) => update('heightCm', event.target.value)} />
          </label>
          <label>Weight
            <div style={{ display: 'flex', gap: 6 }}>
              <input type="number" min="1" max="700" step="0.1" inputMode="decimal" placeholder="e.g. 150" value={profile.weight} onChange={(event) => update('weight', event.target.value)} />
              <select aria-label="Weight unit" value={profile.weightUnit || 'lb'} onChange={(event) => update('weightUnit', event.target.value)}><option value="lb">lb</option><option value="kg">kg</option></select>
            </div>
          </label>
          <label>Body fat (%) — optional
            <input type="number" min="1" max="75" step="0.1" inputMode="decimal" placeholder="Not measured" value={profile.bodyFat} onChange={(event) => update('bodyFat', event.target.value)} />
          </label>
          <label>Muscle (%) — optional
            <input type="number" min="1" max="90" step="0.1" inputMode="decimal" placeholder="Not measured" value={profile.musclePercent} onChange={(event) => update('musclePercent', event.target.value)} />
          </label>
          <label>Waist (cm) — optional
            <input type="number" min="1" max="250" step="0.1" inputMode="decimal" placeholder="Not measured" value={profile.waistCm} onChange={(event) => update('waistCm', event.target.value)} />
          </label>
          <label>Daily protein goal (g) — optional
            <input type="number" min="1" max="500" step="1" inputMode="numeric" placeholder="e.g. 100" value={profile.proteinGoal} onChange={(event) => update('proteinGoal', event.target.value)} />
          </label>
        </div>
        {bmi && <div className="profile-metrics"><span className="profile-metric">Calculated BMI: {bmi.toFixed(1)} <small>(informational only)</small></span></div>}
        <p className="profile-privacy">These details are saved only in this browser on this device. Body-fat and muscle percentages are optional values you enter yourself; the app does not measure them.</p>
      </div>
    </details>
  </>;
}
