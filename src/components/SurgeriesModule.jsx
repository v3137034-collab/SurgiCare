import React, { useState } from 'react';
import { HeartPulse, CheckSquare, Square, Calendar, User, Clock, AlertTriangle, FileText, CheckCircle2, ChevronRight, Plus, X } from 'lucide-react';
import { doctorsList } from '../data.js';

export default function SurgeriesModule({ user, surgeries, setSurgeries }) {
  const isAdmin = user.role === 'admin';
  const [selectedSurgeryId, setSelectedSurgeryId] = useState(surgeries[0]?.id || null);
  const [notice, setNotice] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New surgery form for admin
  const [form, setForm] = useState({
    patient: 'Amit Kumar',
    email: 'amit@example.com',
    procedure: 'Laparoscopic Appendectomy',
    type: 'General Surgery',
    surgeon: doctorsList[0].name,
    hospital: 'Apex Surgical Pavilion',
    otRoom: 'OT-3',
    date: '2026-11-20',
    time: '09:00 AM',
    stage: 'OT Scheduled'
  });

  const stages = [
    'Pre-Op Evaluation',
    'OT Scheduled',
    'Surgery In Progress',
    'Post-Op Recovery',
    'Discharged'
  ];

  const userSurgeries = isAdmin
    ? surgeries
    : surgeries.filter(s => s.email === user.email || s.patient.toLowerCase() === user.name.toLowerCase() || s.patient === 'Amit Kumar');

  const activeSurgery = userSurgeries.find(s => s.id === selectedSurgeryId) || userSurgeries[0] || null;

  function triggerNotice(msg) {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  }

  function toggleChecklistItem(surgeryId, itemId) {
    setSurgeries(old =>
      old.map(s => {
        if (s.id !== surgeryId) return s;
        const nextChecklist = s.checklist.map(c => (c.id === itemId ? { ...c, done: !c.done } : c));
        return { ...s, checklist: nextChecklist };
      })
    );
    triggerNotice('Checklist item updated.');
  }

  function updateStage(surgeryId, nextStage) {
    setSurgeries(old =>
      old.map(s => (s.id === surgeryId ? { ...s, stage: nextStage } : s))
    );
    triggerNotice(`Surgery ${surgeryId} advanced to stage: "${nextStage}".`);
  }

  function handleAddSurgery(e) {
    e.preventDefault();
    const newId = 'SURG' + String(Date.now()).slice(-3);
    const newSurgery = {
      id: newId,
      patient: form.patient,
      email: form.email,
      procedure: form.procedure,
      type: form.type,
      surgeon: form.surgeon,
      hospital: form.hospital,
      otRoom: form.otRoom,
      date: form.date,
      time: form.time,
      stage: form.stage,
      notes: 'New clinical procedure scheduled.',
      checklist: [
        { id: 'c1', label: 'Nil by mouth (Fasting 8 hours prior to OT)', done: false },
        { id: 'c2', label: 'Pre-Anesthetic Checkup (PAC) cleared', done: false },
        { id: 'c3', label: 'Diagnostic reports verified', done: false },
        { id: 'c4', label: 'Informed surgical consent signed', done: false }
      ]
    };

    setSurgeries(old => [newSurgery, ...old]);
    setSelectedSurgeryId(newId);
    setShowAddModal(false);
    triggerNotice(`Surgery case ${newId} created successfully.`);
  }

  const completedChecklistCount = activeSurgery ? activeSurgery.checklist.filter(c => c.done).length : 0;
  const totalChecklistCount = activeSurgery ? activeSurgery.checklist.length : 0;
  const readinessPercent = totalChecklistCount > 0 ? Math.round((completedChecklistCount / totalChecklistCount) * 100) : 0;

  return (
    <div className="stack">
      {/* Header */}
      <div className="heading">
        <div>
          <label>MODEL 3 · CORE WORKING MODULE</label>
          <h1>Surgical Care & Procedure Workflow</h1>
          <p>
            {isAdmin
              ? 'Operation theater (OT) scheduling, patient surgical progress tracking, and clinical safety checklists.'
              : 'Track your scheduled surgical procedure, pre-operative readiness guidelines, and care team milestones.'}
          </p>
        </div>
        {isAdmin && (
          <button className="primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Schedule Surgery Case
          </button>
        )}
      </div>

      {notice && <div className="success">{notice}</div>}

      {/* Surgery Selection Tabs (if multiple surgeries) */}
      {userSurgeries.length > 1 && (
        <div className="surgery-pills">
          {userSurgeries.map(s => (
            <button
              key={s.id}
              type="button"
              className={'surgery-pill-btn ' + (activeSurgery?.id === s.id ? 'active' : '')}
              onClick={() => setSelectedSurgeryId(s.id)}
            >
              <HeartPulse size={14} />
              <span>{s.procedure}</span>
              <small>({s.patient})</small>
            </button>
          ))}
        </div>
      )}

      {activeSurgery ? (
        <div className="stack">
          {/* Main Case Card */}
          <section className="panel surgery-hero">
            <div className="surgery-hero-top">
              <div>
                <span className="surgery-type-badge">{activeSurgery.type}</span>
                <h2 className="surgery-hero-title">{activeSurgery.procedure}</h2>
                <p className="surgery-hero-sub">
                  Case ID: <b>{activeSurgery.id}</b> · Patient: <b>{activeSurgery.patient}</b> ({activeSurgery.email})
                </p>
              </div>
              <div className="surgery-badge-wrap">
                <span className="badge-stage">{activeSurgery.stage}</span>
              </div>
            </div>

            {/* Stage Progress Bar */}
            <div className="stage-tracker">
              {stages.map((st, i) => {
                const currentIdx = stages.indexOf(activeSurgery.stage);
                const isCompleted = i < currentIdx;
                const isCurrent = i === currentIdx;
                return (
                  <div key={st} className={`stage-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                    <div className="stage-marker">
                      {isCompleted ? <CheckCircle2 size={15} /> : <span>{i + 1}</span>}
                    </div>
                    <span className="stage-name">{st}</span>
                  </div>
                );
              })}
            </div>

            {/* Metadata Grid */}
            <div className="surgery-meta-grid">
              <div className="meta-card">
                <small>Lead Surgeon</small>
                <strong>{activeSurgery.surgeon}</strong>
                <span>Senior Consultant</span>
              </div>
              <div className="meta-card">
                <small>Operation Theater (OT)</small>
                <strong>{activeSurgery.otRoom}</strong>
                <span>{activeSurgery.hospital}</span>
              </div>
              <div className="meta-card">
                <small>Scheduled Date & Time</small>
                <strong>{activeSurgery.date}</strong>
                <span>{activeSurgery.time}</span>
              </div>
              <div className="meta-card">
                <small>Pre-Op Safety Readiness</small>
                <strong style={{ color: readinessPercent === 100 ? '#11885d' : '#0879ed' }}>
                  {readinessPercent}% Ready
                </strong>
                <span>{completedChecklistCount} of {totalChecklistCount} criteria verified</span>
              </div>
            </div>

            {/* Admin Stage Controller */}
            {isAdmin && (
              <div className="admin-stage-box">
                <b>Clinical Control: Update Surgical Stage</b>
                <div className="stage-btn-group">
                  {stages.map(st => (
                    <button
                      key={st}
                      type="button"
                      className={`stage-opt-btn ${activeSurgery.stage === st ? 'active' : ''}`}
                      onClick={() => updateStage(activeSurgery.id, st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Two Columns: Interactive Checklist & Guidelines */}
          <div className="grid2">
            {/* Column 1: Interactive Pre-Op Checklist */}
            <section className="panel">
              <div className="panelhead">
                <div>
                  <h3>Interactive Pre-Operative Readiness Checklist</h3>
                  <p>Verify clinical requirements prior to entering the Operation Theater</p>
                </div>
              </div>

              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${readinessPercent}%` }} />
              </div>
              <small className="progress-bar-label">
                {readinessPercent}% completed ({completedChecklistCount} of {totalChecklistCount} items)
              </small>

              <div className="checklist-items">
                {activeSurgery.checklist.map(item => (
                  <label key={item.id} className={`checklist-row ${item.done ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleChecklistItem(activeSurgery.id, item.id)}
                    />
                    <span className="checklist-text">{item.label}</span>
                    {item.done && <span className="verified-badge">Verified</span>}
                  </label>
                ))}
              </div>

              <p className="footnote" style={{ marginTop: '14px' }}>
                ✓ Interactive state stored in browser storage for demonstration purposes.
              </p>
            </section>

            {/* Column 2: Clinical Instructions & Notes */}
            <section className="panel">
              <div className="panelhead">
                <div>
                  <h3>Surgeon Instructions & Patient Guide</h3>
                  <p>Critical instructions provided by {activeSurgery.surgeon}</p>
                </div>
              </div>

              <div className="instruction-box">
                <div className="instruction-icon"><AlertTriangle size={18} /></div>
                <div>
                  <b>Fasting Instructions (Nil by Mouth)</b>
                  <p>No solid food or milk for 8 hours prior to scheduled OT time. Only clear water permitted up to 2 hours before.</p>
                </div>
              </div>

              <div className="instruction-box">
                <div className="instruction-icon"><FileText size={18} /></div>
                <div>
                  <b>Documentation & Mandatory Scans</b>
                  <p>Bring physical printouts of CBC, PT/INR, and imaging (X-Ray/MRI/CT) on admission day along with government ID.</p>
                </div>
              </div>

              <div className="instruction-box">
                <div className="instruction-icon"><HeartPulse size={18} /></div>
                <div>
                  <b>Clinical Case Note</b>
                  <p>{activeSurgery.notes || 'Patient evaluated and cleared for standard anesthetic protocol.'}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <p className="empty">No active surgery cases found.</p>
      )}

      {/* Admin Add Surgery Modal */}
      {showAddModal && (
        <div className="overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modalhead">
              <div>
                <label>CLINICAL WORKSPACE</label>
                <h2>Schedule New Surgical Procedure</h2>
              </div>
              <button onClick={() => setShowAddModal(false)}><X /></button>
            </div>

            <form onSubmit={handleAddSurgery} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="field-label">Patient Name</label>
                <input
                  type="text"
                  className="modal-input"
                  value={form.patient}
                  onChange={e => setForm({ ...form, patient: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="field-label">Procedure Name</label>
                  <input
                    type="text"
                    className="modal-input"
                    value={form.procedure}
                    onChange={e => setForm({ ...form, procedure: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Surgery Category</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option>General Surgery</option>
                    <option>Minimally Invasive Surgery</option>
                    <option>Orthopedic Surgery</option>
                    <option>Cardiothoracic Surgery</option>
                    <option>Gynecological Surgery</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="field-label">Lead Surgeon</label>
                  <select value={form.surgeon} onChange={e => setForm({ ...form, surgeon: e.target.value })}>
                    {doctorsList.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">OT Suite</label>
                  <select value={form.otRoom} onChange={e => setForm({ ...form, otRoom: e.target.value })}>
                    <option>OT-1 (General OT)</option>
                    <option>OT-2 (Laparoscopy Suite)</option>
                    <option>OT-3 (Cardiac OT)</option>
                    <option>OT-4 (Ortho Suite)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="field-label">Scheduled Date</label>
                  <input
                    type="date"
                    className="modal-input"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">OT Time Slot</label>
                  <input
                    type="text"
                    className="modal-input"
                    value={form.time}
                    onChange={e => setForm({ ...form, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="primary wide">Schedule Case</button>
                <button type="button" className="secondary wide" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
