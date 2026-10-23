import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, CheckCircle2, Clock, GitBranch } from 'lucide-react';

export default function ProjectBanner() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="project-banner" aria-label="Project Status Banner">
      <div className="banner-top">
        <div className="banner-title">
          <span className="banner-pill"><GitBranch size={13} /> ONGOING PROJECT</span>
          <strong>SurgiCare Milestone · Phase 1 Client-Side Core Models</strong>
          <span className="banner-version">v0.3-dev</span>
        </div>
        <button 
          type="button" 
          className="banner-toggle" 
          onClick={() => setExpanded(!expanded)}
          title={expanded ? "Collapse project details" : "Expand project details"}
        >
          {expanded ? <><span>Hide milestone overview</span> <ChevronUp size={15} /></> : <><span>3 Working Models Active</span> <ChevronDown size={15} /></>}
        </button>
      </div>

      {expanded && (
        <div className="banner-body">
          <div className="banner-modules">
            <div className="module-chip active">
              <CheckCircle2 size={14} className="chip-icon success" />
              <div>
                <b>Model 1: Consultation & Appointment Scheduling</b>
                <small>Patient booking modal, live slot scheduling & admin status workflow</small>
              </div>
            </div>

            <div className="module-chip active">
              <CheckCircle2 size={14} className="chip-icon success" />
              <div>
                <b>Model 2: Surgical Equipment & Order Tracking</b>
                <small>Equipment catalog, live purchase flow & visual fulfillment stepper</small>
              </div>
            </div>

            <div className="module-chip active">
              <CheckCircle2 size={14} className="chip-icon success" />
              <div>
                <b>Model 3: Surgery & Care Procedure Workflow</b>
                <small>OT scheduling, multi-stage surgery tracker & pre-op checklist</small>
              </div>
            </div>

            <div className="module-chip roadmap">
              <Clock size={14} className="chip-icon pending" />
              <div>
                <b>Sprint 2 (Upcoming Milestone)</b>
                <small>Node.js REST API, PostgreSQL database & payment gateway integration</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
