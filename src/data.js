export const doctorsList = [
  { id: 'DOC1', name: 'Dr. Rajesh Patel', specialty: 'General & Laparoscopic Surgery', degree: 'MBBS, MS (Surgery), FIAGES', experience: '15+ Years', room: 'Consultation Room 102' },
  { id: 'DOC2', name: 'Dr. Priya Sharma', specialty: 'Orthopedic & Joint Replacement', degree: 'MBBS, MS (Ortho), DNB', experience: '12+ Years', room: 'Consultation Room 204' },
  { id: 'DOC3', name: 'Dr. Sandeep Mehta', specialty: 'Cardiothoracic Surgery', degree: 'MBBS, MS, MCh (CTVS)', experience: '18+ Years', room: 'Heart Center Suite 3' },
  { id: 'DOC4', name: 'Dr. Anjali Desai', specialty: 'Obstetrics & Gynecology', degree: 'MBBS, MD (OBG)', experience: '10+ Years', room: 'Care Clinic Room 108' }
];

export const initialAppointments = [
  { id: 'APT001', patient: 'Amit Kumar', email: 'amit@example.com', doctor: 'Dr. Rajesh Patel', specialty: 'General & Laparoscopic Surgery', date: '2026-11-02', time: '10:00 AM', status: 'Confirmed', reason: 'Pre-operative gallbladder checkup' },
  { id: 'APT002', patient: 'Neha Singh', email: 'neha@example.com', doctor: 'Dr. Priya Sharma', specialty: 'Orthopedic & Joint Replacement', date: '2026-11-03', time: '11:30 AM', status: 'Pending', reason: 'Knee ligament evaluation' },
  { id: 'APT003', patient: 'Rahul Verma', email: 'rahul@example.com', doctor: 'Dr. Sandeep Mehta', specialty: 'Cardiothoracic Surgery', date: '2026-11-04', time: '03:00 PM', status: 'Confirmed', reason: 'Cardiac bypass assessment' },
  { id: 'APT004', patient: 'Pooja Mehta', email: 'pooja@example.com', doctor: 'Dr. Anjali Desai', specialty: 'Obstetrics & Gynecology', date: '2026-11-05', time: '09:30 AM', status: 'Cancelled', reason: 'Routine follow-up visit' },
  { id: 'APT005', patient: 'Suresh Patel', email: 'suresh@example.com', doctor: 'Dr. Rajesh Patel', specialty: 'General & Laparoscopic Surgery', date: '2026-11-07', time: '02:00 PM', status: 'Pending', reason: 'Abdominal hernia consultation' }
];

export const products = [
  { id: 'PRD01', name: 'Sterile Surgical Gloves (Box of 50)', category: 'Disposables', price: 560, sold: 86, stock: 140, description: 'Powder-free, textured latex surgical examination gloves.' },
  { id: 'PRD02', name: '3-Ply Surgical Masks (Pack of 100)', category: 'PPE Supplies', price: 250, sold: 120, stock: 250, description: 'Fluid resistant, high bacterial filtration efficiency (BFE > 99%).' },
  { id: 'PRD03', name: 'Mayo Surgical Scissors (Stainless Steel)', category: 'Instruments', price: 850, sold: 42, stock: 45, description: 'Autoclavable curved precision surgical dissecting scissors.' },
  { id: 'PRD04', name: 'Sterile Surgical Drapes & Sheets', category: 'Disposables', price: 1200, sold: 28, stock: 60, description: 'Absorbent impervious surgical field protection drape kit.' },
  { id: 'PRD05', name: 'Suture Thread & Needle Kit (12 Pcs)', category: 'Surgical Kits', price: 1450, sold: 55, stock: 80, description: 'Braided non-absorbable sterile surgical suture needles.' },
  { id: 'PRD06', name: 'Digital Finger Pulse Oximeter', category: 'Diagnostics', price: 950, sold: 68, stock: 50, description: 'Real-time SpO2 and pulse rate surgical monitoring device.' },
  { id: 'PRD07', name: 'Povidone Iodine Antiseptic Solution 500ml', category: 'Antiseptics', price: 340, sold: 92, stock: 110, description: 'Broad-spectrum skin and surgical wound antimicrobial antiseptic.' },
  { id: 'PRD08', name: 'Precision Scalpel Blades #10 (Box of 20)', category: 'Instruments', price: 420, sold: 37, stock: 75, description: 'Ultra-sharp carbon steel sterilized surgical surgical blades.' }
];

