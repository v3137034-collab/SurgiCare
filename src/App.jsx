import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  HeartPulse,
  Home,
  CalendarDays,
  Users,
  Package,
  ShoppingCart,
  LogOut,
  Search,
  Bell,
  ShieldCheck,
  Clock,
  Wallet,
  Activity,
  Menu,
  ArrowRight
} from 'lucide-react';
import { initialAppointments, initialOrders, initialSurgeries, products } from './data.js';
import ProjectBanner from './components/ProjectBanner.jsx';
import AppointmentsModule from './components/AppointmentsModule.jsx';
import ProductsOrdersModule from './components/ProductsOrdersModule.jsx';
import SurgeriesModule from './components/SurgeriesModule.jsx';

const read = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};

const money = n =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(n);

function App() {
  const [user, setUser] = useState(() => read('sc_user', null));
  const [appts, setAppts] = useState(() => read('sc_appts', initialAppointments));
  const [orders, setOrders] = useState(() => read('sc_orders', initialOrders));
  const [surgeries, setSurgeries] = useState(() => read('sc_surgeries', initialSurgeries));

  useEffect(() => localStorage.setItem('sc_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('sc_appts', JSON.stringify(appts)), [appts]);
  useEffect(() => localStorage.setItem('sc_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('sc_surgeries', JSON.stringify(surgeries)), [surgeries]);

  const nav = useNavigate();

  function login(email, role) {
    const u = {
      email,
      name: role === 'admin' ? 'Admin Officer' : email.split('@')[0],
      role
    };
    setUser(u);
    nav(role === 'admin' ? '/admin' : '/dashboard');
  }

  function logout() {
    setUser(null);
    nav('/');
  }

  const protect = (role, el) => {
    if (!user) return <Navigate to="/" replace />;
    if (role && user.role !== role) {
      return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
    }
    return el;
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={login} />} />

      {/* Patient Portal Routes */}
      <Route
        path="/dashboard"
        element={protect(
          'patient',
          <Layout user={user} logout={logout}>
            <Dashboard user={user} appts={appts} orders={orders} surgeries={surgeries} />
          </Layout>
        )}
      />

      <Route
        path="/appointments"
        element={protect(
          null,
          <Layout user={user} logout={logout}>
            <AppointmentsModule user={user} appts={appts} setAppts={setAppts} />
          </Layout>
        )}
      />

      <Route
        path="/products"
        element={protect(
          'patient',
          <Layout user={user} logout={logout}>
            <ProductsOrdersModule
              user={user}
              orders={orders}
              setOrders={setOrders}
              products={products}
              initialTab="products"
            />
          </Layout>
        )}
      />

      <Route
        path="/orders"
        element={protect(
          'patient',
          <Layout user={user} logout={logout}>
            <ProductsOrdersModule
              user={user}
              orders={orders}
              setOrders={setOrders}
              products={products}
              initialTab="orders"
            />
          </Layout>
        )}
      />

      <Route
        path="/surgeries"
        element={protect(
          'patient',
          <Layout user={user} logout={logout}>
            <SurgeriesModule user={user} surgeries={surgeries} setSurgeries={setSurgeries} />
          </Layout>
        )}
      />

      {/* Admin Portal Routes */}
      <Route
        path="/admin"
        element={protect(
          'admin',
          <Layout user={user} logout={logout}>
            <Admin appts={appts} orders={orders} surgeries={surgeries} />
          </Layout>
        )}
      />

      <Route
        path="/admin-orders"
        element={protect(
          'admin',
          <Layout user={user} logout={logout}>
            <ProductsOrdersModule
              user={user}
              orders={orders}
              setOrders={setOrders}
              products={products}
              initialTab="orders"
            />
          </Layout>
        )}
      />

      <Route
        path="/admin-surgeries"
        element={protect(
          'admin',
          <Layout user={user} logout={logout}>
            <SurgeriesModule user={user} surgeries={surgeries} setSurgeries={setSurgeries} />
          </Layout>
        )}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('patient@example.com');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError('Enter a valid email address.');
    }
    if (!password.trim()) {
      return setError('Enter a password.');
    }
    setError('');
    onLogin(email, role);
  }

  return (
    <div className="login">
      <section className="promo">
        <div className="brand">
          <HeartPulse /> Surgi<span>Care</span>
        </div>
        <small>BETTER CARE · SAFER SURGERIES · HEALTHIER TOMORROW</small>
        <div className="pitch">
          <label>YOUR HEALTH, OUR PRIORITY</label>
          <h1>Your trusted partner in surgical care.</h1>
          <p>
            Experience seamless surgical consultations, hospital equipment procurement, and comprehensive
            operative care workflows in one unified platform.
          </p>
        </div>
        <div className="features">
          <article>
            <CalendarDays />
            <b>Model 1: Consultations</b>
            <small>Book & track surgical visits</small>
          </article>
          <article>
            <Package />
            <b>Model 2: Surgical Store</b>
            <small>Procure certified supplies</small>
          </article>
          <article>
            <HeartPulse />
            <b>Model 3: Surgery Workflow</b>
            <small>OT tracking & pre-op checklist</small>
          </article>
        </div>
      </section>

      <section className="login-side">
        <form className="login-card" onSubmit={submit}>
          <div className="brand mini">
            <HeartPulse /> Surgi<span>Care</span>
          </div>
          <label>AUTHENTICATION PORTAL</label>
          <h2>Sign in to your account</h2>
          <p className="muted">Select account type to test the corresponding working models.</p>

          <span>Email address</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter any demo password"
          />

          <span>Select Role / Portal</span>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="patient">Patient Portal (Book visits, order supplies, track surgery)</option>
            <option value="admin">Administrator Portal (Manage appointments, OT & inventory)</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button className="primary wide">Sign in to Portal →</button>

          <p className="notice">
            <ShieldCheck size={17} />
            <b>Ongoing Project Demo:</b> Client-side prototype with interactive storage. Select either
            role to test all 3 working models.
          </p>
        </form>
        <small className="copyright">© 2026 SurgiCare · Active Academic Project Milestone</small>
      </section>
    </div>
  );
}

function Layout({ user, logout, children }) {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const admin = user.role === 'admin';

  const items = admin
    ? [
        ['Dashboard', '/admin', Home],
        ['Appointments (M1)', '/appointments', CalendarDays],
        ['Surgeries & OT (M3)', '/admin-surgeries', HeartPulse],
        ['Equipment & Orders (M2)', '/admin-orders', Package]
      ]
    : [
        ['Dashboard', '/dashboard', Home],
        ['Consultations (M1)', '/appointments', CalendarDays],
        ['My Surgeries (M3)', '/surgeries', HeartPulse],
        ['Surgical Store (M2)', '/products', Package],
        ['My Orders (M2)', '/orders', ShoppingCart]
      ];

  return (
    <div className="shell">
      {open && <button className="scrim" onClick={() => setOpen(false)} />}
      <aside className={'sidebar ' + (open ? 'open' : '')}>
        <div className="brand sidebrand">
          <HeartPulse /> Surgi<span>Care</span>
        </div>
        <small className="nav-label">{admin ? 'ADMIN WORKSPACE' : 'PATIENT PORTAL'}</small>
        <nav>
          {items.map(([name, to, Icon]) => (
            <Link
              key={name}
              className={'navitem ' + (loc.pathname === to ? 'active' : '')}
              to={to}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              {name}
            </Link>
          ))}
        </nav>
        <button className="navitem logout" onClick={logout}>
          <LogOut size={18} /> Log out
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menubtn" onClick={() => setOpen(!open)}>
            <Menu />
          </button>
          <div className="search">
            <Search size={17} />
            <input placeholder="Search surgeries, doctors, supplies..." />
          </div>
          <Bell />
          <div className="avatar">{user.name ? user.name[0].toUpperCase() : 'U'}</div>
          <div className="who">
            <b>{user.name}</b>
            <small>{admin ? 'Administrator' : 'Patient'}</small>
          </div>
        </header>

        <div className="content">
          {/* Ongoing project milestone indicator banner */}
          <ProjectBanner />
          {children}
        </div>
      </main>
    </div>
  );
}

function Stat({ icon: Icon, label, value, note }) {
  return (
    <article className="stat">
      <div className="stat-icon">
        <Icon />
      </div>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
    </article>
  );
}

function Badge({ status }) {
  return <span className={'badge ' + (status || '').toLowerCase()}>{status}</span>;
}

function Panel({ title, sub, children }) {
  return (
    <section className="panel">
      <div className="panelhead">
        <div>
          <h3>{title}</h3>
          <p>{sub}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Dashboard({ user, appts, orders, surgeries }) {
  const nav = useNavigate();
  const userAppts = appts.filter(
    a => a.email === user.email || a.patient.toLowerCase() === user.name.toLowerCase() || a.patient === 'Amit Kumar'
  );
  const userOrders = orders.filter(
    o => o.email === user.email || o.customer.toLowerCase() === user.name.toLowerCase() || o.customer === 'Amit Kumar'
  );
  const userSurgery = surgeries.find(
    s => s.email === user.email || s.patient.toLowerCase() === user.name.toLowerCase() || s.patient === 'Amit Kumar'
  ) || surgeries[0];

  return (
    <div className="stack">
      {/* Welcome Hero */}
      <div className="welcome">
        <label>PATIENT PORTAL DASHBOARD</label>
        <h1>Welcome, {user.name} ✦</h1>
        <p>
          Access all 3 working models: Book clinical consultations, track surgery readiness, and requisition
          surgical supplies.
        </p>
        <div className="actions">
          <button className="primary" onClick={() => nav('/appointments')}>
            ＋ Book Consultation (M1)
          </button>
          <button className="secondary" onClick={() => nav('/products')}>
            Shop Equipment (M2)
          </button>
          <button className="secondary" onClick={() => nav('/surgeries')}>
            Track My Surgery (M3)
          </button>
        </div>
      </div>

      {/* KPI Stats for 3 Models */}
      <div className="stats four">
        <Stat
          icon={CalendarDays}
          label="Model 1: Consultations"
          value={userAppts.filter(a => a.status !== 'Cancelled').length}
          note="Upcoming visits"
        />
        <Stat
          icon={HeartPulse}
          label="Model 3: Care Stage"
          value={userSurgery ? userSurgery.stage : 'N/A'}
          note={userSurgery ? userSurgery.procedure : 'No active surgery'}
        />
        <Stat
          icon={ShoppingCart}
          label="Model 2: Supply Orders"
          value={userOrders.length}
          note="Equipment purchases"
        />
        <Stat
          icon={ShieldCheck}
          label="Project Status"
          value="Sprint v0.3"
          note="3 Models Active"
        />
      </div>

      {/* 2-Column Grid: Surgery Status & Appointments */}
      <div className="grid2">
        {/* Model 3 Card */}
        {userSurgery && (
          <Panel title="Model 3: Active Surgery Status" sub="Current procedure & pre-op progress">
            <div style={{ background: '#f8fbfe', padding: '14px', borderRadius: '10px', border: '1px solid #e2edfa', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <b style={{ color: '#133e68', fontSize: '14px' }}>{userSurgery.procedure}</b>
                <span className="badge-stage" style={{ padding: '4px 8px', fontSize: '10px' }}>{userSurgery.stage}</span>
              </div>
              <small style={{ color: '#6886a1', display: 'block', marginTop: '4px' }}>
                {userSurgery.surgeon} · {userSurgery.otRoom} · {userSurgery.date} at {userSurgery.time}
              </small>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#567694', marginBottom: '6px' }}>
              <span>Pre-Op Safety Readiness</span>
              <b>{userSurgery.checklist.filter(c => c.done).length} / {userSurgery.checklist.length} Verified</b>
            </div>
            <div className="progress-bar-wrap">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${(userSurgery.checklist.filter(c => c.done).length / userSurgery.checklist.length) * 100}%`
                }}
              />
            </div>
            <Link className="textlink" to="/surgeries" style={{ marginTop: '8px' }}>
              Open Surgery Checklist & Guidelines →
            </Link>
          </Panel>
        )}

        {/* Model 1 Card */}
        <Panel title="Model 1: Upcoming Consultations" sub="Next scheduled doctor visits">
          <div className="list">
            {userAppts
              .filter(a => a.status !== 'Cancelled')
              .slice(0, 3)
              .map(a => (
                <div className="appt" key={a.id}>
                  <div className="date">
                    <b>{new Date(a.date + 'T12:00:00').getDate()}</b>
                    <small>
                      {new Date(a.date + 'T12:00:00').toLocaleString('en', { month: 'short' }).toUpperCase()}
                    </small>
                  </div>
                  <div className="apptinfo">
                    <b>{a.doctor}</b>
                    <small>
                      {a.specialty} · {a.time}
                    </small>
                  </div>
                  <Badge status={a.status} />
                </div>
              ))}
            {!userAppts.filter(a => a.status !== 'Cancelled').length && (
              <p className="empty">No upcoming appointments scheduled.</p>
            )}
          </div>
          <Link className="textlink" to="/appointments">
            Book or manage consultations →
          </Link>
        </Panel>
      </div>

      {/* Model 2 Orders Snapshot */}
      <Panel title="Model 2: Recent Supply Orders" sub="Surgical disposables & equipment tracking">
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Item Ordered</th>
                <th>Amount</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.slice(0, 3).map(o => (
                <tr key={o.id}>
                  <td><b>{o.id}</b></td>
                  <td>{o.item}</td>
                  <td><b>{money(o.amount)}</b></td>
                  <td>
                    <Badge status={o.status} />
                  </td>
                  <td>
                    <button className="view" onClick={() => nav('/orders')}>
                      Track Shipment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="textlink" to="/products">
          Browse Surgical Catalog & Place New Order →
        </Link>
      </Panel>

      <p className="footnote">
        Project Prototype Note: Data changes are stored locally in the browser to maintain an interactive demo state.
      </p>
    </div>
  );
}

function Admin({ appts, orders, surgeries }) {
  const nav = useNavigate();
  const revenue = orders.reduce((s, o) => s + (o.amount || 0), 0);

  return (
    <div className="stack">
      <div className="heading">
        <div>
          <label>OVERVIEW WORKSPACE</label>
          <h1>Administrator Clinical Dashboard</h1>
          <p>Supervise appointments, surgical operating theater cases, and medical supply orders.</p>
        </div>
        <button className="secondary" onClick={() => window.print()}>
          Export Report ↗
        </button>
      </div>

      {/* KPI Stats */}
      <div className="stats four">
        <Stat
          icon={CalendarDays}
          label="Model 1: Consultations"
          value={appts.length}
          note={`${appts.filter(a => a.status === 'Pending').length} pending review`}
        />
        <Stat
          icon={HeartPulse}
          label="Model 3: OT Surgeries"
          value={surgeries.length}
          note="Active clinical cases"
        />
        <Stat
          icon={ShoppingCart}
          label="Model 2: Supply Orders"
          value={orders.length}
          note={`${orders.filter(o => o.status === 'Processing').length} in processing`}
        />
        <Stat
          icon={Wallet}
          label="Supply Turnover"
          value={money(2410000 + revenue)}
          note="Live demo estimate"
        />
      </div>

      {/* Grid: Order Activity & Top Products */}
      <div className="grid2">
        <Panel title="Monthly Clinical Activity" sub="Appointments & supply requisitions">
          <div className="chart">
            {[35, 55, 45, 72, 60, 88].map((v, i) => (
              <div key={i}>
                <span style={{ height: v + '%' }} />
                <span style={{ height: v - 18 + '%' }} />
                <small>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</small>
              </div>
            ))}
          </div>
          <div className="legend">
            ■ Consultations　 <span>■ Surgery Cases</span>　 <b>■ Supply Orders</b>
          </div>
        </Panel>

        <Panel title="Top Requisitioned Equipment" sub="Inventory demand overview">
          <div className="list">
            {products.slice(0, 4).map(p => (
              <div className="product" key={p.name}>
                <Package />
                <div>
                  <b>{p.name}</b>
                  <small>{p.sold} units ordered · {p.stock} in stock</small>
                </div>
                <strong>{money(p.price)}</strong>
              </div>
            ))}
          </div>
          <Link className="textlink" to="/admin-orders">
            Manage Hospital Inventory & Orders →
          </Link>
        </Panel>
      </div>

      {/* Grid: Model 1 Appointments & Model 3 Surgeries */}
      <div className="grid2">
        <Panel title="Model 1: Recent Consultations" sub="Latest patient booking requests">
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appts.slice(0, 4).map(a => (
                  <tr key={a.id}>
                    <td><b>{a.patient}</b></td>
                    <td>{a.doctor}</td>
                    <td>{a.date}</td>
                    <td>
                      <Badge status={a.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link className="textlink" to="/appointments">
            Manage all appointments (Model 1) →
          </Link>
        </Panel>

        <Panel title="Model 3: Scheduled OT Surgeries" sub="Operating theater cases & stages">
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Procedure</th>
                  <th>OT Room</th>
                  <th>Stage</th>
                </tr>
              </thead>
              <tbody>
                {surgeries.slice(0, 4).map(s => (
                  <tr key={s.id}>
                    <td><b>{s.patient}</b></td>
                    <td>{s.procedure}</td>
                    <td>{s.otRoom}</td>
                    <td>
                      <Badge status={s.stage} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link className="textlink" to="/admin-surgeries">
            Manage surgical cases & checklists (Model 3) →
          </Link>
        </Panel>
      </div>

      <p className="footnote">
        Project Prototype Note: Admin metrics are interactive demo values managed across the 3 working models.
      </p>
    </div>
  );
}

export default App;
