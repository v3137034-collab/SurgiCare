import React, { useState } from 'react';
import { CalendarDays, Clock, Activity, Search, Plus, Eye, X, Check, AlertCircle, User, Stethoscope } from 'lucide-react';
import { doctorsList } from '../data.js';

export default function AppointmentsModule({ user, appts, setAppts }) {
  const isAdmin = user.role === 'admin';
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [doctor, setDoctor] = useState('All doctors');
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Patient booking form state
  const [bookingForm, setBookingForm] = useState({
    doctorId: doctorsList[0].id,
    date: '2026-11-10',
    time: '10:30 AM',
    reason: ''
  });

  const doctors = ['All doctors', ...new Set(appts.map(a => a.doctor))];

  // For patient, only show their appointments (or demo matching email/patient)
  const userAppts = isAdmin 
    ? appts 
    : appts.filter(a => a.email === user.email || a.patient.toLowerCase() === user.name.toLowerCase() || a.patient === 'Demo Patient');

  const filtered = userAppts.filter(a =>
    [a.id, a.patient, a.doctor, a.specialty, a.reason || ''].some(v => v.toLowerCase().includes(q.toLowerCase())) &&
    (status === 'All statuses' || a.status === status) &&
    (doctor === 'All doctors' || a.doctor === doctor)
  );

  function triggerNotice(msg) {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  }

  function updateStatus(id, nextStatus) {
    setAppts(old => old.map(a => (a.id === id ? { ...a, status: nextStatus } : a)));
    setSelected(old => (old ? { ...old, status: nextStatus } : old));
    triggerNotice(`Appointment ${id} status updated to "${nextStatus}".`);
  }

  function handleAddDemo() {
    const id = 'APT' + String(Date.now()).slice(-5);
    const doc = doctorsList[0];
    const newApt = {
      id,
      patient: 'Demo Patient',
      email: 'demo@example.com',
      doctor: doc.name,
      specialty: doc.specialty,
      date: '2026-11-10',
      time: '10:30 AM',
      status: 'Pending',
      reason: 'General surgical evaluation'
    };
    setAppts(old => [newApt, ...old]);
    triggerNotice(`Demo appointment ${id} created.`);
  }

  function handlePatientBooking(e) {
    e.preventDefault();
    if (!bookingForm.reason.trim()) {
      alert('Please briefly mention the reason or symptoms for the consultation.');
      return;
    }
    const doc = doctorsList.find(d => d.id === bookingForm.doctorId) || doctorsList[0];
    const id = 'APT' + String(Date.now()).slice(-5);
    const newApt = {
      id,
      patient: user.name,
      email: user.email,
      doctor: doc.name,
      specialty: doc.specialty,
      date: bookingForm.date,
      time: bookingForm.time,
      status: 'Pending',
      reason: bookingForm.reason
    };
    setAppts(old => [newApt, ...old]);
    setShowBookingModal(false);
    setBookingForm({ doctorId: doctorsList[0].id, date: '2026-11-10', time: '10:30 AM', reason: '' });
    triggerNotice(`Success! Appointment ${id} booked with ${doc.name}. Awaiting clinical confirmation.`);
  }

  function cancelBooking(id) {
    if (window.confirm(`Are you sure you want to cancel appointment ${id}?`)) {
      updateStatus(id, 'Cancelled');
    }
  }

  return (
    <div className="stack">
      {/* Header */}
      <div className="heading">
        <div>
          <label>MODEL 1 · CORE WORKING MODULE</label>
          <h1>Doctor Consultations & Appointments</h1>
          <p>
            {isAdmin
              ? 'Review, verify, filter, and update patient surgical consultation appointments.'
              : 'Book clinical consultations with surgeons and manage your upcoming visits.'}
          </p>
        </div>
        <div>
          {isAdmin ? (
            <button className="primary" onClick={handleAddDemo}>
              <Plus size={16} /> Add Demo Appointment
            </button>
          ) : (
            <button className="primary" onClick={() => setShowBookingModal(true)}>
              <Plus size={16} /> Book New Consultation
            </button>
          )}
        </div>
      </div>

      {notice && <div className="success">{notice}</div>}

      {/* KPI Stats */}
      <div className="stats three">
        <article className="stat">
          <div className="stat-icon"><CalendarDays /></div>
          <div>
            <small>{isAdmin ? 'Total System Appointments' : 'My Total Appointments'}</small>
            <strong>{userAppts.length}</strong>
            <span>Active records</span>
          </div>
        </article>
        <article className="stat">
          <div className="stat-icon"><Clock /></div>
          <div>
            <small>Pending Clinical Review</small>
            <strong>{userAppts.filter(a => a.status === 'Pending').length}</strong>
            <span>Awaiting confirmation</span>
          </div>
        </article>
        <article className="stat">
          <div className="stat-icon"><Activity /></div>
          <div>
            <small>Confirmed Consultations</small>
            <strong>{userAppts.filter(a => a.status === 'Confirmed').length}</strong>
            <span>Scheduled visits</span>
          </div>
        </article>
      </div>

      {/* Main Appointment Table / List */}
      <section className="panel">
        <div className="panelhead">
          <div>
            <h3>{isAdmin ? 'All Scheduled Consultations' : 'My Consultation Records'}</h3>
            <p>Filter by status, doctor, or search keyword</p>
          </div>
        </div>

        <div className="filters">
          <div className="filtersearch">
            <Search size={16} />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search by doctor, patient, ID, or reason..."
            />
          </div>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>All statuses</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
          {isAdmin && (
            <select value={doctor} onChange={e => setDoctor(e.target.value)}>
              {doctors.map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          )}
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Appt ID</th>
                <th>Patient Details</th>
                <th>Consultant / Specialty</th>
                <th>Schedule Date & Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td><b>{a.id}</b></td>
                  <td>
                    <b>{a.patient}</b>
                    <small>{a.email}</small>
                  </td>
                  <td>
                    <b>{a.doctor}</b>
                    <small>{a.specialty}</small>
                  </td>
                  <td>
                    {a.date}
                    <small>{a.time}</small>
                  </td>
                  <td>
                    <span style={{ maxWidth: '180px', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {a.reason || 'General Checkup'}
                    </span>
                  </td>
                  <td>
                    <span className={'badge ' + a.status.toLowerCase()}>{a.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="view" onClick={() => setSelected(a)}>
                        <Eye size={13} /> View
                      </button>
                      {!isAdmin && a.status !== 'Cancelled' && (
                        <button
                          className="view"
                          style={{ borderColor: '#ffd0d4', color: '#c64250' }}
                          onClick={() => cancelBooking(a.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <p className="empty">No appointments found matching your criteria.</p>}
        </div>
        <div className="tablefoot">
          Showing {filtered.length} of {userAppts.length} appointments · Working Model 1 (Synced with Browser Storage)
        </div>
      </section>

      {/* Patient Booking Modal */}
      {showBookingModal && (
        <div className="overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modalhead">
              <div>
                <label>PATIENT BOOKING PORTAL</label>
                <h2>Book Surgical Consultation</h2>
              </div>
              <button onClick={() => setShowBookingModal(false)}><X /></button>
            </div>

            <form onSubmit={handlePatientBooking} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="field-label">Select Surgeon & Specialty</label>
                <select
                  value={bookingForm.doctorId}
                  onChange={e => setBookingForm({ ...bookingForm, doctorId: e.target.value })}
                >
                  {doctorsList.map(doc => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty} ({doc.room})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="field-label">Consultation Date</label>
                  <input
                    type="date"
                    className="modal-input"
                    value={bookingForm.date}
                    onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Time Slot</label>
                  <select
                    value={bookingForm.time}
                    onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })}
                  >
                    <option>09:30 AM</option>
                    <option>10:30 AM</option>
                    <option>11:30 AM</option>
                    <option>02:00 PM</option>
                    <option>03:30 PM</option>
                    <option>04:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="field-label">Primary Symptoms / Surgical Reason</label>
                <textarea
                  className="modal-textarea"
                  rows="3"
                  placeholder="E.g. Pre-operative assessment, abdominal pain evaluation, follow-up..."
                  value={bookingForm.reason}
                  onChange={e => setBookingForm({ ...bookingForm, reason: e.target.value })}
                  required
                />
              </div>

              <div style={{ background: '#f0f8ff', padding: '10px 14px', borderRadius: '8px', fontSize: '11px', color: '#527290' }}>
                ℹ️ <b>Ongoing Project Note:</b> Appointment record will be created instantly and synced with administrator review queue.
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="primary wide">Confirm Booking</button>
                <button type="button" className="secondary wide" onClick={() => setShowBookingModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details & Status Modal */}
      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modalhead">
              <div>
                <label>CONSULTATION RECORD</label>
                <h2>{selected.id}</h2>
              </div>
              <button onClick={() => setSelected(null)}><X /></button>
            </div>
            <div className="details">
              <div><small>Patient Name</small><b>{selected.patient}</b></div>
              <div><small>Contact Email</small><b>{selected.email}</b></div>
              <div><small>Surgeon</small><b>{selected.doctor}</b></div>
              <div><small>Specialty</small><b>{selected.specialty}</b></div>
              <div><small>Scheduled Date</small><b>{selected.date}</b></div>
              <div><small>Time Slot</small><b>{selected.time}</b></div>
              <div style={{ gridColumn: 'span 2' }}>
                <small>Reason / Clinical Notes</small>
                <b>{selected.reason || 'General surgical consultation'}</b>
              </div>
              <div><small>Current Status</small><span className={'badge ' + selected.status.toLowerCase()}>{selected.status}</span></div>
            </div>

            {isAdmin ? (
              <div style={{ marginTop: '16px' }}>
                <label className="statuslabel">Update Appointment Status</label>
                <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)}>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            ) : null}

            <button className="primary wide" style={{ marginTop: '20px' }} onClick={() => setSelected(null)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