export const initialOrders = [
  { id: 'ORD1001', customer: 'Amit Kumar', email: 'amit@example.com', item: 'Sterile Surgical Gloves (Box of 50)', amount: 1120, quantity: 2, status: 'Processing', date: '2026-10-20', address: 'Ward 4B, Central Hospital' },
  { id: 'ORD1002', customer: 'Neha Singh', email: 'neha@example.com', item: '3-Ply Surgical Masks (Pack of 100)', amount: 250, quantity: 1, status: 'Shipped', date: '2026-10-18', address: 'B-104 Sunrise Residency, City' },
  { id: 'ORD1003', customer: 'Rahul Verma', email: 'rahul@example.com', item: 'Mayo Surgical Scissors (Stainless Steel)', amount: 1700, quantity: 2, status: 'Delivered', date: '2026-10-15', address: 'Flat 302, Green Avenue' },
  { id: 'ORD1004', customer: 'Pooja Mehta', email: 'pooja@example.com', item: 'Sterile Surgical Drapes & Sheets', amount: 1200, quantity: 1, status: 'Processing', date: '2026-10-21', address: 'Clinic 12, Healthway Center' }
];

export const initialSurgeries = [
  {
    id: 'SURG001',
    patient: 'Amit Kumar',
    email: 'amit@example.com',
    procedure: 'Laparoscopic Cholecystectomy',
    type: 'Minimally Invasive Surgery',
    surgeon: 'Dr. Rajesh Patel',
    hospital: 'Apex Surgical Pavilion',
    otRoom: 'OT-2 (Laparoscopy Suite)',
    date: '2026-11-12',
    time: '08:30 AM',
    stage: 'OT Scheduled',
    notes: 'Pre-anesthetic clearance received. Fasting protocol to commence at 10:00 PM prior night.',
    checklist: [
      { id: 'c1', label: 'Nil by mouth (Fasting 8 hours prior to OT)', done: false },
      { id: 'c2', label: 'Pre-Anesthetic Checkup (PAC) cleared', done: true },
      { id: 'c3', label: 'Blood investigations (CBC, PT/INR) verified', done: true },
      { id: 'c4', label: 'Informed surgical consent signed by patient/guardian', done: true },
      { id: 'c5', label: 'Pre-operative antibiotic prophylaxis administered', done: false }
    ]
  },
  {
    id: 'SURG002',
    patient: 'Neha Singh',
    email: 'neha@example.com',
    procedure: 'Arthroscopic ACL Reconstruction',
    type: 'Orthopedic Surgery',
    surgeon: 'Dr. Priya Sharma',
    hospital: 'Metro Bone & Joint Institute',
    otRoom: 'OT-4 (Ortho Suite)',
    date: '2026-11-15',
    time: '11:00 AM',
    stage: 'Pre-Op Evaluation',
    notes: 'MRI scan knee reviewed. Patient advised to undergo quadriceps strengthening exercises pre-op.',
    checklist: [
      { id: 'c1', label: 'Nil by mouth (Fasting 8 hours prior to OT)', done: false },
      { id: 'c2', label: 'Pre-Anesthetic Checkup (PAC) cleared', done: false },
      { id: 'c3', label: 'Knee MRI and CT 3D imaging uploaded', done: true },
      { id: 'c4', label: 'Informed surgical consent signed by patient/guardian', done: false },
      { id: 'c5', label: 'Post-op knee brace and crutches pre-arranged', done: true }
    ]
  },
  {
    id: 'SURG003',
    patient: 'Suresh Patel',
    email: 'suresh@example.com',
    procedure: 'Inguinal Hernioplasty (Mesh Repair)',
    type: 'General Surgery',
    surgeon: 'Dr. Rajesh Patel',
    hospital: 'Apex Surgical Pavilion',
    otRoom: 'OT-1',
    date: '2026-10-18',
    time: '09:00 AM',
    stage: 'Post-Op Recovery',
    notes: 'Mesh placement successful with no intraoperative complications. Discharged to step-down ward.',
    checklist: [
      { id: 'c1', label: 'Nil by mouth (Fasting 8 hours prior to OT)', done: true },
      { id: 'c2', label: 'Pre-Anesthetic Checkup (PAC) cleared', done: true },
      { id: 'c3', label: 'Blood investigations verified', done: true },
      { id: 'c4', label: 'Informed surgical consent signed', done: true },
      { id: 'c5', label: 'Post-op pain management and vitals stable', done: true }
    ]
  }
];